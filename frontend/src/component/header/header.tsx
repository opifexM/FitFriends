import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hook';
import { getUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getMenuStatus } from '../../store/ui-settings/ui-settings.selectors.ts';
import { MenuType } from '../../type/menu-type.enum.ts';

export function Header() {
  const menuStatus = useAppSelector(getMenuStatus);
  const userDetail = useAppSelector(getUserDetail);

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
            <li className="main-nav__item main-nav__item--notifications">
              <Link
                className={classNames('main-nav__link', {
                  'is-active': menuStatus === MenuType.NOTIFICATION,
                })}
                to={AppRoute.Main}
                aria-label="Уведомления"
              >
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="#">
                      <p className="notification__text">
                        Катерина пригласила вас на&nbsp;тренировку
                      </p>
                      <time
                        className="notification__time"
                        dateTime="2023-12-23 12:35"
                      >
                        23 декабря, 12:35
                      </time>
                    </a>
                  </li>
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="#">
                      <p className="notification__text">
                        Никита отклонил приглашение на&nbsp;совместную
                        тренировку
                      </p>
                      <time
                        className="notification__time"
                        dateTime="2023-12-22 09:22"
                      >
                        22 декабря, 09:22
                      </time>
                    </a>
                  </li>
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="#">
                      <p className="notification__text">
                        Татьяна добавила вас в&nbsp;друзья
                      </p>
                      <time
                        className="notification__time"
                        dateTime="2023-12-18 18:50"
                      >
                        18 декабря, 18:50
                      </time>
                    </a>
                  </li>
                </ul>
              </div>
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
            <ul className="search__list">
              <li className="search__item">
                <a className="search__link" href="#">
                  Бокс
                </a>
              </li>
              <li className="search__item">
                <a className="search__link is-active" href="#">
                  Бег
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Аэробика
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="#">
                  Text
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}
