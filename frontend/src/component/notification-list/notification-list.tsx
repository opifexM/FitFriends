import { NotifyDto } from 'shared/type/notify/dto/notify.dto.ts';
import { NotificationCard } from '../my-order-list/notification-card.tsx';

interface NotificationListProps {
  notifications: NotifyDto[];
}

export function NotificationList({
  notifications,
}: Readonly<NotificationListProps>) {
  const notificationList = notifications.map((notification) => (
    <NotificationCard key={notification.id} notification={notification} />
  ));

  return (
    <div className="main-nav__dropdown">
      <p className="main-nav__label">Оповещения</p>
      <ul className="main-nav__sublist">{notificationList}</ul>
    </div>
  );
}
