/**
 * Created by bairong on 2016/4/17.
 */
var Monitor = {
    orbitStatus: [null, null, null, null],
    monitor: null,
    setMonitor: function (monitorID) {
        Monitor.monitor = document.getElementById(monitorID);
    },
    engineDecoder: function (ENGINE_TYPE) {
        switch (ENGINE_TYPE) {
            case EDRIVE_SYSTEM.ENDEAVOUR:
                return "Endeavour";
            case EDRIVE_SYSTEM.BEYOND:
                return "Beyond";
            case EDRIVE_SYSTEM.PENTIUM:
                return "Pentium";
            default:
                return "Invalid";
        }
    },
    powerDecoder: function (POWER_TYPE) {
        switch (POWER_TYPE) {
            case EPOWER_SYSTEM.ENERGIZER:
                return "Energizer";
            case EPOWER_SYSTEM.SOLAR:
                return "Solar";
            case EPOWER_SYSTEM.PERMANENT:
                return "Permanent";
            default :
                return "Invalid";
        }
    },
    update: function (message, shipProfile) {
        // console.log("ID:" + message.id + " " + typeof message.id);
        // var index = message.id;
        this.orbitStatus[message.id - 1] = {
            id: message.id,
            engineType: this.engineDecoder(shipProfile.engineType),
            powerType: this.powerDecoder(shipProfile.powerType),
            status: message.status,
            energy: message.energy
        };
        // console.log(this.orbitStatus[message.id - 1].id);
        this.render();
    },
    del: function (orbitID) {
        this.orbitStatus[orbitID - 1] = null;
        this.render();
    },
    render: function () {
        if (Monitor.monitor == null) {
            Log.print("Please set Monitor", "red");
        }
        Monitor.monitor.innerHTML = "";
        var tr = document.createElement("tr");
        var orbit = document.createElement("td");
        orbit.innerText = "Orbit";
        var engine = document.createElement("td");
        engine.innerText="Engine Type";
        var power = document.createElement("td");
        power.innerText = "Power Type";
        var status = document.createElement("td");
        status.innerText = "Status";
        var energy = document.createElement("td");
        energy.innerText = "Energy";

        tr.appendChild(orbit);
        tr.appendChild(engine);
        tr.appendChild(power);
        tr.appendChild(status);
        tr.appendChild(energy);
        Monitor.monitor.appendChild(tr);
        
        for (var i = 0; i < this.orbitStatus.length; i++) {
            if (this.orbitStatus[i] == null || this.orbitStatus[i].status == "Destroy")
                continue;
            var tr = document.createElement("tr");

            var id = document.createElement("td");
            id.innerText = this.orbitStatus[i].id;

            var engineType = document.createElement("td");
            engineType.innerText = this.orbitStatus[i].engineType;

            var powerType = document.createElement("td");
            powerType.innerText = this.orbitStatus[i].powerType;

            var status = document.createElement("td");
            status.innerText = this.orbitStatus[i].status;

            var energy = document.createElement("td");
            energy.innerText = this.orbitStatus[i].energy;

            tr.appendChild(id);
            tr.appendChild(engineType);
            tr.appendChild(powerType);
            tr.appendChild(status);
            tr.appendChild(energy);

            Monitor.monitor.appendChild(tr);
        }
    }
};