import classNames from 'classnames';
import { useField } from 'formik';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  name: string;
  options: Record<string, string>;
  label: string;
}

export function Dropdown({ name, options, label }: Readonly<DropdownProps>) {
  const [open, setOpen] = useState(false);
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  const optionItems = Object.values(options).map((option) => (
    <li
      key={option}
      role="option"
      aria-selected={value === option}
      className="custom-select__item"
      onClick={() => handleSelect(option)}
    >
      {option}
    </li>
  ));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={classNames('custom-select', {
        'is-open': open,
        'not-empty': value,
      })}
    >
      <span className="custom-input__label">{label}</span>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="custom-select__text2">{value}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      {open && (
        <ul className="custom-select__list" role="listbox">
          {optionItems}
        </ul>
      )}
      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
}
