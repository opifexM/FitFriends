import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { TrainingSortType } from 'shared/type/training/training-sort-type.enum.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getTrainingFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import {
  setTrainingSortType,
  setWorkout,
} from '../../store/ui-settings/ui-settings.slice.ts';

export function TrainingFilter() {
  const dispatch = useAppDispatch();
  const trainingFilter = useAppSelector(getTrainingFilter);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log(`name: ${name}, value: ${value}`);

    // if (state.trainingFilter.priceFrom) {
    //   state.trainingFilter.priceFrom = Math.min(
    //     priceMin,
    //     state.trainingFilter.priceFrom,
    //   );
    // }
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
              <div className="filter-price__input-text filter-price__input-text--min">
                <input
                  type="number"
                  id="text-min"
                  name="text-min"
                  min={trainingFilter.priceMin}
                  max={trainingFilter.priceTo}
                  value={trainingFilter.priceFrom}
                  onChange={handleFilterChange}
                />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input
                  type="number"
                  id="text-max"
                  name="text-max"
                  min={trainingFilter.priceFrom}
                  max={trainingFilter.priceMax}
                  value={trainingFilter.priceTo}
                  onChange={handleFilterChange}
                />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar">
                  <span className="visually-hidden">Полоса прокрутки</span>
                </div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle">
                  <span className="visually-hidden">Минимальное значение</span>
                </button>
                <button className="filter-range__max-toggle">
                  <span className="visually-hidden">Максимальное значение</span>
                </button>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--calories">
            <h4 className="gym-catalog-form__block-title">Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input type="number" id="text-min-cal" name="text-min-cal" />
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input type="number" id="text-max-cal" name="text-max-cal" />
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar">
                  <span className="visually-hidden">Полоса прокрутки</span>
                </div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle">
                  <span className="visually-hidden">Минимальное значение</span>
                </button>
                <button className="filter-range__max-toggle">
                  <span className="visually-hidden">Максимальное значение</span>
                </button>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar">
                  <span className="visually-hidden">Полоса прокрутки</span>
                </div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle">
                  <span className="visually-hidden">Минимальное значение</span>
                </button>
                <span>1</span>
                <button className="filter-raiting__max-toggle">
                  <span className="visually-hidden">Максимальное значение</span>
                </button>
                <span>5</span>
              </div>
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
                            dispatch(setWorkout(updatedWorkout));
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
                    dispatch(setTrainingSortType(TrainingSortType.BY_LOW_PRICE))
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
                      setTrainingSortType(TrainingSortType.BY_HIGH_PRICE),
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
                      setTrainingSortType(TrainingSortType.BY_FREE_PRICE),
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
