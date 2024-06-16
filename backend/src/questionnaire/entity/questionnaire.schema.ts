import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum';
import { WorkoutType } from 'shared/type/enum/workout-type.enum';
import { UserModel } from '../../user/entity/user.schema';

@Schema({
  collection: 'questionnaires',
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
export class QuestionnaireModel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  public user: UserModel;

  @Prop({ required: true, enum: SkillLevelType })
  public skillLevel: SkillLevelType;

  @Prop({ required: true, enum: WorkoutType, type: [String] })
  public workout: WorkoutType[];

  @Prop({ required: true, enum: WorkoutDurationType })
  public workoutDuration: WorkoutDurationType;

  @Prop({ required: true })
  public caloriesToLose: number;

  @Prop({ required: true })
  public dailyCalorieBurn: number;

  @Prop({ required: true })
  public isReadyForTraining: boolean;
}

export const QuestionnaireSchema =
  SchemaFactory.createForClass(QuestionnaireModel);

QuestionnaireSchema.virtual('id').get(function (
  this: Document & { _id: Types.ObjectId },
) {
  return this._id.toHexString();
});
