import { useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_MAIN } from 'shared/type/user/user.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hook';
import { getSpecialLookingUsers } from '../../store/api-communication/api-communication.selectors.ts';
import { PublicUserCard } from '../public-user-card/public-user-card.tsx';

const ITEMS_PER_PAGE = 1;
const INITIAL_PAGE = USER_MAIN.DEFAULT_FILTER_PAGE;
const DISPLAY_ITEMS = USER_MAIN.LOOK_FOR_COMPANY_SHOW_LIMIT;

export function MainSpecialLooking() {
  const publicUsers = useAppSelector(getSpecialLookingUsers);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);

  if (!publicUsers) {
    return null;
  }

  const totalPages = Math.ceil(publicUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + DISPLAY_ITEMS;
  const currentUsers = publicUsers.slice(startIndex, endIndex);

  const userCard = currentUsers.map((user) => (
    <PublicUserCard key={user.id} user={user} isOnlyDarkColor />
  ));

  const emptyCard = (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/nearest-gym-01.jpg"
              srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
              width="82"
              height="82"
              alt=""
            />
          </picture>
        </div>
        <h3 className="thumbnail-training__title">
          Скоро здесь появится что-то полезное
        </h3>
      </div>
    </div>
  );

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <Link
              to={AppRoute.ListUsers}
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </Link>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
                onClick={handlePrevious}
                disabled={currentPage === INITIAL_PAGE}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            {currentUsers.length ? userCard : emptyCard}
          </ul>
        </div>
      </div>
    </section>
  );
}
