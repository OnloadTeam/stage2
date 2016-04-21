/**
 * Created by bairong on 2016/4/19.
 */
var BUS = {
    TRANSMISSION_RATE: 0.1,
    TRANSMISSION_TIME: 300,
    propagation: function (broadcastName, code) {
        var message = Adapter.decoder(code);
        setTimeout(function () {
           while (Math.random() < BUS.TRANSMISSION_RATE) {
                consoleLog(message.id, MSG.TRANS_ERR+"retry......", "red");
            }
            BroadcastManager.send(broadcastName, code)
        }, BUS.TRANSMISSION_TIME);

    }
};
