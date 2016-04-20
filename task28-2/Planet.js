/**
 * Created by bairong on 2016/4/16.
 */
function Planet() {
    var profile = {
        orbitStatus: [false, false, false, false],
        shipProfile:{}
    };
    this.launch = function (orbitID, engineType, powerType) {
        if (profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_EXIST, "red");
            return;
        }
        profile.orbitStatus[orbitID - 1] = true;
        profile.shipProfile[orbitID-1]={
            engineType:engineType,
            powerType:powerType
        };
        SpaceManager.launchSpaceship(orbitID, engineType, powerType);
        
    };
    this.start = function (orbitID) {
        if (!profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_NOT_EXIST, "red");
            return;
        }
        consoleLog(orbitID, MSG.SEND_START_CMD, "blue");
        BUS.propagation(BROADCAST.PLANET_SRC, Adapter.encoder({
            id: orbitID,
            command: 'fly'
        }));

    };
    this.stop = function (orbitID) {
        if (!profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_NOT_EXIST, "red");
            return;
        }
        consoleLog(orbitID, MSG.SEND_STOP_CMD, "blue");
        BUS.propagation(BROADCAST.PLANET_SRC, Adapter.encoder({
            id: orbitID,
            command: 'stop'
        }));
    };
    this.destroy = function (orbitID) {
        if (!profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_NOT_EXIST, "red");
            return;
        }
        profile.orbitStatus[orbitID - 1] = false;
     
        consoleLog(orbitID, MSG.SEND_DESTROY_CMD, "blue");
        BUS.propagation(BROADCAST.PLANET_SRC, Adapter.encoder({
            id: orbitID,
            command: "destroy"
        }));
        // Monitor.del(orbitID);
    };
    this.receive=function (code) {
        var message = Adapter.reportDecoder(code);
        consoleLog(message.id, MSG.REPORT_SUC, "yellow");
        Monitor.update(message, profile.shipProfile[message.id - 1]);
        DataCenter.receive(code, profile.shipProfile[message.id - 1]);
    }
}