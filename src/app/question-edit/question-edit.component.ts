import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  title: string;
  question = {
    question: 'test',
    id: 4,
    answer: 'just a test',
    distractors: ['no', 'yes', 'maybe']
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id') ? 'Edit' : 'New';
  }

}
