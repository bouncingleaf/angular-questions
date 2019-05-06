import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';

import { Question } from './../../state/question.model';
import { QuestionsQuery } from './../../state/questions.query';
import { QuestionsService } from './../../state/questions.service';

@Component({
  selector: 'app-question-list-page',
  templateUrl: './question-list-page.component.html'
})
export class QuestionListPageComponent implements OnInit {
  // Observable for the list of questions
  questions$: Observable<Question[]>;

  // Observable that indicates if the page is still loading
  loading$: Observable<boolean>;

  constructor(
    private questionsQuery: QuestionsQuery,
    private questionsService: QuestionsService
    ) {}

  ngOnInit() {
    // Observable the questions from the store
    this.questions$ = this.questionsQuery.selectAllQuestions$;
    // Is it still loading?
    this.loading$ = this.questionsQuery.selectLoading();
  }

  delete(id: ID) {
    // Deletes a question
    this.questionsService.delete(id);
  }

}
