import { Link } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { AppRoute } from '../../const.ts';

export function NotFoundPage() {
  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width="750"
            height="284"
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg
            className="background-logo__icon"
            width="343"
            height="343"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">404</h1>
              </div>
              <div className="popup-form__form">
                <span className="error__subtitle">Страница не найдена.</span>
                <p className="error__text">
                  {' '}
                  Возможно, страница была удалена или
                  <br />
                  её вовсе не существовало.
                </p>
                <Link
                  className="btn intro__button"
                  type="button"
                  to={AppRoute.Main}
                >
                  Перейти на главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
