import { useAppDispatch, useAppSelector } from '../../hook';
import { getPurchases } from '../../store/api-communication/api-communication.selectors.ts';
import { getPurchaseFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { increasePurchaseFilterCurrentPage } from '../../store/ui-settings/ui-settings.slice.ts';
import { TrainingCard } from '../training-card/training-card.tsx';

export function BalancePurchaseList() {
  const dispatch = useAppDispatch();
  const purchases = useAppSelector(getPurchases);
  const purchaseFilter = useAppSelector(getPurchaseFilter);
  const isLastPage = purchaseFilter.currentPage >= purchaseFilter.totalPages;

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

  const purchaseTrainingCard = purchases.map((training) => (
    <TrainingCard key={training.id} training={training} />
  ));

  return (
    <>
      <ul className="training-catalog__list">
        {purchases.length ? purchaseTrainingCard : emptyCard}
      </ul>
      <div className="show-more my-purchases__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={() => dispatch(increasePurchaseFilterCurrentPage())}
          style={{ display: isLastPage ? 'none' : 'inline-flex' }}
          disabled={isLastPage}
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
          style={{
            display: isLastPage && purchases.length ? 'inline-flex' : 'none',
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Вернуться в начало
        </button>
      </div>
    </>
  );
}
