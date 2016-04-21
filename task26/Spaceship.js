/**
 * Created by bairong on 2016/4/16.
 */
var EStatus = {
    STOP: 0,
    STANDBY: 1,
    DESTROY: 2,
    CREATE: 3,
    FLY: 4
};

function Spaceship(orbitID) {
    var status = EStatus.STANDBY;
    var energy = 100;
    var consume = 4;
    var chargeRate = 3;
    var destroy = false;
    var speed = 2;
    var degree = 0;
    var Orbit = orbitID;
    var flyingManager = null;
    this.setSpeed = function (number) {
        speed = number;
    };
    this.setChargeRate = function (number) {
        chargeRate = number;
    };
    this.setConsume = function (number) {
        consume = number;
    };
    this.getEnergy = function () {
        return energy;
    };
    this.isDestroy = function () {
        return destroy;
    };
    this.setDegree = function (number) {
        degree = number;
    };
    this.getDegree = function () {
        return degree;
    };


    this.DriveSystem = {
        standby: function () {
            if (energy > 0) {
                status = EStatus.STANDBY;
            }
        },
        stop: function (self) {
            status = EStatus.STOP;
            clearInterval(flyingManager);
            flyingManager = setInterval(function () {
                self.EnergySystem.add(chargeRate);
            }, 100);
        },
        fly: function (self) {
            status = EStatus.FLY;
            clearInterval(flyingManager);
            flyingManager = setInterval(function () {
                if (self.getEnergy() <= 0) {
                    self.DriveSystem.stop(self);
                }
                degree += speed;
                degree = degree % 360;
                self.EnergySystem.add(chargeRate);
                self.EnergySystem.consume(consume);
            }, 100);
        },
        shift: function (number) {
            speed = number;
        }
    };
    this.EnergySystem = {
        add: function (number) {
            energy += number;
            if (energy > 100) {
                energy = 100;
            }
        },
        consume: function (number) {
            if (status == EStatus.FLY) {
                energy -= number;
            }
            if (energy <= 0) {
                status = EStatus.STOP;
                energy = 0;
            }

        }
    };
    this.SDSystem = {
        destroy: function () {
            destroy = true;
            status = EStatus.DESTROY;
        }
    };
    this.receive = function (message) {
        if (message.id != Orbit) {
            return;
        }
        switch (message.command) {
            case "launch":
                this.DriveSystem.standby();
                consoleLog(message.id, MSG.LAUNCH_SUC, "green");
                break;
            case "fly":
                consoleLog(message.id, MSG.FLY_CMD_SUC, "green");
                this.DriveSystem.fly(this);
                break;
            case "stop":
                consoleLog(message.id, MSG.STOP_CMD_SUC, "green");
                this.DriveSystem.stop(this);
                break;
            case "destroy":
                consoleLog(message.id, MSG.DESTROY_CMD_SUC, "green");
                this.SDSystem.destroy();
                break;
            case "speed":
                this.DriveSystem.shift(message.value);
                break;
            default:
                console.log("Invalid Instruct:" + message.command, "red");
        }
    }

}