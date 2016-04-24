/**
 * Created by bairong on 2016/4/23.
 */
var MovementManager = {
    receive: function (orders, role) {
        var times = 1;
        try {
            times = parseInt(orders[orders.length - 1])
        }
        catch (e) {
            times = 1
        }
        if (isNaN(times))
            times = 1;
        var instruct;
        if (orders[0] == "GO") {
            instruct = "GO"
        }
        else {
            instruct = orders[0] + " " + orders[1];
        }

        for (var i = 0; i < times; i++) {
            setTimeout(function () {
                switch (instruct) {
                    case "GO":
                        role.go();
                        break;
                    case "TUN LEF":
                        role.turnLeft();
                        break;
                    case  "TUN RIG":
                        role.turnRight();
                        break;
                    case  "TUN BAC":
                        role.turnBack();
                        break;
                    case "TRA LEF":
                        role.traceLeft();
                        break;
                    case "TRA TOP":
                        role.traceTop();
                        break;
                    case "TRA RIG":
                        role.traceRight();
                        break;
                    case "TRA BOT":
                        role.traceBottom();
                        break;
                    case "MOV LEF":
                        role.moveLeft(role);
                        break;
                    case "MOV TOP":
                        role.moveTop(role);
                        break;
                    case "MOV RIG":
                        role.moveRight(role);
                        break;
                    case "MOV BOT":
                        role.moveBottom(role);
                        break;
                }
                MovementManager.refresh(role)
            }, i * 500);
        }
    },
    refresh: function (role) {
        var step = role.getStep();
        var x = role.getX();
        var y = role.getY();
        var degree = role.getDegree();

        role.role.style.left = x * step + "px";
        role.role.style.top = y * step + "px";
        role.role.style.transform = "rotate(" + degree + "deg)";
    }
};