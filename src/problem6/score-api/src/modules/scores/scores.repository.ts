import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score, TopScoreModel } from '@modules/scores/scores.schema';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';
import { User } from '@modules/users/users.schema';

@Injectable()
export class ScoresRepository {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  updateScoreByUserId(
    userId: string,
    score: number,
  ): Promise<UpdateWriteOpResult> {
    return this.scoreModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      { $set: { value: score, updatedAt: Date.now() } },
    );
  }

  async getTopScore(top: number): Promise<TopScoreModel[]> {
    const scores = await this.scoreModel
      .find()
      .sort({ value: -1 })
      .limit(top)
      .populate<{ userId: User }>('userId', '_id fullName username');

    return scores.map((s) => ({
      id: s.id as string,
      value: s.value,
      user: {
        id: s.userId?.id as string,
        username: s.userId?.username,
        fullName: s.userId?.fullName,
      },
    }));
  }

  async getUserRankInfo(userId: string): Promise<{
    userId: string;
    score: number;
    rank: number;
  } | null> {
    const result = await this.scoreModel.aggregate([
      {
        $setWindowFields: {
          sortBy: { value: -1 },
          output: {
            rank: { $rank: {} },
          },
        },
      },
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          score: '$value',
          rank: 1,
        },
      },
    ]);

    if (!result[0]) return null;

    const item = result[0] as {
      userId: string;
      score: number;
      rank: number;
    };

    return {
      userId: item.userId,
      score: item.score,
      rank: item.rank,
    };
  }
}
