import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  categories : Category[];
  categoryAddForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formBuilder:FormBuilder
   ) { }

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      categoryName: ["", Validators.required]
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    })
  }


  add() {


    if (this.categoryAddForm.valid) {
          let categoryModel = Object.assign({}, this.categoryAddForm.value);

          this.categoryService.add(categoryModel).subscribe(
            (response) => {
              this.toastrService.success(response.message, 'başarılı');
              this.getCategories();

            },
            (responseError) => {

              if (responseError.error.Errors.length > 0) {
                console.log(responseError)
                console.log(responseError.error.Errors);
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(
                    responseError.error.Errors[i].ErrorMessage,
                    'Doğrulama hatası'
                  );
                }
              }
            }
          );
        }

  }

  delete(category: Category) {
    this.categoryService.delete(category).subscribe(response => {
      this.toastrService.success(category.categoryName + " kategorisi silindi", "Silme işlemi başarılı");
      this.getCategories();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }

}
