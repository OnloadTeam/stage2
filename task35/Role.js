/**
 * Created by bairong on 2016/4/23.
 */
EDIRECT = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};
function Role(role_id, Step, max_x, max_y) {
    this.role = document.getElementById(role_id);
    var x = this.role.offsetLeft / Step;
    var y = this.role.offsetTop / Step;
    var degree = 0;

    var xMax = max_x;
    var yMax = max_y;
    var step = Step;
    var direct = EDIRECT.UP;

    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };
    this.getDegree = function () {
        return degree;
    };
    this.getStep = function () {
        return step;
    };

    this.go = function () {
        switch (direct) {
            case EDIRECT.UP:
                if (y <= 1) {
                    y = 1;
                    break;
                }
                y -= 1;
                break;
            case EDIRECT.LEFT:
                if (x <= 1) {
                    x = 1;
                    break;
                }
                x -= 1;
                break;

            case  EDIRECT.DOWN:
                if (y >= yMax) {
                    y = yMax;
                    break;
                }
                y += 1;
                break;
            case EDIRECT.RIGHT:
                if (x >= xMax) {
                    x = xMax;
                    break;
                }
                x += 1;
                break;
        }
    }
    this.turnLeft = function () {
        if (direct == EDIRECT.UP) {
            direct = EDIRECT.LEFT;
        }
        else {
            direct -= 1;
        }
        degree -= 90;
    };
    this.turnRight = function () {
        direct = (direct + 1) % 4;
        degree += 90;
    };
    this.turnBack = function () {
        direct = (direct + 2) % 4;
        degree += 180;
    };
    this.traceLeft = function () {
        if (x <= 1) {
            x = 1;
            return;
        }
        x -= 1;
    };
    this.traceTop = function () {
        if (y <= 1) {
            y = 1;
            return;
        }
        y -= 1;
    };
    this.traceRight = function () {
        if (x >= xMax) {
            x = xMax;
            return;
        }
        x += 1;
    };
    this.traceBottom = function () {
        if (y >= yMax) {
            y = yMax;
            return;
        }
        y += 1;
    };
    this.moveLeft = function (self) {
        direct = EDIRECT.LEFT;
        degree = -90;
        self.traceLeft();
    };
    this.moveTop = function (self) {
        direct = EDIRECT.UP;
        degree = 0;
        self.traceTop();
    };
    this.moveRight = function (self) {
        direct = EDIRECT.RIGHT;
        degree = 90;
        self.traceRight();
    };
    this.moveBottom = function (self) {
        direct = EDIRECT.DOWN;
        degree = 180;
        self.traceBottom();
    };
}