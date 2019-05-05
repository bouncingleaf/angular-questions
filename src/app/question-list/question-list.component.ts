import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Question, QuestionService } from '../services/question.service';
import { selectQuestionList } from './../store/selectors/question.selector';
import { IAppState } from './../store/state/app.state';
import { GetQuestions } from './../store/actions/question.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionComponent implements OnInit {
  questionsToShow$: Observable<Question[]>;

  questions$ = this._store.pipe(
    select(selectQuestionList)
  );

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private questionSvc: QuestionService
  ) {}

  ngOnInit() {
    this._store.dispatch(new GetQuestions());
    // this.questionsToShow$ = this.questionSvc.getQuestions(2, 3);
  }

  navigateToQuestion(id: string) {
    this._router.navigate(['question', id]);
  }
}
