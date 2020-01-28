class Spring {
    constructor(ctx, gameSize, platformArr) {
        this._ctx = ctx
        this._gameSize = gameSize
        this._platformArr = platformArr

        this._size = {
            width: 10,
            height: 10
        }

        this._pos = {
            x: this._platformArr[0]._pos.x + this._platformArr[0]._size.width / 2,
            y: this._platformArr[0]._pos.y - 15
        }

        this._spring = new Image()
        this._spring.src = '../images/spring.png'
    }

    draw() {
        this._ctx.drawImage(this._spring, this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
}