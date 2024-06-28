import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  createReview,
  fetchReviewByTraining,
  updateReview,
} from '../../store/api-action/data-action.ts';
import {
  getCurrentTraining,
  getLastReview,
} from '../../store/api-communication/api-communication.selectors.ts';
import { setIsReviewCreatePopupOpen } from '../../store/ui-settings/ui-settings.slice.ts';
import { reviewCreateValidationSchema } from './review-create-validation-schema.ts';

interface FormValues {
  rating: number | string;
  text: string;
}

export function ReviewCreatePopup() {
  const dispatch = useAppDispatch();
  const review = useAppSelector(getLastReview);
  const training = useAppSelector(getCurrentTraining);

  if (!training) {
    return null;
  }

  const initialValues: FormValues = {
    rating: review?.training === training.id ? review.rating.toString() : 0,
    text: review?.training === training.id ? review.text : '',
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    if (review?.training === training.id) {
      dispatch(
        updateReview({
          reviewId: review.id,
          reviewData: {
            rating: parseInt(values.rating.toString(), 10),
            text: values.text,
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Review updated successful', {
            position: 'top-right',
          });
          dispatch(setIsReviewCreatePopupOpen(false));
          dispatch(fetchReviewByTraining({ trainingId: training.id }));
        })
        .catch(() => {
          setFieldError(
            'submit',
            'It was not possible to update review with the entered data',
          );
        });
    } else {
      dispatch(
        createReview({
          training: training.id,
          rating: parseInt(values.rating.toString(), 10),
          text: values.text,
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Review created successful', {
            position: 'top-right',
          });
          dispatch(setIsReviewCreatePopupOpen(false));
          dispatch(fetchReviewByTraining({ trainingId: training.id }));
        })
        .catch(() => {
          setFieldError(
            'submit',
            'It was not possible to update questionnaire with the entered data',
          );
        });
    }

    setSubmitting(false);
  };

  function handleCloseClick() {
    dispatch(setIsReviewCreatePopupOpen(false));
  }

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={reviewCreateValidationSchema}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="popup-head">
                  <h2 className="popup-head__header">Оставить отзыв</h2>
                  <button
                    className="btn-icon btn-icon--outlined btn-icon--big"
                    type="button"
                    aria-label="close"
                    onClick={handleCloseClick}
                  >
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-cross"></use>
                    </svg>
                  </button>
                </div>
                <div className="popup__content popup__content--feedback">
                  <h3 className="popup__feedback-title">Оцените тренировку</h3>
                  <ul className="popup__rate-list">
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <li className="popup__rate-item" key={rate}>
                        <div className="popup__rate-item-wrap">
                          <label>
                            <Field
                              type="radio"
                              name="rating"
                              aria-label={`оценка ${rate}.`}
                              value={rate.toString()}
                            />
                            <span className="popup__rate-number">{rate}</span>
                          </label>
                        </div>
                      </li>
                    ))}
                    <ErrorMessage
                      name="rating"
                      component="div"
                      className="invalid-feedback"
                    />
                  </ul>
                  <div className="popup__feedback">
                    <h3 className="popup__feedback-title popup__feedback-title--text">
                      Поделитесь своими впечатлениями о тренировке
                    </h3>
                    <div className="popup__feedback-textarea">
                      <div className="custom-textarea">
                        <label>
                          <Field
                            as="textarea"
                            name="text"
                            placeholder=" "
                          ></Field>
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="text"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="popup__button">
                    <button
                      className="btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Продолжить
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
}
