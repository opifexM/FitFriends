import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { CERTIFICATE_LIST } from 'shared/type/training/traning.constant.ts';
import { UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getPublicUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getIsCertificateViewOpen } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setIsCertificateViewOpen } from '../../store/ui-settings/ui-settings.slice.ts';

const ITEMS_PER_PAGE = 1;
const INITIAL_PAGE = CERTIFICATE_LIST.DEFAULT_FILTER_PAGE;
const DISPLAY_ITEMS = 1;
const CERTIFICATE_WIDTH = 294;

export function CertificateViewPopup() {
  const dispatch = useAppDispatch();
  const publicUserDetail = useAppSelector(getPublicUserDetail);
  const isCertificateViewOpen = useAppSelector(getIsCertificateViewOpen);

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);

  if (!publicUserDetail || !isCertificateViewOpen) {
    return null;
  }

  const userCertificateIds = publicUserDetail.certificateIds ?? [];
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

  const handleCloseClick = () => {
    dispatch(setIsCertificateViewOpen(false));
  };

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">СЕРТИФИКАТЫ</h2>
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
          <div className="popup__content popup__content--feedback">
            <div className="personal-account-coach__label-wrapper">
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
                <li
                  key={currentCertificateId}
                  className="personal-account-coach__item"
                >
                  <div className="certificate-card certificate-card--edit">
                    <div className="certificate-card__image">
                      <Document
                        key={`${currentCertificateId}`}
                        file={`/${UPLOAD_DIRECTORY}${currentCertificateId}`}
                      >
                        <Page
                          pageNumber={INITIAL_PAGE}
                          width={CERTIFICATE_WIDTH}
                        />
                      </Document>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
