import { Component, Input, OnInit } from '@angular/core';
import notes from './../../shared/notesDict';

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css']
})
export class MirrorComponent implements OnInit {

  constructor() { }

  @Input('notesInput') notesInput;
  @Input('musicName') musicName;
  @Input('instrumentInput') instrumentInput;;
  @Input('instrumentType') instrumentType = null;
  @Input('index') index;

  ngOnInit(): void {

  }

  getNote(n){
    return notes[n.toLowerCase()][this.instrumentInput.toLowerCase()][this.instrumentType || 'default'].find(Boolean);
  }

  convertLine(line){
    let notes = line.split(' ');
    if(!notes) return;
    let convertedNotes = notes.map(x => x ? `<a>${this.getNote(x)}</a>` : null);
    
    return convertedNotes.join(' ');
    
  }

  

}
