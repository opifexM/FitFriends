import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TRAINING_LIST,
  TRAINING_MAIN,
} from 'shared/type/training/traning.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hook';
import { getTrainingsForYou } from '../../store/api-communication/api-communication.selectors.ts';

const ITEMS_PER_PAGE = 1;
const INITIAL_PAGE = TRAINING_LIST.DEFAULT_FILTER_PAGE;
const DISPLAY_ITEMS = TRAINING_MAIN.SPECIAL_FOU_YOU_LIMIT;

export function MainSpecialForYou() {
  const trainingForYou = useAppSelector(getTrainingsForYou);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);

  if (!trainingForYou) {
    return null;
  }

  const totalPages = Math.ceil(trainingForYou.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + DISPLAY_ITEMS;
  const currentTrainings = trainingForYou.slice(startIndex, endIndex);

  //todo pic
  const trainingForYouCard = currentTrainings.map((training) => (
    <li className="special-for-you__item" key={training.id}>
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/preview-02.jpg"
              srcSet="img/content/thumbnails/preview-02@2x.jpg 2x"
              width="452"
              height="191"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{training.workout}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              to={`${AppRoute.Training}/${training.id}`}
              className="btn btn--small thumbnail-preview__button"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  ));

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const emptyCard = (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/nearest-gym-01.jpg"
              srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <h3 className="thumbnail-training__title">
          Скоро здесь появится что-то полезное
        </h3>
      </div>
    </div>
  );

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon popular-trainings__control"
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
                className="btn-icon popular-trainings__control"
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
          <ul className="special-for-you__list">
            {trainingForYouCard.length ? trainingForYouCard : emptyCard}
          </ul>
        </div>
      </div>
    </section>
  );
}
