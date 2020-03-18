export interface ProductModel {
  id: string;
  name: string;
  url: string;
  urlToBuy: string;
  priceStart: number;
  priceCurrent: number;
  priceHighest: number;
  priceLowest: number;
  dateAdded: string;
  dateLastChecked: string;
  dateHighest: string;
  dateLowest: string;
  store_id: string;
  is_active: boolean;
}
