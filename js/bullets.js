class Bullet {
    constructor(ctx, pos) {
        this._ctx = ctx
        this._pos = {
            x: pos.x,
            y: pos.y
        }
        this._size = {
            width: 10,
            height: 10
        }
        this._velY = 10;
    }

    draw() { //DIbujamos las balas con un arco
        this._ctx.fillStyle = "red";
        this._ctx.fillRect(this._pos.x, this._pos.y + 20, this._size.width, this._size.height);
        this._ctx.fill();
        this._ctx.closePath();
    }

    move() {
        this._pos.y -= this._velY
        game.checkBulletCollision()
        
    }
}