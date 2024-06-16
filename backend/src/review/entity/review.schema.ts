import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TrainingModel } from '../../training/entity/training.schema';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'reviews',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: { virtuals: true },
})
export class ReviewModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public user: UserModel;

  @Prop({ type: Types.ObjectId, ref: 'TrainingModel', required: true })
  public training: TrainingModel;

  @Prop({ required: true })
  public rating: number;

  @Prop({ required: true, trim: true })
  public text: string;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);

ReviewSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
