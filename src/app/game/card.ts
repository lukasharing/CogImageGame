import { Game } from 'src/app/game/game';

export class Card extends Phaser.GameObjects.Text{

    text : string;
    seconds_spawn : number; 
    kill : boolean;
    duration : number;

    constructor(scene : Game){
        // Generate random word from dictionary
        const random_word = scene.dictionary[Phaser.Math.Between(0, scene.dictionary.length)];

        // Initialize Text Variable
        const initial_y = Phaser.Math.Between(0, Number(scene.game.config.height) - 100.);
        super(scene, -random_word.length * 25., initial_y, random_word, {
            fontSize: `32px`,
            fontFamily: "Arial",
            color: "#000",
            align: "center",
            backgroundColor: `hsl(${Phaser.Math.Between(0, 360)}, 50%, 70%)`
        });
        // Add More Style
        this.setPadding(40., 30., 40., 30.);
        // Text Attribute
        this.kill = false;
        this.text = random_word;
        
        // Add To Sceene
        this.seconds_spawn = scene.seconds - 0.5; // Remove 0.5 s to spawn into screen
        scene.add.existing(this);

        // Tween
        // Duration is dependent to the screen Size
        const min_duration = 4000. - Number(scene.game.config.width);
        this.duration = Math.max(min_duration - scene.seconds * 4.0, min_duration - 1500);
        scene.tweens.add({
            targets: this,
            x: scene.game.config.width,
            y: initial_y,
            duration: this.duration,
            onComplete: _ => {
                if(!this.kill){
                    scene.hit();
                }else{
                    this.kill = true;
                }
            }
        });
    };

    correct(char : String){
        if(this.text[0] != char) return false;
        // Kill Entity
        this.death_animation();
        // Points Function
        const dt = (this.scene as Game).seconds - this.seconds_spawn;
        // Delta Time Normalized [0, 1]
        const dtn = 1. - dt / this.duration;

        const points = 200.0 * dtn;
        // Give Points
        (this.scene as Game).give_points(points);
        return true;
    };

    death_animation(){
        // Kill From Game Array
        this.kill = true;
        // Add Death Transition
        this.scene.tweens.add({
            targets: this,
            alpha: 0.,
            scale: 1.2,
            onComplete: _ => this.destroy(true),
            duration: 500.
        });
    };


}