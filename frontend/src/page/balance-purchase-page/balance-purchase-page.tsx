import { useEffect } from 'react';
import { BackLink } from '../../component/back-link/back-link.tsx';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { BalancePurchaseFilter } from '../../component/balance-purchase-filter/balance-purchase-filter.tsx';
import { BalancePurchaseList } from '../../component/balance-purchase-list/balance-purchase-list.tsx';
import { Header } from '../../component/header/header.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchPurchase } from '../../store/api-action/data-action.ts';
import { getPurchaseFilter } from '../../store/ui-settings/ui-settings.selectors.ts';

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

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <BackLink />
              <BalancePurchaseFilter />
              <BalancePurchaseList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
