import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  BaseDocument,
  BaseModel,
  toJSONTransform,
} from '@modules/base/base.schema';

@Schema()
export class User extends BaseDocument {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = User & BaseModel;

export type UserDocument = User & Document;

UserSchema.set('toJSON', toJSONTransform());
