import { Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { User } from '@modules/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      username: username,
    });
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne(
      { _id: id },
      { $set: { refreshToken: refreshToken, lastLogin: Date.now() } },
    );
  }

  async removeRefreshTokenById(id: string): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne(
      { _id: id },
      { $unset: { refreshToken: null } },
    );
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.userModel.findOne({ refreshToken: refreshToken });
  }
}
