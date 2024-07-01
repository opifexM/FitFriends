import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

export function BackLink() {
  return (
    <Link
      to={AppRoute.Main}
      className="btn-flat my-purchases__back"
      type="button"
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg>
      <span>Назад</span>
    </Link>
  );
}
