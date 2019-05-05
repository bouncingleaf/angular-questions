import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ID } from '@datorama/akita';

import { Question } from './../../state/question.model';
import { QuestionsQuery } from './../../state/questions.query';
import { QuestionsService } from './../../state/questions.service';

@Component({
  selector: 'app-question-list-page',
  templateUrl: './question-list-page.component.html'
})
export class QuestionListPageComponent implements OnDestroy, OnInit {
  questions$: Observable<Question[]>;
  loading$: Observable<boolean>;
  questionsSubscription: Subscription;

  constructor(
    private questionsQuery: QuestionsQuery,
    private questionsService: QuestionsService
    ) {}

  ngOnInit() {
    this.questions$ = this.questionsQuery.selectAllQuestions$;
    this.loading$ = this.questionsQuery.selectLoading();

    this.questionsSubscription = this.questionsService.get().subscribe();
  }

  ngOnDestroy() {
    this.questionsSubscription.unsubscribe();
    this.questionsSubscription = null;
  }

  add(question: Question) {
    this.questionsService.add(question);
  }

  delete(id: ID) {
    this.questionsService.delete(id);
  }

  setActive(id: ID) {
    this.questionsService.setActive(id);
  }

}
