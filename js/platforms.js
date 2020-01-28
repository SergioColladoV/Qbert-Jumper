// PLATAFORMAS
class Platforms {
    constructor(ctx, gameSize, platformSrc, i) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._platform = new Image()
        this._platform.src = platformSrc

        this._platformSize = {
            width: 80,
            height: 15
        }
        this._platformPos = {
            x: Math.random() * (this._gameSize.width - this._platformSize.width),
            y: i
        }
    }

    draw() {
        this._ctx.fillStyle = '#ffdc88'
        this._ctx.fillRect(this._platformPos.x, this._platformPos.y, this._platformSize.width, this._platformSize.height);
    }

    move() {
        this._platformPos.y += 10
    }
}