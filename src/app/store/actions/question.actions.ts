import { Action } from '@ngrx/store';
import { IQuestion } from '../../models/question.interface';

export enum EQuestionActions {
  GetQuestions = '[Question] Get Questions',
  GetQuestionsSuccess = '[Question] Get Questions Success',
  GetSelectedQuestion = '[Question] Get Selected Question',
  GetSelectedQuestionSuccess = '[Question] Get Selected Question Success'
}

export class GetQuestions implements Action {
  public readonly type = EQuestionActions.GetQuestions;
}

export class GetQuestionsSuccess implements Action {
  public readonly type = EQuestionActions.GetQuestionsSuccess;
  constructor(public payload: IQuestion[]) {}
}

export class GetSelectedQuestion implements Action {
  public readonly type = EQuestionActions.GetSelectedQuestion;
  constructor(public payload: string) {}
}

export class GetSelectedQuestionSuccess implements Action {
  public readonly type = EQuestionActions.GetSelectedQuestionSuccess;
  constructor(public payload: IQuestion) {}
}

export type QuestionActions = GetQuestions | GetQuestionsSuccess | GetSelectedQuestion | GetSelectedQuestionSuccess;
