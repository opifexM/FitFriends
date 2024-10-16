import classNames from 'classnames';
import { NotifyDto } from 'shared/type/notify/dto/notify.dto.ts';
import { useAppDispatch } from '../../hook';
import {
  fetchMyNotification,
  readNotification,
} from '../../store/api-action/data-action.ts';

interface NotificationCardProps {
  notification: NotifyDto;
}

export function NotificationCard({
  notification,
}: Readonly<NotificationCardProps>) {
  const dispatch = useAppDispatch();
  const { id, isRead, text, createdAt } = notification;

  const handleReadNotification = () => {
    dispatch(readNotification(id))
      .unwrap()
      .then(() => {
        dispatch(fetchMyNotification());
      });
  };

  return (
    <li key={id} className="main-nav__subitem">
      <div
        className={classNames('notification', {
          'is-active': !isRead,
        })}
        onClick={handleReadNotification}
      >
        <p className="notification__text">{text}</p>
        <time className="notification__time" dateTime="2023-12-23 12:35">
          {`${new Date(createdAt).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
          })}, ${new Date(createdAt).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          })}`}
        </time>
      </div>
    </li>
  );
}
