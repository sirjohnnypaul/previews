import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './modules/app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from './modules/material.module';
import {LoginDialogComponent} from './dialogs/login-dialog/login-dialog.component';
import {RegistrationDialogComponent} from './dialogs/registration-dialog/registration-dialog.component';
import {ProductInfoDialogComponent} from './dialogs/product-info-dialog/product-info-dialog.component';
import {ProductsListComponent} from './home/products-list/products-list.component';
import {ProductService} from './services/product.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {SettingsComponent} from './home/settings/settings.component';
import {HistoryComponent} from './home/history/history.component';
import {PlansComponent} from './home/plans/plans.component';
import {PaymentsComponent} from './home/payments/payments.component';
import {FeedbackComponent} from './home/feedback/feedback.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginDialogComponent,
        RegistrationDialogComponent,
        ProductInfoDialogComponent,
        ProductsListComponent,
        SettingsComponent,
        HistoryComponent,
        PlansComponent,
        PaymentsComponent,
        FeedbackComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [ProductService, AuthService, AuthGuardService, ProductsListComponent],
    bootstrap: [AppComponent],
    entryComponents: [LoginDialogComponent, RegistrationDialogComponent, ProductInfoDialogComponent]
})
export class AppModule {
}
