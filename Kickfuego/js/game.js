    var player;
    var hit;
    var floor;
    var ground;
    var groundGroup;
    var groundChild;
    var breakingGroundGroup;
    var breakingGroundChild;
    var disappearingGroundGroup;
    var disappearingGroundChild;
    var jumppadGroup;
    var jumppadChild;
    var dopingGroup;
    var dopingChild;
    var multiBallGroup;
    var multiBallChild;
    var opponentGroup;
    var opponentChild;
    var particles;
    var score = 0;
    var scoreText;
    var GameOverText;
    var PlayAgainText;
    var pn;
    var pd;
    var pb;
    var jumppad;
    var doping;
    var multiBall;
    var opponent;
    var background;
    var shoots;
    var canShoot = true;
    var multiShootActive = false;

    var difficultyThresholds = [500, 1000, 5000, 10000, 15000, 20000];
    var currentDifficultyLevel = 0;
    var maxOpponents = 10; 

    class Game extends Phaser.Scene {
        constructor() {
            super('Game');
            this.lastGround = null;
        }

        playBackgroundMusic() {
            this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
            this.backgroundMusic.play();
        }
        

        init(data) {
            this.selectedCharacter = data.selectedCharacter || 'character1';
            this.difficulty = data.difficulty || 'beginner'; 
            score = 0; 
            canShoot = true; 
            multiShootActive = false; 
            currentDifficultyLevel = 0; 
        }

        createInvisible() {
            this.invisibleGroup = this.physics.add.group();
        }

        create() {
            let backgroundKey = 'background_beginner';
            if (this.difficulty === 'semi-pro') {
                backgroundKey = 'background_semi_pro';
            } else if (this.difficulty === 'world-class') {
                backgroundKey = 'background_world_class';
            }
        
            let background = this.add.image(0, 0, backgroundKey);
            background.setOrigin(0, 0);
            background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
            background.setScrollFactor(0);
        
            this.playBackgroundMusic();
        
            floor = this.physics.add.image(this.game.config.width / 2, 830, 'ground-disappearing');
            floor.setImmovable();
            floor.scale = 6;
        
            floor.body.checkCollision.left = false;
            floor.body.checkCollision.right = false;
        
            this.input.keyboard.on("keydown-SPACE", function () {
                if (canShoot) {
                    this.ballShoot();
                    if (!multiShootActive) {
                        canShoot = false;
                        this.time.delayedCall(5000, () => {
                            canShoot = true;
                        });
                    }
                }
            }, this);
            
        
            this.anims.create({
                key: 'jumppad_anim',
                frames: this.anims.generateFrameNumbers('jumppad_spritesheet', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0 
            });
        
            this.anims.create({
                key: 'breaking_ground_anim',
                frames: this.anims.generateFrameNumbers('breaking_ground_spritesheet', { start: 0, end: 3 }),
                frameRate: 20, 
                repeat: 0 
            });
        
         
        this.anims.create({
                key: 'character1_normal',
                frames: [{ key: 'player1_spritesheet', frame: 0 }],
                frameRate: 1,
                repeat: -1
            });

            this.anims.create({
                key: 'character1_left',
                frames: [{ key: 'player1_spritesheet', frame: 1 }],
                frameRate: 1,
                repeat: -1
            });

            this.anims.create({
                key: 'character1_right',
                frames: [{ key: 'player1_spritesheet', frame: 2 }],
                frameRate: 1,
                repeat: -1
            });


        
        
            this.anims.create({
                key: 'character2_normal',
                frames: [{ key: 'player2_spritesheet', frame: 0 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.anims.create({
                key: 'character2_left',
                frames: [{ key: 'player2_spritesheet', frame: 1 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.anims.create({
                key: 'character2_right',
                frames: [{ key: 'player2_spritesheet', frame: 2 }],
                frameRate: 1,
                repeat: -1
            });
        

            this.anims.create({
                key: 'character3_normal',
                frames: [{ key: 'player3_spritesheet', frame: 0 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.anims.create({
                key: 'character3_left',
                frames: [{ key: 'player3_spritesheet', frame: 1 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.anims.create({
                key: 'character3_right',
                frames: [{ key: 'player3_spritesheet', frame: 2 }],
                frameRate: 1,
                repeat: -1
            });
        

             this.anims.create({
                key: 'character4_normal',
                frames: [{ key: 'player4_spritesheet', frame: 0 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.anims.create({
                key: 'character4_left',
                frames: [{ key: 'player4_spritesheet', frame: 1 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.anims.create({
                key: 'character4_right',
                frames: [{ key: 'player4_spritesheet', frame: 2 }],
                frameRate: 1,
                repeat: -1
            });
        
            this.createGrounds();
            this.createBreakingGrounds();
            this.createDisappearingGrounds();
            this.createInvisible();
            this.createPlayer();
            this.createJumppad();
            this.createDoping();
            this.createMultiBall();
            this.createOpponent();
            this.createCoins();
            this.shoots = this.physics.add.group();
        
            scoreText = this.add.text(16, 16, 'Score: 0', { fontFamily: '"arial"', fontSize: '32px', fill: 'white' }).setScrollFactor(0);
            scoreText.depth = 2;
        
            this.physics.add.collider(player, floor, this.GameOver, null, this);
            this.physics.add.collider(player, groundGroup, this.bounceBack, null, this);
            this.physics.add.collider(player, disappearingGroundGroup, this.TileDisappear, null, this);
            this.physics.add.overlap(player, breakingGroundGroup, this.TileBreak, null, this);
            this.physics.add.collider(player, jumppadGroup, this.JumpPadBoost, null, this);
            this.physics.add.overlap(player, dopingGroup, this.takeDoping, null, this);
            this.physics.add.overlap(player, multiBallGroup, this.takeMultiBall, null, this);
            this.physics.add.overlap(player, this.coinGroup, this.takeCoin, null, this);
            this.physics.add.overlap(player, this.invisibleGroup, this.takeInvisible, null, this);
            this.physics.add.overlap(player, opponentGroup, function (player, opponent) {
                if (player.isInvisible) {
                    return; 
                }
                if (player.isImmortal) {
                    opponent.destroy();
                } else {
                    this.GameOver();
                }
            }, null, this);
        
            this.physics.add.overlap(player, this.particles, this.GameOver, null, this);
            this.physics.add.overlap(this.shoots, opponentGroup, this.destroyOpponent, null, this);
        
            this.cameraYMin = 50000;
            this.tileYMin = 50000;
        
            this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.key_Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
            this.input.mouse.disableContextMenu();
        }
        
        
        update() {
            player.yChange = Math.max(player.yChange, Math.abs(player.y - player.yOrig));
        
            this.physics.world.setBounds(0, -player.yChange, this.physics.world.bounds.width, this.game.config.height + player.yChange);
        
            this.cameras.main.setLerp(.5);
            this.cameras.main.centerOnY(player.y);
        
            if (this.key_right.isDown) {
                player.body.velocity.x = 400;
                player.anims.play(this.selectedCharacter + '_right', true);
            }
            else if (this.key_left.isDown) {
                player.body.velocity.x = -400;
                player.anims.play(this.selectedCharacter + '_left', true);
            }
            else {
                player.anims.play(this.selectedCharacter + '_normal', true);
                player.body.velocity.x = 0;
            }
        
            var pointer = this.input.activePointer;
        
            if (pointer.isDown) {
                if (pointer.x > 300) {
                    player.body.velocity.x = 400;
                    player.anims.play(this.selectedCharacter + '_right', true);
                } else if (pointer.x < 301) {
                    player.body.velocity.x = -400;
                    player.anims.play(this.selectedCharacter + '_left', true);
                } else {
                    player.body.velocity.x = 0;
                }
            };
        
            this.physics.world.wrap(player, player.width / 6, false);
        
            if (player.y > this.cameraYMin + this.game.config.height) {
                this.GameOver();
            }
        
            this.spawnGrounds();
            this.adjustDifficulty();
        
            opponentGroup.children.iterate(function (opponent) {
                if (opponent) {
                    this.updateOpponent(opponent);
                }
            }, this);
        }


        adjustDifficulty() {
            if (currentDifficultyLevel < difficultyThresholds.length && score >= difficultyThresholds[currentDifficultyLevel]) {
                currentDifficultyLevel++;
                this.spawnOpponentTimer.delay -= 200; 
                maxOpponents += 2; 
            }
        }

        createPlayer() {
            player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 4, this.selectedCharacter);
            
            player.setDisplaySize(70, 90);
            
            player.setVelocity(0, -500);
            player.setGravityY(360);
            player.setBounce(0.4);
            player.body.checkCollision.up = false;
            player.depth = 1;
        
            player.yOrig = player.y;
            player.yChange = 0;
        }        
        
        

        createGrounds() {
            groundGroup = this.physics.add.staticGroup();
            for (var i = 0; i < 5; i++) {
                pn = this.spawnGround(Phaser.Math.Between(25, this.physics.world.bounds.width - 25), this.physics.world.bounds.height - 200 - 200 * i, 'ground-normal');
            }
        }

        createBreakingGrounds() {
            breakingGroundGroup = this.physics.add.group(); 
        }
        

        createDisappearingGrounds() {
            disappearingGroundGroup = this.physics.add.staticGroup();
        }

        createJumppad() {
            jumppadGroup = this.physics.add.staticGroup();
        }

        createDoping() {
            dopingGroup = this.physics.add.staticGroup();
        }

        createMultiBall() {
            multiBallGroup = this.physics.add.staticGroup();
        }

        createOpponent() {
            opponentGroup = this.physics.add.group({ runChildUpdate: true });
            this.spawnOpponentTimer = this.time.addEvent({
                delay: 4000,
                callback: this.spawnOpponent,
                callbackScope: this,
                loop: true
            });
        }

        createCoins() {
            this.coinGroup = this.physics.add.staticGroup();
        }

        spawnGround(x, y, type) {
            ground = groundGroup.create(x, y, type);
            ground.setImmovable();
            return ground;
        }

        spawnBreakingGround(x, y, type) {
            let ground = breakingGroundGroup.create(x, y, type);
            ground.setImmovable(true); 
            ground.displayWidth = 120;
            ground.displayHeight = 40;
            return ground;
        }
        


        spawnDisappearingGrounds(x, y, type) {
            ground = disappearingGroundGroup.create(x, y, type);
            ground.setImmovable();
            return ground;
        }

        spawnJumppad(x, y, type) {
            jumppad = jumppadGroup.create(x, y, type);
            jumppad.setImmovable();
            jumppad.body.setSize(60, 30); 
            jumppad.body.setOffset(-15, -10); 
            return jumppad;
        }

        spawnDoping(x, y, type) {
            doping = dopingGroup.create(x, y, type);
            this.add.tween({
                targets: doping,
                y: y - 10, 
                duration: 500, 
                yoyo: true, 
                repeat: -1, 
                ease: 'Sine.easeInOut' 
            });
            return doping;
        }

        spawnCoin(x, y) {
            let coin = this.coinGroup.create(x, y, 'coin');
            this.add.tween({
                targets: coin,
                y: y - 10, 
                duration: 500, 
                yoyo: true, 
                repeat: -1, 
                ease: 'Sine.easeInOut' 
            });
            return coin;
        }

        spawnInvisible(x, y) {
            if (!this.invisibleGroup) {
                console.error('Invisible group is not initialized');
                return;
            }
            let invisible = this.invisibleGroup.create(x, y, 'invisible'); 
            invisible.displayWidth = 50;
            invisible.displayHeight = 50;
            this.add.tween({
                targets: invisible,
                y: y - 10, 
                duration: 500, 
                yoyo: true, 
                repeat: -1, 
                ease: 'Sine.easeInOut' 
            });
            return invisible;
        }
        
        
        
        spawnMultiBall(x, y, type) {
            multiBall = multiBallGroup.create(x, y, type);
            this.add.tween({
                targets: multiBall,
                y: y - 10, 
                duration: 500, 
                yoyo: true, 
                repeat: -1, 
                ease: 'Sine.easeInOut' 
            });
            return multiBall;
        }
        
        

        spawnOpponent() {
            let opponentType;
        
            if (this.difficulty === 'beginner') {
                opponentType = Phaser.Math.Between(1, 2);
            } else if (this.difficulty === 'semi-pro') {
                opponentType = Phaser.Math.Between(1, 4);
            } else {
                opponentType = Phaser.Math.Between(1, 6);
            }
        
            let opponentImage = `opponent${opponentType}`;
            let points;
        
            if (opponentType >= 1 && opponentType <= 2) {
                points = 10; 
            } else if (opponentType >= 3 && opponentType <= 4) {
                points = 20; 
            } else if (opponentType >= 5 && opponentType <= 6) {
                points = 30; 
            }
        
            let opponent = opponentGroup.create(
                Phaser.Math.Between(100, this.game.config.width - 100),
                Phaser.Math.Between(player.y - 600, player.y - 500), opponentImage);
            opponent.setImmovable();
        
            opponent.body.setSize(opponent.width * 0.5, opponent.height * 0.5); 
            opponent.body.setOffset(opponent.width * 0.25, opponent.height * 0.25); 
        
            opponent.points = points; 
            opponent.type = opponentType; 
        
            if (opponentType >= 1 && opponentType <= 2) {
                opponent.body.velocity.y = 50; 
            } else if (opponentType >= 3 && opponentType <= 4) {
                opponent.body.velocity.y = 50; 
                opponent.horizontalSpeed = Phaser.Math.Between(-50, 50); 
            } else if (opponentType >= 5 && opponentType <= 6) {
                opponent.body.velocity.y = 200; 
                opponent.horizontalSpeed = Phaser.Math.Between(-200, 200);
            }
        
            return opponent;
        }
        
        

        updateOpponent(opponent) {
        
            if (opponent.type >= 3 && opponent.type <= 6) {
                opponent.x += opponent.horizontalSpeed * this.game.loop.delta / 1000; 
                if (opponent.x < 0) {
                    opponent.x = 0;
                    opponent.horizontalSpeed *= -1;
                } else if (opponent.x > this.game.config.width) {
                    opponent.x = this.game.config.width;
                    opponent.horizontalSpeed *= -1;
                }
            }
        }

        bounceBack(_player, _ground) {
            if (_player.body.touching.down && _ground.body.touching.up) {
                if (this.lastGround !== _ground) {
                    score += this.doublePointsActive ? 2 : 1; 
                    scoreText.setText('Score: ' + score);
                    player.body.velocity.y = -400;
                    this.sound.play("jumpSound", { loop: false, delay: 0.1 });
                    this.lastGround = _ground;
                } else {
                    player.body.velocity.y = -400;
                }
            }
        }
        

        TileDisappear(_player, _disappearingGroundsGroup) {
            disappearingGroundGroup.children.each(function (e) {
                if (_player.body.touching.down && e.body.touching.up) {
                    disappearingGroundGroup.remove(e, true);
                    score = score + 10;
                    player.body.velocity.y = -400;
                    scoreText.setText('Score: ' + score);
                    this.sound.play("jumpSound", { loop: false, delay: 0.1 });
                }
            }, this);
        }
        TileBreak(_player, _breakingGroundGroup) {
            breakingGroundGroup.children.each((e) => {
                if (_player.body.touching.down && e.body.touching.up) {
                    if (e) {
                        this.sound.play("break", { loop: false, delay: 0.1 });
        
                        
                        this.physics.world.enable(e); 
                        e.body.setAllowGravity(true); 
        
                        
                        _player.body.setVelocityY(0); 
                        _player.body.setAllowGravity(false); 
        
                        e.anims.play('breaking_ground_anim');
                        e.on('animationcomplete', () => {
                            _player.body.setAllowGravity(true); 
                            _player.body.setVelocityY(400); 
        
                        
                            e.body.setVelocityY(600); 
        
                            this.time.delayedCall(500, () => { 
                                e.destroy();
                            });
                        }, this);
                    }
                }
            }, this);
        }

        JumpPadBoost(_player, _jumppadGroup) {
            if (_player.body.touching.down && _jumppadGroup.body.touching.up) {
                score += 5; 
                scoreText.setText('Score: ' + score);
                player.body.velocity.y = -850; 
                this.sound.play("jumpSound", { loop: false, delay: 0.1 });
                
            
                _jumppadGroup.anims.play('jumppad_anim');
            }
        }
        

        takeDoping(_player, _dopingGroup) {
            dopingGroup.children.each(function (e) {
                score += 50; 
                scoreText.setText('Score: ' + score);
                e.destroy();
                this.sound.play("collectSound", { loop: false, delay: 0.1 });

                
                player.body.velocity.y = -1000; 

                player.isImmortal = true;

            
                const colors = [0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x4b0082, 0xee82ee];

                
                this.tweens.timeline({
                    targets: player,
                    loop: -1,
                    ease: 'Linear',
                    tweens: colors.map(color => ({
                        tint: { from: color, to: color },
                        duration: 100
                    }))
                });

                
                this.time.delayedCall(2500, function () { 
                    this.tweens.killTweensOf(player); 
                    player.tint = 0xffffff; 
                    player.isImmortal = false; 
                }, [], this);
            }, this);
        }

        takeMultiBall(_player, _multiBallGroup) {
            multiBallGroup.children.each(function (e) {
                score += 10; 
                scoreText.setText('Score: ' + score);
                e.destroy();
                this.sound.play("collectSound", { loop: false, delay: 0.1 });

                
                multiShootActive = true;
                this.time.delayedCall(5000, function () { 
                    multiShootActive = false;
                }, [], this);
            }, this);
        }

        takeCoin(player, coin) {
            coin.destroy();
            this.sound.play("collectSound", { loop: false, delay: 0.1 });
        
            
            this.doublePointsActive = true;
        
            
            this.time.delayedCall(10000, () => { 
                this.doublePointsActive = false;
            }, [], this);
        }

        takeInvisible(player, invisible) {
            invisible.destroy();
            this.sound.play("collectSound", { loop: false, delay: 0.1 });
        
            
            player.setAlpha(0.5); 
            player.isInvisible = true;
        
            
            this.time.delayedCall(10000, () => { 
                player.setAlpha(1); 
                player.isInvisible = false;
            }, [], this);
        }
        

        ballShoot() {
            const shootSpeed = -1000; 
            const shootTexture = multiShootActive ? 'multiBall' : 'shoot'; 
        

        
            if (multiShootActive) {
                for (let i = -2; i <= 2; i++) {
                    var shoot = this.shoots.create(player.x + i * 20, player.y, shootTexture);
                    shoot.setVelocityY(shootSpeed);
                    shoot.setImmovable();
                    shoot.displayWidth = 20;
                    shoot.displayHeight = 40;
                }
            } else {
                var shoot = this.shoots.create(player.x, player.y, shootTexture);
                shoot.setVelocityY(shootSpeed);
                shoot.setImmovable();
                shoot.displayWidth = 20;
                shoot.displayHeight = 40;
            }
            this.sound.play("shootSound", { loop: false, delay: 0.1 });
        }
        
        

        destroyOpponent(shoot, opponent) {
            shoot.destroy();
            opponent.destroy();
            score += opponent.points; 
            scoreText.setText('Score: ' + score);
            this.sound.play('destroySound', { loop: false }); 
        }
        

        GameOver() {
            if (player.isImmortal) return; 
            if (this.backgroundMusic) {
                this.backgroundMusic.stop(); 
            }
            this.sound.play('deadSound', { loop: false }); 
            this.scene.start('GameOver', { score: score, difficulty: this.difficulty });  
        }
        
        spawnGrounds() {
            groundGroup.children.iterate(function (item) {
                if (!item) return;
        
                var chanceGround = Phaser.Math.Between(1, 100);
                var chanceItems = Phaser.Math.Between(1, 100);
                var chanceOpponent = Phaser.Math.Between(1, 100);
                var chanceInvisible = Phaser.Math.Between(1, 100);
        
                var xAxis;
                var yAxis = this.tileYMin - 200;
        
                this.tileYMin = Math.min(this.tileYMin, item.y);
                this.cameraYMin = Math.min(this.cameraYMin, player.y - this.game.config.height + 430);
        
                if (item.y > this.cameraYMin + this.game.config.height) {
                    item.destroy();
        
                    xAxis = Phaser.Math.Between(100, this.physics.world.bounds.width - 100);
                    pn = this.spawnGround(xAxis, yAxis, 'ground-normal');
        
                    if (this.difficulty === 'semi-pro' || this.difficulty === 'world-class') {
                        if (chanceGround > 90 && chanceGround <= 100) {
                            pd = this.spawnDisappearingGrounds(
                                Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
                                yAxis,
                                'ground-disappearing'
                            );
                        } else if (this.difficulty === 'world-class' && chanceGround > 80 && chanceGround <= 90) {
                            pb = this.spawnBreakingGround(
                                Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
                                yAxis,
                                'ground-breaking'
                            );
                        }
                    }
        
                    if (chanceInvisible <= 5) {
                        this.spawnInvisible(
                            Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
                            Phaser.Math.Between(yAxis, yAxis - 100)
                        );
                    }
    
                    var spawnRates = this.getItemSpawnRate('jumppad');
                    var adjustedJumppadRate = spawnRates / 4; 
        
                    if (chanceItems <= adjustedJumppadRate) {
                        this.spawnJumppad(
                            Phaser.Math.Between(xAxis - 50, xAxis + 50),
                            yAxis - 5,
                            'jumppad'
                        );
                    } else if (chanceItems <= adjustedJumppadRate + 5) {
                        this.spawnDoping(
                            Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
                            Phaser.Math.Between(yAxis, yAxis - 100),
                            'doping'
                        );
                    } else if (chanceItems <= adjustedJumppadRate + 10) {
                        this.spawnMultiBall(
                            Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
                            Phaser.Math.Between(yAxis, yAxis - 100),
                            'multiBall'
                        );
                    } else if (chanceItems <= adjustedJumppadRate + 15) {
                        this.spawnCoin(
                            Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
                            Phaser.Math.Between(yAxis, yAxis - 100)
                        );
                    }
        
                    if (chanceOpponent > 80 && chanceOpponent <= 90) {
                        this.spawnOpponent(
                            0,
                            Phaser.Math.Between(yAxis, yAxis - 100),
                            'opponent'
                        );
                    }
                }
            }, this);
        }
        
        getItemSpawnRate(item) {
            const rates = {
                beginner: 85,
                'semi-pro': 80,
                'world-class': 75
            };
            return rates[this.difficulty];
        }
        
    }
