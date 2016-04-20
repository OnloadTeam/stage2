/**
 * Created by bairong on 2016/4/17.
 */
// var dic = new Dictionary();
var BROADCAST = {
    PLANET_SRC:"PLANET_TO_SPACE",
    SHIP_SRC:"SHIP_TO_PLANET"
};
var BroadcastManager = {
    broadcastDic: new Dictionary(),
    register: function (broadcastName) {
        this.broadcastDic.init(broadcastName);
    },
    bind: function (broadcastName, subscriber) {
        this.broadcastDic.put(broadcastName, subscriber);
    },
    unbind: function (broadcastName, subscriber) {
        var subscribers = this.broadcastDic.get(broadcastName);
        var target = -1;
        for (var i = 0; i < subscribers.length; i++) {
            if (subscribers[i] == subscriber) {
                target = i;
                break;
            }
        }
        if (target != -1) {
            for (var j = target; j < subscribers.length - 1; j++) {
                subscribers[j] = subscribers[j + 1];
            }
            subscribers.length = subscribers.length - 1;
        }
    },
    send: function (broadcastName, bundle) {
        var subscribers = this.broadcastDic.get(broadcastName);
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].receive(bundle);
        }
    }


};
