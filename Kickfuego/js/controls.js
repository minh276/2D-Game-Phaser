class Controls extends Phaser.Scene {
    constructor() {
        super('Controls');
    }

    preload() {
        this.load.image('controlsBackground', 'assets/background.png');
        this.load.audio('clickSound', 'assets/sound/click.mp3');
    }

    create() {
        let bg = this.add.image(0, 0, 'controlsBackground');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);


       

        let backButton = this.add.text(20, this.cameras.main.height - 20, 'Back', {
            fontFamily: 'Arial',
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10
        }).setOrigin(0, 1);

        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0', backgroundColor: 'rgba(0, 0, 0, 1)' });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#ffffff', backgroundColor: 'rgba(0, 0, 0, 0.7)' });
        });
        backButton.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.scene.start('MainMenu');
        });
    }
}
