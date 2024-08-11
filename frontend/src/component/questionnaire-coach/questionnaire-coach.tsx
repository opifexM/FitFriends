import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { QUESTIONNAIRE } from 'shared/type/questionnaire/questionnaire.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  createCoachQuestionnaire,
  updateCoachQuestionnaire,
} from '../../store/api-action/data-action.ts';
import { getLastQuestionnaire } from '../../store/api-communication/api-communication.selectors.ts';
import { setIsQuestionnaireOpen } from '../../store/ui-settings/ui-settings.slice.ts';
import { ArrayButton } from '../array-button/array-button.tsx';
import { questionnaireCoachValidationSchema } from './questionnaire-coach-validation-schema.ts';

interface FormValues {
  skillLevel: SkillLevelType | undefined;
  workout: WorkoutType[];
  isReadyForCoaching: boolean;
  experience: string;
  files: File[];
}

export function QuestionnaireCoach() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const questionnaire = useAppSelector(getLastQuestionnaire);

  const initialValues: FormValues = {
    skillLevel: questionnaire?.skillLevel,
    workout: questionnaire?.workout ?? [],
    experience: questionnaire?.experience ?? '',
    isReadyForCoaching: questionnaire?.isReadyForCoaching ?? false,
    files: [],
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    if (questionnaire?.id) {
      dispatch(
        updateCoachQuestionnaire({
          questionnaireId: questionnaire.id,
          questionnaireData: {
            skillLevel: values.skillLevel as SkillLevelType,
            workout: values.workout,
            experience: values.experience,
            isReadyForCoaching: values.isReadyForCoaching,
            certificateFiles: values.files,
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Coach questionnaire updated successful', {
            position: 'top-right',
          });
          dispatch(setIsQuestionnaireOpen(false));
          navigate(AppRoute.Main);
        })
        .catch(() => {
          setFieldError(
            'submit',
            'It was not possible to update coach questionnaire with the entered data',
          );
        });
    } else {
      dispatch(
        createCoachQuestionnaire({
          skillLevel: values.skillLevel as SkillLevelType,
          workout: values.workout,
          experience: values.experience,
          isReadyForCoaching: values.isReadyForCoaching,
          certificateFiles: values.files,
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Coach questionnaire created successful', {
            position: 'top-right',
          });
          dispatch(setIsQuestionnaireOpen(false));
          navigate(AppRoute.Main);
        })
        .catch(() => {
          setFieldError(
            'submit',
            'It was not possible to created coach questionnaire with the entered data',
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
          validationSchema={questionnaireCoachValidationSchema}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <ArrayButton
                      name={'workout'}
                      options={WorkoutType}
                      values={values.workout}
                    />
                    <ErrorMessage
                      name="workout"
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
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Ваши дипломы и сертификаты
                    </span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label">
                          {values.files && values.files.length > 0
                            ? values.files.map((file) => file.name).join(', ')
                            : 'Загрузите сюда файлы формата PDF'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="files"
                          accept={QUESTIONNAIRE.CERTIFICATE.FORMATS.join(',')}
                          multiple
                          onChange={(event) => {
                            setFieldValue(
                              'files',
                              event.currentTarget.files
                                ? Array.from(event.currentTarget.files)
                                : [],
                            );
                          }}
                        />
                      </label>
                    </div>
                    <ErrorMessage
                      name="files"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Расскажите о своём опыте, который мы сможем проверить
                    </span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <Field
                          as="textarea"
                          name="experience"
                          placeholder=" "
                        ></Field>
                      </label>
                    </div>
                    <ErrorMessage
                      name="experience"
                      component="div"
                      className="invalid-feedback"
                    />
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <Field type="checkbox" name="isReadyForCoaching" />
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">
                          Хочу дополнительно индивидуально тренировать
                        </span>
                      </label>
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
