import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GenderType } from 'shared/type/enum/gender-type.enum.ts';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum.ts';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { TRAINING } from 'shared/type/training/traning.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { createTraining } from '../../store/api-action/data-action.ts';
import { Dropdown } from '../dropdown/dropdown.tsx';
import { trainingCreateValidationSchema } from './training-create-validation-schema.ts';

interface FormValues {
  name: string;
  skillLevel: SkillLevelType | undefined;
  workout: WorkoutType | undefined;
  workoutDuration: WorkoutDurationType | undefined;
  price: number;
  caloriesBurned: number;
  description: string;
  gender: GenderType | undefined;
  file: File | null;
}

export function TrainingCreate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: '',
    skillLevel: undefined,
    workout: undefined,
    workoutDuration: undefined,
    price: 0,
    caloriesBurned: TRAINING.CALORIES.MIN,
    description: '',
    gender: undefined,
    file: null,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    dispatch(
      createTraining({
        name: values.name,
        skillLevel: values.skillLevel as SkillLevelType,
        workout: values.workout as WorkoutType,
        workoutDuration: values.workoutDuration as WorkoutDurationType,
        price: values.price,
        caloriesBurned: values.caloriesBurned,
        description: values.description,
        gender: values.gender as GenderType,
        videoFile: values.file,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success('Training created successful', {
          position: 'top-right',
        });
        navigate(AppRoute.PersonalAccount);
      })
      .catch(() => {
        setFieldError(
          'submit',
          'It was not possible to create training with the entered data',
        );
      });

    setSubmitting(false);
  };

  return (
    <div className="popup-form__content">
      <div className="popup-form__title-wrapper">
        <h1 className="popup-form__title">Создание тренировки</h1>
      </div>
      <div className="popup-form__form">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={trainingCreateValidationSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Название тренировки
                    </h2>
                    <div className="custom-input create-training__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <Field type="text" name="name" />
                        </span>
                      </label>
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Характеристики тренировки
                    </h2>
                    <div className="create-training__info">
                      <Dropdown
                        name={'workout'}
                        options={WorkoutType}
                        label={'Выберите тип тренировки'}
                      />
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">
                            Сколько калорий потратим
                          </span>
                          <span className="custom-input__wrapper">
                            <Field type="number" name="caloriesBurned" />
                            <span className="custom-input__text">ккал</span>
                          </span>
                          <ErrorMessage
                            name="caloriesBurned"
                            component="div"
                            className="invalid-feedback"
                          />
                        </label>
                      </div>
                      <Dropdown
                        name={'workoutDuration'}
                        options={WorkoutDurationType}
                        label={'Сколько времени потратим'}
                      />
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">
                            Стоимость тренировки
                          </span>
                          <span className="custom-input__wrapper">
                            <Field type="number" name="price" />
                            <span className="custom-input__text">₽</span>
                          </span>
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="invalid-feedback"
                          />
                        </label>
                      </div>
                      <Dropdown
                        name={'skillLevel'}
                        options={SkillLevelType}
                        label={'Выберите уровень тренировки'}
                      />
                      <div className="create-training__radio-wrapper">
                        <span className="create-training__label">
                          Кому подойдет тренировка
                        </span>
                        <br />
                        <div className="custom-toggle-radio create-training__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <Field
                                type="radio"
                                name="gender"
                                value={GenderType.MALE}
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Мужчинам
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <Field
                                type="radio"
                                name="gender"
                                value={GenderType.FEMALE}
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Женщинам
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <Field
                                type="radio"
                                name="gender"
                                value={GenderType.ANY}
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Всем
                              </span>
                            </label>
                          </div>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Описание тренировки
                    </h2>
                    <div className="custom-textarea create-training__textarea">
                      <label>
                        <Field
                          as="textarea"
                          name="description"
                          placeholder=" "
                        ></Field>
                      </label>
                    </div>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Загрузите видео-тренировку
                    </h2>
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
                  </div>
                </div>
                <button
                  className="btn create-training__button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Опубликовать
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
