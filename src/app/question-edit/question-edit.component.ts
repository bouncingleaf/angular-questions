import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { GetSelectedQuestion } from './../store/actions/question.actions';
import { selectSelectedQuestion } from './../store/selectors/question.selector';
import { IAppState } from './../store/state/app.state';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  question$ = this._store.pipe(
    select(selectSelectedQuestion)
  );

  title: string;
  // question = {
  //   question: 'test',
  //   id: 4,
  //   answer: 'just a test',
  //   distractors: ['no', 'yes', 'maybe']
  // };

  constructor(
    // tslint:disable-next-line: variable-name
    private _store: Store<IAppState>,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute
    ) {}

  ngOnInit() {
    const idFromRoute = this._route.snapshot.paramMap.get('id');
    this.title = idFromRoute ? 'Edit' : 'New';
    this._store.dispatch(new GetSelectedQuestion(idFromRoute));
  }

}
