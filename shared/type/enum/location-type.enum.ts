export enum LocationType {
  PIONERSKAYA = 'Пионерская',
  PETROGRADSKAYA = 'Петроградская',
  UDELNAYA = 'Удельная',
  ZVEZDNAYA = 'Звёздная',
  SPORTOVNAYA = 'Спортивная',
}

export const locationCoordinates: Record<LocationType, [number, number]> = {
  [LocationType.PIONERSKAYA]: [55.7403, 37.4982],
  [LocationType.PETROGRADSKAYA]: [59.9668, 30.3116],
  [LocationType.UDELNAYA]: [60.0362, 30.3055],
  [LocationType.ZVEZDNAYA]: [59.8335, 30.3498],
  [LocationType.SPORTOVNAYA]: [59.9515, 30.2916],
} as const;
