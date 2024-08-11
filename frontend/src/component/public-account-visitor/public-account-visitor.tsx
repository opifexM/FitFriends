import { Link } from 'react-router-dom';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { AppRoute } from '../../const.ts';

interface PublicAccountCoachProps {
  publicUserDetail: PublicUserDto;
}

export function PublicAccountVisitor({
  publicUserDetail,
}: Readonly<PublicAccountCoachProps>) {
  const { name, location, isReadyForTraining, workout, description } =
    publicUserDetail;

  const hashtagList = workout?.map((hashtag) => (
    <li key={hashtag} className="user-card-coach__hashtag-item">
      <div className="hashtag">
        <span>{`#${hashtag}`}</span>
      </div>
    </li>
  ));

  return (
    <div className="inner-page__wrapper">
      <Link
        to={AppRoute.Main}
        className="btn-flat inner-page__back"
        type="button"
      >
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
        <span>Назад</span>
      </Link>
      <div className="inner-page__content">
        <section className="user-card">
          <h1 className="visually-hidden">Карточка пользователя</h1>
          <div className="user-card__wrapper">
            <div className="user-card__content">
              <div className="user-card__head">
                <h2 className="user-card__title">{name}</h2>
              </div>
              <div className="user-card__label">
                <a href="">
                  <svg
                    className="user-card-coach__icon-location"
                    width="12"
                    height="14"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <span>{location}</span>
                </a>
              </div>
              {isReadyForTraining && (
                <div className="user-card__status">
                  <span>Готов к тренировке</span>
                </div>
              )}
              <div className="user-card__text">{description}</div>
              <ul className="user-card__hashtag-list">{hashtagList}</ul>
              <button className="btn user-card__btn" type="button">
                Добавить в друзья
              </button>
            </div>
            <div className="user-card__gallary">
              <ul className="user-card__gallary-list">
                <li className="user-card__gallary-item">
                  <img
                    src="img/content/user-card-photo1.jpg"
                    srcSet="img/content/user-card-photo1@2x.jpg 2x"
                    width="334"
                    height="573"
                    alt="photo1"
                  />
                </li>
                <li className="user-card__gallary-item">
                  <img
                    src="img/content/user-card-photo2.jpg"
                    srcSet="img/content/user-card-photo2@2x.jpg 2x"
                    width="334"
                    height="573"
                    alt="photo2"
                  />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
