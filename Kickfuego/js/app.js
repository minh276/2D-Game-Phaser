var config = {
    type: Phaser.AUTO,
    audio: {
        disableWebAudio: false
    },
    scale: {
        parent: 'gamespace',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    dom: {
        createContainer: true
    },
    scene: [Preloader, MainMenu, DifficultySelection, CharacterSelection, Controls, Game, GameOver, HighScores],
    backgroundColor: 0xeeeeee
};

var game = new Phaser.Game(config);
