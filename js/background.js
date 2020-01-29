// ----- BACKGROUND
class Background {
    constructor(ctx, gameSize, mainBackSrc) {
        this._ctx = ctx
        this._gameSize = gameSize
        this._mainBack = new Image()
        this._mainBack.src = mainBackSrc
        this._mainBackPos = {
            x: 0,
            y: 0
        }
    }
    draw() {
        this._ctx.drawImage(this._mainBack, this._mainBackPos.x, this._mainBackPos.y, this._gameSize.width, this._gameSize.height);
    }
}