import 'nouislider/dist/nouislider.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LocationType } from 'shared/type/enum/location-type.enum.ts';
import { RoleType } from 'shared/type/enum/role-type.enum.ts';
import { SkillLevelType } from 'shared/type/enum/skill-level-type.enum.ts';
import { WorkoutType } from 'shared/type/enum/workout-type.enum.ts';
import { PublicUserSortType } from 'shared/type/user/public-user-sort-type.enum.ts';
import { USER_LIST } from 'shared/type/user/user.constant.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getPublicUserFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import {
  setPublicUserFilterLocation,
  setPublicUserFilterSkillLevel,
  setPublicUserFilterTrainingSortType,
  setPublicUserFilterWorkout,
} from '../../store/ui-settings/ui-settings.slice.ts';

export function PublicUserFilter() {
  const dispatch = useAppDispatch();
  const publicUserFilter = useAppSelector(getPublicUserFilter);
  const userDetail = useAppSelector(getUserDetail);

  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllWorkouts, setShowAllWorkouts] = useState(false);

  if (!publicUserFilter) {
    return null;
  }

  const displayedLocations = showAllLocations
    ? Object.values(LocationType)
    : Object.values(LocationType).slice(0, USER_LIST.FILTER_ELEMENT_LIMIT);

  const displayedWorkouts = showAllWorkouts
    ? Object.values(WorkoutType)
    : Object.values(WorkoutType).slice(0, USER_LIST.FILTER_ELEMENT_LIMIT);

  return (
    <div className="user-catalog-form">
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className="user-catalog-form__wrapper">
        <Link
          to={
            userDetail && userDetail.role === RoleType.COACH
              ? AppRoute.PersonalAccount
              : AppRoute.Main
          }
          className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
          type="button"
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <span>Назад</span>
        </Link>
        <h3 className="user-catalog-form__title">Фильтры</h3>
        <form className="user-catalog-form__form">
          <div className="user-catalog-form__block user-catalog-form__block--location">
            <h4 className="user-catalog-form__block-title">
              Локация, станция метро
            </h4>
            <ul className="user-catalog-form__check-list">
              {displayedLocations.map((type) => (
                <li key={type} className="user-catalog-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="type"
                        value={type}
                        checked={publicUserFilter.location.includes(type)}
                        onChange={(e) => {
                          const updatedLocation = [
                            ...publicUserFilter.location,
                          ];
                          if (e.target.checked) {
                            updatedLocation.push(type);
                          } else {
                            updatedLocation.splice(
                              updatedLocation.indexOf(type),
                              1,
                            );
                          }
                          if (updatedLocation.length) {
                            dispatch(
                              setPublicUserFilterLocation(updatedLocation),
                            );
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
            {Object.values(LocationType).length >
              USER_LIST.FILTER_ELEMENT_LIMIT && (
              <button
                className="btn-show-more user-catalog-form__btn-show"
                type="button"
                onClick={() => setShowAllLocations(!showAllLocations)}
              >
                <span>{showAllLocations ? 'Скрыть' : 'Посмотреть все'}</span>
                <svg
                  className="btn-show-more__icon"
                  width="10"
                  height="4"
                  aria-hidden="true"
                >
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            )}
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--spezialization">
            <h4 className="user-catalog-form__block-title">Специализация</h4>
            <ul className="user-catalog-form__check-list">
              {displayedWorkouts.map((type) => (
                <li key={type} className="user-catalog-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="type"
                        value={type}
                        checked={publicUserFilter.workout.includes(type)}
                        onChange={(e) => {
                          const updatedWorkout = [...publicUserFilter.workout];
                          if (e.target.checked) {
                            updatedWorkout.push(type);
                          } else {
                            updatedWorkout.splice(
                              updatedWorkout.indexOf(type),
                              1,
                            );
                          }
                          if (updatedWorkout.length) {
                            dispatch(
                              setPublicUserFilterWorkout(updatedWorkout),
                            );
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
            {Object.values(WorkoutType).length >
              USER_LIST.FILTER_ELEMENT_LIMIT && (
              <button
                className="btn-show-more user-catalog-form__btn-show"
                type="button"
                onClick={() => setShowAllWorkouts(!showAllWorkouts)}
              >
                <span>{showAllWorkouts ? 'Скрыть' : 'Посмотреть все'}</span>
                <svg
                  className="btn-show-more__icon"
                  width="10"
                  height="4"
                  aria-hidden="true"
                >
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            )}
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--level">
            <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
            <div className="custom-toggle-radio">
              <div className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value={SkillLevelType.BEGINNER}
                    checked={
                      publicUserFilter.skillLevel === SkillLevelType.BEGINNER
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(
                          setPublicUserFilterSkillLevel(
                            SkillLevelType.BEGINNER,
                          ),
                        );
                      }
                    }}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Новичок</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value={SkillLevelType.AMATEUR}
                    checked={
                      publicUserFilter.skillLevel === SkillLevelType.AMATEUR
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(
                          setPublicUserFilterSkillLevel(SkillLevelType.AMATEUR),
                        );
                      }
                    }}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Любитель</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    name="skillLevel"
                    value={SkillLevelType.PROFESSIONAL}
                    checked={
                      publicUserFilter.skillLevel ===
                      SkillLevelType.PROFESSIONAL
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(
                          setPublicUserFilterSkillLevel(
                            SkillLevelType.PROFESSIONAL,
                          ),
                        );
                      }
                    }}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">
                    Профессионал
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="user-catalog-form__block">
            <h3 className="user-catalog-form__title user-catalog-form__title--sort">
              Сортировка
            </h3>
            <div className="btn-radio-sort">
              <label>
                <input
                  type="radio"
                  name="publicUserSortType"
                  checked={
                    publicUserFilter.publicUserSortType ===
                    PublicUserSortType.BY_COACH
                  }
                  onChange={() =>
                    dispatch(
                      setPublicUserFilterTrainingSortType(
                        PublicUserSortType.BY_COACH,
                      ),
                    )
                  }
                />
                <span className="btn-radio-sort__label">Тренеры</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="publicUserSortType"
                  checked={
                    publicUserFilter.publicUserSortType ===
                    PublicUserSortType.BY_USER
                  }
                  onChange={() =>
                    dispatch(
                      setPublicUserFilterTrainingSortType(
                        PublicUserSortType.BY_USER,
                      ),
                    )
                  }
                />
                <span className="btn-radio-sort__label">Пользователи</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
