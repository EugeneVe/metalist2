import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Match } from '../../../model/match.interface';

@Component({
  selector: 'match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})

export class MatchListComponent {
  
  @Input() matches: Match[] = [];
  
  @Input() type: string;
  
  @Output() deleteMatch: EventEmitter<any> = new EventEmitter();
  @Output() editMatch: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClick(match: Match) {
    if(this.type === 'prev') {
      this.deleteMatch.emit(match.id);
    } else {
      this.editMatch.emit(match);
    }
  }
}
