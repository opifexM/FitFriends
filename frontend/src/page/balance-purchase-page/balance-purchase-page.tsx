import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { BalancePurchaseFilter } from '../../component/balance-purchase-filter/balance-purchase-filter.tsx';
import { BalancePurchaseList } from '../../component/balance-purchase-list/balance-purchase-list.tsx';
import { Header } from '../../component/header/header.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchPurchase } from '../../store/api-action/data-action.ts';
import { getPurchaseFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function BalancePurchasePage() {
  const dispatch = useAppDispatch();
  const purchaseFilter = useAppSelector(getPurchaseFilter);

  useEffect(() => {
    dispatch(
      fetchPurchase({
        active: purchaseFilter.isActive,
        currentPage: purchaseFilter.currentPage,
      }),
    );
  }, [dispatch, purchaseFilter]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
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
              <BalancePurchaseFilter />
              <BalancePurchaseList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
