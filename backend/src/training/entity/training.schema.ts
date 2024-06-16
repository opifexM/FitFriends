import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GenderType } from 'shared/type/enum/gender-type.enum';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'trainings',
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
export class TrainingModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public coach: UserModel;

  @Prop({ required: true, trim: true })
  public name: string;

  @Prop({ required: true, trim: true })
  public backgroundId: string;

  @Prop({ required: true, enum: SkillLevelType })
  public skillLevel: SkillLevelType;

  @Prop({ required: true, enum: WorkoutType })
  public workout: WorkoutType;

  @Prop({ required: true, enum: WorkoutDurationType })
  public workoutDuration: WorkoutDurationType;

  @Prop({ required: true })
  public price: number;

  @Prop({ required: true })
  public caloriesBurned: number;

  @Prop({ required: true, trim: true })
  public description: string;

  @Prop({ required: true, enum: GenderType })
  public gender: GenderType;

  @Prop({ required: true, trim: true })
  public videoId: string;

  @Prop({ required: true })
  public rating: number;

  @Prop({ required: true })
  public isSpecialOffer: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);

TrainingSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
