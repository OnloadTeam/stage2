/**
 * Created by bairong on 2016/4/20.
 */
var DataCenter = {
    data:[],
    receive: function (code, profile) {
        var message = Adapter.reportDecoder(code);
        message.engineType = Monitor.engineDecoder(profile.engineType);
        message.powerType = Monitor.powerDecoder(profile.powerType);
        DataCenter.store(message);
    },
    store:function (message) {
        DataCenter.data.push(message)
    }
};