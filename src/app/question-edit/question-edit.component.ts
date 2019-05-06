import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Question } from './../state/question.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html'
})
export class QuestionEditComponent implements OnInit {
  @Input() question: Question;
  @Output() saveEdit = new EventEmitter<Question>();
  @Output() removeDistractor = new EventEmitter<{question: Question, index: number}>();
  @Output() addDistractor = new EventEmitter<Question>();
  @Output() delete = new EventEmitter<Question>();

  questionEditForm = this.formBuilder.group({
    questionName: ['', Validators.required],
    answer: [''],
    distractors: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.updateForm(this.question);
  }

  updateForm(question: Question) {
    this.questionEditForm.controls.questionName.setValue(question.question);
    this.questionEditForm.controls.answer.setValue(question.answer);
    this.questionEditForm.controls.distractors.setValue(question.distractors);
  }

  get distractors() {
    return this.questionEditForm.get('distractors') as FormArray;
  }

  addAnotherDistractor() {
    this.distractors.push(this.formBuilder.control(''));
  }

  onSubmit() {
    console.warn(this.questionEditForm.value);
  }

}
