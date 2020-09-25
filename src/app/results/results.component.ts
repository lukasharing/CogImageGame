import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  information : any[];

  constructor() { }

  ngOnInit(): void {
    
    // Storage Test
    const storage = localStorage.getItem("game_information");
    if(storage === null){
      this.information = [];
    }else{
      const elements = storage.split(",");
      elements.pop();
      this.information = elements.map(function(information) {
          const split = information.split(":");
          return {score : Number(split[0]), time: Number(split[1])};
      });
      console.log(this.information);
    }
  }

}
