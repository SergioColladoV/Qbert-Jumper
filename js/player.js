// ----- PERSONAJE
class Player {
    constructor(ctx, gameSize, mainPlayerSrc, playerSize, velX, velY, gravity, platformsArr, jumpSize) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._player = new Image()
        this._player.src = mainPlayerSrc
        this._playerUp = mainPlayerSrc
        this._playerDown = '../images/qbert-left-down.png'
        this._platformsArr = platformsArr
        this._size = {
            width: playerSize.width,
            height: playerSize.height
        }
        this._pos = {
            x: this._platformsArr[this._platformsArr.length - 1]._pos.x,
            y: this._platformsArr[this._platformsArr.length - 1]._pos.y - this._size.height
        }
        this._posOrig = {
            x: this._gameSize.width / 2 - this._size.width / 2,
            y: this._gameSize.height - this._size.height - 200
        }
        this._velX = velX
        this._velY = velY
        this._gravity = gravity
        this._jumpSize = jumpSize
        this._left = false
        this._right = false
        this.setListener()
    }
    draw() {
        this._ctx.drawImage(this._player, this._pos.x, this._pos.y, this._size.width, this._size.height);
    }

    move() {
        //  GAME OVER
        if ((this._pos.y + this._size.height) >= this._gameSize.height) {
            game.gameOver()
        }
        // GRAVEDAD Y DESPLAZAMIENTO DE LA PANTALLA 
        this._velY += this._gravity
        // SI ESTA SUBIENDO Y ESTA POR ENCIMA DE LA MITAD DE LA PANTALLA
        // LAS PLATAFORMAS BAJAN IGUAL A LA VELOCIDAD DEL PLAYER
        // EL PLAYER NO SE MUEVE
        // -----
        // SI EL PLAYER NO ESTA POR ENCIMA DE LA PANTALLA 
        // EL PLAYER SE MUEVE CON SU VELOCIDAD
        if (this._pos.y <= this._gameSize.height / 2 && this._velY <= 0) {
            game.goUp()

        } else {
            this._pos.y += this._velY
        }
        // SI ESTA BAJANDO
        if (this._velY >= 0) {
            game.qbert._player.src = this._playerDown
        } else {
            game.qbert._player.src = this._playerUp
        }
        // SI COLISIONA Y ESTA BAJANDO
        if (game.checkPUCollision() && this._velY >= 0) {
            game.springSound.play()
            this._posOrig.y = this._pos.y
            this._posOrig.x = this._pos.x
            this._velY = -25
        } else if (game.checkCollision() && this._velY >= 0) {
            game.jumpSound.play()
            this._posOrig.y = this._pos.y
            this._posOrig.x = this._pos.x
            this._velY = -15
        }
    }

    setListener() {
        // MOVIMIENTO IZQUIERDA DERECHA
        document.onkeydown = (e) => {
            if (e.keyCode === 65) {
                this._pos.x -= this._velX
            } else if (e.keyCode === 68) {
                this._pos.x += this._velX
            }
        }
    }
}