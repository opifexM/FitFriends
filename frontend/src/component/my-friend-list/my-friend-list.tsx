import { useAppDispatch, useAppSelector } from '../../hook';
import {
  getMyFriends,
  getUserDetail,
} from '../../store/api-communication/api-communication.selectors.ts';
import { getMyFriendFilter } from '../../store/ui-settings/ui-settings.selectors.ts';
import { increaseMyFriendFilterCurrentPage } from '../../store/ui-settings/ui-settings.slice.ts';
import { FriendCard } from '../my-friend-card/my-friend-card.tsx';

export function MyFriendList() {
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector(getUserDetail);
  const friendConnections = useAppSelector(getMyFriends);
  const friendFilter = useAppSelector(getMyFriendFilter);
  const isLastPage = friendFilter.currentPage >= friendFilter.totalPages;

  if (!userDetail) {
    return null;
  }

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
          У вас нет добавленных друзей
        </h3>
      </div>
    </div>
  );

  const myFriendCard = friendConnections.map((friendConnection) => {
    const selectedFriend =
      userDetail.id !== friendConnection.friend.id
        ? friendConnection.friend
        : friendConnection.friendInitiator;

    return (
      <FriendCard
        key={friendConnection.id}
        friendConnection={friendConnection}
        selectedFriend={selectedFriend}
      />
    );
  });

  return (
    <>
      <ul className="my-orders__list">
        {friendConnections.length ? myFriendCard : emptyCard}
      </ul>
      <div className="show-more my-purchases__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={() => dispatch(increaseMyFriendFilterCurrentPage())}
          style={{ display: isLastPage ? 'none' : 'inline-flex' }}
          disabled={isLastPage}
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
          style={{
            display:
              isLastPage && friendConnections.length ? 'inline-flex' : 'none',
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Вернуться в начало
        </button>
      </div>
    </>
  );
}
