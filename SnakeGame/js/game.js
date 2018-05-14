// var sn = [ 42, 41 ], dz = 43, fx = 1, n, ctx = document.getElementById("can").getContext("2d");
// function draw(t, c) {
//     ctx.fillStyle = c;
//     ctx.fillRect(t % 20 * 20 + 1, ~~(t / 20) * 20 + 1, 18, 18);
// }
// document.onkeydown = function(e) {
//     fx = sn[1] - sn[0] == (n = [ -1, -20, 1, 20 ][(e || event).keyCode - 37] || fx) ? fx : n
// };
// !function() {
//     sn.unshift(n = sn[0] + fx);
//     if (sn.indexOf(n, 1) > 0 || n<0||n>399 || fx == 1 && n % 20 == 0 || fx == -1 && n % 20 == 19)
//         return alert("GAME OVER");
//     draw(n, "Lime");
//     if (n == dz) {
//         while (sn.indexOf(dz = ~~(Math.random() * 400)) >= 0);
//         draw(dz, "Yellow");
//     } else
//         draw(sn.pop(), "Black");
//     setTimeout(arguments.callee, 130);
// }();

class SnakeGame {
    constructor(ctx, callback) {
        this.ctx = ctx;
        this.sn = [42, 41];
        this.dz = 43;
        this.fx = 1;
        this.n = [];
        this.init();
        document.onkeydown = function (e) {
            // this.fx = this.sn[1] - this.sn[0] === (this.n = [-1, -20, 1, 20][(e || event).keyCode - 37] || this.fx) ? this.fx : this.n
        };
        this.callback = callback;
    }


    init() {

        this.ctx.clearRect(0, 0, 400, 400);
    }

    start() {
        this.callback.onGameStart();
        this.run();
    }

    run() {
        this.sn.unshift(this.n = this.sn[0] + this.fx);
        if (this.sn.indexOf(this.n, 1) > 0 || this.n < 0 || this.n > 399 || this.fx === 1 && this.n % 20 === 0 || this.fx === -1 && this.n % 20 === 19) {
            this.gameOver(this.sn.length);
            return;
        }

        this.draw(this.n, "Lime");
        if (this.n === this.dz) {
            while (this.sn.indexOf(this.dz = ~~(Math.random() * 400)) >= 0) {
            }

            this.draw(this.dz, "Yellow");
        } else {
            this.draw(this.sn.pop(), "Black");
        }

        setTimeout(this.run, 200);
    }

    draw(t, c) {
        this.ctx.fillStyle = c;
        this.ctx.fillRect(t % 20 * 20 + 1, ~~(t / 20) * 20 + 1, 18, 18);
    }

    gameOver(result) {
        this.callback.onGameOver(result);
    }
}

class GameCallback {
    onGameStart() {

    }

    onGamePause() {

    }

    onGameOver(result) {
        console.log(result);
    }
}

function startGame() {
    var context = document.getElementById("can").getContext("2d");
    const snakeGame = new SnakeGame(context, new GameCallback());

    snakeGame.start();
}

function pauseGame() {

}
