import classNames from 'classnames';
import { useState } from 'react';
import { useField } from 'formik';
import { LocationType } from 'shared/type/enum/location-type.enum.ts';

interface LocationProps {
  name: string;
}

export function Location({ name }: Readonly<LocationProps>) {
  const [open, setOpen] = useState(false);
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  const handleSelect = (location: LocationType) => {
    setValue(location);
    setOpen(false);
  };

  const locationOptions = Object.values(LocationType).map((location) => (
    <li
      key={location}
      role="option"
      aria-selected={value === location}
      className="custom-select__item"
      onClick={() => handleSelect(location)}
    >
      {location}
    </li>
  ));

  return (
    <div
      className={classNames('custom-select', {
        'is-open': open,
        'not-empty': value,
      })}
    >
      <span className="custom-input__label">Ваша локация</span>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="custom-select__text2 ">{value}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      {open && (
        <ul className="custom-select__list" role="listbox">
          {locationOptions}
        </ul>
      )}
      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
}
