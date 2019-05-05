import { ID } from '@datorama/akita';

export interface Question {
  id: ID;
  question: string;
  answer: string;
  distractors: string[];
}

/**
 * A factory function that creates Questions
 */
export function createQuestion(params: Partial<Question>) {
  return {
    id: params.id,
    question: params.question,
    answer: params.answer,
    distractors: params.distractors
  } as Question;
}
