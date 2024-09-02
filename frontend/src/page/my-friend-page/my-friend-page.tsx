import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackgroundSymbol } from '../../component/background-symbol/background-symbol.tsx';
import { Header } from '../../component/header/header.tsx';
import { MyFriendList } from '../../component/my-friend-list/my-friend-list.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  fetchMyFriend,
  fetchUserDetail,
} from '../../store/api-action/data-action.ts';
import { getMyFriendFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setMenuStatus } from '../../store/ui-settings/ui-settings.slice.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function MyFriendPage() {
  const dispatch = useAppDispatch();
  const myFriendFilter = useAppSelector(getMyFriendFilter);

  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchMyFriend({
        currentPage: myFriendFilter.currentPage,
      }),
    );
  }, [dispatch, myFriendFilter]);

  useEffect(() => {
    dispatch(setMenuStatus(MenuType.FRIENDS));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <BackgroundSymbol />
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
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
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <MyFriendList />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
