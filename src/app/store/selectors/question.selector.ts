import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IQuestionState } from '../state/question.state';

const selectQuestions = (state: IAppState) => state.questions;

export const selectQuestionList = createSelector(
  selectQuestions,
  (state: IQuestionState) => state.questions
);

export const selectSelectedQuestion = createSelector(
  selectQuestions,
  (state: IQuestionState) => state.selectedUser
);
