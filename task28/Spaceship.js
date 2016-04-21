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
var EDRIVE_SYSTEM = {
    ENDEAVOUR: 0,
    PENTIUM: 1,
    BEYOND: 2
};
var EDRIVE_SPEED = {
    ENDEAVOUR: 2,
    PENTIUM: 4,
    BEYOND: 6
};
var EDRIVE_CONSUME = {
    ENDEAVOUR: 5,
    PENTIUM: 7,
    BEYOND: 9
}

var EPOWER_SYSTEM = {
    ENERGIZER: 0,
    SOLAR: 1,
    PERMANENT: 2
};
var EPOWER_CHARGE = {
    ENERGIZER: 3,
    SOLAR: 4,
    PERMANENT: 5
}
function Spaceship(orbitID) {
    // this.reportManager = null;
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
        return parseInt(energy);
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
    this.getOrbit = function () {
        return Orbit;
    };
    this.getStatus = function () {
        return status;
    };


    this.DriveSystem = {
        standby: function () {
            if (energy > 0) {
                status = EStatus.STANDBY;
            }
        },
        stop: function (self) {
            status = EStatus.STOP;
            // clearInterval(self.reportManager);
            clearInterval(flyingManager);
            flyingManager = setInterval(function () {
                self.EnergySystem.add(chargeRate);
            }, 200);
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
                self.EnergySystem.add(chargeRate / 10);
                self.EnergySystem.consume(consume / 10);
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
function Spaceship2(orbitID, engineType, powerType) {
    Spaceship.call(this, orbitID);
    switch (engineType) {
        case EDRIVE_SYSTEM.ENDEAVOUR:
            this.setSpeed(EDRIVE_SPEED.ENDEAVOUR);
            this.setConsume(EDRIVE_CONSUME.ENDEAVOUR);
            break;
        case EDRIVE_SYSTEM.PENTIUM:
            this.setSpeed(EDRIVE_SPEED.PENTIUM);
            this.setConsume(EDRIVE_CONSUME.PENTIUM);
            break;
        case EDRIVE_SYSTEM.BEYOND:
            this.setSpeed(EDRIVE_SPEED.BEYOND);
            this.setConsume(EDRIVE_CONSUME.BEYOND);
    }
    switch (powerType) {
        case EPOWER_SYSTEM.ENERGIZER:
            this.setChargeRate(EPOWER_CHARGE.ENERGIZER);
            break;
        case EPOWER_SYSTEM.SOLAR:
            this.setChargeRate(EPOWER_CHARGE.SOLAR);
            break;
        case EPOWER_SYSTEM.PERMANENT:
            this.setChargeRate(EPOWER_CHARGE.PERMANENT);
            break;
    }
    this.receive = function (code) {
        var message = Adapter.decoder(code);
        if (message.id != orbitID) {
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

                clearInterval(this.reportManager);
                this.SDSystem.destroy();

                Monitor.del(message.id);
                break;
            case "speed":
                this.DriveSystem.shift(message.value);
                break;
            default:
                console.log("Invalid Instruct:" + message.command, "red");
        }
    }
}

function Spaceship3(orbitID, engineType, powerType) {
    var REPORT_INTERVAL = 5000;
    this.reportManager = null;
    Spaceship2.call(this, orbitID, engineType, powerType);

    this.report = function (self) {
        self.reportManager = setInterval(function () {
            if (self.status != EStatus.DESTROY) {
                BUS.propagation(BROADCAST.SHIP_SRC, Adapter.encoder({
                    id: self.getOrbit(),
                    status: self.getStatus(),
                    energy: self.getEnergy()
                }));
            }
        }, REPORT_INTERVAL);
    }
}