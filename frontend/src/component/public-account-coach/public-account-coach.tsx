import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import {
  addFriend,
  fetchPublicUserDetail,
  removeFriend,
  subscribeCoach,
  unsubscribeCoach,
} from '../../store/api-action/data-action.ts';
import { setIsCertificateViewOpen } from '../../store/ui-settings/ui-settings.slice.ts';
import { CoachTrainingList } from '../coach-training-list/coach-training-list.tsx';

interface PublicAccountCoachProps {
  publicUserDetail: PublicUserDto;
  isCurrentUser: boolean;
  currentUserDetail: UserDto;
}

export function PublicAccountCoach({
  publicUserDetail,
  isCurrentUser,
  currentUserDetail,
}: Readonly<PublicAccountCoachProps>) {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    location,
    isReadyForCoaching,
    experience,
    workout,
    isSubscribed,
    friendId,
  } = publicUserDetail;

  const hashtagList = workout?.map((hashtag) => (
    <li key={hashtag} className="user-card-coach__hashtag-item">
      <div className="hashtag">
        <span>{`#${hashtag}`}</span>
      </div>
    </li>
  ));

  const handleSubscription = () => {
    if (isSubscribed) {
      dispatch(unsubscribeCoach(id))
        .unwrap()
        .then(() => {
          toast.success(`Unsubscription from '${name}' was successful`, {
            position: 'top-right',
          });
        });
    } else {
      dispatch(subscribeCoach(id))
        .unwrap()
        .then(() => {
          toast.success(`Subscription to '${name}' was successful`, {
            position: 'top-right',
          });
        });
    }
  };

  const handleFriendship = () => {
    if (friendId) {
      dispatch(removeFriend(friendId))
        .unwrap()
        .then(() => {
          toast.success('The user has been removed from friends', {
            position: 'top-right',
          });
          dispatch(fetchPublicUserDetail(publicUserDetail.id));
        });
    } else {
      dispatch(addFriend({ friend: id }))
        .unwrap()
        .then(() => {
          toast.success('The user has been added as a friend', {
            position: 'top-right',
          });
          dispatch(fetchPublicUserDetail(publicUserDetail.id));
        });
    }
  };

  const handleOpenCertificatePopupClick = () => {
    dispatch(setIsCertificateViewOpen(true));
  };

  //todo location link
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
                  onClick={handleOpenCertificatePopupClick}
                >
                  <svg width="12" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-teacher"></use>
                  </svg>
                  <span>Посмотреть сертификаты</span>
                </button>
                <ul className="user-card-coach__hashtag-list">{hashtagList}</ul>
                {friendId ? (
                  <button
                    className="btn user-card-coach__btn"
                    type="button"
                    disabled={isCurrentUser}
                    onClick={handleFriendship}
                    style={{ backgroundColor: '#f0f0f0' }}
                  >
                    Удалить из друзей
                  </button>
                ) : (
                  <button
                    className="btn user-card-coach__btn"
                    type="button"
                    disabled={
                      isCurrentUser || currentUserDetail.role === RoleType.COACH
                    }
                    onClick={handleFriendship}
                  >
                    Добавить в друзья
                  </button>
                )}
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
                  disabled={isCurrentUser}
                >
                  Хочу персональную тренировку
                </button>
                <div className="user-card-coach__training-check">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={isSubscribed}
                        name="isSubscribed"
                        onChange={handleSubscription}
                        disabled={isCurrentUser}
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
