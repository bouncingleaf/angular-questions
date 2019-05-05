import { Component, OnInit } from '@angular/core';
import uuid from 'uuid';
// import { ID } from '@datorama/akita';

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
    this.question = this.questionsQuery.getActive() ||
      {
        id: '',
        question: '',
        answer: '',
        distractors: []
      };
    console.log(this.question);
    this.title = this.question.id ? 'Edit' : 'New';
    // Set up a new id for a new question
    if (!this.question.id) {
      this.question.id = uuid();
    }
  }

  addDistractor(question: Question) {
    question.distractors.push('');
    console.log(question);
    this.saveEdit(question);
  }

  removeDistractor(data: {question: Question, index: number}) {
    data.question.distractors.splice(data.index, 1);
    console.log(data.question);
    this.saveEdit(data.question);
  }

  saveEdit(question: Question) {
    this.questionsService.update(question.id, question);
  }

}
