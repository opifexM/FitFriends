import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
  locationCoordinates,
  LocationType,
} from 'shared/type/enum/location-type.enum.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getPublicUserDetail } from '../../store/api-communication/api-communication.selectors.ts';
import { getIsLocationViewOpen } from '../../store/ui-settings/ui-settings.selectors.ts';
import { setIsLocationViewOpen } from '../../store/ui-settings/ui-settings.slice.ts';

export function LocationViewPopup() {
  const dispatch = useAppDispatch();
  const publicUserDetail = useAppSelector(getPublicUserDetail);
  const isLocationViewOpen = useAppSelector(getIsLocationViewOpen);

  if (!publicUserDetail || !isLocationViewOpen) {
    return null;
  }
  const { name, location } = publicUserDetail;

  const handleCloseClick = () => {
    dispatch(setIsLocationViewOpen(false));
  };

  const getLocationCoordinates = (
    stationName: string,
  ): [number, number] | undefined => {
    const locationType = Object.values(LocationType).find(
      (locationName): locationName is LocationType =>
        locationName === stationName,
    );
    return locationType ? locationCoordinates[locationType] : undefined;
  };

  const position = getLocationCoordinates(location) || [0, 0];

  return (
    <div className="popup-form popup-form--map">
      <section className="popup">
        <div className="popup__wrapper popup__wrapper--map">
          <div className="popup-head popup-head--address">
            <h2 className="popup-head__header">{name}</h2>
            <p className="popup-head__address">
              <svg
                className="popup-head__icon-location"
                width="12"
                height="14"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-location"></use>
              </svg>
              <span>{location}</span>
            </p>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={handleCloseClick}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content-map">
            <div className="popup__map">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: '40vh', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={position}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
