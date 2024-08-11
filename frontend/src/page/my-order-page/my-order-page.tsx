import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { MyOrderFilter } from '../../component/my-order-filter/my-order-filter.tsx';
import { MyOrderList } from '../../component/my-order-list/my-order-list.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchMyOrder } from '../../store/api-action/data-action.ts';
import { getMyOrderFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function MyOrderPage() {
  const dispatch = useAppDispatch();
  const myOrderFilter = useAppSelector(getMyOrderFilter);

  useEffect(() => {
    dispatch(
      fetchMyOrder({
        sortDirection: myOrderFilter.orderSortDirection,
        sortType: myOrderFilter.orderSortType,
        currentPage: myOrderFilter.currentPage,
      }),
    );
  }, [dispatch, myOrderFilter]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <Link
                to={AppRoute.PersonalAccount}
                className="btn-flat my-purchases__back"
                type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </Link>
              <MyOrderFilter />
              <MyOrderList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
