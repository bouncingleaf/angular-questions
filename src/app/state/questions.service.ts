import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { QuestionsStore } from './questions.store';
import { Question } from './question.model';
// import { tap } from 'rxjs/operators';

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
    console.log('url', url);

    this.http.get<Question[]>(url).subscribe(res => {
      console.log('res', res);
      this.questionsStore.set(res);
    });
  }

  update(question: Partial<Question>) {
    console.log('saving', question.id, question);
    this.questionsStore.upsert(question.id, question);
    this.http.post('/question/update/' + question.id, {question});
  }

  delete(id: ID) {
    this.questionsStore.remove(id);
    this.http.post('/question/delete/' + id, {});
  }

  // edit(id: ID) {
  //   // Set this as the active entity
  //   this.questionsStore.setActive(id);
  //   // Go to the entity update page
  //   this.http.get('/question/' + id);
  // }
}
