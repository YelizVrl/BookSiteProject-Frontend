import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { CoverType } from 'src/app/models/coverType';
import { PageType } from 'src/app/models/pageType';
import { PublishingHouse } from 'src/app/models/publishing-house';
import { Writer } from 'src/app/models/writer';
import { BookImagesService } from 'src/app/services/book-images.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { CoverTypeService } from 'src/app/services/cover-type.service';
import { PageTypeService } from 'src/app/services/page-type.service';
import { PublishingHouseService } from 'src/app/services/publishing-house.service';
import { WriterService } from 'src/app/services/writer.service';
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {


  bookAddForm: FormGroup;
  writers: Writer[] = [];
  publishingHouses: PublishingHouse[] = [];
  categories: Category[] = [];
  pageTypes:PageType[] = [];
  coverTypes:CoverType[] = [];


  successResultIcon:string = `<i class="bi bi-check-lg me-2 text-success"></i>`
  errorResultIcon:string = `<i class="bi bi-exclamation-lg me-2 text-danger"></i>`

  filePaths: string[] = [];
  bookPhotoForm:FormGroup
  bookPhotos:File[] = [];
  maxBookImageCount:number = 2

  spinnerText:string = ""

  constructor(private formBuilder:FormBuilder,
    private writerService:WriterService,
    private publishingHouseService:PublishingHouseService,
    private bookService:BookService,
    private categoryService:CategoryService,
    private coverTypeService:CoverTypeService,
    private pageTypeService:PageTypeService,
    private bookImagesService:BookImagesService,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBookAddForm();
    this.getAllWriters();
    this.getAllPublishingHouses();
    this.getAllCategories();
    this.getAllPageTypes();
    this.getAllCoverTypes();

  }

  createBookAddForm(){
    this.bookAddForm = this.formBuilder.group({
      bookName: ["", Validators.required],
      writerId: ["", Validators.required],
      publishingHouseId: ["", Validators.required],
      categoryId: ["", Validators.required],
      pageNumber: ["", Validators.required],
      pageTypeId: ["", Validators.required],
      coverTypeId: ["", Validators.required],
      price: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      description: ["", Validators.required]

    })
  }


  // addBook() {
  //   if (this.bookAddForm.valid) {
  //     let bookModel = Object.assign({}, this.bookAddForm.value);
  //     bookModel.writerId = parseInt(this.bookAddForm.value.writerId)
  //     bookModel.publishingHouseId = parseInt(this.bookAddForm.value.publishingHouseId)
  //     bookModel.categoryId = parseInt(this.bookAddForm.value.categoryId)
  //     bookModel.pageTypeId = parseInt(this.bookAddForm.value.pageTypeId)
  //     bookModel.coverTypeId = parseInt(this.bookAddForm.value.coverTypeId)

  //     console.log(bookModel);
  //     this.bookService.add(bookModel).subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.toastrService.success(response.message, 'başarılı');

  //       },
  //       (responseError) => {

  //         if (responseError.error.Errors.length > 0) {
  //           console.log(responseError)
  //           console.log(responseError.error.Errors);
  //           for (let i = 0; i < responseError.error.Errors.length; i++) {
  //             this.toastrService.error(
  //               responseError.error.Errors[i].ErrorMessage,
  //               'Doğrulama hatası'
  //             );
  //           }
  //         }
  //       }
  //     );
  //   } else {
  //     this.toastrService.error('Formunuz eksik', 'dikkat');
  //   }
  // }








  checkBookAddButton() {
    return this.bookAddForm.valid // && this.carDetailAddForm.valid && this.carPhotos.length>0
  }

  imagePreview(event:any) {

    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.bookPhotos.push(file)

    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.push(reader.result as string);
    }
    reader.readAsDataURL(file)
    console.log(event)
    event.srcElement.value = ""
  }


  addBook() {

    if(!this.checkBookAddButton()) {
      this.toastrService.error("Bilgiler eksik, lütfen kontrol ediniz.")
      return
    }

    if (this.bookAddForm.valid) {
          let bookModel = Object.assign({}, this.bookAddForm.value);
          bookModel.writerId = parseInt(this.bookAddForm.value.writerId)
          bookModel.publishingHouseId = parseInt(this.bookAddForm.value.publishingHouseId)
          bookModel.categoryId = parseInt(this.bookAddForm.value.categoryId)
          bookModel.pageTypeId = parseInt(this.bookAddForm.value.pageTypeId)
          bookModel.coverTypeId = parseInt(this.bookAddForm.value.coverTypeId)


          this.bookService.add(bookModel).subscribe(
            (response) => {
              console.log(response)
              this. bookPhotos.forEach(photo => {
                console.log(response.data)
                this. bookImagesService.uploadBookImage(photo, response.data.bookId).subscribe(photoResponse => {

                  console.log(photoResponse)
                  this.spinner.hide()
                }, errorResponse => {
                  console.log(errorResponse)
                  this.errorOccurred()
                })
              });



              this.toastrService.success(response.message, 'başarılı');

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



    //TODo: Model Year Çalışmıyor. Backend patlıyor.
    // this. bookService.add( bookModel).subscribe(response => {

    //   this.spinnerText = "Araba bilgileri eklendi. Araba fotoğrafları yükleniyor.."

    //   this. bookPhotos.forEach(photo => {
    //     this. bookImagesService.uploadBookImage(photo, response.data.bookId).subscribe(photoResponse => {
    //       console.log(photoResponse)
    //       this.spinner.hide()
    //     }, errorResponse => {
    //       console.log(errorResponse)
    //       this.errorOccurred()
    //     })
    //   });

    // }, errorResponse => {
    //   console.log(errorResponse)
    // })

    // return

  }

  removePhoto(index:number) {
    this.filePaths.splice(index, 1)
    this.bookPhotos.splice(index, 1)
  }

  checkBookImageCount() {
    return this.bookPhotos.length < this.maxBookImageCount
  }


  errorOccurred() {
    this.spinnerText = "Hata oluştu. Tekrar deneyin.."
    setTimeout(() => {
      this.spinner.hide()
    }, 1000);
  }
















  getAllWriters() {
    this.writerService.getWriters().subscribe(response => {
      this.writers = response.data
    })
  }

  getAllPublishingHouses() {
    this.publishingHouseService.getPublishingHouses().subscribe(response => {
      this.publishingHouses = response.data
    })
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  getAllPageTypes() {
    this.pageTypeService.getPageTypes().subscribe(response => {
      this.pageTypes = response.data
    })
  }

  getAllCoverTypes() {
    this.coverTypeService.getCoverTypes().subscribe(response => {
      this.coverTypes = response.data
    })
  }


}
