import { useAppDispatch, useAppSelector } from '../../hook';
import { getPublicUsers } from '../../store/api-communication/api-communication.selectors.ts';
import { getPublicUserFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { increasePublicUserFilterCurrentPage } from '../../store/ui-settings/ui-settings.slice.ts';
import { PublicUserCard } from '../public-user-card/public-user-card.tsx';

export function PublicUserList() {
  const publicUsers = useAppSelector(getPublicUsers);
  const dispatch = useAppDispatch();
  const publicUserFilter = useAppSelector(getPublicUserFilter);
  const isLastPage =
    publicUserFilter.currentPage >= publicUserFilter.totalPages;

  const emptyCard = (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
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
        <h3 className="thumbnail-training__title">
          Скоро здесь появится что-то полезное
        </h3>
      </div>
    </div>
  );

  const trainingCard = publicUsers.map((user) => (
    <PublicUserCard key={user.id} user={user} />
  ));

  const increasePage = () => {
    dispatch(increasePublicUserFilterCurrentPage());
  };

  return (
    <div className="users-catalog">
      <ul className="users-catalog__list">
        {publicUsers.length ? trainingCard : emptyCard}
      </ul>
      <div className="show-more users-catalog__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={increasePage}
          style={{ display: isLastPage ? 'none' : 'inline-flex' }}
          disabled={isLastPage}
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
          style={{
            display: isLastPage && publicUsers.length ? 'inline-flex' : 'none',
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Вернуться в начало
        </button>
      </div>
    </div>
  );
}
