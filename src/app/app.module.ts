import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { WriterComponent } from './components/writer/writer.component';
import { PublishingHouseComponent } from './components/publishing-house/publishing-house.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { MainDashboardComponent } from './components/layout/main-dashboard/main-dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { BookManagerComponent } from './components/admin/book-manager/book-manager.component';
import { CategoryManagerComponent } from './components/admin/category-manager/category-manager.component';
import { WriterManagerComponent } from './components/admin/writer-manager/writer-manager.component';
import { PublishingHouseManagerComponent } from './components/admin/publishing-house-manager/publishing-house-manager.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { BookAddComponent } from './components/admin/book-add/book-add.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BookUpdateComponent } from './components/admin/book-update/book-update.component';
import { WriterFilterPipe } from './pipes/writer-filter.pipe';
import { PublishingHouseFilterPipe } from './pipes/publishing-house-filter.pipe';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { BookFilterPipe } from './pipes/book-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CategoryComponent,
    NaviComponent,
    WriterComponent,
    PublishingHouseComponent,
    BookDetailsComponent,
    LoginComponent,
    MainDashboardComponent,
    FooterComponent,
    RegisterComponent,
    BookManagerComponent,
    CategoryManagerComponent,
    WriterManagerComponent,
    PublishingHouseManagerComponent,
    AdminLayoutComponent,
    BookAddComponent,
    BookUpdateComponent,
    WriterFilterPipe,
    PublishingHouseFilterPipe,
    CategoryFilterPipe,
    BookFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
