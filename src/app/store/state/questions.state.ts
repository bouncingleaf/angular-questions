import { IQuestion } from '../../models/question.interface';

export interface IQuestionState {
  questions: IQuestion[];
  selectedQuestion: IQuestion;
}

export const initialQuestionState: IQuestionState = {
  questions: null,
  selectedQuestion: null
}
