import Phaser from 'phaser';

import { Card } from 'src/app/game/card';

// Penalization Time
const PENALIZE_TIME = 2000.;
// Number of Lifes
const NUMBER_LIFES : integer = 3;
// Path Dictionary
const PATH = "https://raw.githubusercontent.com/lorenbrichter/Words/master/Words/en.txt";


export class Game extends Phaser.Scene{

	score : integer;	
	seconds : number;

	words : Card[];
	dictionary : string[];
	dictionary_loaded : boolean;

	spawned : number;
	next_spawn : integer;

	score_text : Phaser.GameObjects.Text;
	penalized : Phaser.GameObjects.Text;
	shout_text : Phaser.GameObjects.Text;

	lifes : integer;
	lifes_sprites : Phaser.GameObjects.Sprite[];

    constructor() {
        super({ key: 'main' });
    }

    preload(){
		// Load Images
		this.load.image("star_particle", "assets/effect_star.png");
		this.load.spritesheet("health", "assets/health.png", { frameWidth: 28, frameHeight: 25 });
		//this.load.image("background", "assets/background.png");

		this.dictionary_loaded = false;
		fetch(PATH).then(result => result.text().then(txt => {
			this.dictionary = txt.split("\n").filter(word => word.length > 2 && word.length < 5);
			this.dictionary_loaded = true;
		}));
	};

    create(){

		// Set Cleaning color to white
		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#333333");
		
		// Background
		//this.add.tileSprite(0, 0, Number(this.game.config.width), Number(this.game.config.height), "background");

		// Spawn
		this.next_spawn = 0.;
		this.spawned = 0.;

		// Key Event
		this.input.keyboard.on("keydown", this.key_down, this);
		
		// Score Information
		this.score = 0.;
		this.score_text = this.add.text(0., 0., "SCORE: 000000", { 
			font: "20px Verdana",
			color: "green",
			backgroundColor: "#ffffff",
			padding: {x: 10, y: 10}
		});
		this.score_text.setDepth(1000);

		this.penalized = this.add.text(183., 0, "PENALIZED", {
			font: "20px Verdana",
			color: "#000000",
			backgroundColor: "#c51111",
			padding: {x: 10, y: 10}
		});
		this.penalized.setDepth(1000);

		// Words On the Table
		this.words = [];

		// Add Lifes Textures
		this.lifes = 0;
		this.lifes_sprites = [];
		const x = Number(this.game.config.width) - 150.;
		const y = Number(this.game.config.height) - 50.;
		for(let i = 0; i < NUMBER_LIFES; ++i){
			const life = this.add.sprite(x + 35 * (NUMBER_LIFES - i), y, "health", 0);
			this.lifes_sprites[i] = life;
			life.setDepth(1000);
		}

		// Penalized Text
		this.penalized.setAlpha(0.5);
		const x_shout = Number(this.game.config.width) * 0.5 - 35.;
		this.shout_text = this.add.text(x_shout, y - 70., "NICE!", { 
			font: "36px Verdana",
			color: "green",
			strokeThickness: 5,
			stroke: "#ffffff",
		});
		this.shout_text.setDepth(2000);
	};

    key_down(e){
		// We can continue playing if we are not penalized
		if(this.penalized.alpha == 0.5){
			// Find first letter that matches with the key pressed 
			let letter_found = false;
			for(let i = 0; i < this.words.length && !letter_found; ++i){
				letter_found = this.words[i].correct(e.key.toUpperCase());
			}
			// Remove If penalized
			if(!letter_found){
				this.penalized.setAlpha(1.0);
				this.time.delayedCall(PENALIZE_TIME, _ => this.penalized.setAlpha(0.5), [], this);
			}else{
				this.score_text.setText(`SCORE: ${this.score.toFixed(0)}!`);
			}
		}
		
	};

	show_text(t : number){

        if(t < 0.3){
			this.shout_text.setColor("#ff0000")
			this.shout_text.setText("BAD!")
        }else if(t < 0.6){
			this.shout_text.setColor("#ec7732")
			this.shout_text.setText("OK!")
        }else{
			this.shout_text.setColor("#00ff00")
			this.shout_text.setText("GREAT!")
		}


		
    };

	hit(){
		this.tweens.add({
            targets: this.lifes_sprites[this.lifes],
            alpha: 0.5,
			duration: 100.,
			onComplete: e => {
				this.lifes += 1;
				if(this.lifes >= NUMBER_LIFES){
					// You Finish
					this.scene.pause();
					this.save_game_info();
				}
			}
        });
		
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
		if(!this.dictionary_loaded) return;
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