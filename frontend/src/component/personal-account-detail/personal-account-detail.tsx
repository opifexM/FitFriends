import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { GenderType } from 'shared/type/enum/gender-type.enum.ts';
import { LocationType } from 'shared/type/enum/location-type.enum.ts';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { updateQuestionnaire } from '../../store/api-action/data-action.ts';
import { updateUser } from '../../store/api-action/user-auth-action.ts';
import {
  getLastQuestionnaire,
  getUserDetail,
} from '../../store/api-communication/api-communication.selectors.ts';
import { ArrayButton } from '../array-button/array-button.tsx';
import { Dropdown } from '../dropdown/dropdown.tsx';
import { personalAccountDetailValidationSchema } from './personal-account-detail-validation-schema.ts';

interface FormValues {
  avatarId: string;
  name: string;
  description: string;
  isReadyForTraining: boolean;
  workout: WorkoutType[];
  location: LocationType;
  gender: GenderType;
  skillLevel: SkillLevelType;
  isEditMode: boolean;
}

export function PersonalAccountDetail() {
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector(getUserDetail);
  const questionnaire = useAppSelector(getLastQuestionnaire);

  if (!userDetail || !questionnaire) {
    return null;
  }

  const initialValues: FormValues = {
    avatarId: userDetail.avatarId,
    name: userDetail.name,
    description: userDetail.description,
    isReadyForTraining: questionnaire.isReadyForTraining,
    workout: questionnaire.workout,
    location: userDetail.location,
    gender: userDetail.gender,
    skillLevel: questionnaire.skillLevel,
    isEditMode: false,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError, setFieldValue }: FormikHelpers<FormValues>,
  ) => {
    Promise.all([
      dispatch(
        updateQuestionnaire({
          questionnaireId: questionnaire.id,
          questionnaireData: {
            isReadyForTraining: values.isReadyForTraining,
            workout: values.workout,
            skillLevel: values.skillLevel,
            workoutDuration: questionnaire.workoutDuration,
            caloriesToLose: questionnaire.caloriesToLose,
            dailyCalorieBurn: questionnaire.dailyCalorieBurn,
          },
        }),
      ),
      dispatch(
        updateUser({
          avatarId: values.avatarId,
          name: values.name,
          description: values.description,
          location: values.location,
          gender: values.gender,
        }),
      ),
    ])
      .then(() => {
        toast.success('User details updated successful', {
          position: 'top-right',
        });
        setFieldValue('isEditMode', false);
      })
      .catch(() => {
        setFieldError(
          'submit',
          'It was not possible to update user details with the entered data',
        );
      });

    setSubmitting(false);
  };

  //todo avatarId
  return (
    <section className="user-info">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={personalAccountDetailValidationSchema}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="user-info__header">
              <div className="input-load-avatar">
                <label>
                  <input
                    className="visually-hidden"
                    type="file"
                    name="user-photo-1"
                    accept="image/png, image/jpeg"
                  />
                  <span className="input-load-avatar__avatar">
                    <img
                      src="img/content/user-photo-1.png"
                      srcSet="img/content/user-photo-1@2x.png 2x"
                      width="98"
                      height="98"
                      alt="user photo"
                    />
                  </span>
                </label>
              </div>
            </div>
            <div className="user-info__form">
              {values.isEditMode ? (
                <>
                  <button
                    className="btn-flat btn-flat--underlined user-info__edit-button"
                    type="submit"
                    aria-label="Сохранить"
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
                  className="btn-flat btn-flat--underlined user-info__edit-button"
                  type="button"
                  aria-label="Редактировать"
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

              <div className="user-info__section">
                <h2 className="user-info__title">Обо мне</h2>
                <div className="custom-input custom-input--readonly user-info__input">
                  <label>
                    <span className="custom-input__label">Имя</span>
                    <span className="custom-input__wrapper">
                      <Field
                        type="text"
                        name="name"
                        disabled={!values.isEditMode}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </span>
                  </label>
                </div>
                <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                  <label>
                    <span className="custom-textarea__label">Описание</span>
                    <Field
                      as="textarea"
                      name="description"
                      disabled={!values.isEditMode}
                    >
                      {userDetail.description}
                    </Field>
                  </label>
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="user-info__section user-info__section--status">
                <h2 className="user-info__title user-info__title--status">
                  Статус
                </h2>
                <div className="custom-toggle custom-toggle--switch user-info__toggle">
                  <label>
                    <Field
                      type="checkbox"
                      name="isReadyForTraining"
                      disabled={!values.isEditMode}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      Готов к тренировке
                    </span>
                  </label>
                </div>
              </div>
              <div className="user-info__section">
                <h2 className="user-info__title user-info__title--specialization">
                  Специализация
                </h2>
                <div className="user-info__specialization">
                  <ArrayButton
                    name={'workout'}
                    values={values.workout}
                    options={WorkoutType}
                    disabled={!values.isEditMode}
                  />
                  <ErrorMessage
                    name="workout"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <Dropdown
                name={'location'}
                options={LocationType}
                label={'Локация'}
                disabled={!values.isEditMode}
              />
              <ErrorMessage
                name="location"
                component="div"
                className="invalid-feedback"
              />
              <Dropdown
                name={'gender'}
                options={GenderType}
                label={'Пол'}
                disabled={!values.isEditMode}
              />
              <ErrorMessage
                name="gender"
                component="div"
                className="invalid-feedback"
              />
              <Dropdown
                name={'skillLevel'}
                options={SkillLevelType}
                label={'Уровень'}
                disabled={!values.isEditMode}
              />
              <ErrorMessage
                name="skillLevel"
                component="div"
                className="invalid-feedback"
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
