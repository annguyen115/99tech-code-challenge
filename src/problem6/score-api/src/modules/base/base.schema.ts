import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class BaseDocument extends Document {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type BaseModel = BaseDocument & { id: string; __v?: number };

export const toJSONTransform = () => ({
  transform(_doc: Document, ret: Record<string, any>) {
    if (ret._id) {
      ret.id = (ret._id as ObjectId).toString();
      delete ret._id;
    }

    if ('__v' in ret) {
      delete ret.__v;
    }

    return ret;
  },
});
