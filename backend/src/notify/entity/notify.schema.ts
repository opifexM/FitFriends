import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'notifies',
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
export class NotifyModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public user: UserModel;

  @Prop({ required: true, trim: true })
  public topic: string;

  @Prop({ required: true, trim: true })
  public text: string;

  @Prop({ required: true })
  public isRead: boolean;
}

export const NotifySchema = SchemaFactory.createForClass(NotifyModel);

NotifySchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
