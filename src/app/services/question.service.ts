import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { IQuestionHttp } from '../models/question-http.interface';

export interface Question {
  id: string;
  question: string;
  answer: string;
  distractors: string[];
}

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(pageNumber?: number, pageSize?: number): Observable<IQuestionHttp> {
    let url = '/api/question-list';
    if (pageNumber) {
      url += `?pageNumber=${pageNumber}`;
      if (pageSize) {
        url += `&pageSize=${pageSize}`;
      }
    }
    return this.http.get<IQuestionHttp>(url);
  }

  saveQuestion(question: Question) {
    return this.http.post(`/api/question/${question.id}`, JSON.stringify(question)).pipe(
      share()
    );
  }
}
