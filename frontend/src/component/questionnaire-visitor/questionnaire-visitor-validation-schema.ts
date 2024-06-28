import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant.ts';
import * as Yup from 'yup';

export const questionnaireVisitorValidationSchema = Yup.object().shape({
  caloriesToLose: Yup.number()
    .min(
      QUESTIONNAIRE.CALORIES_TO_LOSE.MIN,
      `Значение должно быть не меньше ${QUESTIONNAIRE.CALORIES_TO_LOSE.MIN} ккал`,
    )
    .max(
      QUESTIONNAIRE.CALORIES_TO_LOSE.MAX,
      `Значение должно быть не больше ${QUESTIONNAIRE.CALORIES_TO_LOSE.MAX} ккал`,
    )
    .required('Значение обязательно'),

  dailyCalorieBurn: Yup.number()
    .min(
      QUESTIONNAIRE.DAILY_CALORIE_BURN.MIN,
      `Значение должно быть не меньше ${QUESTIONNAIRE.DAILY_CALORIE_BURN.MIN} ккал`,
    )
    .max(
      QUESTIONNAIRE.DAILY_CALORIE_BURN.MAX,
      `Значение должно быть не больше ${QUESTIONNAIRE.DAILY_CALORIE_BURN.MAX} ккал`,
    )
    .required('Значение обязательно'),

  skillLevel: Yup.string().required('Уровень обязателен'),
  workoutDuration: Yup.string().required('Время обязательно'),
  workout: Yup.array().max(
    QUESTIONNAIRE.WORKOUT.MAX,
    `Возможно максимум только ${QUESTIONNAIRE.WORKOUT.MAX} значения`,
  ),
});
