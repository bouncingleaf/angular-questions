import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Question, QuestionService } from './question.service';
import { QuestionStore } from './../store/question-store.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionsToShow$: Observable<Question[]>;

  constructor(
    private questionSvc: QuestionService,
    private questionStore: QuestionStore
  ) {}

  ngOnInit() {
    this.questionsToShow$ = this.questionSvc.getQuestions(2, 3);
  }

}
