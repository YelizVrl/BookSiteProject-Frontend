import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { BookManagerComponent } from './components/admin/book-manager/book-manager.component';
import { BookUpdateComponent } from './components/admin/book-update/book-update.component';
import { CategoryManagerComponent } from './components/admin/category-manager/category-manager.component';
import { PublishingHouseManagerComponent } from './components/admin/publishing-house-manager/publishing-house-manager.component';
import { WriterManagerComponent } from './components/admin/writer-manager/writer-manager.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookComponent } from './components/book/book.component';
import { MainDashboardComponent } from './components/layout/main-dashboard/main-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"", component: MainDashboardComponent, outlet:"app"},
  {path:"", pathMatch:"full", component:BookComponent},
  {path:"books", component:BookComponent},
  {path:"books/category/:categoryId", component:BookComponent},
  {path:"books/writer/:writerId", component:BookComponent},
  {path:"books/publishingHouse/:publishingHouseId", component:BookComponent},
  {path:"books/bookdetail/:bookId",component:BookDetailsComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path: "admin/books/manager/update", component:BookUpdateComponent},

  {path: 'admin', component: AdminLayoutComponent, children: [
    { path: 'books/manager', component: BookManagerComponent},
    { path: 'category/manager', component: CategoryManagerComponent},
    { path: 'writer/manager', component: WriterManagerComponent },
    { path: 'publishingHouse/manager', component: PublishingHouseManagerComponent }

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
