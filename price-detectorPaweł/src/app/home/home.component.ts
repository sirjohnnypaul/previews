import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validator, ValidatorFn, Validators} from '@angular/forms';
import {ProductNewModel} from '../models/productNew.model';
import {ProductService} from '../services/product.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {ProductsListComponent} from './products-list/products-list.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('sideMenu') sideMenu: ElementRef;

    private dialog: MatDialog;
    // private productListComponentObj = new ProductsListComponent(this.dialog, this.productService);

    newProductForm;

    constructor(private productService: ProductService, private authService: AuthService, private router: Router,
                private productsListComponent: ProductsListComponent) {
    }

    ngOnInit() {
        this.newProductForm = new FormGroup({
            name: new FormControl(null, [Validators.required, this.checkPassedProductUrl.bind(this)])
        });
        this.router.navigate(['/products']);
    }

    onSideBarRightOpen(): void {
        console.log('it works');
        this.sideMenu.nativeElement.toggle();
    }

    onAddNewProduct() {
        const newProductData: ProductNewModel = {
            url: this.newProductForm.value.name,
            store_id: '1'
        };

        this.productService.addNewProduct(newProductData).subscribe(
            (response) => {
                console.log(response);
                this.productsListComponent.appendProductToList();
            }, (error) => {
                console.log(error);
            }
        );
        console.log('product added');
    }

    onLogout() {
        this.authService.logout();
    }

    checkPassedProductUrl(urlData: FormControl): { [k: string]: boolean } | null {
        const url = urlData.value;
        const reg = new RegExp('^https\:\/\/www\.x\-kom\.pl\/[a-zA-Z0-9]', 'ig');

        if (!reg.test(url)) {
            return {'urlIsInvalid': true};
        }
        return null;
    }
}
