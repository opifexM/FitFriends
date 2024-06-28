export interface TrainingPaginationInterface<T> {
  entities: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  priceMin: number;
  priceMax: number;
  caloriesMin: number;
  caloriesMax: number;
  ratingMin: number;
  ratingMax: number;
}
