import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/game/game';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Phaser.Game;

  constructor() {
    
  }

  ngOnInit(): void {

    // Storage Test
    localStorage.setItem("game1", "100,10");

    // Init Phaser
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      height: window.innerHeight - 100.,
      width: window.innerWidth - 32.,
      scene: [ Game ],
      parent: 'gameContainer',
      /*physics: {
        default: 'arcade',
        arcade: {}
      }*/
    });

  }

}
