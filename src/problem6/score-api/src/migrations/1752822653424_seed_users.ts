import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { appConfig } from '@config';
import { hashPassword } from '../utils/auth';

interface User {
  username: string;
  fullName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const user: User = {
  username: 'user',
  fullName: 'user',
  password: '123456',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TOTAL_USERS = appConfig.mongodb.migration.user.amount;

const USER_COLLECTION_NAME = appConfig.mongodb.collections.users;

export class seed_users1752822653424 implements MigrationInterface {
  public async up(db: Db): Promise<void> {
    // insert user to db

    const listUser = await this.generateListUser();

    await db.collection(USER_COLLECTION_NAME).insertMany(listUser);
  }

  public async down(db: Db): Promise<void> {
    const listUser = await this.generateListUser();

    // remove user in db
    await db
      .collection(USER_COLLECTION_NAME)
      .deleteMany({ username: { $in: listUser.map((u) => u.username) } });
  }

  private async generateListUser(): Promise<User[]> {
    const users: User[] = [];

    for (let i = 0; i < TOTAL_USERS - 1; i++) {
      users.push({
        ...user,
        username: `${user.username}${i}`,
        fullName: `${user.fullName}${i}`,
        password: await hashPassword(user.password),
      });
    }

    return users;
  }
}
