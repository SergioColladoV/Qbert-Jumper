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
    jumpSize: 30,
    // PLAYER QBERT
    qbertSrc: '../images/qbert-left.png',
    qbertSrcDown: '../images/qbert-left-down.png',
    qbert: undefined,
    // PLATFORMS ARRAY
    platformsArr: [],
    // SOUNDS
    jumpSoundSrc: '../sounds/jump.wav',
    jumpSound: undefined,
    mainSoundSrc: '../sounds/main.mp3',
    mainSound: undefined,
    springSoundSrc: '../sounds/spring.wav',
    springSound: undefined,
    // POWERUPS
    springPU: [],
    init() {
        // SELECCIONAR CANVAS Y ASOCIAR CONTEXTO
        this.canvasDOM = document.querySelector('#canvas')
        this.ctx = this.canvasDOM.getContext('2d');
        this.setDimensions()
        this.start()
    },
    setDimensions() {
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
            //console.log(elem)
            elem.draw()
        })
        this.springPU.forEach(elem => {
            //console.log(elem)
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
        // this.springPU.forEach(elem => {
        //     //console.log(elem)
        //     elem.move()
        // })
        this.mainSound.play()
    },
    checkCollision() {
        return this.platformsArr.some((platform) => {
            return ((this.qbert._pos.y + this.qbert._size.height) >= platform._pos.y) &&
                (this.qbert._pos.x <= (platform._pos.x + platform._size.width)) &&
                ((this.qbert._pos.x + this.qbert._size.width) >= platform._pos.x) &&
                ((this.qbert._pos.y + this.qbert._size.height) <= (platform._pos.y + platform._size.height)) &&
                (platform._type != "broken")
        })
    },
    checkPUCollision() {
        return this.springPU.some((spring) => {
            return ((this.qbert._pos.y + this.qbert._size.height) >= spring._pos.y) &&
                (this.qbert._pos.x <= (spring._pos.x + spring._size.width)) &&
                ((this.qbert._pos.x + this.qbert._size.width) >= spring._pos.x) &&
                ((this.qbert._pos.y + this.qbert._size.height) <= (spring._pos.y + spring._size.height))
        })
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
                    if (randomSelector < 0.1) {
                        this.springPU.push(new Spring(this.ctx, this.gameSize, this.platformsArr))
                    }
                    break;
                case 2:
                    platform = new BrokenPlatform(this.ctx, this.gameSize, i)
                    this.platformsArr.unshift(platform)
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
    },
    goUp() {
        this.platformsArr.forEach(platform => {
            return platform._pos.y -= this.qbert._velY
        })
        this.distanceFromFloor++

        this.springPU.forEach(spring => {
            return spring._pos.y -= this.qbert._velY
        })
    },
    setScore() {
        this.score = this.distanceFromFloor
        scoreNumber.innerHTML = parseInt(this.score)
    },
    gameOver() {
        //alert("Game Over")
        clearInterval(this.intervalID)
    },
    setInitialState() {
        // FONDO
        this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc, this.velY)
        // PRIMERAS PLATAFORMAS
        let calc = this.gameSize.height / this.level
        for (let i = calc; i < this.gameSize.height - 1; i += calc) {
            let platform = new GeneralPlatform(this.ctx, this.gameSize, i)
            this.platformsArr.push(platform)
        }
        // PLAYER
        this.qbert = new Player(this.ctx, this.gameSize, this.qbertSrc, this.playerSize, this.velX, this.velY, this.gravity, this.platformsArr, this.jumpSize)
        // MUSICA PRINCIPAL
        this.mainSound = new Sound(this.mainSoundSrc)
        // SONIDO SALTO
        this.jumpSound = new Sound(this.jumpSoundSrc)
        // SONIDO MUELLE
        this.springSound = new Sound(this.springSoundSrc)
    }
}

// COLOR FONDO: #012f53
// COLOR ESTRELLAS: #6593b7
// COLOR PLATAFORMAS: #ffdc88