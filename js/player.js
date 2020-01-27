// ----- PERSONAJE
class Player {
    constructor(ctx, gameSize, mainPlayerSrc, playerSize, velX, velY, gravity, platformsArr, jumpSize) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._player = new Image()
        this._player.src = mainPlayerSrc
        this._playerSize = {
            width: playerSize.width,
            height: playerSize.height
        }
        this._playerPos = {
            x: this._gameSize.width / 2 - this._playerSize.width / 2,
            y: this._gameSize.height - this._playerSize.height - 200
        }
        this._playerPosOrig = {
            x: this._gameSize.width / 2 - this._playerSize.width / 2,
            y: this._gameSize.height - this._playerSize.height - 200
        }
        this._velX = velX
        this._velY = velY
        this._gravity = gravity
        this._platformsArr = platformsArr
        this._jumpSize = jumpSize
    }
    draw() {
        this._ctx.drawImage(this._player, this._playerPos.x, this._playerPos.y, this._playerSize.width, this._playerSize.height);
    }

    move() {
        this._playerPos.y += this._gravity
        this._playerPos.y += this._velY
        if (game.checkCollision()) {
            game.jumpSound.play()
            this._playerPosOrig.y = this._playerPos.y
            this._playerPosOrig.x = this._playerPos.x
            this._velY = -20
        } else {
            if (this._playerPos.y <= (this._playerPosOrig.y - this._jumpSize)) {
                this._velY += 0.5
                this._velY >= 0 ? this._velY = 0 : null
            }
        }

        // MOVIMIENTO IZQUIERDA DERECHA
        document.onkeydown = (e) => {
            if (e.keyCode === 65) {
                this._playerPos.x -= this._velX
            }
            if (e.keyCode === 68) {
                this._playerPos.x += this._velX
            }
            if (e.keyCode === 87) {
                this._playerPos.y -= this._velX
            }
            if (e.keyCode === 83) {
                this._playerPos.y += this._velX
            }
        }
    }
}