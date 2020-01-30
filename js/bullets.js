// CLASE PARA GENERAR BALAS
class Bullet {
    constructor(ctx, pos) {
        this._ctx = ctx
        // POSICION
        this._pos = {
            x: pos.x,
            y: pos.y
        }
        // TAMANO
        this._size = {
            width: 10,
            height: 10
        }
        // VELOCIDAD BALAS
        this._velY = 10;
    }

    draw() {
        // DIBUJA LAS BALAS COMO CUADRADOS ROJOS
        this._ctx.fillStyle = "red"
        this._ctx.fillRect(this._pos.x, this._pos.y + 20, this._size.width, this._size.height)
        this._ctx.fill()
    }

    move() {
        // LAS BALAS SE MUEVEN CONTINUAMENTE HACIA ARRIBA
        this._pos.y -= this._velY
    }
}