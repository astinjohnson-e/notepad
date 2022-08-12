import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  notes : any =  this.noteService.note;
  constructor( private noteService : NoteService ) { }

  @Output() messageEvent = new EventEmitter<number>();

  ngOnInit(): void {
  }

  delete(index: number){
    this.noteService.bin.push(this.noteService.note.splice(index, 1)[0]);
    this.notes = this.noteService.note;
  }

  update( index: number ) {
    this.messageEvent.emit( index );
  }

}

