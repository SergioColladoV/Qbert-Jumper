class Enemies {
    constructor(ctx, gameSize) {

    }
}

let calc = this.gameSize.height / this.level
let platform, randomSelector, prob
let max = 6
let min = 1
if (this.platformsArr.length < this.level) {
    let i = this.platformsArr[0]._platformPos.y - calc
    randomSelector = Math.floor((Math.random() * (max - min)) + min)
    if (randomSelector < 0.6) {
        prob = 1
    } else if (randomSelector < 0.7) {
        prob = 2
    } else if (randomSelector < 0.8) {
        prob = 3
    }
    // SWITCH PARA ESCOGER TIPO
    switch (prob) {
        case 1:
            platform = new GeneralPlatform(this.ctx, this.gameSize, i)
            break;
        case 2:
            platform = new MovingPlatform(this.ctx, this.gameSize, i)
            break;
        case 3:
            platform = new BrokenPlatform(this.ctx, this.gameSize, i)
            break;
    }
    this.platformsArr.unshift(platform)