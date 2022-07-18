export interface BookDetails {
  bookId:number;
  categoryId:number;
  writerId:number;
  publishingHouseId:number;
  bookName:string;
  writerName:string;
  categoryName:string;
  publishingHouseName:string;
  coverTypeName:string;
  pageNumber:string;
  pageTypeName:string;
  price:number;
  description:string;
  imagePath:string[];

  // isRentable:boolean;
  // findeks:number;

}
