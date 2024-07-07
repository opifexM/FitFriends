import 'nouislider/dist/nouislider.css';
import { ChangeEvent } from 'react';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { TrainingSortType } from 'shared/type/training/training-sort-type.enum.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getTrainingFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import {
  resetTrainingFilterRange,
  setTrainingFilterCaloriesFrom,
  setTrainingFilterCaloriesTo,
  setTrainingFilterPriceFrom,
  setTrainingFilterPriceTo,
  setTrainingFilterRatingFrom,
  setTrainingFilterRatingTo,
  setTrainingFilterTrainingSortType,
  setTrainingFilterWorkout,
} from '../../store/ui-settings/ui-settings.slice.ts';
import { RangeSlider } from '../range-slider/range-slider.tsx';

export function TrainingFilter() {
  const dispatch = useAppDispatch();
  const trainingFilter = useAppSelector(getTrainingFilter);

  if (!trainingFilter) {
    return null;
  }

  const handlePriceChange = ([priceFrom, priceTo]: [number, number]) => {
    dispatch(setTrainingFilterPriceFrom(priceFrom));
    dispatch(setTrainingFilterPriceTo(priceTo));
  };

  const handleCaloriesChange = ([caloriesFrom, caloriesTo]: [
    number,
    number,
  ]) => {
    dispatch(setTrainingFilterCaloriesFrom(caloriesFrom));
    dispatch(setTrainingFilterCaloriesTo(caloriesTo));
  };

  const handleRatingChange = ([ratingFrom, ratingTo]: [number, number]) => {
    dispatch(setTrainingFilterRatingFrom(ratingFrom));
    dispatch(setTrainingFilterRatingTo(ratingTo));
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numberValue = Number(value);
    if (name === 'priceFrom') {
      dispatch(setTrainingFilterPriceFrom(numberValue));
    } else if (name === 'priceTo') {
      dispatch(setTrainingFilterPriceTo(numberValue));
    }
  };

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <button
          className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
          type="button"
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </button>
        <h3 className="gym-catalog-form__title">Фильтры</h3>

        <form className="gym-catalog-form__form">
          <div className="gym-catalog-form__block gym-catalog-form__block--price">
            <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
            <div className="filter-price">
              <div
                style={{ marginRight: '0' }}
                className="filter-price__input-text filter-price__input-text--min"
              >
                <input
                  style={{ width: '100%' }}
                  type="number"
                  id="priceFrom"
                  name="priceFrom"
                  min={trainingFilter.priceMin}
                  max={trainingFilter.priceTo}
                  value={trainingFilter.priceFrom}
                  onChange={handleFilterChange}
                />
                <label htmlFor="priceFrom">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input
                  style={{ width: '90%' }}
                  type="number"
                  id="priceTo"
                  name="priceTo"
                  min={trainingFilter.priceFrom}
                  max={trainingFilter.priceMax}
                  value={trainingFilter.priceTo}
                  onChange={handleFilterChange}
                />
                <label htmlFor="priceTo">до</label>
              </div>
            </div>
            <div className="filter-range">
              <RangeSlider
                min={trainingFilter.priceMin}
                max={trainingFilter.priceMax}
                start={[trainingFilter.priceFrom, trainingFilter.priceTo]}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--calories">
            <h4 className="gym-catalog-form__block-title">Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input
                  style={{ width: '151px' }}
                  type="number"
                  id="caloriesFrom"
                  name="caloriesFrom"
                  min={trainingFilter.caloriesMin}
                  max={trainingFilter.caloriesTo}
                  value={trainingFilter.caloriesFrom}
                  onChange={handleFilterChange}
                />
                <label htmlFor="caloriesFrom">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input
                  style={{ width: '135px' }}
                  type="number"
                  id="caloriesTo"
                  name="caloriesTo"
                  min={trainingFilter.caloriesFrom}
                  max={trainingFilter.caloriesMax}
                  value={trainingFilter.caloriesTo}
                  onChange={handleFilterChange}
                />
                <label htmlFor="caloriesTo">до</label>
              </div>
            </div>
            <div className="filter-range">
              <RangeSlider
                min={trainingFilter.caloriesMin}
                max={trainingFilter.caloriesMax}
                start={[trainingFilter.caloriesFrom, trainingFilter.caloriesTo]}
                onChange={handleCaloriesChange}
              />
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <RangeSlider
                min={trainingFilter.ratingMin}
                max={trainingFilter.ratingMax}
                start={[trainingFilter.ratingFrom, trainingFilter.ratingTo]}
                onChange={handleRatingChange}
                showValue
              />
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--type">
            <h4 className="gym-catalog-form__block-title">Тип</h4>
            <ul className="gym-catalog-form__check-list">
              {Object.values(WorkoutType).map((type) => (
                <li key={type} className="gym-catalog-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="type"
                        value={type}
                        checked={trainingFilter.workout.includes(type)}
                        onChange={(e) => {
                          const updatedWorkout = [...trainingFilter.workout];
                          if (e.target.checked) {
                            updatedWorkout.push(type);
                          } else {
                            updatedWorkout.splice(
                              updatedWorkout.indexOf(type),
                              1,
                            );
                          }
                          if (updatedWorkout.length) {
                            dispatch(setTrainingFilterWorkout(updatedWorkout));
                            dispatch(resetTrainingFilterRange());
                          }
                        }}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{type}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
              Сортировка
            </h4>
            <div className="btn-radio-sort gym-catalog-form__radio">
              <label>
                <input
                  type="radio"
                  name="trainingSortType"
                  checked={
                    trainingFilter.trainingSortType ===
                    TrainingSortType.BY_LOW_PRICE
                  }
                  onChange={() =>
                    dispatch(
                      setTrainingFilterTrainingSortType(
                        TrainingSortType.BY_LOW_PRICE,
                      ),
                    )
                  }
                />
                <span className="btn-radio-sort__label">Дешевле</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="trainingSortType"
                  checked={
                    trainingFilter.trainingSortType ===
                    TrainingSortType.BY_HIGH_PRICE
                  }
                  onChange={() =>
                    dispatch(
                      setTrainingFilterTrainingSortType(
                        TrainingSortType.BY_HIGH_PRICE,
                      ),
                    )
                  }
                />
                <span className="btn-radio-sort__label">Дороже</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="trainingSortType"
                  checked={
                    trainingFilter.trainingSortType ===
                    TrainingSortType.BY_FREE_PRICE
                  }
                  onChange={() =>
                    dispatch(
                      setTrainingFilterTrainingSortType(
                        TrainingSortType.BY_FREE_PRICE,
                      ),
                    )
                  }
                />
                <span className="btn-radio-sort__label">Бесплатные</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
