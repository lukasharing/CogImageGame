import Phaser from 'phaser';

import { Card } from 'src/app/game/card';

// Penalization Time
const PENALIZE_TIME = 2000.;
// Number of Lifes
const NUMBER_LIFES : integer = 3;

export class Game extends Phaser.Scene{

	score : integer;	
	seconds : number;

	words : Card[];
	dictionary : string[];

	spawned : number;
	next_spawn : integer;

	score_text : Phaser.GameObjects.Text;
	penalized : Phaser.GameObjects.Text;

	lifes : integer;
	lifes_sprites : Phaser.GameObjects.Rectangle[];

    constructor() {
        super({ key: 'main' });
    }

    async preload(){
		this.scene.pause();
		const response = await fetch("https://raw.githubusercontent.com/lorenbrichter/Words/master/Words/en.txt");
		await response.text().then(txt => this.dictionary = txt.split("\n").filter(word => word.length > 2 && word.length < 5));
		this.scene.resume();

		this.load.image("star_particle", "assets/effect_star.png");
	};

    create(){
		// Set Cleaning color to white
		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#FFFFFF");
		
		// Spawn
		this.next_spawn = 0.;
		this.spawned = 0.;

		// Key Event
		this.input.keyboard.on("keydown", this.key_down, this);
		
		// Score Information
		this.score = 0.;
		this.score_text = this.add.text(400., 0, "Score: 0!", { font: "20px Verdana", color: "green" });
		this.penalized = this.add.text(200., 0, "Penalized!", { font: "20px Verdana", color: "red" });

		// Words On the Table
		this.words = [];

		// Add Lifes Textures
		this.lifes = 0;
		this.lifes_sprites = [];
		for(let i = 0; i < NUMBER_LIFES; ++i){
			const life = this.add.rectangle(600 + 35 * (NUMBER_LIFES - i), 30, 30, 30, 0xFF0000);
			this.lifes_sprites[i] = life;
			life.setVisible(true);
		}

		// Penalized Text
		this.penalized.setVisible(false);
	};

    key_down(e){
		// We can continue playing if we are not penalized
		if(!this.penalized.visible){
			// Find first letter that matches with the key pressed 
			let letter_found = false;
			for(let i = 0; i < this.words.length && !letter_found; ++i){
				letter_found = this.words[i].correct(e.key);
			}
			// Remove If penalized
			if(!letter_found){
				this.penalized.setVisible(true);
				this.time.delayedCall(PENALIZE_TIME, _ => this.penalized.setVisible(false), [], this);
			}else{
				this.score_text.setText(`Score: ${this.score.toFixed(0)}!`);
			}
		}
		
	};

	hit(){
		this.lifes_sprites[this.lifes].setAlpha(0.5);
		this.lifes += 1;
		if(this.lifes >= NUMBER_LIFES){
			// You Finish
			this.scene.pause();
			this.save_game_info();
		}
	};

	save_game_info(){
		const last_information = localStorage.getItem("points") || "";
		const current_information = `${this.score.toString()}:${this.seconds.toString()}`;
		// Add Information to LocalStorage
		localStorage.setItem("game_information", current_information.concat(',', last_information));
	};


	give_points(points : integer){
		// Increment Score
		this.score += points;
	};

    update(dt) {
		// Remove Killed Words
		this.words = this.words.filter(word => !word.kill);
		// Update Time Played
		this.seconds = dt / 1000.;
		// Spawn Delta Time
		const dspawn = this.seconds - this.spawned;
		if(dspawn >= this.next_spawn){
			this.spawned = this.seconds;

			const min_spawn = Math.max(3.5 - this.seconds / 10., 2.5);
			this.next_spawn = Phaser.Math.Between(min_spawn, min_spawn + 1.0);
			this.words.push(new Card(this));
		}
	};
}