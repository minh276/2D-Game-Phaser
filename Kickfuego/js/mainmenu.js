class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('menuBackground', 'assets/mainmenu.png');
    }

    create() {
        let bg = this.add.image(0, 0, 'menuBackground');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
        let startButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 5, 'Play', {
            fontFamily: 'Anton',
            fontSize: '60px',
            fill: 'black'
        }).setOrigin(0.5);
        startButton.setInteractive({ useHandCursor: true });
    
        this.add.graphics()
            .lineStyle(4, 0x000000, 1)
            .strokeLineShape(new Phaser.Geom.Line(
                startButton.x - startButton.width / 2, 
                startButton.y + startButton.height / 2 + 5, 
                startButton.x + startButton.width / 2, 
                startButton.y + startButton.height / 2 + 5
            ));
    
        startButton.on('pointerdown', () => {
            this.sound.play('clickSound'); 
            this.tweens.add({
                targets: startButton,
                scale: { from: 1, to: 1.2 },
                duration: 200,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    this.scene.start('DifficultySelection');
                }
            });
        });
    
        let highScoresButton = this.add.text(this.cameras.main.width - 20, 36, 'High Scores', {
            fontFamily: 'Anton',
            fontSize: '35px',
            fill: 'black'
        }).setOrigin(1, 0);
        highScoresButton.setInteractive({ useHandCursor: true });
    
        this.add.graphics()
            .lineStyle(4, 0x000000, 1)
            .strokeLineShape(new Phaser.Geom.Line(
                highScoresButton.x - highScoresButton.width, 
                highScoresButton.y + highScoresButton.height + 5, 
                highScoresButton.x, 
                highScoresButton.y + highScoresButton.height + 5
            ));
    
        highScoresButton.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.scene.start('HighScores');
        });
    
        let controlsButton = this.add.text(20, this.cameras.main.height - 40, 'Controls', {
            fontFamily: 'Anton',
            fontSize: '35px',
            fill: 'black'
        }).setOrigin(0, 1);
        controlsButton.setInteractive({ useHandCursor: true });
    
        this.add.graphics()
            .lineStyle(4, 0x000000, 1)
            .strokeLineShape(new Phaser.Geom.Line(
                controlsButton.x, 
                controlsButton.y + 5, 
                controlsButton.x + controlsButton.width, 
                controlsButton.y + 5
            ));
    
        controlsButton.on('pointerdown', () => {
            this.sound.play('clickSound'); 
            this.scene.start('Controls');
        });
    }
}
