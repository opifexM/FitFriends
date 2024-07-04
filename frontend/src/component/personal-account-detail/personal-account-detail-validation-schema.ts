import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant.ts';
import { USER } from 'shared/type/user/user.constant.ts';
import * as Yup from 'yup';

export const personalAccountDetailValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(
      USER.NAME.MIN,
      `Имя должно содержать минимум ${USER.NAME.MIN} символов`,
    )
    .max(
      USER.NAME.MAX,
      `Имя должно содержать максимум ${USER.NAME.MAX} символов`,
    )
    .required('Имя обязательно'),

  description: Yup.string()
    .min(
      USER.DESCRIPTION.MIN,
      `Описание должно содержать минимум ${USER.DESCRIPTION.MIN} символов`,
    )
    .max(
      USER.DESCRIPTION.MAX,
      `Описание должно содержать максимум ${USER.DESCRIPTION.MAX} символов`,
    )
    .required('Описание обязательно'),

  workout: Yup.array().max(
    QUESTIONNAIRE.WORKOUT.MAX,
    `Возможно максимум только ${QUESTIONNAIRE.WORKOUT.MAX} значения`,
  ),
  location: Yup.string().required('Локация обязательна'),
  gender: Yup.string().required('Пол обязателен'),
  skillLevel: Yup.string().required('Уровень обязателен'),
});
