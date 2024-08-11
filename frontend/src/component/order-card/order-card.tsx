import { Link } from 'react-router-dom';
import { MyOrderDto } from 'shared/type/order/dto/my-order-pagination.dto.ts';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';

interface TrainingCardProps {
  order: MyOrderDto;
}

export function OrderCard({ order }: Readonly<TrainingCardProps>) {
  const { training, totalNumber, totalAmount } = order;
  const { id, price, name, workout, caloriesBurned, description } = training;
  const trainingRoute = `${AppRoute.Training}/${id}`;

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
            />
            <img
              src={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
              srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId} 2x`}
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          {price > 0 ? `${price} ₽` : 'Бесплатно'}
        </p>
        <h3 className="thumbnail-training__title">{name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${workout}`}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${caloriesBurned}ккал`}</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg
              width="16"
              height="16"
              aria-hidden="true"
              style={{ fill: '#c5ec2a' }}
            >
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">
              {training.rating}
            </span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <Link
          to={trainingRoute}
          className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
        >
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#icon-info"></use>
          </svg>
          <span>Подробнее</span>
        </Link>
      </div>
      <div className="thumbnail-training__total-info">
        <div className="thumbnail-training__total-info-card">
          <svg width="32" height="32" aria-hidden="true">
            <use xlinkHref="#icon-chart"></use>
          </svg>
          <p className="thumbnail-training__total-info-value">{totalNumber}</p>
          <p className="thumbnail-training__total-info-text">
            Куплено тренировок
          </p>
        </div>
        <div className="thumbnail-training__total-info-card">
          <svg width="31" height="28" aria-hidden="true">
            <use xlinkHref="#icon-wallet"></use>
          </svg>
          <p className="thumbnail-training__total-info-value">
            {totalAmount}
            <span>₽</span>
          </p>
          <p className="thumbnail-training__total-info-text">Общая сумма</p>
        </div>
      </div>
    </li>
  );
}
