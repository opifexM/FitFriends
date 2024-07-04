import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hook';
import { loginAuth } from '../../store/api-action/user-auth-action.ts';
import { loginValidationSchema } from './login-validation-schema.ts';

interface FormValues {
  email: string;
  password: string;
}

export function Login() {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    dispatch(
      loginAuth({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((value) => {
        toast.success(`Login '${value.email}' is successful`, {
          position: 'top-right',
        });
      })
      .catch(() => {
        setFieldError(
          'email',
          'It was not possible to login with the entered data',
        );
      });
    setSubmitting(false);
  };

  return (
    <div className="popup-form__content">
      <div className="popup-form__title-wrapper">
        <h1 className="popup-form__title">Вход</h1>
      </div>
      <div className="popup-form__form">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="sign-in">
                <div className="custom-input sign-in__input">
                  <label>
                    <span className="custom-input__label">E-mail</span>
                    <span className="custom-input__wrapper">
                      <Field
                        type="email"
                        name="email"
                        className={classNames('form-control', {
                          'form-is-invalid': errors.email && touched.email,
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
                <div className="custom-input sign-in__input">
                  <label>
                    <span className="custom-input__label">Пароль</span>
                    <span className="custom-input__wrapper">
                      <Field
                        type="password"
                        name="password"
                        className={classNames('form-control', {
                          'form-is-invalid':
                            errors.password && touched.password,
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
                <button
                  className="btn sign-in__button"
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
