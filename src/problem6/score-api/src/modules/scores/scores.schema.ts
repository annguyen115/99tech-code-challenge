import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  BaseDocument,
  BaseModel,
  toJSONTransform,
} from '@modules/base/base.schema';
import { Types } from 'mongoose';

@Schema()
export class Score extends BaseDocument {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  value: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

export type ScoreModel = Score & BaseModel;

export type ScoreDocument = Score & Document;

ScoreSchema.set('toJSON', toJSONTransform());
