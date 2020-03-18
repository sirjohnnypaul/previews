import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductNewModel} from '../models/productNew.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProduct: ProductModel;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getSelectedProduct(): ProductModel {
    return this.selectedProduct;
  }

  setSelectedProduct(product: ProductModel): void {
    this.selectedProduct = product;
  }

  getProducts() {
    const token = this.authService.getToken();

    const httpHeaders = {
      headers: new HttpHeaders( {
        'Authorization': 'Token ' + token
      })
    };

    return this.httpClient.get<ProductModel[]>('http://127.0.0.1:8000/api/products/', httpHeaders);
  }

  addNewProduct(product: ProductNewModel) {
    const token = this.authService.getToken();

    const httpHeaders = {
      headers: new HttpHeaders( {
        'Authorization': 'Token ' + token
      })
    };
    return this.httpClient.post('http://127.0.0.1:8000/api/products/', product, httpHeaders);
  }

  deleteProduct() {}
}
