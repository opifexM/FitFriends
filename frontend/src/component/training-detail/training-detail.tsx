import { BalanceDto } from 'shared/type/balance/dto/balance.dto.ts';
import { PurchaseStatusType } from 'shared/type/enum/purchase-status-type.enum.ts';
import { TrainingDto } from 'shared/type/training/dto/training.dto.ts';
import { UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { setIsPurchasePopupOpen } from '../../store/ui-settings/ui-settings.slice.ts';

interface TrainingInfoProps {
  training: TrainingDto;
  currentBalance: BalanceDto | undefined;
}

export function TrainingDetail({
  training,
  currentBalance,
}: Readonly<TrainingInfoProps>) {
  const dispatch = useAppDispatch();
  const {
    name,
    rating,
    description,
    workout,
    workoutDuration,
    price,
    caloriesBurned,
    gender,
    coach,
    isSpecialOffer,
    discountPercent,
  } = training;

  function handlePurchaseCreate() {
    dispatch(setIsPurchasePopupOpen(true));
  }

  function getPrice() {
    return isSpecialOffer ? price - (price * discountPercent) / 100 : price;
  }

  return (
    <div className="training-info">
      <h2 className="visually-hidden">Информация о тренировке</h2>
      <div className="training-info__header">
        <div className="training-info__coach">
          <div className="training-info__photo">
            <picture>
              <source
                type="image/webp"
                srcSet={`${UPLOAD_DIRECTORY}${coach.avatarId}`}
              />
              <img
                src={`${UPLOAD_DIRECTORY}${coach.avatarId}`}
                srcSet={`${UPLOAD_DIRECTORY}${coach.avatarId} 2x`}
                width="64"
                height="64"
                alt="Изображение тренера"
              />
            </picture>
          </div>
          <div className="training-info__coach-info">
            <span className="training-info__label">Тренер</span>
            <span className="training-info__name">{coach.name}</span>
          </div>
        </div>
      </div>
      <div className="training-info__main-content">
        <form action="#" method="get">
          <div className="training-info__form-wrapper">
            <div className="training-info__info-wrapper">
              <div className="training-info__input training-info__input--training">
                <label>
                  <span className="training-info__label">
                    Название тренировки
                  </span>
                  <input type="text" name="training" value={name} disabled />
                </label>
                <div className="training-info__error">Обязательное поле</div>
              </div>
              <div className="training-info__textarea">
                <label>
                  <span className="training-info__label">
                    Описание тренировки
                  </span>
                  <textarea
                    name="description"
                    disabled
                    defaultValue={description}
                  ></textarea>
                </label>
              </div>
            </div>
            <div className="training-info__rating-wrapper">
              <div className="training-info__input training-info__input--rating">
                <label>
                  <span className="training-info__label">Рейтинг</span>
                  <span className="training-info__rating-icon">
                    <svg width="18" height="18" aria-hidden="true">
                      <use
                        xlinkHref="#icon-star"
                        style={{ fill: '#c5ec2a' }}
                      ></use>
                    </svg>
                  </span>
                  <input type="number" name="rating" value={rating} disabled />
                </label>
              </div>
              <ul className="training-info__list">
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>{`#${workout}`}</span>
                  </div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>{`#${gender}`}</span>
                  </div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>{`#${caloriesBurned}ккал`}</span>
                  </div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>{`#${workoutDuration}`}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="training-info__price-wrapper">
              <div className="training-info__input training-info__input--price">
                <label>
                  <span className="training-info__label">Стоимость</span>
                  <input
                    type="text"
                    name="price"
                    value={`${getPrice()} ₽`}
                    disabled
                  />
                </label>
                <div className="training-info__error">Введите число</div>
              </div>
              <button
                className="btn training-info__buy"
                type="button"
                onClick={handlePurchaseCreate}
                disabled={
                  currentBalance &&
                  currentBalance.purchaseStatus !== PurchaseStatusType.FINISHED
                }
              >
                Купить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
