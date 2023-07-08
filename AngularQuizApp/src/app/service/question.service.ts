import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor( private http : HttpClient ) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json")
  }

  getQuestionJsonServer(){
    return this.http.get<any>("http://localhost:3000/questions")
    .pipe(map((res:any)=>{
      return res;
    }))

  }
}
