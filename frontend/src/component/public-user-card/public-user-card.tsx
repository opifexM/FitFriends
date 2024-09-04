import { Link } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { PublicUserDto } from 'shared/type/user/dto/public-user.dto.ts';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';

interface PublicUserCardProps {
  user: PublicUserDto;
  isOnlyDarkColor?: boolean;
}

export function PublicUserCard({
  user,
  isOnlyDarkColor = false,
}: Readonly<PublicUserCardProps>) {
  const { id, avatarId, name, location, role, workout } = user;

  const userPublicAccountRoute = `${AppRoute.PublicAccount}/${id}`;
  const isDarkColor = isOnlyDarkColor || role === RoleType.COACH;

  return (
    <li className="look-for-company__item">
      <div
        className={`thumbnail-user thumbnail-user--role-user ${isDarkColor ? 'thumbnail-user--dark' : 'thumbnail-user--light'}`}
      >
        <div className="thumbnail-user__image">
          <picture>
            <source
              type="image/webp"
              srcSet={`${UPLOAD_DIRECTORY}${avatarId}`}
            />
            <img
              src={`${UPLOAD_DIRECTORY}${avatarId}`}
              srcSet={`${UPLOAD_DIRECTORY}${avatarId} 2x`}
              width="82"
              height="82"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <Link
            to={userPublicAccountRoute}
            style={{ color: isDarkColor ? 'white' : 'black' }}
          >
            <h3 className="thumbnail-user__name">{name}</h3>
          </Link>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">
              {location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag">
              <span>{workout?.length ? `#${workout[0]}` : '-'}</span>
            </div>
          </li>
        </ul>
        <Link
          className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
          to={userPublicAccountRoute}
          style={{ color: isDarkColor ? 'white' : 'black' }}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}
