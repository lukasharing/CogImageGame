import Phaser from 'phaser';

export class Game extends Phaser.Scene{

	text : Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'main' });
    }

    preload() {


        console.log('preload method');

        // Load Sprites
        //this.load.spritesheet("", "", 32, 32, 96);

    };

    create() {
		// Set Cleaning color to white
		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#FFFFFF");

		// Initialization Events
		
		this.text = this.add.text(0, 0, "Hola mundo", { font: "20px Verdana", color: "red" });

		/*
			this.input.keyboard.on("keyup", this.key_up, this);
			Animación
		
		/*const tween = this.tweens.add({
			targets: [this.text],
			scale: 1.2,
			duration: 1000,
			ease: "Bounce",
			onComplete: function(src, tgt){
				// Cuando Termina, algo hace
			}
		});*/
    };

    key_up(e){

		// e.key


	};

    update(dt) {
        console.log('update method');
    };
}