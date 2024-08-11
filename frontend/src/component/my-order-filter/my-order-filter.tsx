import { OrderSortType } from 'shared/type/order/order-sort-type.enum.ts';
import { ORDER_LIST } from 'shared/type/order/order.constant.ts';
import { SortDirection } from 'shared/type/sort-direction.interface.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getMyOrderFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import {
  setOrderSortDirectionFilter,
  setOrderSortTypeFilter,
} from '../../store/ui-settings/ui-settings.slice.ts';

export function MyOrderFilter() {
  const dispatch = useAppDispatch();
  const myOrderFilter = useAppSelector(getMyOrderFilter);

  const handleSortChange = (selectedSortType: OrderSortType) => {
    if (myOrderFilter.orderSortType === selectedSortType) {
      const newSortDirection =
        myOrderFilter.orderSortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC;
      dispatch(setOrderSortDirectionFilter(newSortDirection));
    } else {
      dispatch(setOrderSortTypeFilter(selectedSortType));
      dispatch(setOrderSortDirectionFilter(ORDER_LIST.DEFAULT_SORT_DIRECTION));
    }
  };

  return (
    <div className="my-orders__title-wrapper">
      <h1 className="my-orders__title">Мои заказы</h1>
      <div className="sort-for">
        <p>Сортировать по:</p>
        <div className="sort-for__btn-container">
          <button
            className="btn-filter-sort"
            type="button"
            onClick={() => handleSortChange(OrderSortType.BY_PRICE)}
          >
            <span>Сумме</span>
            <svg width="16" height="10" aria-hidden="true">
              <use
                xlinkHref={`#icon-sort-${myOrderFilter.orderSortDirection === SortDirection.ASC ? 'down' : 'up'}`}
              ></use>
            </svg>
          </button>
          <button
            className="btn-filter-sort"
            type="button"
            onClick={() => handleSortChange(OrderSortType.BY_COUNT)}
          >
            <span>Количеству</span>
            <svg width="16" height="10" aria-hidden="true">
              <use
                xlinkHref={`#icon-sort-${myOrderFilter.orderSortDirection === SortDirection.ASC ? 'down' : 'up'}`}
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
