import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { IAppState } from './../state/app.state';
import {
  EQuestionActions,
  GetQuestions,
  GetQuestionsSuccess,
  GetSelectedQuestion,
  GetSelectedQuestionSuccess
} from './../actions/question.actions';
import { QuestionService } from './../../services/question.service';
import { IQuestionHttp } from '../../models/question-http.interface';
import { selectQuestionList } from '../selectors/question.selector';

@Injectable()
export class QuestionEffects {
  constructor(
    // tslint:disable-next-line: variable-name
    private _questionService: QuestionService,
    // tslint:disable-next-line: variable-name
    private _action$: Actions,
    // tslint:disable-next-line: variable-name
    private _store: Store<IAppState>
  ) {}

  @Effect()
  getSelectedQuestion$ = this._action$.pipe(
    ofType<GetSelectedQuestion>(EQuestionActions.GetSelectedQuestion),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectQuestionList))),
    switchMap(([id, questions]) => {
      const selectedQuestion = questions.filter(question => question.id === id)[0];
      return of(new GetSelectedQuestionSuccess(selectedQuestion));
    })
  );

  @Effect()
  getQuestions$ = this._action$.pipe(
    ofType<GetQuestions>(EQuestionActions.GetQuestions),
    switchMap(() => this._questionService.getQuestions()),
    switchMap((questionHttp: IQuestionHttp) => of(new GetQuestionsSuccess(questionHttp.questions)))
  );

}
