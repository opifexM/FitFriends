import { useAppDispatch, useAppSelector } from '../../hook';
import { getMyOrders } from '../../store/api-communication/api-communication.selectors.ts';
import { getMyOrderFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { increaseMyOrderFilterCurrentPage } from '../../store/ui-settings/ui-settings.slice.ts';
import { OrderCard } from '../order-card/order-card.tsx';

export function MyOrderList() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getMyOrders);
  const orderFilter = useAppSelector(getMyOrderFilter);
  const isLastPage = orderFilter.currentPage >= orderFilter.totalPages;

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

  const myOrderCard = orders.map((order) => (
    <OrderCard key={order.training.id} order={order} />
  ));

  return (
    <>
      <ul className="my-orders__list">
        {orders.length ? myOrderCard : emptyCard}
      </ul>
      <div className="show-more my-purchases__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={() => dispatch(increaseMyOrderFilterCurrentPage())}
          style={{ display: isLastPage ? 'none' : 'inline-flex' }}
          disabled={isLastPage}
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
          style={{
            display: isLastPage && orders.length ? 'inline-flex' : 'none',
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Вернуться в начало
        </button>
      </div>
    </>
  );
}
