import { Db, ObjectId } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { appConfig } from '@config';

interface Score {
  userId: ObjectId;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const USER_COLLECTION_NAME = appConfig.mongodb.collections.users;
const SCORE_COLLECTION_NAME = appConfig.mongodb.collections.scores;

export class seed_scores1752828165079 implements MigrationInterface {
  public async up(db: Db): Promise<void> {
    const users = await db.collection(USER_COLLECTION_NAME).find({}).toArray();

    if (!users) {
      return;
    }

    const scores = users.map<Score>((user) => ({
      userId: user._id,
      value: this.getRandomInt(100),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await db.collection(SCORE_COLLECTION_NAME).insertMany(scores);
  }

  public async down(db: Db): Promise<void> {
    const users = await db.collection(USER_COLLECTION_NAME).find({}).toArray();

    if (!users) {
      return;
    }

    await db
      .collection(SCORE_COLLECTION_NAME)
      .deleteMany({ userId: { $in: users.map((u) => u._id) } });
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
