import { useEffect } from 'react';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { useAppDispatch } from '../../hook';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function MainPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMenuStatus(MenuType.MAIN));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <main>
        <div className="intro__background">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x"
            />
            <img
              src="img/content/sitemap//background.jpg"
              srcSet="img/content/sitemap//background@2x.jpg 2x"
              width="1440"
              height="1024"
              alt="Фон с бегущей девушкой"
            />
          </picture>
        </div>
        <div className="intro__wrapper"></div>
      </main>
    </div>
  );
}
