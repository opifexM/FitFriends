import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentStatusType } from 'shared/type/enum/payment-status-type.enum';
import { PaymentType } from 'shared/type/enum/payment-type.enum';
import { PurchaseType } from 'shared/type/enum/purchase-type.enum';
import { TrainingModel } from '../../training/entity/training.schema';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'orders',
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
export class OrderModel extends Document {
  @Prop({ required: true })
  public count: number;

  @Prop({ required: true, enum: PaymentType })
  public payment: PaymentType;

  @Prop({ required: true })
  public price: number;

  @Prop({ required: true, enum: PurchaseType })
  public purchase: PurchaseType;

  @Prop({ type: Types.ObjectId, ref: 'TrainingModel', required: true })
  public service: TrainingModel;

  @Prop({ required: true })
  public totalPrice: number;

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public user: UserModel;

  @Prop({ required: true, enum: PaymentStatusType })
  public paymentStatus: PaymentStatusType;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);

OrderSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
