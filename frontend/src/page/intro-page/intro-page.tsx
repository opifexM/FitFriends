import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function IntroPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <main>
        <div className="intro__background">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/sitemap/background.webp, img/content/sitemap/background@2x.webp 2x"
            />
            <img
              src="img/content/sitemap/background.jpg"
              srcSet="img/content/sitemap/background@2x.jpg 2x"
              width="1440"
              height="1024"
              alt="Фон с бегущей девушкой"
            />
          </picture>
        </div>
        <div className="intro__wrapper">
          <svg
            className="intro__icon"
            width="60"
            height="60"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
          <div className="intro__title-logo">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x"
              />
              <img
                src="img/content/sitemap//title-logo.png"
                srcSet="img/content/sitemap//title-logo@2x.png 2x"
                width="934"
                height="455"
                alt="Логотип Fit Friends"
              />
            </picture>
          </div>
          <div className="intro__buttons">
            <Link
              className="btn intro__button"
              type="button"
              to={AppRoute.Register}
            >
              Регистрация
            </Link>
            <p className="intro__text">
              Есть аккаунт?{' '}
              <Link className="intro__link" to={AppRoute.Login}>
                Вход
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
