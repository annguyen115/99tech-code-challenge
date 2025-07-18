import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from '@modules/scores/scores.schema';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';

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
}
