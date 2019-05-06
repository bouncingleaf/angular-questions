import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../state/questions.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Kick off getting the questions from the API
    // Sometimes this appears to load twice...
    this.questionsService.getQuestions();
  }

  addNewQuestion() {
    const id = this.questionsService.add();
    this.router.navigate([`/edit/${id}`]);
  }

}
