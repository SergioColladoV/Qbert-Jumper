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
    gravity: 0.5,
    level: 10,
    distanceFromFloor: 0,
    score: 0,
    velX: 10,
    // BACKGROUND PROPERTIES
    mainBackSrc: './images/background.jpg',
    mainBack: undefined,
    // PLAYER GENERAL
    playerSize: {
        width: 280 * 0.3,
        height: 300 * 0.3
    },
    // PLAYER QBERT
    qbert: undefined,
    // PLATFORMS ARRAY
    platformsArr: [],
    // SOUNDS
    jumpSoundSrc: './sounds/jump.wav',
    jumpSound: undefined,
    mainSoundSrc: './sounds/main.mp3',
    mainSound: undefined,
    springSoundSrc: './sounds/spring.wav',
    springSound: undefined,
    shootSoundSrc: './sounds/laser.mp3',
    shootSound: undefined,
    firemodeSoundSrc: './sounds/fireMode.mp3',
    firemodeSound: undefined,
    gameoverSoundSrc: './sounds/gameover.wav',
    gameoverSound: undefined,
    enemyappearSrc: './sounds/enemyappear.wav',
    enemyappear: undefined,
    enemydeathSoundSrc: './sounds/enemydeath.wav',
    enemydeathSound: undefined,
    winSoundSrc: './sounds/win.wav',
    winSound: undefined,
    brokeSoundSrc: './sounds/broke.wav',
    brokeSound: undefined,
    // FIRE MODE
    fireModeEnabled: false,
    invencible: false,
    // EFFECTS
    effects: [],
    flames: [],
    enemies: [],
    bullets: [],
    // MOBILE
    lastGamma: 0,
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
        this.qbert = new Player(this.ctx, this.gameSize, this.gravity, this.platformsArr, this.velX)
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
            this.cleanAll()
            this.drawAll()
            this.moveAll()
            this.playerBehavior()
            this.checkBulletCollision()
            this.fireMode()
            this.setScore()
            counter % 30 == 0 ? this.mobile() : null
            // this.mobile()
            this.win()
            this.gameOver()
        }, 1000 / this.FPS)
    },
    platformGenerator() {
        if (this.platformsArr.length < this.level) {
            let calc = this.gameSize.height / this.level
            let platform, prob, randomSelector
            let i = this.platformsArr[0]._pos.y - calc
            randomSelector = Math.random()
            // SEGUN RANDOM INICIALIAZA UNA VARIABLE PRO QUE SE USARA EN EL SWITCH
            randomSelector < 0.6 ? prob = 1 : randomSelector < 0.7 ? prob = 2 : randomSelector < 0.9 ? prob = 3 : null
            // SWITCH PARA GENERAR DIFERENTES TIPOS DE PLATAFORMAS, ENEMIGOS Y EFECTOS
            switch (prob) {
                case 1:
                    platform = new GeneralPlatform(this.ctx, this.gameSize, i)
                    this.platformsArr.unshift(platform)
                    if (randomSelector < 0.04) {
                        this.enemies.push(new Donkey(this.ctx, this.gameSize, this.platformsArr))
                        this.enemyappear = new Sound(this.enemyappearSrc)
                        this.enemyappear.play()
                    } else if (randomSelector < 0.1) {
                        this.effects.push(new Spring(this.ctx, this.gameSize, this.platformsArr))
                    } else if (randomSelector < 0.15) {
                        this.fireModeEnabled ? null : this.flames.push(new Flame(this.ctx, this.gameSize, this.platformsArr))
                    }
                    break;
                case 2:
                    // CONTADOR PARA QUE SOLAMENTE SE GENERE UNA PLATAFORMA ROTA A LA VEZ
                    let brokenCounter = 0
                    this.platformsArr.forEach(platform => {
                        platform._type === 'broken' ? brokenCounter++ : null
                    })
                    brokenCounter === 0 ? (platform = new BrokenPlatform(this.ctx, this.gameSize, i), this.platformsArr.unshift(platform)) : null
                    break;
                case 3:
                    platform = new MovingPlatform(this.ctx, this.gameSize, i)
                    this.platformsArr.unshift(platform)
                    break;
            }
        }
    },
    cleanAll() {
        // BORRA LOS QUE SE SALEN DE LA PANTALLA
        this.platformsArr = this.platformsArr.filter(elem => elem._pos.y <= this.gameSize.height)
        this.effects = this.effects.filter(elem => elem._pos.y <= this.gameSize.height)
        this.enemies = this.enemies.filter(elem => elem._pos.y <= this.gameSize.height)
        this.bullets = this.bullets.filter(elem => elem._pos.y >= 0)
    },
    drawAll() {
        this.mainBack.draw()
        this.platformsArr.forEach(elem => elem.draw())
        this.effects.forEach(elem => elem.draw())
        this.enemies.forEach(elem => elem.draw())
        this.flames.forEach(elem => elem.draw())
        this.bullets.forEach(elem => elem.draw())
        this.qbert.draw()
    },
    moveAll() {
        this.qbert.move()
        this.platformsArr.forEach(elem => elem.move())
        this.bullets.forEach(elem => elem.move())
    },
    playerBehavior() {
        // SI COLISIONA CON MUELLE Y ESTA BAJANDO
        if (this.checkCollision(this.effects) && this.qbert._velY >= 0) {
            // Reproduce sonido muelle
            this.springSound.play()
            // Guarda siempre posicion inicial
            this.qbert._posOrig.y = this.qbert._pos.y
            this.qbert._posOrig.x = this.qbert._pos.x
            // Impulso ampliado
            this.qbert._velY = -25
            // SI TIENE EL MODO LLAMA
        } else if (this.fireModeEnabled) {
            // Gravedad 0 para que suba constante
            this.qbert._gravity = 0
            // Guarda siempre posicion inicial
            this.qbert._posOrig.y = this.qbert._pos.y
            this.qbert._posOrig.x = this.qbert._pos.x
            this.qbert._velY = -25
            // SI COLISIONA CON UNA PLATAFORMA NORMAL MIENTRAS BAJA
        } else if (this.checkCollision(this.platformsArr) && this.qbert._velY >= 0) {
            // Reproduce sonido salto normal
            this.jumpSound.play()
            // Guarda siempre posicion inicial
            this.qbert._posOrig.y = this.qbert._pos.y
            this.qbert._posOrig.x = this.qbert._pos.x
            // Impulso normal
            this.qbert._velY = -15
        }
    },
    checkCollision(elem) {
        return elem.some((object) => {
            if (((this.qbert._pos.y + this.qbert._size.height) >= object._pos.y) &&
                (this.qbert._pos.x <= (object._pos.x + object._size.width)) &&
                ((this.qbert._pos.x + this.qbert._size.width) >= object._pos.x) &&
                ((this.qbert._pos.y + this.qbert._size.height) <= (object._pos.y + object._size.height)) &&
                (object._type != "broken")) {
                return true
            } else if (((this.qbert._pos.y + this.qbert._size.height) >= object._pos.y) &&
                (this.qbert._pos.x <= (object._pos.x + object._size.width)) &&
                ((this.qbert._pos.x + this.qbert._size.width) >= object._pos.x) &&
                ((this.qbert._pos.y + this.qbert._size.height) <= (object._pos.y + object._size.height)) &&
                (object._type == "broken") && this.qbert._velY >= 0) {
                this.brokeSound = new Sound(this.brokeSoundSrc)
                this.brokeSound.play()
                object.broke()
                return false
            }
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
        (this.enemies.length !== 0) ? this.bullets.forEach(bullet => {
            this.enemies.forEach((enemy) => {
                if ((bullet._pos.y <= enemy._pos.y + enemy._size.height) &&
                    (bullet._pos.x <= enemy._pos.x + enemy._size.width) &&
                    (bullet._pos.x + bullet._size.width >= enemy._pos.x)) {
                    this.enemydeathSound = new Sound(this.enemydeathSoundSrc)
                    this.enemydeathSound.play()
                    this.invencible = true
                    setTimeout(() => this.invencible = false, 1000);
                    enemy._pos.y += 100
                }
            })
        }): null
    },
    fireMode() {
        if (this.checkCollision(this.flames)) {
            setTimeout(() => this.invencible = false, 10000)
            setTimeout(() => {
                this.fireModeEnabled = false
                this.mainBackSrc = './images/background.jpg'
                this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
                this.firemodeSound.stop()
                this.mainSound.play()
                this.qbert._gravity = 0.5
            }, 7000)
            this.fireModeEnabled = true
            this.invencible = true
            this.flames = []
            this.mainBackSrc = './images/back-flames.png'
            this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
            this.mainSound.stop()
            // SONIDO FIRE MODE
            this.firemodeSound = new Sound(this.firemodeSoundSrc)
            this.firemodeSound.play()
        }
    },
    setScore() {
        this.score = this.distanceFromFloor
        scoreNumber.innerHTML = parseInt(this.score)
    },
    win() {
        if (this.score >= 500) {
            this.mainBackSrc = './images/win.png'
            this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
            this.firemodeSound.stop()
            this.mainSound.stop()
            this.winSound = new Sound(this.winSoundSrc)
            this.winSound.play()
            setTimeout(() => this.mainBack.draw(), 100)
            clearInterval(this.intervalID)
        }
    },
    gameOver() {
        if ((!this.invencible && this.checkEnemyCollision()) || (this.qbert._pos.y + this.qbert._size.height) >= this.gameSize.height) {
            this.mainSound.stop()
            this.gameoverSound = new Sound(this.gameoverSoundSrc)
            this.gameoverSound.play()
            this.mainBackSrc = './images/gameover.png'
            this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc)
            setTimeout(() => this.mainBack.draw(), 100)
            clearInterval(this.intervalID)
        }
    },
    goUp() {
        this.distanceFromFloor++
        this.platformsArr.forEach(platform => platform._pos.y -= this.qbert._velY)
        this.effects.forEach(effect => effect._pos.y -= this.qbert._velY)
        this.enemies.forEach(enemy => enemy._pos.y -= this.qbert._velY)
        this.flames.forEach(enemy => enemy._pos.y -= this.qbert._velY)
    },
    mobile() {
        window.addEventListener('deviceorientation', (event) => {
            let gamma = event.gamma
            console.log(gamma)
            gamma < game.lastGamma ? this.qbert._pos.x -= 10 : gamma > this.lastGamma ? this.qbert._pos.x += 10 : null
            this.lastGamma = gamma
        });
    }
}

// COLOR FONDO: #012f53
// COLOR ESTRELLAS: #6593b7
// COLOR PLATAFORMAS: #ffdc88