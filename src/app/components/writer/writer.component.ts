import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Writer } from 'src/app/models/writer';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit {

  writers: Writer[] = [];
  currentWriter: Writer;

  dataLoaded = false;
  filterText = '';

  constructor(private writerService:WriterService,
    private router:Router) { }

  ngOnInit(): void {
    this.getWriters();
  }

  getWriters() {
    this.writerService.getWriters().subscribe(response=>{
      this.writers = response.data
      this.dataLoaded = true;
    })
  }

  setCurrentWriter(writer:Writer){
    this.currentWriter = writer;
  }

  getCurrentWriterClass(writer:Writer){
    if(writer == this.currentWriter ){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }


  getAllWriterClass(){
    if(!this.currentWriter ){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  CleanCurrentWriter() {
    this.currentWriter == null;
  }

  resetCurrentWriter() {
    this.currentWriter = {writerId:0, writerName:""};
  }

  goWriterManager(){
    this.router.navigate(["writers/manager"])
  }

}
