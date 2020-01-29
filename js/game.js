const game = {
    name: 'Doodle',
    description: 'Doodle Type Game for week3@IronHack',
    author: 'Sergio',
    license: undefined,
    version: 1.0,
    canvasDOM: undefined,
    ctx: undefined,
    intervalID: undefined,
    // GENERAL PROPERTIES
    FPS: 25,
    gameSize: {
        width: 400,
        height: 700
    },
    velX: 15,
    velY: 0,
    gravity: 0.5,
    level: 10,
    distanceFromFloor: 0,
    score: 0,
    // BACKGROUND PROPERTIES
    mainBackSrc: '../images/background.jpg',
    mainBack: undefined,
    // PLAYER GENERAL
    playerSize: {
        width: 280 * 0.3,
        height: 300 * 0.3
    },
    // PLAYER QBERT
    qbertSrc: '../images/qbert-left.png',
    qbertSrcDown: '../images/qbert-left-down.png',
    qbert: undefined,
    // PLATFORMS ARRAY
    platformsArr: [],
    // SOUNDS
    jumpSoundSrc: '../sounds/jump.wav',
    jumpSound: undefined,
    mainSoundSrc: '../sounds/main2.mp3',
    mainSound: undefined,
    springSoundSrc: '../sounds/spring.wav',
    springSound: undefined,
    shootSoundSrc: '../sounds/laser.mp3',
    shootSound: undefined,
    // FIRE MODE
    firemodeSoundSrc: '../sounds/fireMode.mp3',
    firemodeSound: undefined,
    fireModeEnabled: false,
    invencible: false,
    // EFFECTS
    effects: [],
    flames: [],
    enemies: [],
    bullets: [],
    init() {
        // SELECCIONAR CANVAS Y ASOCIAR CONTEXTO
        this.canvasDOM = document.querySelector('#canvas')
        this.ctx = this.canvasDOM.getContext('2d');
        this.setDimensions()
        this.start()
    },
    setDimensions() {
        // this.gameSize.width = window.innerWidth
        // this.gameSize.height = window.innerHeight
        this.canvasDOM.width = this.gameSize.width
        this.canvasDOM.height = this.gameSize.height
    },
    start() {
        this.setInitialState()
        // -----
        // INTERVAL
        // -----
        let counter = 0
        this.intervalID = setInterval(() => {
            counter > 1000 ? counter = 0 : null
            counter++
            this.platformGenerator()
            if (counter % 30 == 0) {
                //console.log("Entro")
            }
            this.drawAll()
            this.moveAll()
            this.setScore()
        }, 1000 / this.FPS)
    },

    drawAll() {
        this.mainBack.draw()
        this.platformsArr.forEach(elem => {
            elem.draw()
        })
        this.effects.forEach(elem => {
            elem.draw()
        })
        this.enemies.forEach(elem => {
            elem.draw()
        })
        this.flames.forEach(elem => {
            elem.draw()
        })
        this.bullets.forEach(elem => {
            elem.draw()
        })
        this.qbert.draw()
    },
    moveAll() {
        this.qbert.move()
        this.platformsArr.forEach(elem => {
            //console.log(elem)
            elem.move()
        })
        this.bullets.forEach(elem => {
            elem.move()
        })
    },
    checkCollision(elem) {
        return elem.some((object) => {
            return ((this.qbert._pos.y + this.qbert._size.height) >= object._pos.y) &&
                (this.qbert._pos.x <= (object._pos.x + object._size.width)) &&
                ((this.qbert._pos.x + this.qbert._size.width) >= object._pos.x) &&
                ((this.qbert._pos.y + this.qbert._size.height) <= (object._pos.y + object._size.height)) &&
                (object._type != "broken")
        })
    },
    checkEnemyCollision() {
        return this.enemies.some((enemy) => {
            return ((this.qbert._pos.y + this.qbert._size.height) >= enemy._pos.y) &&
                (this.qbert._pos.x <= (enemy._pos.x + enemy._size.width)) &&
                ((this.qbert._pos.x + this.qbert._size.width) >= enemy._pos.x) &&
                ((this.qbert._pos.y) <= (enemy._pos.y + enemy._size.height))
        })
    },
    checkBulletCollision() {
        if (this.enemies.length !== 0) {
            this.bullets.forEach(bullet => {
                this.enemies.forEach((enemy, idx) => {
                    if ((bullet._pos.y <= enemy._pos.y + enemy._size.height) &&
                        (bullet._pos.x <= enemy._pos.x + enemy._size.width) &&
                        (bullet._pos.x + bullet._size.width >= enemy._pos.x)) {
                        this.invencible = true
                        setTimeout(() => {
                            this.invencible = false
                        }, 1000);
                        enemy._pos.y += 50
                    }
                })
            })
        }
    },
    platformGenerator() {
        if (this.platformsArr.length < this.level) {
            let calc = this.gameSize.height / this.level
            let platform, prob, randomSelector
            let i = this.platformsArr[0]._pos.y - calc
            randomSelector = Math.random()

            console.log(randomSelector)
            if (randomSelector < 0.6) {
                prob = 1
            } else if (randomSelector < 0.7) {
                prob = 2
            } else if (randomSelector < 1) {
                prob = 3
            }

            switch (prob) {
                case 1:
                    platform = new GeneralPlatform(this.ctx, this.gameSize, i)
                    this.platformsArr.unshift(platform)
                    if (randomSelector < 0.05) {
                        this.enemies.push(new Donkey(this.ctx, this.gameSize, this.platformsArr))
                    } else if (randomSelector < 0.1) {
                        this.effects.push(new Spring(this.ctx, this.gameSize, this.platformsArr))
                    } else if (randomSelector < 0.11) {
                        this.fireModeEnabled ? null : this.flames.push(new Flame(this.ctx, this.gameSize, this.platformsArr))
                    }
                    break;
                case 2:
                    let brokenCounter = 0
                    this.platformsArr.forEach(platform => {
                        platform._type === 'broken' ? brokenCounter++ : null
                    })
                    if (brokenCounter === 0) {
                        platform = new BrokenPlatform(this.ctx, this.gameSize, i)
                        this.platformsArr.unshift(platform)
                    }
                    break;
                case 3:
                    platform = new MovingPlatform(this.ctx, this.gameSize, i)
                    this.platformsArr.unshift(platform)
                    break;
            }
        }

        // BORRA LOS QUE SE SALEN DE LA PANTALLA
        this.platformsArr = this.platformsArr.filter(elem => {
            return elem._pos.y <= this.gameSize.height
        })
        this.effects = this.effects.filter(elem => {
            return elem._pos.y <= this.gameSize.height
        })
        this.enemies = this.enemies.filter(elem => {
            return elem._pos.y <= this.gameSize.height
        })
        this.bullets = this.bullets.filter(elem => {
            return elem._pos.y >= 0
        })
    },
    goUp() {
        this.platformsArr.forEach(platform => {
            return platform._pos.y -= this.qbert._velY
        })
        this.distanceFromFloor++

        this.effects.forEach(effect => {
            return effect._pos.y -= this.qbert._velY
        })
        this.enemies.forEach(enemy => {
            return enemy._pos.y -= this.qbert._velY
        })
        this.flames.forEach(enemy => {
            return enemy._pos.y -= this.qbert._velY
        })
    },
    setScore() {
        this.score = this.distanceFromFloor
        scoreNumber.innerHTML = parseInt(this.score)
    },
    gameOver() {
        if (!this.invencible) {
            this.mainBackSrc = '../images/gameover.png'
            this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
            setTimeout(() => {
                this.mainBack.draw()
            }, 100)
            clearInterval(this.intervalID)
        }
    },
    setInitialState() {
        // SHOW SCORE
        score.style.opacity = 1
        // FONDO
        this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
        // PRIMERAS PLATAFORMAS
        let calc = this.gameSize.height / this.level
        for (let i = calc; i < this.gameSize.height - 1; i += calc) {
            let platform = new GeneralPlatform(this.ctx, this.gameSize, i)
            this.platformsArr.push(platform)
        }
        // PLAYER
        this.qbert = new Player(this.ctx, this.gameSize, this.qbertSrc, this.playerSize, this.velX, this.velY, this.gravity, this.platformsArr)
        // MUSICA PRINCIPAL
        this.mainSound = new Sound(this.mainSoundSrc)
        this.mainSound.play()
        // SONIDO DISPARO
        this.shootSound = new Sound(this.shootSoundSrc)
        // SONIDO SALTO
        this.jumpSound = new Sound(this.jumpSoundSrc)
        // SONIDO MUELLE
        this.springSound = new Sound(this.springSoundSrc)
    },
    fireMode() {
        setTimeout(() => {
            this.fireModeEnabled = false
            this.invencible = false
            this.mainBackSrc = '../images/background.jpg'
            this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
            this.firemodeSound.stop()
            this.mainSound.play()
            this.qbert._gravity = 0.5
        }, 5000)
        this.fireModeEnabled = true
        this.invencible = true
        this.flames = []
        this.mainBackSrc = '../images/back-flames.png'
        this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
        this.mainSound.stop()
        // SONIDO FIRE MODE
        this.firemodeSound = new Sound(this.firemodeSoundSrc)
        this.firemodeSound.play()

    }
}

// COLOR FONDO: #012f53
// COLOR ESTRELLAS: #6593b7
// COLOR PLATAFORMAS: #ffdc88