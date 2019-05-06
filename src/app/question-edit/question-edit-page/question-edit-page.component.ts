import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Question } from './../../state/question.model';
import { QuestionsQuery } from './../../state/questions.query';
import { QuestionsService } from './../../state/questions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-edit-page',
  templateUrl: './question-edit-page.component.html'
})
export class QuestionEditPageComponent implements OnInit {
  question$: Observable<Question>;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsQuery: QuestionsQuery,
    private questionsService: QuestionsService
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.question$ = this.questionsQuery.selectEntity(this.id, question => {
      return question;
    });
  }

  saveEdit(question: Question) {
    console.log('saving ', question);
    this.questionsService.update(question);
    console.log('updated ', question);
    this.router.navigate(['/']);
  }

  deleteQuestion(question) {
    this.questionsService.delete(question.id);
  }

}
