import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from 'src/app/models/book-details';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  books: BookDetails[] = [];
  bookDetail: BookDetails;
  bookImagePaths:string[] = [];
  dataLoaded = false;
  imageUrl:string="https://localhost:44389/Uploads/images/"

  constructor(private bookService: BookService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      if(params['bookId']){
          this.getBooksDetailsByBookId(params['bookId'])

        }
    })

  }

  getBooksDetailsByBookId(bookId: number){
    this.bookService.getBooksDetailsByBookId(bookId).subscribe((response)=>{
      this.books=response.data
      this.bookDetail = response.data[0];
      this.bookImagePaths=this.bookDetail.imagePath
      this.dataLoaded = true;

    })
  }

}
