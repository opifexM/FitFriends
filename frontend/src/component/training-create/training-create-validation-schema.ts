import { TRAINING } from 'shared/type/training/traning.constant.ts';
import * as Yup from 'yup';

export const trainingCreateValidationSchema = Yup.object().shape({
  caloriesBurned: Yup.number()
    .min(
      TRAINING.CALORIES.MIN,
      `Значение должно быть не меньше ${TRAINING.CALORIES.MIN} ккал`,
    )
    .max(
      TRAINING.CALORIES.MAX,
      `Значение должно быть не больше ${TRAINING.CALORIES.MAX} ккал`,
    )
    .required('Значение обязательно'),

  name: Yup.string()
    .min(
      TRAINING.NAME.MIN,
      `Название должно быть не менее ${TRAINING.NAME.MIN} символов`,
    )
    .max(
      TRAINING.NAME.MAX,
      `Название должно быть не более ${TRAINING.NAME.MAX} символов`,
    )
    .required('Название обязательно'),

  description: Yup.string()
    .min(
      TRAINING.DESCRIPTION.MIN,
      `Описание должно быть не менее ${TRAINING.DESCRIPTION.MIN} символов`,
    )
    .max(
      TRAINING.DESCRIPTION.MAX,
      `Описание должно быть не более ${TRAINING.DESCRIPTION.MAX} символов`,
    )
    .required('Описание обязательно'),

  workout: Yup.string().required('Тип обязателен'),
  workoutDuration: Yup.string().required('Время затраты обязательны'),
  skillLevel: Yup.string().required('Уровень обязателен'),
  price: Yup.number().required('Значение обязательно'),
  gender: Yup.string().required('Пол обязателен'),
});
