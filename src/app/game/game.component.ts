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

    /*fetch("https://api.500px.com/v1/photos?feature=popular&image_size[]=3&image_size=3,2", {
      method: "POST",
      body: "consumer_key=TxNYEWxvU26cylAkxTc1KgNmXCPvFc1EazhIk5Po",
    }).then(e => {
      console.log(e);
    })*/

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
