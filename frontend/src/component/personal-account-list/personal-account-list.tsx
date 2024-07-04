import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

export function PersonalAccountList() {
  return (
    <div className="personal-account-user__additional-info">
      <Link
        to={AppRoute.Main}
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
      <div className="thumbnail-spec-gym">
        <div className="thumbnail-spec-gym__image">
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
        <div className="thumbnail-spec-gym__header" align="center">
          <h3 className="thumbnail-spec-gym__title">
            Скоро тут появится что-то полезное
          </h3>
        </div>
      </div>
    </div>
  );
}
