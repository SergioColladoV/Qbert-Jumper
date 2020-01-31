// CLASE PARA EL ENEMIGO
class Donkey {
    constructor(ctx, gameSize, platformArr) {
        this._ctx = ctx
        this._gameSize = gameSize
        this._platformArr = platformArr
        // TAMANO
        this._size = {
            width: 100,
            height: 82
        }
        // POSICION
        this._pos = {
            x: this._platformArr[0]._pos.x,
            y: this._platformArr[0]._pos.y - this._size.height
        }
        // IMAGEN
        this._donkey = new Image()
        this._donkey.src = '/images/donkey-kong.png'
    }

    draw() {
        this._ctx.drawImage(this._donkey, this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
}