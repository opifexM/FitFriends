import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RequestStatusType } from 'shared/type/enum/request-status-type.enum';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'friends',
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
export class FriendModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public friend: UserModel;

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public friendInitiator: UserModel;

  @Prop({ type: Types.ObjectId, ref: 'UserModel' })
  public requestInitiator: UserModel;

  @Prop({ required: true, enum: RequestStatusType })
  public requestStatus: RequestStatusType;
}

export const FriendSchema = SchemaFactory.createForClass(FriendModel);

FriendSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
