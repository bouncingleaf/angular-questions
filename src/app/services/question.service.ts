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

  // getQuestions(pageNumber?: number, pageSize?: number): Observable<Question[]> {
  //   return !pageNumber ?
  //     this.http.get<Question[]>('/api/question-list') :
  //     pageSize ?
  //     this.http.get<Question[]>(`/api/question-list?pageNumber=${pageNumber}`) :
  //     this.http.get<Question[]>(`/api/question-list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  // }

  getQuestions(pageNumber?: number, pageSize?: number): Observable<IQuestionHttp> {
    return !pageNumber ?
      this.http.get<IQuestionHttp>('/api/question-list') :
      pageSize ?
      this.http.get<IQuestionHttp>(`/api/question-list?pageNumber=${pageNumber}`) :
      this.http.get<IQuestionHttp>(`/api/question-list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  saveQuestion(question: Question) {
    return this.http.post(`/api/question/${question.id}`, JSON.stringify(question)).pipe(
      share()
    );
  }
}
