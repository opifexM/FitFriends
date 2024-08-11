export interface MyOrder<T> {
  training: T;
  totalAmount: number;
  totalNumber: number;
}

export interface MyOrderPagination<T> {
  entities: MyOrder<T>[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}
