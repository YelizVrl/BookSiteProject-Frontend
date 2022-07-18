import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from 'src/app/models/book-details';
import { BookImage } from 'src/app/models/book-image';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  //books: Book[] = [];
  bookDetails: BookDetails[] = [];
  bookImage:BookImage[]=[];

  filterText: string = ""


  imageUrl:string="https://localhost:44389/Uploads/images/"


  dataLoaded = false;

  constructor(private bookService:BookService,
     private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getBooksByCategory(params["categoryId"])
      }
      else if(params["writerId"]){
        this.getBooksByWriter(params["writerId"])
      }
      else if(params["publishingHouseId"]){
        this.getBooksByPublishingHouse(params["publishingHouseId"])
      }
      else{
        this.getBooks()
      }
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe(response=>{
      this.bookDetails = response.data
      this.dataLoaded = true;
    })

  }

  getBooksByCategory(categoryId:number) {
    this.bookService.getBooksByCategory(categoryId).subscribe(response=>{
      this.bookDetails = response.data
      this.dataLoaded = true;
    })
  }

  getBooksByWriter(writerId:number) {
    this.bookService.getBooksByWriter(writerId).subscribe(response=>{
      this.bookDetails = response.data
      this.dataLoaded = true;
    })
  }

  getBooksByPublishingHouse(publishingHouseId:number) {
    this.bookService.getBooksByPublishingHouse(publishingHouseId).subscribe(response=>{
      this.bookDetails = response.data
      this.dataLoaded = true;
    })
  }





}
