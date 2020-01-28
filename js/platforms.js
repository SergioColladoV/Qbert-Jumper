// GENERAL
class GeneralPlatform {
    constructor(ctx, gameSize, i) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._platformSize = {
            width: 100,
            height: 15
        }
        this._platformPos = {
            x: Math.random() * (this._gameSize.width - this._platformSize.width),
            y: i
        }
        this._type = 'general'
    }

    draw() {
        this._ctx.fillStyle = '#FFFF00'
        this._ctx.fillRect(this._platformPos.x, this._platformPos.y, this._platformSize.width, this._platformSize.height);
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
        this._ctx.drawImage(this._platform, this._platformPos.x, this._platformPos.y, this._platformSize.width, this._platformSize.height);
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
        this._ctx.fillRect(this._platformPos.x, this._platformPos.y, this._platformSize.width, this._platformSize.height);
    }
    move() {
        this._platformPos.x -= this._vel
        if (this._platformPos.x >= 0) {
            this._vel *= -1
        }
        if (this._platformPos.x + this._platformSize.width <= this._gameSize.width) {
            this._vel *= -1
        }
    }
}