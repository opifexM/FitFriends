import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderType } from 'shared/type/enum/gender-type.enum';
import { LocationType } from 'shared/type/enum/location-type.enum';
import { RoleType } from 'shared/type/enum/role-type.enum';

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
  @Prop({ required: true, trim: true })
  public avatarId: string;

  @Prop({ required: true })
  public dateOfBirth: Date;

  @Prop({ required: true, trim: true })
  public description: string;

  @Prop({ required: true, trim: true, unique: true })
  public email: string;

  @Prop({ required: true, enum: GenderType })
  public gender: GenderType;

  @Prop({ required: true, enum: LocationType })
  public location: LocationType;

  @Prop({ required: true, trim: true })
  public name: string;

  @Prop({ required: true, trim: true })
  public password: string;

  @Prop({ required: true, trim: true })
  public profilePictureId: string;

  @Prop({ required: true, enum: RoleType })
  public role: RoleType;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
