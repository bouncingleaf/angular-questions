import { RouterReducerState } from '@ngrx/router-store';
import { IQuestionState, initialQuestionState } from './questions.state';

export interface IAppState {
  router?: RouterReducerState;
  questions: IQuestionState;
}

export const initialAppState: IAppState = {
  questions: initialQuestionState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
