import { Game } from 'src/app/game/game';

export class Card extends Phaser.GameObjects.Text{

    text : string;
    seconds_spawn : number; 
    kill : boolean;
    duration : number;

    animation_lr : Phaser.Tweens.Tween;

    particles : Phaser.GameObjects.Particles.ParticleEmitterManager;

    constructor(scene : Game){
        // Generate random word from dictionary
        const random_word = scene.dictionary[Phaser.Math.Between(0, scene.dictionary.length)];
        
        // Position
        const x = -random_word.length * 25.;
        const y = Phaser.Math.Between(40., Number(scene.game.config.height) - 80.);
        super(scene, x, y, random_word.toUpperCase(), {
            fontSize: `32px`,
            fontFamily: "Arial",
            color: "#000000",
            align: "center",
            backgroundColor: `hsl(${Phaser.Math.Between(0, 360)}, 50%, 70%)`,
            stroke: "#FFFFFF",
            strokeThickness: 20,
            padding: { x: 30., y: 20.}
        });
        // Text Attribute
        this.kill = false;

        // Particles
        this.particles = scene.add.particles("star_particle");
        const emitter = this.particles.createEmitter({
            speed: 100,
            scale: {start: 0.5, end: 0.},
            alpha: {start: 0.3, end: 0.0},
        });
        emitter.startFollow(this);

        // Add To Sceene
        this.seconds_spawn = scene.seconds - 0.5; // Remove 0.5 s to spawn into screen
        scene.add.existing(this);

        // Tween
        // Duration is dependent to the screen Size
        const min_duration = 4000. - Number(scene.game.config.width);
        this.duration = Math.max(min_duration - scene.seconds * 4.0, min_duration - 1500);
        this.animation_lr = scene.tweens.add({
            targets: this,
            x: scene.game.config.width,
            y: y,
            duration: this.duration,
            onComplete: _ => {
                if(!this.kill){
                    scene.hit();
                }else{
                    this.death_animation();
                }
            }
        });

    };

    correct(char : String){
        if(this.text[0] != char) return false;
        // Kill Entity
        this.death_animation();
        // Delta Time Normalized [0, 1]
        const dtn = 1. - this.animation_lr.progress;
        (this.scene as Game).show_text(dtn);
        // Give Points
        const points = 200.0 * dtn;
        (this.scene as Game).give_points(points);
        return true;
    };

    death_animation(){
        console.log(this);
        // Add Death Transition
        this.scene.tweens.add({
            targets: [this],
            alpha: 0.,
            scale: 1.2,
            onComplete: _ => {
                // Kill From Game Array
                this.destroy(false);
            },
            duration: 100.
        });
        this.kill = true;
        this.particles.setScale(0.);
    };


}