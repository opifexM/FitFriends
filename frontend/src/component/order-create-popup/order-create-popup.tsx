import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { PaymentType } from 'shared/type/enum/payment-type.enum.ts';
import { PurchaseType } from 'shared/type/enum/purchase-type.enum.ts';
import { CREATE_ORDER } from 'shared/type/order/order.constant.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  createOrder,
  fetchBalances,
} from '../../store/api-action/data-action.ts';
import { getCurrentTraining } from '../../store/api-communication/api-communication.selectors.ts';
import { getIsPurchasePopupOpen } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setIsPurchasePopupOpen } from '../../store/ui-settings/ui-settings.slice.ts';
import { orderCreateValidationSchema } from './order-create-validation-schema.ts';

interface FormValues {
  payment: PaymentType | undefined;
  purchase: PurchaseType;
  count: number;
}

export function OrderCreatePopup() {
  const dispatch = useAppDispatch();
  const training = useAppSelector(getCurrentTraining);
  const isPurchasePopupOpen = useAppSelector(getIsPurchasePopupOpen);

  if (!training || !isPurchasePopupOpen) {
    return null;
  }

  function getPrice(currentTraining: TrainingDto): number {
    return currentTraining.isSpecialOffer
      ? Math.trunc(
          currentTraining.price -
            (currentTraining.price * currentTraining.discountPercent) / 100,
        )
      : currentTraining.price;
  }

  function getTotalPrice(
    currentTraining: TrainingDto,
    currentCount: number,
  ): number {
    return getPrice(currentTraining) * currentCount;
  }

  const initialValues: FormValues = {
    payment: undefined,
    count: CREATE_ORDER.DEFAULT_COUNT,
    purchase: CREATE_ORDER.DEFAULT_PURCHASE_TYPE,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    dispatch(
      createOrder({
        purchase: values.purchase,
        service: training.id,
        count: values.count,
        totalPrice: getTotalPrice(training, values.count),
        payment: values.payment as PaymentType,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success('Order created successful', {
          position: 'top-right',
        });
        dispatch(setIsPurchasePopupOpen(false));
        dispatch(fetchBalances());
      })
      .catch(() => {
        setFieldError(
          'submit',
          'It was not possible to create order with the entered data',
        );
      });

    setSubmitting(false);
  };

  const handleCloseClick = () => {
    dispatch(setIsPurchasePopupOpen(false));
  };

  return (
    <div className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={orderCreateValidationSchema}
            enableReinitialize
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="popup-head">
                  <h2 className="popup-head__header">Купить тренировку</h2>
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
                <div className="popup__content popup__content--purchases">
                  <div className="popup__product">
                    <div className="popup__product-image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
                        />
                        <img
                          src={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
                          srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId} 2x`}
                          width="98"
                          height="80"
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="popup__product-info">
                      <h3 className="popup__product-title">{training.name}</h3>
                      <p className="popup__product-price">{`${getPrice(training)} ₽`}</p>
                    </div>
                    <div className="popup__product-quantity">
                      <p className="popup__quantity">Количество</p>
                      <div className="input-quantity">
                        <button
                          className="btn-icon btn-icon--quantity"
                          type="button"
                          aria-label="minus"
                          onClick={() => {
                            setFieldValue('count', values.count - 1);
                          }}
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-minus"></use>
                          </svg>
                        </button>
                        <div className="input-quantity__input">
                          <label>
                            <Field
                              type="text"
                              size="2"
                              readOnly=""
                              name="count"
                            />
                          </label>
                        </div>
                        <button
                          className="btn-icon btn-icon--quantity"
                          type="button"
                          aria-label="plus"
                          onClick={() => {
                            setFieldValue('count', values.count + 1);
                          }}
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-plus"></use>
                          </svg>
                        </button>
                      </div>
                      <ErrorMessage
                        name="count"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <section className="payment-method">
                    <h4 className="payment-method__title">
                      Выберите способ оплаты
                    </h4>
                    <ul className="payment-method__list">
                      <li className="payment-method__item">
                        <div className="btn-radio-image">
                          <label>
                            <Field
                              type="radio"
                              name="payment"
                              aria-label="Visa."
                              value={PaymentType.VISA}
                            />
                            <span className="btn-radio-image__image">
                              <svg width="58" height="20" aria-hidden="true">
                                <use xlinkHref="#visa-logo"></use>
                              </svg>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li className="payment-method__item">
                        <div className="btn-radio-image">
                          <label>
                            <Field
                              type="radio"
                              name="payment"
                              aria-label="Мир."
                              value={PaymentType.MIR}
                            />
                            <span className="btn-radio-image__image">
                              <svg width="66" height="20" aria-hidden="true">
                                <use xlinkHref="#mir-logo"></use>
                              </svg>
                            </span>
                          </label>
                        </div>
                      </li>
                      <li className="payment-method__item">
                        <div className="btn-radio-image">
                          <label>
                            <Field
                              type="radio"
                              name="payment"
                              aria-label="Iomoney."
                              value={PaymentType.UMONEY}
                            />
                            <span className="btn-radio-image__image">
                              <svg width="106" height="24" aria-hidden="true">
                                <use xlinkHref="#iomoney-logo"></use>
                              </svg>
                            </span>
                          </label>
                        </div>
                      </li>
                    </ul>
                    <ErrorMessage
                      name="payment"
                      component="div"
                      className="invalid-feedback"
                    />
                  </section>
                  <div className="popup__total">
                    <p className="popup__total-text">Итого</p>
                    <svg
                      className="popup__total-dash"
                      width="310"
                      height="2"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#dash-line"></use>
                    </svg>
                    <p className="popup__total-price">{`${getTotalPrice(training, values.count)}₽`}</p>
                  </div>
                  <div className="popup__button">
                    <button
                      className="btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Купить
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
