class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.finalScore = data.score;
        this.difficulty = data.difficulty;  
    }

    preload() {
        this.load.image('gameoverBackground', 'assets/gameover.png'); 
    }

    create() {
        let bg = this.add.image(0, 0, 'gameoverBackground');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        let scores = JSON.parse(localStorage.getItem('highScores')) || [];
        let topScore = scores.length > 0 ? scores[0].score : 0;

        if (this.difficulty === 'world-class') {
            let container = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 - 70).createFromHTML(`
                <div style="display: flex; align-items: center;">
                    <input type="text" placeholder="Enter your name" id="nameInput" style="font-size: 32px; margin-right: 10px;">
                    <button id="submitButton" style="font-size: 32px;">Submit</button>
                </div>
            `);

            let submitButton = document.getElementById('submitButton');
            submitButton.addEventListener('click', () => {
                let playerName = document.getElementById('nameInput').value;
                if (playerName) {
                    this.saveScore(playerName, this.finalScore);
                    this.scene.start('HighScores'); 
                }
            });
        }

        let scoreText = this.add.text(20, this.cameras.main.height / 2 + 20, 'Your Score: ' + this.finalScore, { 
            fontFamily: 'Anton', 
            fontSize: '27px', 
            fill: 'black' 
        }).setOrigin(0, 0.5);

        let topScoreText = this.add.text(this.cameras.main.width - 20, this.cameras.main.height / 2 + 20, 'Highscore : ' + topScore, { 
            fontFamily: 'Anton', 
            fontSize: '27px', 
            fill: 'yellow' 
        }).setOrigin(1, 0.5);

        let highScoresButton = this.add.text(20, 20, 'HIGH SCORES', { 
            fontFamily: 'Anton', 
            fontSize: '27px', 
            fill: 'black' 
        }).setOrigin(0, 0);
        highScoresButton.setInteractive({ useHandCursor: true });
        highScoresButton.on('pointerdown', () => {
            this.sound.play('clickSound'); 
            this.scene.start('HighScores');
        });

        let playagainButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 150, 'Play Again', { 
            fontFamily: 'Anton', 
            fontSize: '60px', 
            fill: 'red' 
        }).setOrigin(0.5);
        playagainButton.setInteractive({ useHandCursor: true });
        playagainButton.on('pointerdown', () => {
            this.sound.play('clickSound'); 
            this.scene.start('Game');
        });

        this.tweens.add({
            targets: playagainButton,
            alpha: { from: 1, to: 0.5 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        let menuButton = this.add.text(this.cameras.main.width - 20, 20, 'MENU', { 
            fontFamily: 'Anton', 
            fontSize: '27px', 
            fill: 'yellow' 
        }).setOrigin(1, 0);
        menuButton.setInteractive({ useHandCursor: true });
        menuButton.on('pointerdown', () => {
            this.sound.play('clickSound'); 
            this.scene.start('MainMenu');
        });
    }

    saveScore(name, score) {
        let scores = JSON.parse(localStorage.getItem('highScores')) || [];
        scores.push({ name: name, score: score });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 10); 
        localStorage.setItem('highScores', JSON.stringify(scores));
    }
}
