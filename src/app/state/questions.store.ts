import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Question } from './question.model';

export interface QuestionsState extends EntityState<Question> {
  questions: Question[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'questions' })
export class QuestionsStore extends EntityStore<QuestionsState, Question> {

  constructor() {
    super();
  }

}

