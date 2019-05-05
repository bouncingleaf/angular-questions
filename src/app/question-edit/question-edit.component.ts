import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from './../state/question.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent {
  @Input() title: string;
  @Input() question: Question;
  @Output() saveEdit = new EventEmitter<Question>();
  @Output() removeDistractor = new EventEmitter<{question: Question, index: number}>();
  @Output() addDistractor = new EventEmitter<Question>();

}
