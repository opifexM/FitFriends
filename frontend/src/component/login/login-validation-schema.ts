import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  password: Yup.string().required('Пароль обязателен'),

  email: Yup.string()
    .email('Неверный формат email')
    .required('Email обязателен'),
});
