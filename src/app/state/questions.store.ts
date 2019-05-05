import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Question } from './question.model';

export interface QuestionsState extends EntityState<Question>, ActiveState {
  questions: Question[];
}

const initialState = {
  active: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'questions' })
export class QuestionsStore extends EntityStore<QuestionsState, Question> {

  constructor() {
    super(initialState);
  }

}

