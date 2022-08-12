import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  note : any = [];
  bin : any = [];

  constructor() { }
}
