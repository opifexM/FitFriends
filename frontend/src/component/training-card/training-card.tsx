import { Link } from 'react-router-dom';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';

interface TrainingCardProps {
  training: TrainingDto;
}

export function TrainingCard({ training }: Readonly<TrainingCardProps>) {
  const {
    id,
    price,
    name,
    workout,
    caloriesBurned,
    description,
    backgroundId,
  } = training;
  const trainingRoute = `${AppRoute.Training}/${id}`;

  return (
    <li className="training-catalog__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet={`${UPLOAD_DIRECTORY}${backgroundId}`}
              />
              <img
                src={`${UPLOAD_DIRECTORY}${backgroundId}`}
                srcSet={`${UPLOAD_DIRECTORY}${backgroundId} 2x`}
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
          <div className="thumbnail-training__button-wrapper">
            <Link
              to={trainingRoute}
              className="btn btn--small thumbnail-training__button-catalog"
            >
              Подробнее
            </Link>
            <Link
              to={trainingRoute}
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            >
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
