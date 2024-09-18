class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.spritesheet('player1_spritesheet', 'assets/player1_spritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('player2_spritesheet', 'assets/player2_spritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('player3_spritesheet', 'assets/player3_spritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('player4_spritesheet', 'assets/player4_spritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        // Weitere Assets laden
        this.load.image('background', 'assets/background.png');
        this.load.image('background_beginner', 'assets/background_beginner.png');
        this.load.image('background_semi_pro', 'assets/background_semi_pro.png');
        this.load.image('background_world_class', 'assets/background_world_class.png');
        this.load.image('ground-normal', 'assets/ground.png');
        this.load.image('ground-disappearing', 'assets/ground2.png');
        this.load.image('ground-breaking', 'assets/ground3.png');
        this.load.spritesheet('breaking_ground_spritesheet', 'assets/breaking_ground_spritesheet.png', { frameWidth: 120, frameHeight: 40 });

        this.load.spritesheet('jumppad_spritesheet', 'assets/jumppad_spritesheet.png', { frameWidth: 60, frameHeight: 30 });
        this.load.image('jumppad', 'assets/jumppad.png');
        this.load.image('doping', 'assets/doping.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('invisible', 'assets/invisible.png');
        this.load.image('opponent1', 'assets/opponent1.png');
        this.load.image('opponent2', 'assets/opponent2.png');
        this.load.image('opponent3', 'assets/opponent3.png');
        this.load.image('opponent4', 'assets/opponent4.png');
        this.load.image('opponent5', 'assets/opponent5.png');
        this.load.image('opponent6', 'assets/opponent6.png');
        this.load.image('shoot', 'assets/ball.png');
        this.load.image('multiBall', 'assets/multiball.png');
        this.load.audio('backgroundMusic', 'assets/sound/backgroundMusic.mp3');
        this.load.audio('jumpSound', 'assets/sound/jump.mp3');
        this.load.audio('break', 'assets/sound/break.mp3');
        this.load.audio('collectSound', 'assets/sound/collect.mp3');
        this.load.audio('shootSound', 'assets/sound/shoot.mp3');
        this.load.audio('clickSound', 'assets/sound/click.mp3');
        this.load.audio('deadSound', 'assets/sound/dead.mp3');
        this.load.audio('destroySound', 'assets/sound/destroy.mp3');
        this.load.image('controlsBackground', 'assets/controls.png');
    }

    create() {
        this.scene.start('MainMenu');
    }
}
