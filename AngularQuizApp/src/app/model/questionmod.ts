export class questionmod {
    questions : QuestionsEntity[];
  }
  export class QuestionsEntity {
    questionText: string;
    options : OptionsEntity[];
    explanation: string;
  }
  export class OptionsEntity {
    text: string;
    correct: boolean;
  }
  
  