import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import uuid from 'uuid';

import { QuestionsStore } from './questions.store';
import { Question } from './question.model';

@Injectable({ providedIn: 'root' })
export class QuestionsService {

  constructor(
    private questionsStore: QuestionsStore,
    private http: HttpClient) {
  }

  getQuestions(pageNumber?: number, pageSize?: number) {
    let url = '/api/question-list';
    if (pageNumber) {
      url += `?pageNumber=${pageNumber}`;
      if (pageSize) {
        url += `&pageSize=${pageSize}`;
      }
    }
    this.http.get<Question[]>(url).subscribe(res => {
      this.questionsStore.set(res);
    });
  }

  add(): string {
    const newId = uuid();
    const newQuestion = {
      id: newId,
      question: 'New Question',
      answer: '',
      distractors: []
    };
    this.update(newQuestion);
    return newId;
  }

  update(question: Partial<Question>) {
    this.questionsStore.upsert(question.id, question);
    this.http.post('/api/question/update/' + question.id, {question});
  }

  delete(id: ID) {
    this.questionsStore.remove(id);
    this.http.delete('/api/question/delete/' + id, {});
  }

}
