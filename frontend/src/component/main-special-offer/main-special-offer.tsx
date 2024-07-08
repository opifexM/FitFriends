import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRAINING_MAIN } from 'shared/type/training/traning.constant.ts';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { AppRoute, UPLOAD_DIRECTORY } from '../../const.ts';
import { useAppSelector } from '../../hook';
import { getTrainings } from '../../store/api-communication/api-communication.selectors.ts';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination, Autoplay]);

const AUTO_PLAY_INTERVAL_SEC = 10000;
const SLIDE_SPACING = 50;
const NUMBER_OF_SLIDES = 1;

export function MainSpecialOffer() {
  const trainings = useAppSelector(getTrainings);
  const swiperRef = useRef<SwiperClass | null>(null);
  const navigate = useNavigate();

  const specialOfferTrainings = trainings
    .filter((training) => training.isSpecialOffer)
    .slice(0, TRAINING_MAIN.SPECIAL_LIMIT);

  if (!specialOfferTrainings.length) {
    return (
      <div className="thumbnail-spec-gym">
        <div className="thumbnail-spec-gym__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/nearest-gym-01.jpg"
              srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <div
          className="thumbnail-spec-gym__header"
          style={{ textAlign: 'center' }}
        >
          <h3 className="thumbnail-spec-gym__title">
            Скоро здесь появится что-то полезное
          </h3>
        </div>
      </div>
    );
  }

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={SLIDE_SPACING}
            slidesPerView={NUMBER_OF_SLIDES}
            pagination={false}
            autoplay={{
              delay: AUTO_PLAY_INTERVAL_SEC,
              disableOnInteraction: false,
            }}
          >
            {specialOfferTrainings.map((training, index) => (
              <SwiperSlide
                key={training.id}
                onClick={() => navigate(`${AppRoute.Training}/${training.id}`)}
              >
                <aside className="promo-slider">
                  <div className="promo-slider__image">
                    <img
                      src={`${UPLOAD_DIRECTORY}${training.backgroundId}`}
                      srcSet={`${UPLOAD_DIRECTORY}${training.backgroundId} 2x`}
                      width="1040"
                      height="469"
                      alt="promo"
                    />
                  </div>
                  <div className="promo-slider__header">
                    <h3 className="promo-slider__title">{training.name}</h3>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div>
                  <span className="promo-slider__text">
                    {training.description}
                  </span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      {specialOfferTrainings.map((trainingDot, dotIndex) => (
                        <button
                          key={trainingDot.id}
                          className={`promo-slider__slider-dot ${
                            index === dotIndex
                              ? 'promo-slider__slider-dot--active'
                              : ''
                          }`}
                          aria-label={`слайд ${dotIndex + 1}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            swiperRef.current?.slideTo(dotIndex);
                          }}
                        ></button>
                      ))}
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">
                        {Math.trunc(
                          training.price -
                            (training.price * training.discountPercent) / 100,
                        )}{' '}
                        ₽
                      </p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">
                        {training.price} ₽
                      </p>
                    </div>
                  </div>
                </aside>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
