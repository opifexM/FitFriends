import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RequestStatusType } from 'shared/type/enum/request-status-type.enum.ts';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { FriendDto } from 'shared/type/friend/dto/friend.dto.ts';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  changeFriendRequestStatus,
  fetchMyFriend,
} from '../../store/api-action/data-action.ts';
import { getUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getMyFriendFilter } from '../../store/ui-settings/ui-settings.selectors.ts';

interface FriendCardProps {
  selectedFriend: PublicUserDto;
  friendConnection: FriendDto;
}

export function FriendCard({
  selectedFriend,
  friendConnection,
}: Readonly<FriendCardProps>) {
  const dispatch = useAppDispatch();
  const myFriendFilter = useAppSelector(getMyFriendFilter);
  const userDetail = useAppSelector(getUserDetail);

  const {
    id,
    avatarId,
    name,
    location,
    workout,
    isReadyForTraining,
    isReadyForCoaching,
    role,
  } = selectedFriend;
  const { requestInitiator, requestStatus } = friendConnection;

  const friendPublicAccountRoute = `${AppRoute.PublicAccount}/${id}`;
  const isCoach = role === RoleType.COACH;
  const isInitiator = requestInitiator === userDetail?.id;

  const isShowInvite =
    (isReadyForCoaching || isReadyForTraining) &&
    requestStatus === RequestStatusType.NONE;

  let readyForTrainingText;
  if (isCoach) {
    readyForTrainingText = isReadyForCoaching
      ? 'Готов тренировать'
      : 'Не готов тренировать';
  } else {
    readyForTrainingText = isReadyForTraining
      ? 'Готов к тренировке'
      : 'Не готов к тренировке';
  }

  let requestStatusText;
  switch (requestStatus) {
    case RequestStatusType.PENDING:
      requestStatusText = 'Запрос на совместную тренировку - Отправлен';
      break;
    case RequestStatusType.ACCEPTED:
      requestStatusText = 'Запрос на совместную тренировку - Принят';
      break;
    case RequestStatusType.REJECTED:
      requestStatusText = 'Запрос на персональную тренировку - Отклонён';
      break;
  }

  const handlePendingRequestStatus = () => {
    dispatch(
      changeFriendRequestStatus({
        friendId: friendConnection.id,
        friendData: { requestStatus: RequestStatusType.PENDING },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(
          `The training request with '${selectedFriend.name}' has been sent`,
          {
            position: 'top-right',
          },
        );
        dispatch(
          fetchMyFriend({
            currentPage: myFriendFilter.currentPage,
          }),
        );
      });
  };

  const handleAcceptRequestStatus = () => {
    dispatch(
      changeFriendRequestStatus({
        friendId: friendConnection.id,
        friendData: { requestStatus: RequestStatusType.ACCEPTED },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(
          `The training request with '${selectedFriend.name}' has been successfully accepted`,
          {
            position: 'top-right',
          },
        );
        dispatch(
          fetchMyFriend({
            currentPage: myFriendFilter.currentPage,
          }),
        );
      });
  };

  const handleRejectRequestStatus = () => {
    dispatch(
      changeFriendRequestStatus({
        friendId: friendConnection.id,
        friendData: { requestStatus: RequestStatusType.REJECTED },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(
          `The training request with '${selectedFriend.name}' has been rejected`,
          {
            position: 'top-right',
          },
        );
        dispatch(
          fetchMyFriend({
            currentPage: myFriendFilter.currentPage,
          }),
        );
      });
  };

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div
          className={`thumbnail-friend__info ${isCoach ? 'thumbnail-friend__info--theme-dark' : 'thumbnail-friend__info--theme-light'}`}
        >
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${UPLOAD_DIRECTORY}${avatarId}`}
                />
                <img
                  src={`${UPLOAD_DIRECTORY}${avatarId}`}
                  srcSet={`${UPLOAD_DIRECTORY}${avatarId}`}
                  width="78"
                  height="78"
                  alt=""
                />
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <Link
              to={friendPublicAccountRoute}
              style={{ color: isCoach ? 'white' : 'black' }}
            >
              <h2 className="thumbnail-friend__name">{name}</h2>
            </Link>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">
                {location}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            <li>
              <div className="hashtag thumbnail-friend__hashtag">
                <span>{workout?.length ? `#${workout[0]}` : '-'}</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div
              className={`thumbnail-friend__ready-status ${isReadyForCoaching || isReadyForTraining ? 'thumbnail-friend__ready-status--is-ready' : 'thumbnail-friend__ready-status--is-not-ready'}`}
            >
              <span>{readyForTrainingText}</span>
            </div>
            {isShowInvite && userDetail?.role !== RoleType.COACH && (
              <button
                className="thumbnail-friend__invite-button"
                type="button"
                style={{ color: isCoach ? 'white' : 'black' }}
                onClick={handlePendingRequestStatus}
              >
                <svg
                  width="43"
                  height="46"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use xlinkHref="#icon-invite"></use>
                </svg>
                <span className="visually-hidden">
                  {isCoach
                    ? 'Пригласить тренера на совместную тренировку'
                    : 'Пригласить друга на совместную тренировку'}
                </span>
              </button>
            )}
          </div>
        </div>
        {requestStatus !== RequestStatusType.NONE && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              {requestStatusText}
            </p>
            {!isInitiator && requestStatus === RequestStatusType.PENDING && (
              <div className="thumbnail-friend__button-wrapper">
                <button
                  className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                  type="button"
                  onClick={handleAcceptRequestStatus}
                >
                  Принять
                </button>
                <button
                  className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                  type="button"
                  onClick={handleRejectRequestStatus}
                >
                  Отклонить
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
