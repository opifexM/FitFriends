import { USER } from 'shared/type/user/user.constant.ts';
import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
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

  password: Yup.string()
    .min(
      USER.PASSWORD.MIN,
      `Пароль должен содержать минимум ${USER.PASSWORD.MIN} символов`,
    )
    .max(
      USER.PASSWORD.MAX,
      `Пароль должен содержать максимум ${USER.PASSWORD.MAX} символов`,
    )
    .required('Пароль обязателен'),

  email: Yup.string()
    .email('Неверный формат email')
    .required('Email обязателен'),

  birthday: Yup.date().required('Дата рождения обязательна'),
  sex: Yup.string().required('Пол обязателен'),
  role: Yup.string().required('Роль обязательна'),
  location: Yup.string().required('Локация обязательна'),
  userAgreement: Yup.boolean().oneOf(
    [true],
    'Необходимо согласие с политикой конфиденциальности',
  ),
});
