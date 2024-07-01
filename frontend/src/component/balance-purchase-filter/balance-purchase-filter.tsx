import { useAppDispatch, useAppSelector } from '../../hook';
import { getPurchaseFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setPurchaseFilterIsActive } from '../../store/ui-settings/ui-settings.slice.ts';

export function BalancePurchaseFilter() {
  const dispatch = useAppDispatch();
  const purchaseFilter = useAppSelector(getPurchaseFilter);

  const handleToggleChange = () => {
    dispatch(setPurchaseFilterIsActive(!purchaseFilter.isActive));
  };

  return (
    <div className="my-purchases__title-wrapper">
      <h1 className="my-purchases__title">Мои покупки</h1>
      <div className="my-purchases__controls">
        <div
          className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
          data-validate-type="checkbox"
        >
          <label>
            <input
              type="checkbox"
              value="user-agreement-1"
              name="user-agreement"
              checked={purchaseFilter.isActive}
              onChange={handleToggleChange}
            />
            <span className="custom-toggle__icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span>
            <span className="custom-toggle__label">Только активные</span>
          </label>
        </div>
      </div>
    </div>
  );
}
