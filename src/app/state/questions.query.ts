import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QuestionsStore, QuestionsState } from './questions.store';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsQuery extends QueryEntity<QuestionsState, Question> {

  selectAllQuestions$ = this.selectAll();

  constructor(protected store: QuestionsStore) {
    super(store);
  }

}
