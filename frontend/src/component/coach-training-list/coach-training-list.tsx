import { useState } from 'react';
import {
  TRAINING_LIST,
  TRAINING_MAIN,
} from 'shared/type/training/traning.constant.ts';
import { useAppSelector } from '../../hook';
import { getCoachTrainings } from '../../store/api-communication/api-communication.selectors.ts';
import { TrainingCard } from '../training-card/training-card.tsx';

const ITEMS_PER_PAGE = 1;
const INITIAL_PAGE = TRAINING_LIST.DEFAULT_FILTER_PAGE;
const DISPLAY_ITEMS = TRAINING_MAIN.POPULAR_LIMIT;

export function CoachTrainingList() {
  const coachTrainings = useAppSelector(getCoachTrainings);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);

  if (!coachTrainings) {
    return null;
  }

  const totalPages = Math.ceil(coachTrainings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + DISPLAY_ITEMS;
  const currentTrainings = coachTrainings.slice(startIndex, endIndex);

  const trainingCard = currentTrainings.map((training) => (
    <TrainingCard key={training.id} training={training} />
  ));

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

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Тренировки</h2>
            <div className="popular-trainings__controls">
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
          <ul className="popular-trainings__list">
            {coachTrainings.length ? trainingCard : emptyCard}
          </ul>
        </div>
      </div>
    </section>
  );
}
