import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CERTIFICATE_LIST } from 'shared/type/training/traning.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { uploadCoachFileQuestionnaire } from '../../store/api-action/data-action.ts';
import { getLastQuestionnaire } from '../../store/api-communication/api-communication.selectors.ts';
import { CertificateCard } from '../certificate-card/certificate-card.tsx';

const ITEMS_PER_PAGE = 1;
const INITIAL_PAGE = CERTIFICATE_LIST.DEFAULT_FILTER_PAGE;
const DISPLAY_ITEMS = CERTIFICATE_LIST.LIMIT;
const CERTIFICATE_WIDTH = 260;

export function PersonalAccountCoachCertificateList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const questionnaire = useAppSelector(getLastQuestionnaire);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);

  if (!questionnaire) {
    return null;
  }

  const userCertificateIds = questionnaire.certificateIds ?? [];
  const totalPages = Math.ceil(userCertificateIds.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + DISPLAY_ITEMS;
  const currentCertificateIds = userCertificateIds.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleUpload = (file: File | null) => {
    console.log(1);
    if (file) {
      dispatch(
        uploadCoachFileQuestionnaire({
          questionnaireId: questionnaire.id,
          questionnaireData: {
            certificateFile: file,
          },
        }),
      ).then(() => {
        toast.success('Certificate file updated successful', {
          position: 'top-right',
        });
        navigate(AppRoute.PersonalAccount);
      });
    }
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button
          className="btn-flat btn-flat--underlined personal-account-coach__button"
          type="button"
          onClick={() => {
            document.getElementById('fileInput')?.click();
          }}
        >
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>
          <span>Загрузить</span>
          <input
            id="fileInput"
            className="visually-hidden"
            type="file"
            name="file"
            accept=".pdf"
            onChange={(event) => {
              handleUpload(event.currentTarget.files?.[0] ?? null);
            }}
          />
        </button>
        <div className="personal-account-coach__controls">
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
            onClick={handlePrevious}
            disabled={currentPage === INITIAL_PAGE}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="next"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="personal-account-coach__list">
        {currentCertificateIds.map((currentCertificateId) => (
          <CertificateCard
            key={currentCertificateId}
            questionnaireId={questionnaire.id}
            fileId={currentCertificateId}
            pageNumber={INITIAL_PAGE}
            width={CERTIFICATE_WIDTH}
          />
        ))}
      </ul>
    </div>
  );
}
