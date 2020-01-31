// ----- PERSONAJE
class Player {
    constructor(ctx, gameSize, gravity, platformsArr, velX) {
        this._ctx = ctx
        this._gameSize = gameSize
        // IMAGEN DEL PLAYER
        this._player = new Image()
        this._player.src = "./../images/qbertspr-left.png"
        // FRAMES
        this._player.frames = 2 // TIENE DOS FRAMES
        this._player.framesIndex = 0 // EMPIEZA EN EL 0

        // PLATAFORMAS EN EL JUEGO
        this._platformsArr = platformsArr
        // GRAVEDAD DEL JUEGO
        this._gravity = gravity
        // TAMANO DEL PLAYER
        this._size = {
            width: 280 * 0.3,
            height: 300 * 0.3
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
        this._velX = velX
        this._velY = 0
        // LISTENER PARA LAS TECLAS
        this.setListener()
    }

    // DIBUJA EL PLAYER
    draw() {
        this._ctx.drawImage(
            this._player,
            this._player.framesIndex * Math.floor(this._player.width / this._player.frames),
            0,
            Math.floor(this._player.width / this._player.frames),
            300,
            this._pos.x,
            this._pos.y,
            this._size.width,
            this._size.height
        );
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
        this._pos.y <= this._gameSize.height / 2 && this._velY <= 0 ? game.goUp() : this._pos.y += this._velY

        // SI ESTA BAJANDO -> IMAGEN BAJANDO | SI ESTA SUBIENDO -> IMAGEN SUBINEDO
        this._velY >= 0 ? this._player.framesIndex = 1 : this._player.framesIndex = 0

        // MOVIMIENTO INFINITO HORIZONTAL
        this._pos.x + this._size.width < 0 ? this._pos.x = this._gameSize.width : this._pos.x > this._gameSize.width ? this._pos.x = 0 - this._size.width : null
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
                    this._player.src = './../images/qbertspr-right.png'
                    this._pos.x += this._velX
                    break;
                case 'KeyA':
                    this._player.src = './../images/qbertspr-left.png'
                    this._pos.x -= this._velX
                    break;
                case 'KeyW':
                    this.shoot()
                    break;
            }
        }
    }
}