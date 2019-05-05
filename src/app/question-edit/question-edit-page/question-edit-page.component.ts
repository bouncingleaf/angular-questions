import { Component, OnInit } from '@angular/core';
import uuid from 'uuid';

import { Question } from './../../state/question.model';
import { QuestionsQuery } from './../../state/questions.query';
import { QuestionsService } from './../../state/questions.service';

@Component({
  selector: 'app-question-edit-page',
  templateUrl: './question-edit-page.component.html'
})
export class QuestionEditPageComponent implements OnInit {
  question: Question;
  title: string;

  constructor(
    private questionsQuery: QuestionsQuery,
    private questionsService: QuestionsService
    ) {}

  ngOnInit() {
    this.question = this.questionsQuery.getActive();
    console.log('getActive said: ', this.question);
    this.question = this.question ||
      {
        id: '',
        question: '',
        answer: '',
        distractors: []
      };
    console.log('initialized with', this.question);
    this.title = this.question.id ? 'Edit' : 'New';
    if (!this.question.id) {
      this.question.id = uuid();
    }
  }

  addDistractor(question: Question) {
    question.distractors.push('');
    console.log('adding d', question.distractors);
    this.saveEdit(question);
  }

  removeDistractor(data: {question: Question, index: number}) {
    data.question.distractors.splice(data.index, 1);
    console.log('removing d', data.question.distractors);
    this.saveEdit(data.question);
  }

  saveEdit(question: Question) {
    console.log('saving', question);
    this.questionsService.update(question);
  }

}
