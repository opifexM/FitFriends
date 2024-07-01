import classNames from 'classnames';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import { toast } from 'react-toastify';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum.ts';
import { WorkoutDurationType } from 'shared/type/enum/workout-duration-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  createQuestionnaire,
  updateQuestionnaire,
} from '../../store/api-action/data-action.ts';
import { getLastQuestionnaire } from '../../store/api-communication/api-communication.selectors.ts';
import { questionnaireVisitorValidationSchema } from './questionnaire-visitor-validation-schema.ts';

interface FormValues {
  skillLevel: SkillLevelType | undefined;
  workout: WorkoutType[];
  workoutDuration: WorkoutDurationType | undefined;
  caloriesToLose: number;
  dailyCalorieBurn: number;
}

export function QuestionnaireVisitor() {
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(getLastQuestionnaire);

  const initialValues: FormValues = {
    skillLevel: questionnaire?.skillLevel,
    workout: questionnaire?.workout ?? [],
    workoutDuration: questionnaire?.workoutDuration,
    caloriesToLose:
      questionnaire?.caloriesToLose ?? QUESTIONNAIRE.CALORIES_TO_LOSE.MIN,
    dailyCalorieBurn:
      questionnaire?.dailyCalorieBurn ?? QUESTIONNAIRE.DAILY_CALORIE_BURN.MIN,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    if (questionnaire?.id) {
      dispatch(
        updateQuestionnaire({
          questionnaireId: questionnaire.id,
          questionnaireData: {
            workout: values.workout,
            workoutDuration: values.workoutDuration as WorkoutDurationType,
            skillLevel: values.skillLevel as SkillLevelType,
            caloriesToLose: values.caloriesToLose,
            dailyCalorieBurn: values.dailyCalorieBurn,
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Questionnaire updated successful', {
            position: 'top-right',
          });
        })
        .catch(() => {
          setFieldError(
            'submit',
            'It was not possible to update questionnaire with the entered data',
          );
        });
    } else {
      dispatch(
        createQuestionnaire({
          skillLevel: values.skillLevel as SkillLevelType,
          workout: values.workout,
          workoutDuration: values.workoutDuration as WorkoutDurationType,
          caloriesToLose: values.caloriesToLose,
          dailyCalorieBurn: values.dailyCalorieBurn,
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Questionnaire created successful', {
            position: 'top-right',
          });
        })
        .catch(() => {
          setFieldError(
            'submit',
            'It was not possible to created questionnaire with the entered data',
          );
        });
    }

    setSubmitting(false);
  };

  return (
    <div className="popup-form__content">
      <div className="popup-form__form">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={questionnaireVisitorValidationSchema}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <FieldArray
                      name="workout"
                      render={(arrayHelpers) => (
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          {Object.values(WorkoutType).map((type) => (
                            <div className="btn-checkbox" key={type}>
                              <label>
                                <input
                                  className="visually-hidden"
                                  type="checkbox"
                                  name="workout"
                                  value={type}
                                  checked={values.workout.includes(type)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      arrayHelpers.push(type);
                                    } else {
                                      const idx = values.workout.indexOf(type);
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                />
                                <span className="btn-checkbox__btn">
                                  {type}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <ErrorMessage
                      name="workout"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Сколько времени вы готовы уделять на тренировку в день
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="workoutDuration"
                            value={WorkoutDurationType.MINUTES_10_30}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            10-30 мин
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="workoutDuration"
                            value={WorkoutDurationType.MINUTES_30_50}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            30-50 мин
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="workoutDuration"
                            value={WorkoutDurationType.MINUTES_50_80}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            50-80 мин
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="workoutDuration"
                            value={WorkoutDurationType.MINUTES_80_100}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            80-100 мин
                          </span>
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="workoutDuration"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваш уровень
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="skillLevel"
                            value={SkillLevelType.BEGINNER}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Новичок
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="skillLevel"
                            value={SkillLevelType.AMATEUR}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Любитель
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="skillLevel"
                            value={SkillLevelType.PROFESSIONAL}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Профессионал
                          </span>
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="skillLevel"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose">
                      <span className="questionnaire-user__legend">
                        Сколько калорий хотите сбросить
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <Field
                              type="number"
                              name="caloriesToLose"
                              className={classNames('form-control', {
                                'is-invalid':
                                  errors.caloriesToLose &&
                                  touched.caloriesToLose,
                              })}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                          <ErrorMessage
                            name="caloriesToLose"
                            component="div"
                            className="invalid-feedback"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-user__calories-waste">
                      <span className="questionnaire-user__legend">
                        Сколько калорий тратить в день
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <Field
                              type="number"
                              name="dailyCalorieBurn"
                              className={classNames('form-control', {
                                'is-invalid':
                                  errors.dailyCalorieBurn &&
                                  touched.dailyCalorieBurn,
                              })}
                            />
                            <span className="custom-input__text">ккал</span>
                            <ErrorMessage
                              name="dailyCalorieBurn"
                              component="div"
                              className="invalid-feedback"
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Продолжить
                </button>
                <ErrorMessage
                  name="submit"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
