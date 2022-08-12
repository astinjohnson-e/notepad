import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import {NoteService} from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnDestroy {
  title = 'Notes App';
  value_title!: string;
  value_content!: string;
  button : string = 'disabled';
  index!: number;
  updates : boolean = true;

  constructor(private noteService : NoteService, private jwtService : JwtService) {
   }

  ngOnDestroy(): void {
    this.jwtService.check(); 
  }

  notesForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  noteForm() {
    this.noteService.note.push(Object.values(this.notesForm.value));
    this.notesForm.reset();
  }

  receiveIndex( index : number ) {
    this.updates = false;;
    this.value_title = this.noteService.note[index][0];
    this.value_content = this.noteService.note[index][1];
    this.index = index;
  }

  update(){
    this.noteService.note[this.index][0] = this.notesForm.value.title ? this.notesForm.value.title : this.noteService.note[this.index][0];
    this.noteService.note[this.index][1] = this.notesForm.value.content ? this.notesForm.value.content : this.noteService.note[this.index][1];
    this.notesForm.reset();
    this.updates = true;
  }
}

