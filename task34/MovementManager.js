/**
 * Created by bairong on 2016/4/23.
 */
var MovementManager = {
    receive: function (instruct, role) {
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