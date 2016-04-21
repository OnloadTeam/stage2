/**
 * Created by bairong on 2016/4/16.
 */

var Log = {
    board: null,
    setBoard: function (boardID) {
        this.board = document.getElementById(boardID);
    },
    print: function (message, color) {
        if (this.board == null) {
            console.log("Please set board");
            return;
        }
        var p = document.createElement("p");
        p.innerText = getTime() + " ";

        var span = document.createElement("span");
        span.innerText = message;
        span.style.color = color;

        p.appendChild(span);
        this.board.appendChild(p);
        this.board.scrollTop = this.board.scrollHeight;
    }
};
var consoleLog=function (orbitID,message, color) {
    Log.print("[Orbit-" + orbitID + "] " + message, color);
};