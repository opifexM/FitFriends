import { useEffect } from 'react';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { PublicUserFilter } from '../../component/public-user-filter/public-user-filter.tsx';
import { PublicUserList } from '../../component/public-user-list/public-user-list.tsx';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchPublicUser } from '../../store/api-action/data-action.ts';
import { getPublicUserFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function PublicUserListPage() {
  const dispatch = useAppDispatch();
  const publicUserFilter = useAppSelector(getPublicUserFilter);

  useEffect(() => {
    dispatch(fetchPublicUser(publicUserFilter));
  }, [dispatch, publicUserFilter]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.NONE));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Список пользователей</h1>
              <PublicUserFilter />
              <PublicUserList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
