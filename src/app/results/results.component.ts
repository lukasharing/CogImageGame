import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  information : string[];

  constructor() { }

  ngOnInit(): void {
    
    // Storage Test
    const storage = localStorage.getItem("game_information");
    this.information = storage === null ? [] : storage.split(",").map(object => JSON.parse(object));
  }

}
