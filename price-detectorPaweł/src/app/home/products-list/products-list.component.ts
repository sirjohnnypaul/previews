import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource} from '@angular/material';
import {ProductInfoDialogComponent} from '../../dialogs/product-info-dialog/product-info-dialog.component';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    columnsToDisplay = ['productNumber', 'productName', 'productCurrentPrice', 'productStore', 'productBuyNow', 'productManage'];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private productService: ProductService) {
    }

    ngOnInit() {
        // this.dataSource.paginator = this.paginator;
        this.appendProductToList();
    }

    appendProductToList() {
        console.log('appendProductToList called');

        this.productService.getProducts().subscribe(
            (productsList) => {
                console.log('subscription called');

                this.dataSource = new MatTableDataSource<ProductModel>(productsList);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onProductInfoDialogOpen(product: ProductModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        this.productService.setSelectedProduct(product);
        this.dialog.open(ProductInfoDialogComponent, dialogConfig);
    }
}


