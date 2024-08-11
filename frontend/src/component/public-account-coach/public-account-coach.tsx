import { Link } from 'react-router-dom';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { AppRoute } from '../../const.ts';
import { CoachTrainingList } from '../coach-training-list/coach-training-list.tsx';

interface PublicAccountCoachProps {
  publicUserDetail: PublicUserDto;
}

export function PublicAccountCoach({
  publicUserDetail,
}: Readonly<PublicAccountCoachProps>) {
  const { name, location, isReadyForCoaching, experience, workout } =
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
        <section className="user-card-coach">
          <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
          <div className="user-card-coach__wrapper">
            <div className="user-card-coach__card">
              <div className="user-card-coach__content">
                <div className="user-card-coach__head">
                  <h2 className="user-card-coach__title">{name}</h2>
                </div>
                <div className="user-card-coach__label">
                  <a href="popup-user-map.html">
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
                <div className="user-card-coach__status-container">
                  <div className="user-card-coach__status user-card-coach__status--tag">
                    <svg
                      className="user-card-coach__icon-cup"
                      width="12"
                      height="13"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-cup"></use>
                    </svg>
                    <span>Тренер</span>
                  </div>
                  {isReadyForCoaching && (
                    <div className="user-card-coach__status user-card-coach__status--check">
                      <span>Готов тренировать</span>
                    </div>
                  )}
                </div>
                <div className="user-card-coach__text">{experience}</div>
                <button
                  className="btn-flat user-card-coach__sertificate"
                  type="button"
                >
                  <svg width="12" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-teacher"></use>
                  </svg>
                  <span>Посмотреть сертификаты</span>
                </button>
                <ul className="user-card-coach__hashtag-list">{hashtagList}</ul>
                <button className="btn user-card-coach__btn" type="button">
                  Добавить в друзья
                </button>
              </div>
              <div className="user-card-coach__gallary">
                <ul className="user-card-coach__gallary-list">
                  <li className="user-card-coach__gallary-item">
                    <img
                      src="img/content/user-coach-photo1.jpg"
                      srcSet="img/content/user-coach-photo1@2x.jpg 2x"
                      width="334"
                      height="573"
                      alt="photo1"
                    />
                  </li>
                  <li className="user-card-coach__gallary-item">
                    <img
                      src="img/content/user-coach-photo2.jpg"
                      srcSet="img/content/user-coach-photo2@2x.jpg 2x"
                      width="334"
                      height="573"
                      alt="photo2"
                    />
                  </li>
                </ul>
              </div>
            </div>

            <div className="user-card-coach__training">
              <CoachTrainingList />
              <form className="user-card-coach__training-form">
                <button
                  className="btn user-card-coach__btn-training"
                  type="button"
                >
                  Хочу персональную тренировку
                </button>
                <div className="user-card-coach__training-check">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        Получать уведомление на почту о новой тренировке
                      </span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
