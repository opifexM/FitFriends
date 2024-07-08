import { useAppDispatch, useAppSelector } from '../../hook';
import { getTrainings } from '../../store/api-communication/api-communication.selectors.ts';
import { getTrainingFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { increaseTrainingFilterCurrentPage } from '../../store/ui-settings/ui-settings.slice.ts';
import { TrainingCard } from '../training-card/training-card.tsx';

export function TrainingList() {
  const trainings = useAppSelector(getTrainings);
  const dispatch = useAppDispatch();
  const trainingFilter = useAppSelector(getTrainingFilter);
  const isLastPage = trainingFilter.currentPage >= trainingFilter.totalPages;

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

  const trainingCard = trainings.map((training) => (
    <TrainingCard key={training.id} training={training} />
  ));

  const increasePage = () => {
    dispatch(increaseTrainingFilterCurrentPage());
  };

  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {trainings.length ? trainingCard : emptyCard}
      </ul>
      <div className="show-more training-catalog__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={increasePage}
          style={{ display: isLastPage ? 'none' : 'inline-flex' }}
          disabled={isLastPage}
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
          style={{
            display: isLastPage && trainings.length ? 'inline-flex' : 'none',
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Вернуться в начало
        </button>
      </div>
    </div>
  );
}
