import { TRAINING } from 'shared/type/training/traning.constant.ts';
import * as Yup from 'yup';

export const trainingUpdateValidationSchema = Yup.object().shape({
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

  price: Yup.number().required('Значение обязательно'),
});
