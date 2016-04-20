/**
 * Created by bairong on 2016/4/16.
 */
var Adapter = {
    encoder: function (message) {
        var code = "";
        switch (message.id) {
            case 1:
                code += "0001";
                break;
            case 2:
                code += "0010";
                break;
            case 3:
                code += "0011";
                break;
            case 4:
                code += "0100";
                break;
            default:
                code += "0000";
        }
        switch (message.command) {
            case "fly":
                code += "0001";
                break;
            case "stop":
                code += "0010";
                break;
            case "destroy":
                code += "0011";
                break;
            default:
                code += "0000";
                break;
        }
        return code;
    },
    decoder: function (code) {
        var message = {
            id: null,
            command: null
        };
        switch (code.substr(0, 4)) {
            case "0001":
                message.id = 1;
                break;
            case "0010":
                message.id = 2;
                break;
            case "0011":
                message.id = 3;
                break;
            case "0100":
                message.id = 4;
                break;
            default:
                message.id = -1;
        }
        switch (code.substr(4,4)){
            case "0001":
                message.command="fly";
                break;
            case "0010":
                message.command = "stop";
                break;
            case "0011":
                message.command="destroy";
                break;
            default:
                message.command = "Invalid CMD";
        }
        return message;
    }
}