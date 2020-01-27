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
    velX: 30,
    velY: 0,
    gravity: 10,
    // BACKGROUND PROPERTIES
    mainBackSrc: '../images/background.jpg',
    mainBack: undefined,
    // PLAYER GENERAL
    playerSize: {
        width: 64,
        height: 60
    },
    jumpSize: 30,
    // PLAYER QBERT
    qbertSrc: '../images/qbert.png',
    qbert: undefined,
    // PLATFORMS ARRAY
    platformsArr: [],
    // PLATFORM BASIC
    platformSrc: 'tobecompleted',
    // PLATFORM BROKEN
    platformBrokenSrc: 'tobecompleted',
    // SOUNDS
    jumpSoundSrc: '../sounds/jump.wav',
    jumpSound: undefined,
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
        this.mainBack = new Background(this.ctx, this.gameSize, this.mainBackSrc, this.velY)
        this.qbert = new Player(this.ctx, this.gameSize, this.qbertSrc, this.playerSize, this.velX, this.velY, this.gravity, this.platformsArr, this.jumpSize)
        this.jumpSound = new Sound(this.jumpSoundSrc)
        for (let i = 0; i < this.gameSize.height; i += (Math.random() * (100 - 50) + 50)) {
            this.platformsArr.push(new Platforms(this.ctx, this.gameSize, this.platformSrc, i))
        }
        let counter = 0
        this.intervalID = setInterval(() => {
            counter > 1000 ? counter = 0 : null
            //console.warn(`Iteracion ${counter}`)
            counter++
            if (counter % 30 == 0) {
                //console.log("Entro")

            }
            this.drawAll()
            this.moveAll()
        }, 1000 / this.FPS)
    },
    drawAll() {
        this.mainBack.draw()
        this.qbert.draw()
        this.platformsArr.forEach(elem => {
            //console.log(elem)
            elem.draw()
        })
    },
    moveAll() {
        this.qbert.move()
        // tobecompleted SE MOVERA? ESTA PREPARADO
        // this.mainBack.move()
    },
    checkCollision() {
        return this.platformsArr.some((platform) => {
            return ((this.qbert._playerPos.y + this.qbert._playerSize.height) >= platform._platformPos.y) &&
                (this.qbert._playerPos.x <= (platform._platformPos.x + platform._platformSize.width)) &&
                ((this.qbert._playerPos.x + this.qbert._playerSize.width) >= platform._platformPos.x) &&
                ((this.qbert._playerPos.y + this.qbert._playerSize.height) <= (platform._platformPos.y + platform._platformSize.height))
        })
    }
}

// COLOR FONDO: #012f53
// COLOR ESTRELLAS: #6593b7
// COLOR PLATAFORMAS: #ffdc88