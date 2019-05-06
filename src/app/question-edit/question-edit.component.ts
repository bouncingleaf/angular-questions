import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question } from './../state/question.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent implements OnInit {
  @Input() question$: Observable<Question>;
  @Output() saveEdit = new EventEmitter<Question>();
  @Output() delete = new EventEmitter<Question>();

  questionEditForm = this.formBuilder.group({
    questionName: [''],
    answer: [''],
    distractors: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.question$ = this.question$.pipe(
      tap(question => {
        this.updateForm(question);
      })
    );
  }

  updateForm(question: Question) {
    if (question) {
      this.questionEditForm.controls.questionName.setValue(question.question);
      this.questionEditForm.controls.answer.setValue(question.answer);
      question.distractors.forEach(d => this.distractors.push(this.formBuilder.control(d)));
    }
  }

  get distractors() {
    return this.questionEditForm.get('distractors') as FormArray;
  }

  addDistractor() {
    this.distractors.push(this.formBuilder.control(''));
  }

  onSubmit() {
    const newQuestion = this.questionEditForm.value;
    this.saveEdit.emit({
      question: newQuestion.questionName,
      id: newQuestion.id,
      answer: newQuestion.answer,
      distractors: newQuestion.distractors
    });
  }

}
