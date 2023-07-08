import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs/internal/observable/interval';
import { questionmod } from '../model/questionmod';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionModelObj : questionmod = new questionmod();
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
   /* this.questionService.getQuestionJson()   
      .subscribe(res => {
        this.questionList = res.questions;
      }) */
    this.questionService.getQuestionJsonServer()
    .subscribe(res=>{
      this.questionModelObj=res;
      this.questionList = this.questionModelObj;
    })  
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any) {

    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      setTimeout(() => {
        this.correctAnswer++;
        if (this.currentQuestion != this.questionList.length - 1) {
          this.currentQuestion++;//Go to the next question       
        }
        this.resetCounter();
        this.getProgressPercent();
      }, 1000)


    } else {


      setTimeout(() => {
        this.incorrectAnswer++;
        if (this.currentQuestion != this.questionList.length - 1) {
          this.currentQuestion++;
        }
        this.resetCounter();
        this.getProgressPercent();
      }, 1000)


      this.points -= 10; // Deduct marks for wrong answer 

    }
  }



  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);

  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPercent() {
    this.progress = (((this.currentQuestion + 1) / this.questionList.length) * 100).toString();
    return this.progress;
  }
}
