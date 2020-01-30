// ----- PERSONAJE
class Player {
    constructor(ctx, gameSize, mainPlayerSrc, playerSize, gravity, platformsArr) {
        this._ctx = ctx
        this._gameSize = gameSize

        this._player = new Image()
        this._player.src = mainPlayerSrc
        this._playerUp = mainPlayerSrc
        this._playerDown = '../images/qbert-left-down.png'
        // PLATAFORMAS EN EL JUEGO
        this._platformsArr = platformsArr
        // GRAVEDAD DEL JUEGO
        this._gravity = gravity
        // TAMANO DEL PLAYER
        this._size = {
            width: playerSize.width,
            height: playerSize.height
        }
        // POSICION DEL PLAYER (INICIAL EN LA PLATAFORMA)
        this._pos = {
            x: this._platformsArr[this._platformsArr.length - 1]._pos.x,
            y: this._platformsArr[this._platformsArr.length - 1]._pos.y - this._size.height
        }
        // ULTIMA POSICION ANTES DE SALTAR
        this._posOrig = {
            x: this._gameSize.width / 2 - this._size.width / 2,
            y: this._gameSize.height - this._size.height - 200
        }
        // VELOCIDADES DEL PLAYER HORIZONTAL Y VERTICAL
        this._velX = 10
        this._velY = 0
        // LISTENER PARA LAS TECLAS
        this.setListener()
    }

    // DIBUJA EL PLAYER
    draw() {
        this._ctx.drawImage(this._player, this._pos.x, this._pos.y, this._size.width, this._size.height);
    }
    move() {
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

        // SI ESTA BAJANDO -> IMAGEN BAJANDO
        if (this._velY >= 0) {
            game.qbert._player.src = this._playerDown
            //  SI ESTA SUBIENDO -> IMAGEN SUBINEDO
        } else {
            game.qbert._player.src = this._playerUp
        }
    }
    shoot() {
        // REPRODUCE EL SONIDO DISPARO
        game.shootSound.play()
        // CREA BALAS
        game.bullets.push(new Bullet(this._ctx, this._pos))
    }
    setListener() {
        // MOVIMIENTO IZQUIERDA DERECHA
        document.onkeydown = (e) => {
            switch (e.code) {
                case 'KeyD':
                    this._pos.x += this._velX
                    break;
                case 'KeyA':
                    this._pos.x -= this._velX
                    break;
                case 'KeyW':
                    this.shoot()
                    break;
            }
        }
    }
}