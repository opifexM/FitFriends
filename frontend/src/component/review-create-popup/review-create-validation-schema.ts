import { REVIEW } from 'shared/type/review/review.constant.ts';
import * as Yup from 'yup';

export const reviewCreateValidationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(
      REVIEW.RATING.MIN,
      `Значение должно быть не меньше ${REVIEW.RATING.MIN}`,
    )
    .max(
      REVIEW.RATING.MAX,
      `Значение должно быть не больше ${REVIEW.RATING.MAX}`,
    )
    .required('Значение обязательно'),

  text: Yup.string()
    .min(REVIEW.TEXT.MIN, `Текст должен быть не меньше ${REVIEW.TEXT.MIN}`)
    .max(REVIEW.TEXT.MAX, `Текст должен быть не больше ${REVIEW.TEXT.MAX}`)
    .required('Значение обязательно'),
});
