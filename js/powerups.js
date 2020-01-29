class Powerup {
    constructor(ctx, gameSize, platformArr) {
        this._ctx = ctx
        this._gameSize = gameSize
        this._platformArr = platformArr
    }

    draw() {
        this._ctx.drawImage(this._powerUp, this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
}

class Spring extends Powerup {
    constructor(ctx, gameSize, platformArr) {
        super(ctx, gameSize, platformArr)

        this._size = {
            width: 10,
            height: 10
        }
        this._pos = {
            x: (this._platformArr[0]._pos.x + this._platformArr[0]._size.width / 2) - this._size.width / 2,
            y: this._platformArr[0]._pos.y - this._size.height
        }

        this._powerUp = new Image()
        this._powerUp.src = '../images/spring.png'
    }
}
class Flame extends Spring {
    constructor(ctx, gameSize, platformArr) {
        super(ctx, gameSize, platformArr)
        this._size = {
            width: 50,
            height: 50
        }
        this._pos = {
            x: (this._platformArr[0]._pos.x + this._platformArr[0]._size.width / 2) - this._size.width / 2,
            y: this._platformArr[0]._pos.y - this._size.height
        }
        this._powerUp = new Image()
        this._powerUp.src = '../images/flame.png'
    }
}