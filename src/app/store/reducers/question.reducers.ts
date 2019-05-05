import { initialQuestionState, IQuestionState } from './../state/questions.state';
import { QuestionActions, EQuestionActions } from './../actions/question.actions';

export function questionReducers(
  state = initialQuestionState,
  action: QuestionActions
): IQuestionState {
  switch (action.type) {
    case EQuestionActions.GetQuestionsSuccess: {
      return {
        ...state,
        questions: action.payload
      };
    }
    case EQuestionActions.GetSelectedQuestionSuccess: {
      return {
        ...state,
        selectedQuestion: action.payload
      };
    }
    default:
      return state;
  }
}
