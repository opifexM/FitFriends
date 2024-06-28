import { Link } from 'react-router-dom';
import { ReviewDto } from 'shared/type/review/dto/review.dto.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { setIsReviewCreatePopupOpen } from '../../store/ui-settings/ui-settings.slice.ts';

interface ReviewBlockProps {
  reviews: ReviewDto[];
}

export function ReviewList({ reviews }: Readonly<ReviewBlockProps>) {
  const dispatch = useAppDispatch();

  function handleReviewCreate() {
    dispatch(setIsReviewCreatePopupOpen(true));
  }

  //todo avatar picture
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
              <div className="review__user-info">
                <div className="review__user-photo">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x"
                    />
                    <img
                      src="img/content/avatars/users//photo-1.png"
                      srcSet="img/content/avatars/users//photo-1@2x.png 2x"
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
              <p className="review__comment">{text} </p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
        onClick={handleReviewCreate}
      >
        Оставить отзыв
      </button>
    </aside>
  );
}
