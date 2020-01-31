// CLASE GENERAL PARA TODOS LOS POWERUPS
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

// CLASE PARA EL POWERUP MUELLE
class Spring extends Powerup {
    constructor(ctx, gameSize, platformArr) {
        super(ctx, gameSize, platformArr)
        // TAMANO
        this._size = {
            width: 10,
            height: 10
        }
        // POSICION
        this._pos = {
            x: (this._platformArr[0]._pos.x + this._platformArr[0]._size.width / 2) - this._size.width / 2,
            y: this._platformArr[0]._pos.y - this._size.height
        }
        // IMAGEN
        this._powerUp = new Image()
        this._powerUp.src = './images/spring.png'
    }
}

// CLASE PARA EL POWERUP LLAMA
class Flame extends Spring {
    constructor(ctx, gameSize, platformArr) {
        super(ctx, gameSize, platformArr)
        // TAMANO
        this._size = {
            width: 50,
            height: 50
        }
        // POSICION
        this._pos = {
            x: (this._platformArr[0]._pos.x + this._platformArr[0]._size.width / 2) - this._size.width / 2,
            y: this._platformArr[0]._pos.y - this._size.height
        }
        // IMAGEN
        this._powerUp = new Image()
        this._powerUp.src = './images/flame.png'
    }
}