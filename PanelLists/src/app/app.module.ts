import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { PanelListsComponent } from './components/panel-lists/panel-lists.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AllocationComponent } from './components/allocation/allocation.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import { AgmCoreModule } from '@agm/core';
import { ProgressLoadingComponent } from './components/progress-loading/progress-loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { SortingComponent } from './components/sorting/sorting.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavMenuComponent,
    PanelListsComponent,
    PageNotFoundComponent,
    AllocationComponent,
    PaymentsComponent,
    LoginComponent,
    FilterMenuComponent,
    ProgressLoadingComponent,
    DialogTemplateComponent,
    SortingComponent
  ],
  entryComponents: [DialogTemplateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUmKKz8gTtLQCTxMJfOGQ8JyC9CNMsyvQ'
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
