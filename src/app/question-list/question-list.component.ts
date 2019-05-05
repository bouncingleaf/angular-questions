import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ID } from '@datorama/akita';
import { Question } from '../state/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html'
})
export class QuestionListComponent implements OnInit {
  @Input() loading: boolean;
  @Input() questions: Question[];
  @Output() delete = new EventEmitter<ID>();

  constructor() {}

  ngOnInit() {
  }

}
