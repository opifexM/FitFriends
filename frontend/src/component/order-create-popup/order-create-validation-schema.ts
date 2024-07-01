import { ORDER } from 'shared/type/order/order.constant.ts';
import * as Yup from 'yup';

export const orderCreateValidationSchema = Yup.object().shape({
  count: Yup.number()
    .min(ORDER.COUNT.MIN, `Значение должно быть не меньше ${ORDER.COUNT.MIN}`)
    .max(ORDER.COUNT.MAX, `Значение должно быть не больше ${ORDER.COUNT.MAX}`)
    .required('Значение обязательно'),

  payment: Yup.string().required('Способ оплаты обязателен'),
});
