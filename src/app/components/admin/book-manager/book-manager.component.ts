import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookDetails } from 'src/app/models/book-details';
import { BookImagesService } from 'src/app/services/book-images.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  books: BookDetails[];


  constructor(private bookService: BookService,
    private bookImagesService: BookImagesService,
    private toastrService: ToastrService
   ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getImagePath(imagePath: string) {
    return this.bookImagesService.getImagePath(imagePath);
  }

  getBooks() {
    this.bookService.getBooks().subscribe(response => {
      this.books = response.data;
    })
  }

  delete(book: BookDetails) {
    this.bookService.delete(book).subscribe(response => {
      this.toastrService.success(book.bookName + " kitabı silindi", "Silme işlemi başarılı");
      this.getBooks();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız");
    })
  }

}
