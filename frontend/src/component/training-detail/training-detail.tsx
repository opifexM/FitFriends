import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BalanceDto } from 'shared/type/balance/dto/balance.dto.ts';
import { GenderType } from 'shared/type/enum/gender-type.enum.ts';
import { PurchaseStatusType } from 'shared/type/enum/purchase-status-type.enum.ts';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import {
  activateBalancePurchase,
  deactivateBalancePurchase,
  fetchBalances,
  updateTraining,
} from '../../store/api-action/data-action.ts';
import { setIsPurchasePopupOpen } from '../../store/ui-settings/ui-settings.slice.ts';
import { trainingUpdateValidationSchema } from './training-update-validation-schema.ts';

interface FormValues {
  name: string;
  description: string;
  workout: WorkoutType;
  gender: GenderType;
  workoutDuration: WorkoutDurationType;
  caloriesBurned: number;
  isSpecialOffer: boolean;
  discountPercent: number;
  price: number;
  isEditMode: boolean;
  file: File | null;
  isVideoFileAvailable: boolean;
}

interface TrainingInfoProps {
  training: TrainingDto;
  currentBalance: BalanceDto | undefined;
  userDetail: UserDto;
}

const DISCOUNT_PERCENTAGE = 10;

export function TrainingDetail({
  training,
  currentBalance,
  userDetail,
}: Readonly<TrainingInfoProps>) {
  const dispatch = useAppDispatch();
  const {
    name,
    rating,
    description,
    workout,
    workoutDuration,
    price,
    caloriesBurned,
    gender,
    coach,
    isSpecialOffer,
    discountPercent,
  } = training;
  const [playing, setPlaying] = useState(false);

  const finalPrice = isSpecialOffer
    ? Math.trunc(price - (price * discountPercent) / 100)
    : price;

  const initialValues: FormValues = {
    name: name,
    description: description,
    workout: workout,
    gender: gender,
    caloriesBurned: caloriesBurned,
    workoutDuration: workoutDuration,
    isSpecialOffer: isSpecialOffer,
    price: userDetail.role === RoleType.COACH ? price : finalPrice,
    discountPercent: discountPercent,
    isEditMode: false,
    file: null,
    isVideoFileAvailable: true,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError, setFieldValue }: FormikHelpers<FormValues>,
  ) => {
    dispatch(
      updateTraining({
        trainingId: training.id,
        trainingData: {
          name: values.name,
          description: values.description,
          isSpecialOffer: values.isSpecialOffer,
          price: values.price,
          discountPercent: values.discountPercent,
          videoFile: values.file,
        },
      }),
    )
      .then(() => {
        toast.success('Training details updated successful', {
          position: 'top-right',
        });
        setFieldValue('isEditMode', false);
        setFieldValue('isVideoFileAvailable', true);
      })
      .catch(() => {
        setFieldError(
          'submit',
          'It was not possible to update Training details with the entered data',
        );
      });

    if (values.file) {
      URL.revokeObjectURL(values.file.name);
    }
    setSubmitting(false);
  };

  function handlePurchaseCreate() {
    dispatch(setIsPurchasePopupOpen(true));
  }

  function handleDeactivate() {
    if (!currentBalance) {
      return;
    }

    dispatch(deactivateBalancePurchase(currentBalance.id))
      .unwrap()
      .then(() => {
        toast.success('Training finished successful', {
          position: 'top-right',
        });
        dispatch(fetchBalances());
        setPlaying(false);
      });
  }

  function handleActivate() {
    if (!currentBalance) {
      return;
    }

    dispatch(activateBalancePurchase(currentBalance.id))
      .unwrap()
      .then(() => {
        toast.success('Training started successful', {
          position: 'top-right',
        });
        dispatch(fetchBalances());
        setPlaying(true);
      });
  }

  function handleSpecialOfferToggle(
    setFieldValue: Function,
    values: FormValues,
  ) {
    if (values.isSpecialOffer) {
      setFieldValue('isSpecialOffer', false);
      setFieldValue('discountPercent', 0);
    } else {
      setFieldValue('isSpecialOffer', true);
      setFieldValue('discountPercent', DISCOUNT_PERCENTAGE);
    }
  }

  const isDisable =
    !currentBalance ||
    currentBalance.purchaseStatus === PurchaseStatusType.FINISHED;

  const visitorControls =
    currentBalance?.purchaseStatus === PurchaseStatusType.IN_PROGRESS ? (
      <button
        className="btn training-video__button training-video__button--start"
        type="button"
        onClick={handleDeactivate}
      >
        Закончить
      </button>
    ) : (
      <button
        className="btn training-video__button training-video__button--start"
        type="button"
        disabled={isDisable}
        onClick={handleActivate}
      >
        Приступить
      </button>
    );

  function displayTrainingVideo() {
    return (
      <>
        {currentBalance &&
        currentBalance.purchaseStatus === PurchaseStatusType.IN_PROGRESS ? (
          <ReactPlayer
            url={`${UPLOAD_DIRECTORY}${training.videoId}`}
            playing={playing}
            controls
            width="100%"
            height="100%"
          />
        ) : (
          <>
            <picture>
              <source
                type="image/webp"
                srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
              />
              <img
                src={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
                srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId} 2x`}
                width="922"
                height="566"
                alt="Обложка видео"
              />
            </picture>
            <button className="training-video__play-button btn-reset">
              <svg width="18" height="30" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={trainingUpdateValidationSchema}
      enableReinitialize
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <div className="training-info">
            <h2 className="visually-hidden">Информация о тренировке</h2>
            <div className="training-info__header">
              <Link
                to={`${AppRoute.PublicAccount}/${coach.id}`}
                className="training-info__coach"
              >
                <div className="training-info__photo">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${UPLOAD_DIRECTORY}${coach.avatarId}`}
                    />
                    <img
                      src={`${UPLOAD_DIRECTORY}${coach.avatarId}`}
                      srcSet={`${UPLOAD_DIRECTORY}${coach.avatarId} 2x`}
                      width="64"
                      height="64"
                      alt="Изображение тренера"
                    />
                  </picture>
                </div>
                <div className="training-info__coach-info">
                  <span className="training-info__label">Тренер</span>
                  <span className="training-info__name">{coach.name}</span>
                </div>
              </Link>
              {userDetail.role === RoleType.COACH && (
                <>
                  {values.isEditMode ? (
                    <>
                      <button
                        className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--edit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-edit"></use>
                        </svg>
                        <span>Сохранить</span>
                      </button>
                      <ErrorMessage
                        name="submit"
                        component="div"
                        className="invalid-feedback"
                      />
                    </>
                  ) : (
                    <button
                      className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFieldValue('isEditMode', true);
                      }}
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-edit"></use>
                      </svg>
                      <span>Редактировать</span>
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="training-info__main-content">
              <div className="training-info__form-wrapper">
                <div className="training-info__info-wrapper">
                  <div className="training-info__input training-info__input--training">
                    <label>
                      <span className="training-info__label">
                        Название тренировки
                      </span>
                      <Field name="name" disabled={!values.isEditMode} />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                  <div className="training-info__textarea">
                    <label>
                      <span className="training-info__label">
                        Описание тренировки
                      </span>
                      <Field
                        as="textarea"
                        name="description"
                        disabled={!values.isEditMode}
                      ></Field>
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="invalid-feedback"
                      />
                    </label>
                  </div>
                </div>
                <div className="training-info__rating-wrapper">
                  <div className="training-info__input training-info__input--rating">
                    <label>
                      <span className="training-info__label">Рейтинг</span>
                      <span className="training-info__rating-icon">
                        <svg width="18" height="18" aria-hidden="true">
                          <use
                            xlinkHref="#icon-star"
                            style={{ fill: '#c5ec2a' }}
                          ></use>
                        </svg>
                      </span>
                      <input
                        type="number"
                        name="rating"
                        value={rating}
                        disabled
                      />
                    </label>
                  </div>
                  <ul className="training-info__list">
                    <li className="training-info__item">
                      <div className="hashtag hashtag--white">
                        <span>{`#${workout}`}</span>
                      </div>
                    </li>
                    <li className="training-info__item">
                      <div className="hashtag hashtag--white">
                        <span>{`#${gender}`}</span>
                      </div>
                    </li>
                    <li className="training-info__item">
                      <div className="hashtag hashtag--white">
                        <span>{`#${caloriesBurned}ккал`}</span>
                      </div>
                    </li>
                    <li className="training-info__item">
                      <div className="hashtag hashtag--white">
                        <span>{`#${workoutDuration}`}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="training-info__price-wrapper">
                  <div className="training-info__input training-info__input--price">
                    <label>
                      <span className="training-info__label">Стоимость ₽</span>
                      <Field
                        type="text"
                        name="price"
                        disabled={!values.isEditMode}
                      />
                    </label>
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="invalid-feedback"
                    />
                    <div className="training-info__error">Введите число</div>
                  </div>
                  {userDetail.role === RoleType.COACH && (
                    <button
                      className="btn-flat btn-flat--light btn-flat--underlined training-info__edit--edit"
                      type="button"
                      disabled={!values.isEditMode}
                      onClick={() =>
                        handleSpecialOfferToggle(setFieldValue, values)
                      }
                    >
                      <svg width="14" height="14" aria-hidden="true">
                        <use xlinkHref="#icon-discount"></use>
                      </svg>
                      <span>
                        {values.isSpecialOffer
                          ? 'Отменить скидку'
                          : 'Сделать скидку 10%'}
                      </span>
                    </button>
                  )}

                  {userDetail.role === RoleType.VISITOR && (
                    <button
                      className="btn training-info__buy"
                      type="button"
                      onClick={handlePurchaseCreate}
                      disabled={
                        currentBalance &&
                        currentBalance.purchaseStatus !==
                          PurchaseStatusType.FINISHED
                      }
                    >
                      Купить
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="training-video">
            <h2 className="training-video__title">Видео</h2>
            <div className="training-video__video">
              <div className="training-video__thumbnail">
                {userDetail.role === RoleType.VISITOR && displayTrainingVideo()}
                {userDetail.role === RoleType.COACH &&
                  values.isVideoFileAvailable && (
                    <ReactPlayer
                      url={`${UPLOAD_DIRECTORY}${training.videoId}`}
                      playing={playing}
                      controls
                      width="100%"
                      height="100%"
                    />
                  )}
                {userDetail.role === RoleType.COACH &&
                  !values.isVideoFileAvailable && (
                    <div className="drag-and-drop create-training__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label">
                          {values.file
                            ? values.file.name
                            : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import-video"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="file"
                          accept=".mov, .avi, .mp4"
                          onChange={(event) => {
                            setFieldValue(
                              'file',
                              event.currentTarget.files?.[0] ?? null,
                            );
                          }}
                        />
                      </label>
                    </div>
                  )}
              </div>
            </div>
            <div className="training-video__buttons-wrapper">
              {userDetail.role === RoleType.VISITOR && visitorControls}
              {userDetail.role === RoleType.COACH && values.isEditMode && (
                <div className="">
                  <button
                    className="btn training-video__button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn btn--outlined"
                    type="button"
                    disabled={!values.isVideoFileAvailable}
                    onClick={() => setFieldValue('isVideoFileAvailable', false)}
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
