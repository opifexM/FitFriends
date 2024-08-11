import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant.ts';
import * as Yup from 'yup';

export const questionnaireCoachValidationSchema = Yup.object().shape({
  experience: Yup.string()
    .min(
      QUESTIONNAIRE.EXPERIENCE.MIN,
      `Текст должен быть не меньше ${QUESTIONNAIRE.EXPERIENCE.MIN}`,
    )
    .max(
      QUESTIONNAIRE.EXPERIENCE.MAX,
      `Текст должен быть не больше ${QUESTIONNAIRE.EXPERIENCE.MAX}`,
    )
    .required('Текст опыта обязателен'),

  skillLevel: Yup.string().required('Уровень обязателен'),
  workout: Yup.array()
    .min(1, 'Выбор специализации обязателен')
    .max(
      QUESTIONNAIRE.WORKOUT.MAX,
      `Возможно максимум только ${QUESTIONNAIRE.WORKOUT.MAX} значения`,
    ),

  files: Yup.array()
    .required('Файл сертификатов обязателен')
    .min(1, 'Необходимо загрузить как минимум один файл'),
});
