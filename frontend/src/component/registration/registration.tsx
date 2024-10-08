import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GenderType } from 'shared/type/enum/gender-type.enum.ts';
import { LocationType } from 'shared/type/enum/location-type.enum.ts';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { USER } from 'shared/type/user/user.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { registerAuth } from '../../store/api-action/user-auth-action.ts';
import { Dropdown } from '../dropdown/dropdown.tsx';
import { registerValidationSchema } from './register-validation-schema.ts';

interface FormValues {
  name: string;
  email: string;
  birthday: string;
  password: string;
  sex: GenderType | undefined;
  role: RoleType | undefined;
  location: LocationType | undefined;
  userAgreement: boolean;
  file: File | null;
}

export function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: '',
    email: '',
    birthday: '',
    password: '',
    sex: undefined,
    role: undefined,
    location: undefined,
    userAgreement: false,
    file: null,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    dispatch(
      registerAuth({
        email: values.email,
        password: values.password,
        role: values.role as RoleType,
        location: values.location as LocationType,
        name: values.name,
        dateOfBirth: new Date(values.birthday),
        gender: values.sex as GenderType,
        avatarFile: values.file,
      }),
    )
      .unwrap()
      .then((value) => {
        toast.success(`Registration '${value.email}' is successful`, {
          position: 'top-right',
        });
        navigate(AppRoute.Login);
      })
      .catch(() => {
        setFieldError(
          'email',
          'It was not possible to register with the entered data',
        );
      });
    setSubmitting(false);
  };

  return (
    <div className="popup-form__content">
      <div className="popup-form__title-wrapper">
        <h1 className="popup-form__title">Регистрация</h1>
      </div>
      <div className="popup-form__form">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerValidationSchema}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="sign-up">
                <div className="sign-up__load-photo">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        name="file"
                        accept={USER.AVATAR.FORMATS.join(',')}
                        onChange={(event) => {
                          setFieldValue(
                            'file',
                            event.currentTarget.files?.[0] ?? null,
                          );
                        }}
                      />
                      {values.file ? (
                        <img
                          src={URL.createObjectURL(values.file)}
                          srcSet={URL.createObjectURL(values.file)}
                          width="98"
                          height="98"
                          alt="user avatar"
                        />
                      ) : (
                        <span className="input-load-avatar__btn">
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="sign-up__description">
                    <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                    <span className="sign-up__text">
                      JPG, PNG, оптимальный размер 100×100&nbsp;px
                    </span>
                  </div>
                </div>
                <div className="sign-up__data">
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <Field
                          type="text"
                          name="name"
                          className={classNames('form-control', {
                            'is-invalid': errors.name && touched.name,
                          })}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </span>
                    </label>
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <Field
                          type="email"
                          name="email"
                          className={classNames('form-control', {
                            'is-invalid': errors.email && touched.email,
                          })}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </span>
                    </label>
                  </div>
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Дата рождения</span>
                      <span className="custom-input__wrapper">
                        <Field
                          type="date"
                          name="birthday"
                          max="2099-12-31"
                          className={classNames('form-control', {
                            'is-invalid': errors.birthday && touched.birthday,
                          })}
                        />
                        <ErrorMessage
                          name="birthday"
                          component="div"
                          className="invalid-feedback"
                        />
                      </span>
                    </label>
                  </div>
                  <Dropdown
                    name={'location'}
                    options={LocationType}
                    label={'Ваша локация'}
                  />
                  <div className="custom-input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <Field
                          type="password"
                          name="password"
                          className={classNames('form-control', {
                            'is-invalid': errors.password && touched.password,
                          })}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </span>
                    </label>
                  </div>
                  <div className="sign-up__radio">
                    <span className="sign-up__label">Пол</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="sex"
                            value={GenderType.MALE}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Мужской
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="sex"
                            value={GenderType.FEMALE}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Женский
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <Field
                            type="radio"
                            name="sex"
                            value={GenderType.ANY}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Неважно
                          </span>
                        </label>
                      </div>
                      <ErrorMessage
                        name="sex"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </div>
                <div className="sign-up__role">
                  <h2 className="sign-up__legend">Выберите роль</h2>
                  <div className="role-selector sign-up__role-selector">
                    <div className="role-btn">
                      <label>
                        <Field
                          className="visually-hidden"
                          type="radio"
                          name="role"
                          value={RoleType.COACH}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-cup"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">
                          Я хочу тренировать
                        </span>
                      </label>
                    </div>
                    <div className="role-btn">
                      <label>
                        <Field
                          className="visually-hidden"
                          type="radio"
                          name="role"
                          value={RoleType.VISITOR}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-weight"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">
                          Я хочу тренироваться
                        </span>
                      </label>
                    </div>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="sign-up__checkbox">
                  <label>
                    <Field type="checkbox" name="userAgreement" />
                    <span className="sign-up__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="sign-up__checkbox-label">
                      Я соглашаюсь с <span>политикой конфиденциальности</span>{' '}
                      компании
                    </span>
                    <ErrorMessage
                      name="userAgreement"
                      component="div"
                      className="invalid-feedback"
                    />
                  </label>
                </div>
                <button
                  className="btn sign-up__button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Продолжить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
