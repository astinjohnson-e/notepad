import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { JwtService } from '../jwt.service';


@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnDestroy {

  title = "Recycle Bin";

  bin : any = this.noteService.bin;

  constructor( private noteService : NoteService , private jwtService : JwtService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.jwtService.check(); 
  }

  delete(index: number){
    this.noteService.bin.splice(index, 1);
    this.bin = this.noteService.bin;
  }

  restore (index: number){
      this.noteService.note.push(this.noteService.bin.splice(index, 1)[0]);
      this.bin = this.noteService.bin;

  }


  clear (){
    this.noteService.bin = [];
    this.bin = this.noteService.bin;
  }

  restoreAll(){
    this.noteService.bin.forEach((element: any) => {
      this.noteService.note.push(element);
    });
    this.noteService.bin = [];
    this.bin = this.noteService.bin;

  }

}

