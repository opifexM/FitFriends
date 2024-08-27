import { Form, Formik, FormikHelpers } from 'formik';
import { Document, Page } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import {
  deleteCoachFileQuestionnaire,
  updateCoachFileQuestionnaire,
} from '../../store/api-action/data-action.ts';

interface FormValues {
  isEditMode: boolean;
  isWillDelete: boolean;
  file: File | null;
}

interface CertificateCardProps {
  questionnaireId?: string;
  fileId?: string;
  pageNumber?: number;
  width?: number;
}

export function CertificateCard({
  questionnaireId,
  fileId,
  pageNumber,
  width,
}: Readonly<CertificateCardProps>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!questionnaireId || !fileId) {
    return null;
  }

  const initialValues: FormValues = {
    isEditMode: false,
    isWillDelete: false,
    file: null,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldValue }: FormikHelpers<FormValues>,
  ) => {
    if (values.isWillDelete) {
      dispatch(
        deleteCoachFileQuestionnaire({
          questionnaireId: questionnaireId,
          fileId: fileId,
        }),
      ).then(() => {
        toast.success('Certificate file deleted successful', {
          position: 'top-right',
        });
        navigate(AppRoute.PersonalAccount);
      });
    } else if (values.file) {
      dispatch(
        updateCoachFileQuestionnaire({
          questionnaireId: questionnaireId,
          fileId: fileId,
          questionnaireData: {
            certificateFile: values.file,
          },
        }),
      ).then(() => {
        toast.success('Certificate file updated successful', {
          position: 'top-right',
        });
        navigate(AppRoute.PersonalAccount);
      });

      URL.revokeObjectURL(values.file.name);
    }
    await setFieldValue('isEditMode', false);
    setSubmitting(false);
  };

  return (
    <li className="personal-account-coach__item">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="certificate-card certificate-card--edit">
              <div className="certificate-card__image">
                {values.file || values.isWillDelete ? (
                  <p>
                    {values.isWillDelete
                      ? `File '${fileId}' will be delete...`
                      : `New file '${values.file?.name}' will be upload...`}
                  </p>
                ) : (
                  <Document
                    key={`${fileId}`}
                    file={`/${UPLOAD_DIRECTORY}${fileId}`}
                  >
                    <Page pageNumber={pageNumber} width={width} />
                  </Document>
                )}
              </div>
              <div className="certificate-card__buttons">
                {values.isEditMode ? (
                  <>
                    <button
                      className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-edit"></use>
                      </svg>
                      <span>Сохранить</span>
                    </button>
                    <div className="certificate-card__controls">
                      <button
                        className="btn-icon certificate-card__control"
                        type="button"
                        aria-label="change"
                        disabled={isSubmitting}
                        onClick={() => {
                          document.getElementById('fileInput')?.click();
                        }}
                      >
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-change"></use>
                        </svg>
                        <input
                          id="fileInput"
                          className="visually-hidden"
                          type="file"
                          name="file"
                          accept=".pdf"
                          disabled={!values.isEditMode}
                          onChange={(event) => {
                            setFieldValue(
                              'file',
                              event.currentTarget.files?.[0] ?? null,
                            );
                          }}
                        />
                      </button>
                      <button
                        className="btn-icon certificate-card__control"
                        type="button"
                        aria-label="delete"
                        disabled={isSubmitting}
                        onClick={(e) => {
                          e.preventDefault();
                          setFieldValue('isWillDelete', true);
                        }}
                      >
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-trash"></use>
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldValue('isEditMode', true);
                    }}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>Изменить</span>
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </li>
  );
}
