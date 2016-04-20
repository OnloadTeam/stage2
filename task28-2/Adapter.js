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
                // code += "0000";
                break;
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
            case  "report":
                code += "0100";
                break;
            default:
                // code += "0000";
                break;
        }
        switch (message.status){
            case EStatus.STANDBY:
                code += "0011";
                break;
            case EStatus.STOP:
                code+="0010";
                break;
            case EStatus.FLY:
                code += "0001";
                break;
            case EStatus.DESTROY:
                code += "1100";
                break;
            case EStatus.CREATE:
                code += "0000";
                break;
        }
        if (message.energy) {
            var energy = message.energy.toString(2);

            for (var i = energy.length; i < 8; i++) {
                energy = "0" + energy;
            }
            code += energy;
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
        switch (code.substr(4, 4)) {
            case "0001":
                message.command = "fly";
                break;
            case "0010":
                message.command = "stop";
                break;
            case "0011":
                message.command = "destroy";
                break;
            default:
                message.command = "Invalid CMD";
        }
        return message;
    },
    reportDecoder: function (code) {
        var message = {
            id: null,
            status: null,
            energy: null
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
                message.status="Fly";
                break;
            case "0010":
                message.status = "Stop";
                break;
            case "1100":
                message.status = "Destroy";
                break;
            case "0011":
                message.status = "Standby";
                break;
            case "0000":
                message.status = "Create";
                break;
            default:
                message.status = "Invalid Status";
        }
        message.energy=parseInt(code.substr(8,8),2);

        return message;
    },
};