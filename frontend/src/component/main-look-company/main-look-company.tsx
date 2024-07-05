import { useAppSelector } from '../../hook';
import { getTrainings } from '../../store/api-communication/api-communication.selectors.ts';

export function MainLookCompany() {
  const trainings = useAppSelector(getTrainings);

  if (!trainings) {
    return null;
  }

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            <li className="look-for-company__item">
              <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                <div className="thumbnail-user__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/user-04.webp, img/content/thumbnails/user-04@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/user-04.jpg"
                      srcSet="img/content/thumbnails/user-04@2x.jpg 2x"
                      width="82"
                      height="82"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-user__header">
                  <h3 className="thumbnail-user__name">Диана</h3>
                  <div className="thumbnail-user__location">
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-location"></use>
                    </svg>
                    <address className="thumbnail-user__location-address">
                      Невский проспект
                    </address>
                  </div>
                </div>
                <ul className="thumbnail-user__hashtags-list">
                  <li className="thumbnail-user__hashtags-item">
                    <div className="hashtag thumbnail-user__hashtag">
                      <span>#пилатес</span>
                    </div>
                  </li>
                </ul>
                <a
                  className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                  href="#"
                >
                  Подробнее
                </a>
              </div>
            </li>
            <li className="look-for-company__item">
              <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                <div className="thumbnail-user__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/user-05.webp, img/content/thumbnails/user-05@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/user-05.jpg"
                      srcSet="img/content/thumbnails/user-05@2x.jpg 2x"
                      width="82"
                      height="82"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-user__header">
                  <h3 className="thumbnail-user__name">Константин</h3>
                  <div className="thumbnail-user__location">
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-location"></use>
                    </svg>
                    <address className="thumbnail-user__location-address">
                      Комендантский проспект
                    </address>
                  </div>
                </div>
                <ul className="thumbnail-user__hashtags-list">
                  <li className="thumbnail-user__hashtags-item">
                    <div className="hashtag thumbnail-user__hashtag">
                      <span>#силовые</span>
                    </div>
                  </li>
                </ul>
                <a
                  className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                  href="#"
                >
                  Подробнее
                </a>
              </div>
            </li>
            <li className="look-for-company__item">
              <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                <div className="thumbnail-user__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/user-06.webp, img/content/thumbnails/user-06@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/user-06.jpg"
                      srcSet="img/content/thumbnails/user-06@2x.jpg 2x"
                      width="82"
                      height="82"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-user__header">
                  <h3 className="thumbnail-user__name">Иван</h3>
                  <div className="thumbnail-user__location">
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-location"></use>
                    </svg>
                    <address className="thumbnail-user__location-address">
                      Чёрная речка
                    </address>
                  </div>
                </div>
                <ul className="thumbnail-user__hashtags-list">
                  <li className="thumbnail-user__hashtags-item">
                    <div className="hashtag thumbnail-user__hashtag">
                      <span>#бег</span>
                    </div>
                  </li>
                </ul>
                <a
                  className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                  href="#"
                >
                  Подробнее
                </a>
              </div>
            </li>
            <li className="look-for-company__item">
              <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                <div className="thumbnail-user__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/user-07.webp, img/content/thumbnails/user-07@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/user-07.jpg"
                      srcSet="img/content/thumbnails/user-07@2x.jpg 2x"
                      width="82"
                      height="82"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-user__header">
                  <h3 className="thumbnail-user__name">Яна</h3>
                  <div className="thumbnail-user__location">
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-location"></use>
                    </svg>
                    <address className="thumbnail-user__location-address">
                      Крестовский остров
                    </address>
                  </div>
                </div>
                <ul className="thumbnail-user__hashtags-list">
                  <li className="thumbnail-user__hashtags-item">
                    <div className="hashtag thumbnail-user__hashtag">
                      <span>#пилатес</span>
                    </div>
                  </li>
                </ul>
                <a
                  className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                  href="#"
                >
                  Подробнее
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
