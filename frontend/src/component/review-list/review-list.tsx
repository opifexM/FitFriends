import { Link } from 'react-router-dom';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { ReviewDto } from 'shared/type/review/dto/review.dto.ts';
import { UserDto } from 'shared/type/user/dto/user.dto.ts';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { setIsReviewCreatePopupOpen } from '../../store/ui-settings/ui-settings.slice.ts';

interface ReviewBlockProps {
  reviews: ReviewDto[];
  userDetail: UserDto;
}

export function ReviewList({
  reviews,
  userDetail,
}: Readonly<ReviewBlockProps>) {
  const dispatch = useAppDispatch();

  function handleReviewCreate() {
    dispatch(setIsReviewCreatePopupOpen(true));
  }

  return (
    <aside className="reviews-side-bar">
      <Link
        to={AppRoute.ListTraining}
        className="btn-flat btn-flat--underlined reviews-side-bar__back"
        type="button"
      >
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
        <span>Назад</span>
      </Link>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list" style={{ overflowY: 'auto' }}>
        {!reviews.length && (
          <li className="reviews-side-bar__item">
            <div className="review">
              <div className="review__user-info">
                <span className="review__user-name">Пока нет отзывов</span>
              </div>
            </div>
          </li>
        )}
        {reviews.map(({ rating, text, user, id }) => (
          <li key={id} className="reviews-side-bar__item">
            <div className="review">
              <Link to={`${AppRoute.PublicAccount}/${user.id}`}>
                <div className="review__user-info">
                  <div className="review__user-photo">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${UPLOAD_DIRECTORY}${user.avatarId}`}
                      />
                      <img
                        src={`${UPLOAD_DIRECTORY}${user.avatarId}`}
                        srcSet={`${UPLOAD_DIRECTORY}${user.avatarId} 2x`}
                        width="64"
                        height="64"
                        alt="Изображение пользователя"
                      />
                    </picture>
                  </div>
                  <span className="review__user-name">{user.name}</span>
                  <div className="review__rating">
                    <svg width="16" height="16" aria-hidden="true">
                      <use
                        xlinkHref="#icon-star"
                        style={{ fill: '#c5ec2a' }}
                      ></use>
                    </svg>
                    <span>{rating}</span>
                  </div>
                </div>
              </Link>
              <p className="review__comment">{text} </p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
        onClick={handleReviewCreate}
        disabled={userDetail.role === RoleType.COACH}
      >
        Оставить отзыв
      </button>
    </aside>
  );
}
