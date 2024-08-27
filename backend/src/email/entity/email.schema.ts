import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'emails',
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
export class EmailModel extends Document {
  @Prop({ required: true, trim: true })
  public emailFrom: string;

  @Prop({ required: true, trim: true })
  public emailTo: string;

  @Prop({ required: true, trim: true })
  public topic: string;

  @Prop({ required: true, trim: true })
  public text: string;
}

export const EmailSchema = SchemaFactory.createForClass(EmailModel);

EmailSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
