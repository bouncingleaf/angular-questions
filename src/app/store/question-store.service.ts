import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Based on
// https://dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8

@Injectable({providedIn: 'root'})
export class QuestionStore {

  private readonly _questionList = new BehaviorSubject<any[]>([]);

  // Expose the observable
  readonly questionList$ = this._questionList.asObservable();

  // Getter will return the last value emitted
  private get questionList(): any[] {
    return this._questionList.getValue();
  }

  // Setter pushes the value on the observable and to its subscribers
  private set questionList(newQuestionList: any[]) {
    this._questionList.next(newQuestionList);
  }

  getQuestions() {
    return this._questionList;
  }

}

