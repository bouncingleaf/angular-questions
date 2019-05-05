import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

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
  questions$ = this._store.pipe(select(selectQuestionList));

  constructor(
    // tslint:disable-next-line: variable-name
    private _store: Store<IAppState>,
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) {}

  ngOnInit() {
    this._store.dispatch(new GetQuestions());
  }

  navigateToQuestion(id: string) {
    this._router.navigate(['question', id]);
  }
}
