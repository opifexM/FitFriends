export function VideoBlock() {
  //todo video
  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
            />
            <img
              src="img/content/training-video/video-thumbnail.png"
              srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
              width="922"
              height="566"
              alt="Обложка видео"
            />
          </picture>
        </div>
        <button className="training-video__play-button btn-reset">
          <svg width="18" height="30" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="training-video__buttons-wrapper">
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
        >
          Приступить
        </button>
        <button
          className="btn training-video__button training-video__button--stop"
          type="button"
        >
          Закончить
        </button>
      </div>
    </div>
  );
}
