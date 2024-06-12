import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'tokens',
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
export class TokenModel extends Document {
  @Prop({ required: true, trim: true })
  public userId: string;

  @Prop({ required: true, trim: true })
  public tokenId: string;

  @Prop({ required: true })
  public expiresIn: Date;

  @Prop()
  public createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);

TokenSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
