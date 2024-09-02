import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

export function PersonalAccountVisitorList() {
  return (
    <div className="personal-account-user__additional-info">
      <Link
        to={AppRoute.MyFriend}
        className="thumbnail-link thumbnail-link--theme-light"
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-friends"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои друзья</span>
      </Link>
      <Link
        to={AppRoute.BalancePurchase}
        className="thumbnail-link thumbnail-link--theme-light"
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-shopping-cart"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои покупки</span>
      </Link>
    </div>
  );
}
