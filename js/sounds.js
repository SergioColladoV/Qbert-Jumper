class Sound {
    constructor(soundSrc) {
        this._sound = document.createElement("audio")
        this._sound.src = soundSrc
        this._sound.setAttribute("preload", "auto")
        this._sound.setAttribute("controls", "none")
        this._sound.style.display = "none"
        document.body.appendChild(this._sound)

    }
    play() {
        this._sound.play()
    }
    stop() {
        this._sound.pause()
    }
}