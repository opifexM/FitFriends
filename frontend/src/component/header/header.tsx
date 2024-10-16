import classNames from 'classnames';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchMyNotification } from '../../store/api-action/data-action.ts';
import {
  getMyNotifications,
  getUserDetail,
} from '../../store/api-communication/api-communication.selectors.ts';
import { getMenuStatus } from '../../store/ui-settings/ui-settings.selectors.ts';
import { MenuType } from '../../type/menu-type.enum.ts';
import { NotificationList } from '../notification-list/notification-list.tsx';

export function Header() {
  const dispatch = useAppDispatch();
  const menuStatus = useAppSelector(getMenuStatus);
  const userDetail = useAppSelector(getUserDetail);
  const notifications = useAppSelector(getMyNotifications);

  useEffect(() => {
    if (userDetail) {
      dispatch(fetchMyNotification());
    }
  }, [userDetail, dispatch]);

  const isNewNotification = notifications.some(
    (notification) => !notification.isRead,
  );

  return (
    <header className="header">
      <div className="container">
        <Link
          to={AppRoute.Main}
          className="header__logo"
          aria-label="Переход на главную"
        >
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className={classNames('main-nav__link', {
                  'is-active': menuStatus === MenuType.MAIN,
                })}
                to={
                  userDetail && userDetail.role === RoleType.COACH
                    ? AppRoute.PersonalAccount
                    : AppRoute.Main
                }
                aria-label="На главную"
              >
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={classNames('main-nav__link', {
                  'is-active': menuStatus === MenuType.PERSONAL,
                })}
                to={AppRoute.PersonalAccount}
                aria-label="Личный кабинет"
              >
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={classNames('main-nav__link', {
                  'is-active': menuStatus === MenuType.FRIENDS,
                })}
                to={AppRoute.MyFriend}
                aria-label="Друзья"
              >
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li
              className={classNames(
                'main-nav__item main-nav__item--notifications',
                {
                  'is-notifications': isNewNotification,
                },
              )}
            >
              <div className="main-nav__link" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </div>
              <NotificationList notifications={notifications} />
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg
                className="search__icon"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
          </form>
        </div>
      </div>
    </header>
  );
}
