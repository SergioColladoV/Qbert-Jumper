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
        this._playerSize = {
            width: playerSize.width,
            height: playerSize.height
        }
        this._playerPos = {
            x: this._platformsArr[this._platformsArr.length - 1]._platformPos.x,
            y: this._platformsArr[this._platformsArr.length - 1]._platformPos.y - this._playerSize.height
        }
        this._playerPosOrig = {
            x: this._gameSize.width / 2 - this._playerSize.width / 2,
            y: this._gameSize.height - this._playerSize.height - 200
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
        this._ctx.drawImage(this._player, this._playerPos.x, this._playerPos.y, this._playerSize.width, this._playerSize.height);
    }

    move() {
        //  GAME OVER
        if ((this._playerPos.y + this._playerSize.height) >= this._gameSize.height) {
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
        if (this._playerPos.y <= this._gameSize.height / 2 && this._velY <= 0) {
            game.goUp()

        } else {
            this._playerPos.y += this._velY
        }
        // SI ESTA BAJANDO
        if (this._velY >= 0) {
            game.qbert._player.src = this._playerDown
        } else {
            game.qbert._player.src = this._playerUp
        }
        // SI COLISIONA Y ESTA BAJANDO
        if (game.checkCollision() && this._velY >= 0) {
            //game.jumpSound.play()
            this._playerPosOrig.y = this._playerPos.y
            this._playerPosOrig.x = this._playerPos.x
            this._velY = -15
        }
    }

    setListener() {
        // MOVIMIENTO IZQUIERDA DERECHA
        document.onkeydown = (e) => {
            if (e.keyCode === 65) {
                this._playerPos.x -= this._velX
            } else if (e.keyCode === 68) {
                this._playerPos.x += this._velX
            }
        }
    }
}