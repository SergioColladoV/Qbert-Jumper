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
        // LA GRAVEDAD 
        this._velY += this._gravity
        if (this._playerPos.y <= this._gameSize.height / 2 && this._velY <= 0) {
            game.goUp()
        } else {
            this._playerPos.y += this._velY
        }
        // SI COLISIONA Y ESTA BAJANDO
        console.log(`VELY ${this._velY}`)
        if (game.checkCollision() && this._velY >= 0) {
            game.jumpSound.play()
            this._playerPosOrig.y = this._playerPos.y
            this._playerPosOrig.x = this._playerPos.x
            this._velY -= 20
            console.log(`POS ORIG ${this._playerPosOrig.y}`)
        }

        // this.ySpeed += gravity;
        // if (this.y <= screen.height / 2 - 200 && this.ySpeed <= 0) {
        //     for (var i = 0; i < blocks.length; i++) {
        //         blocks[i].y -= this.ySpeed;
        //     }
        // } else {
        //     this.y += this.ySpeed;
        // }
        // yDistanceTravelled -= this.ySpeed;
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