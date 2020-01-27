// ----- PERSONAJE
class Player {
    constructor(ctx, gameSize, mainPlayerSrc, playerSize, velX, velY, gravity, platformsArr, jumpSize) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._player = new Image()
        this._player.src = mainPlayerSrc
        this._platformsArr = platformsArr
        this._playerSize = {
            width: playerSize.width,
            height: playerSize.height
        }
        this._playerPos = {
            // x: this._platformsArr[0],
            x: this._gameSize.width - this._playerSize.width - 200,
            y: this._gameSize.height - this._playerSize.height - 200
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
        if (this._playerPos.y - this._playerSize.height <= this._gameSize.height / 2) {
            game.goUp()
        }
        this._playerPos.y += this._gravity
        this._playerPos.y += this._velY

        if (game.checkCollision()) {
            game.jumpSound.play()
            this._playerPosOrig.y = this._playerPos.y
            this._playerPosOrig.x = this._playerPos.x
            this._velY = -this._gravity * 2
        } else {
            if (this._playerPos.y <= (this._playerPosOrig.y - this._jumpSize)) {
                this._velY += 0.5
                this._velY >= 0 ? this._velY = 0 : null
            }
        }
    }
    setListener() {

        console.log("set listener")
        console.log(this._playerPos.x, this._velX)
        // MOVIMIENTO IZQUIERDA DERECHA
        document.onkeydown = (e) => {
            if (e.keyCode === 65) {
                this._playerPos.x -= this._velX
                // this._left = true
            } else if (e.keyCode === 68) {
                this._playerPos.x += this._velX
                // this._right = true
            } else {
                // this._left = false
                // this._left = false
            }
        }
    }
}