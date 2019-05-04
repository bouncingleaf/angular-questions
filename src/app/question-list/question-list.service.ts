import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: string;
  question: string;
  answer: string;
  distractors: string[];
}

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(pageNumber?: number, pageSize?: number): Observable<Question[]> {
    return !pageNumber ?
      this.http.get<Question[]>('/api/question-list') :
      pageSize ?
      this.http.get<Question[]>(`/api/question-list?pageNumber=${pageNumber}`) :
      this.http.get<Question[]>(`/api/question-list?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
