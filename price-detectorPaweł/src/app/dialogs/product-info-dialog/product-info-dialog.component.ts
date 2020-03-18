import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-info-dialog',
  templateUrl: './product-info-dialog.component.html',
  styleUrls: ['./product-info-dialog.component.scss']
})
export class ProductInfoDialogComponent implements OnInit {
  currentProduct: ProductModel = this.productService.getSelectedProduct();
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onProductDelete() {

  }
}
