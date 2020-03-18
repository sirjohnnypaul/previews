import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsListComponent} from '../home/products-list/products-list.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {SettingsComponent} from '../home/settings/settings.component';
import {HistoryComponent} from '../home/history/history.component';
import {PlansComponent} from '../home/plans/plans.component';
import {PaymentsComponent} from '../home/payments/payments.component';
import {FeedbackComponent} from '../home/feedback/feedback.component';

const routes: Routes = [
    {path: 'home', component: WelcomeComponent},
    {
        path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
            {path: 'products', component: ProductsListComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'history', component: HistoryComponent},
            {path: 'plans', component: PlansComponent},
            {path: 'payments', component: PaymentsComponent},
            {path: 'feedback', component: FeedbackComponent},
        ]
    },
    {path: 'products', component: ProductsListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
