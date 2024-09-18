class HighScores extends Phaser.Scene {
    constructor() {
        super('HighScores');
    }

    create() {
        let bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        let title = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 5, 'High Scores', { 
            fontFamily: 'Anton', 
            fontSize: '90px', 
            fill: 'white',
            stroke: 'black', 
            strokeThickness: 8 
        }).setOrigin(0.5);

        let scores = JSON.parse(localStorage.getItem('highScores')) || [];

        scores.forEach((score, index) => {
            let scoreText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3 + 50 * index, `${index + 1}. ${score.name}: ${score.score}`, { 
                fontFamily: 'Anton', 
                fontSize: '32px', 
                fill: 'white',
                stroke: 'black', 
                strokeThickness: 4,
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }).setOrigin(0.5);

            this.tweens.add({
                targets: scoreText,
                alpha: { from: 0, to: 1 },
                duration: 500,
                delay: index * 100
            });
        });

        let menuButton = this.add.text(20, 20, 'MENU', { 
            fontFamily: 'Anton', 
            fontSize: '27px', 
            fill: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10 
        }).setOrigin(0, 0);
        menuButton.setInteractive({ useHandCursor: true });
        menuButton.on('pointerover', () => {
            menuButton.setStyle({ fill: '#ff0', backgroundColor: 'rgba(0, 0, 0, 1)' }); 
        });
        menuButton.on('pointerout', () => {
            menuButton.setStyle({ fill: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)' }); 
        });
        menuButton.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.scene.start('MainMenu');
        });

    
        let playButton = this.add.text(this.cameras.main.width - 20, 20, 'PLAY', { 
            fontFamily: 'Anton', 
            fontSize: '27px', 
            fill: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10 
        }).setOrigin(1, 0);
        playButton.setInteractive({ useHandCursor: true });
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#ff0', backgroundColor: 'rgba(0, 0, 0, 1)' }); 
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)' }); 
        });
        playButton.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.scene.start('Game');
        });
    }
}
