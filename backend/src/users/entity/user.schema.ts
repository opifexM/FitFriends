import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'users',
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
export class UserModel extends Document {
  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
