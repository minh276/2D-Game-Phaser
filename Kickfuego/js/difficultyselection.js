class DifficultySelection extends Phaser.Scene {
    constructor() {
        super('DifficultySelection');
    }

    create() {
        let bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.text(this.cameras.main.width / 2, 100, 'Select Difficulty', {
            fontFamily: 'Anton',
            fontSize: '50px',
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8
        }).setOrigin(0.5);

        let difficulties = ['Beginner', 'Semi-Pro', 'World Class'];
        difficulties.forEach((difficulty, index) => {
            let button = this.add.text(this.cameras.main.width / 2, 250 + index * 150, difficulty, {
                fontFamily: 'Anton',
                fontSize: '40px',
                fill: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: { left: 20, right: 20, top: 10, bottom: 10 },
                borderRadius: 10 // Runden der Ecken
            }).setOrigin(0.5);

            button.setInteractive({ useHandCursor: true });

            button.on('pointerover', () => {
                button.setStyle({ fill: '#ff0', backgroundColor: 'rgba(0,0,0,0.7)' }); 
            });

            button.on('pointerout', () => {
                button.setStyle({ fill: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }); 
            });

            button.on('pointerdown', () => {
                this.sound.play('clickSound');
                this.tweens.add({
                    targets: button,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        this.scene.start('CharacterSelection', { difficulty: difficulty.toLowerCase().replace(' ', '-') });
                    }
                });
            });
        });

        let backButton = this.add.text(20, this.cameras.main.height - 40, 'Back', {
            fontFamily: 'Anton',
            fontSize: '35px',
            fill: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10 
        }).setOrigin(0, 1);

        backButton.setInteractive({ useHandCursor: true });

        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0', backgroundColor: 'rgba(0,0,0,0.7)' }); 
        });

        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }); 
        });

        backButton.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.tweens.add({
                targets: backButton,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.scene.start('MainMenu');
                }
            });
        });
    }
}
