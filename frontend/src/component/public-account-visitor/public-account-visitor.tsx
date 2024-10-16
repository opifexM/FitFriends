import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import {
  addFriend,
  fetchMyNotification,
  fetchPublicUserDetail,
  removeFriend,
} from '../../store/api-action/data-action.ts';
import { setIsLocationViewOpen } from '../../store/ui-settings/ui-settings.slice.ts';

interface PublicAccountCoachProps {
  publicUserDetail: PublicUserDto;
  isCurrentUser: boolean;
  currentUserDetail: UserDto;
}

export function PublicAccountVisitor({
  publicUserDetail,
  isCurrentUser,
  currentUserDetail,
}: Readonly<PublicAccountCoachProps>) {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    location,
    isReadyForTraining,
    workout,
    description,
    friendId,
  } = publicUserDetail;

  const hashtagList = workout?.map((hashtag) => (
    <li key={hashtag} className="user-card-coach__hashtag-item">
      <div className="hashtag">
        <span>{`#${hashtag}`}</span>
      </div>
    </li>
  ));

  const handleFriendship = () => {
    if (friendId) {
      dispatch(removeFriend(friendId))
        .unwrap()
        .then(() => {
          toast.success('The user has been removed from friends', {
            position: 'top-right',
          });
          dispatch(fetchPublicUserDetail(publicUserDetail.id));
          dispatch(fetchMyNotification());
        });
    } else {
      dispatch(addFriend({ friend: id }))
        .unwrap()
        .then(() => {
          toast.success('The user has been added as a friend', {
            position: 'top-right',
          });
          dispatch(fetchPublicUserDetail(publicUserDetail.id));
          dispatch(fetchMyNotification());
        });
    }
  };

  const handleOpenLocationPopupClick = () => {
    dispatch(setIsLocationViewOpen(true));
  };

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
                <button
                  className="btn-flat user-card-coach__sertificate"
                  type="button"
                  onClick={handleOpenLocationPopupClick}
                >
                  <svg
                    className="user-card-coach__icon-location"
                    width="12"
                    height="14"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <span>{location}</span>
                </button>
              </div>
              {isReadyForTraining && (
                <div className="user-card__status">
                  <span>Готов к тренировке</span>
                </div>
              )}
              <div className="user-card__text">{description}</div>
              <ul className="user-card__hashtag-list">{hashtagList}</ul>
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
