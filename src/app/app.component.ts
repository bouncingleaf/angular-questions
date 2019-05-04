import { Component } from '@angular/core';
import { QuestionService } from './question/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [QuestionService]
})
export class AppComponent {
  title = 'angular-questions';
}
