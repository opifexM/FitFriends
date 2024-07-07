import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PurchaseStatusType } from 'shared/type/enum/purchase-status-type.enum';
import { Training } from 'shared/type/training/training';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'balances',
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
export class BalanceModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public user: UserModel;

  @Prop({ required: true })
  public totalCount: number;

  @Prop({ required: true })
  public availableCount: number;

  @Prop({ type: Types.ObjectId, ref: 'TrainingModel', required: true })
  public training: Training;

  @Prop({ required: true, enum: PurchaseStatusType })
  public purchaseStatus: PurchaseStatusType;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceModel);

BalanceSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
