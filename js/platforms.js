// GENERAL
class GeneralPlatform {
    constructor(ctx, gameSize, i) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._size = {
            width: 100,
            height: 15
        }
        this._pos = {
            x: Math.random() * (this._gameSize.width - this._size.width),
            y: i
        }
        this._type = 'general'
    }

    draw() {
        this._ctx.fillStyle = '#FFFF00'
        this._ctx.fillRect(this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
    move() {}
}

// ROTA
class BrokenPlatform extends GeneralPlatform {
    constructor(ctx, gameSize, i) {
        super(ctx, gameSize, i)

        this._platform = new Image()
        this._platform.src = '../images/broken-platform.png'

        this._type = 'broken'
    }
    draw() {
        this._ctx.drawImage(this._platform, this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
    move() {}
}

// 
// ROTA
class MovingPlatform extends GeneralPlatform {
    constructor(ctx, gameSize, i) {
        super(ctx, gameSize, i)

        this._type = 'moving'
        this._vel = 5
    }
    draw() {
        this._ctx.fillStyle = '#40C4FF'
        this._ctx.fillRect(this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
    move() {
        this._pos.x -= this._vel
        if (this._pos.x >= 0) {
            this._vel *= -1
        }
        if (this._pos.x + this._size.width <= this._gameSize.width) {
            this._vel *= -1
        }
    }
}