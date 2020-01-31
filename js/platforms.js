// GENERAL
class GeneralPlatform {
    constructor(ctx, gameSize, i) {
        this._ctx = ctx
        this._gameSize = gameSize
        // TAMANO
        this._size = {
            width: 100,
            height: 15
        }
        // POSICION
        this._pos = {
            x: Math.random() * (this._gameSize.width - this._size.width),
            y: i
        }
        // TIPO DE PLATAFORMA
        this._type = 'general'
    }
    draw() {
        this._ctx.fillStyle = '#FFFF00'
        this._ctx.fillRect(this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
    move() {

    }
}

// CLASE PARA PLATAFORMAS ROTAS
class BrokenPlatform extends GeneralPlatform {
    constructor(ctx, gameSize, i) {
        super(ctx, gameSize, i)
        // IMAGEN
        this._platform = new Image()
        this._platform.src = "./images/broken-platform-spr.png"
        // FRAMES
        this._platform.frames = 2 // TIENE DOS FRAMES
        this._platform.framesIndex = 0 // EMPIEZA EN EL 0

        // TAMANO
        this._size = {
            width: 100,
            height: 30
        }
        // TIPO DE PLATAFORMA
        this._type = 'broken'
    }
    draw() {
        this._ctx.drawImage(
            this._platform,
            this._platform.framesIndex * Math.floor(this._platform.width / this._platform.frames),
            0,
            Math.floor(this._platform.width / this._platform.frames),
            30,
            this._pos.x,
            this._pos.y,
            this._size.width,
            this._size.height
        )
    }
    broke() {
        this._platform.framesIndex = 1
    }
}

// CLASE PARA PLATAFORMAS QUE SE MUEVEN
class MovingPlatform extends GeneralPlatform {
    constructor(ctx, gameSize, i) {
        super(ctx, gameSize, i)
        // TIPO DE PLATAFORMA
        this._type = 'moving'
        // VELOCIDAD DE MOVIMIENTO HORIZONTAL
        this._vel = 5
    }
    draw() {
        this._ctx.fillStyle = '#40C4FF'
        this._ctx.fillRect(this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
    move() {
        this._pos.x -= this._vel
        this._pos.x >= 0 ? this._vel *= -1 : null
        this._pos.x + this._size.width <= this._gameSize.width ? this._vel *= -1 : null
    }
}