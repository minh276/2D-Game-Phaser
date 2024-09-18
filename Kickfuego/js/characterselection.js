class CharacterSelection extends Phaser.Scene {
    constructor() {
        super('CharacterSelection');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('character1', 'assets/player1.png');
        this.load.image('character2', 'assets/player2.png');
        this.load.image('character3', 'assets/player3.png');
        this.load.image('character4', 'assets/player4.png');
    }

    create(data) {
        this.difficulty = data.difficulty;

        let bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.text(this.cameras.main.width / 2, 100, 'Select Your Character', {
            fontFamily: 'Anton',
            fontSize: '50px',
            fill: 'white',
            stroke: 'black', 
            strokeThickness: 8 
        }).setOrigin(0.5);

        let characters = ['character1', 'character2', 'character3', 'character4'];
        characters.forEach((char, index) => {
            let character = this.add.image(this.cameras.main.width / 2, 250 + index * 150, char);
            character.setInteractive({ useHandCursor: true });

            character.on('pointerover', () => {
                this.tweens.add({
                    targets: character,
                    scale: 1.1,
                    duration: 200,
                    ease: 'Power2'
                });
            });

            character.on('pointerout', () => {
                this.tweens.add({
                    targets: character,
                    scale: 1,
                    duration: 200,
                    ease: 'Power2'
                });
            });

            character.on('pointerdown', () => {
                this.sound.play('clickSound');
                this.scene.start('Game', { selectedCharacter: char, difficulty: this.difficulty });
            });
        });

        let backButton = this.add.text(20, this.cameras.main.height - 40, 'Back', {
            fontFamily: 'Anton',
            fontSize: '35px',
            fill: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10 
        }).setOrigin(0, 1);
        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0', backgroundColor: 'rgba(0, 0, 0, 1)' });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)' }); 
        });
        backButton.on('pointerdown', () => {
            this.sound.play('clickSound'); 
            this.scene.start('DifficultySelection');
        });
    }
}
