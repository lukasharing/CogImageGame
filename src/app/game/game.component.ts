import { Component, OnInit } from '@angular/core';

import { Game } from 'src/app/game/game'


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {

    this.phaser_init();


  }

  phaser_init(){
    // Config Phaser Variables
    this.config = {
      type: Phaser.AUTO,
      height: window.innerHeight,
      width: window.innerWidth,
      scene: [ Game ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
  }

  ngOnInit(): void {

    // Init Phaser
    this.game = new Phaser.Game(this.config);

  }

}
