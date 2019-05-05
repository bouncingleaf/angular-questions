import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { QuestionsStore } from './questions.store';
import { Question } from './question.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QuestionsService {

  constructor(
    private questionsStore: QuestionsStore,
    private http: HttpClient) {
  }

  get(pageNumber?: number, pageSize?: number) {
    let url = '/api/question-list';
    if (pageNumber) {
      url += `?pageNumber=${pageNumber}`;
      if (pageSize) {
        url += `&pageSize=${pageSize}`;
      }
    }
    return this.http.get<Question[]>(url).pipe(
      tap(entities => {
        this.questionsStore.set(entities);
      })
    );
  }

  add(question: Question) {
    this.questionsStore.add(question);
  }

  update(id, question: Partial<Question>) {
    console.log('saving', id, question);
    this.questionsStore.update(id, question);
  }

  delete(id: ID) {
    this.questionsStore.remove(id);
    this.http.post('/question/delete/' + id, {});
  }

  setActive(id: ID) {
    this.questionsStore.setActive(id);
    this.http.get('/question/' + id);
  }
}
