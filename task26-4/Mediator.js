/**
 * Created by bairong on 2016/4/17.
 */

var Mediator = {
    TRANSMISSION_TIME: 1000,
    TRANSMISSION_RATE: 0.3,
    propagation: function (broadcastName, message) {
        setTimeout(function () {
            if (Math.random() < Mediator.TRANSMISSION_RATE) {
                consoleLog(message.id, MSG.TRANS_ERR, "red");
                return;
            }
            BroadcastManager.send(broadcastName, message)
        }, Mediator.TRANSMISSION_TIME)
    }
};