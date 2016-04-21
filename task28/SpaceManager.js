/**
 * Created by bairong on 2016/4/16.
 */

var SpaceManager = {
    profile: {
        spaceships: [],
        flyingManager: 0,
        energyManager: 0
    },
    launchSpaceship: function (orbitID,engineType,powerType) {
        setTimeout(function () {
            if (SpaceManager.profile.spaceships[orbitID-1]!=null&&!SpaceManager.profile.spaceships[orbitID - 1].isDestroy()) {
                return;
            }
            consoleLog(orbitID, MSG.SHIP_CREATE, "green");
            SpaceManager.profile.spaceships[orbitID - 1] = new Spaceship3(orbitID,engineType,powerType);

            SpaceManager.profile.spaceships[orbitID - 1].report(SpaceManager.profile.spaceships[orbitID - 1]);

            BroadcastManager.bind(BROADCAST.PLANET_SRC, SpaceManager.profile.spaceships[orbitID - 1]);

            var spaceshipDiv = document.createElement("div");
            spaceshipDiv.id = "spaceship" + orbitID;
            spaceshipDiv.className = "spaceship orbitship-" + orbitID;

            var energyDiv = document.createElement("div");
            energyDiv.className = "energy";

            var textDiv = document.createElement("div");
            textDiv.className = "energy-text";
            textDiv.innerText = "100%";

            spaceshipDiv.appendChild(energyDiv);
            spaceshipDiv.appendChild(textDiv);
            document.body.appendChild(spaceshipDiv);
        }, BUS.TRANSMISSION_TIME);
    },
    timeTick: function () {
        SpaceManager.profile.flyingManager = setInterval(function () {
            for (var i = 0; i < SpaceManager.profile.spaceships.length; i++) {
                if (SpaceManager.profile.spaceships[i] != null) {
                    if (SpaceManager.profile.spaceships[i].isDestroy() && SpaceManager.profile.spaceships[i].clear != true) {
                        document.body.removeChild(document.getElementById("spaceship" + (i + 1)));
                        SpaceManager.profile.spaceships[i].clear = true;

                    }
                    var ship = document.getElementById("spaceship" + (i + 1));
                    if (ship != null) {
                        ship.style.transform = "rotate(" + SpaceManager.profile.spaceships[i].getDegree() + 'deg)';
                        ship.style.webkitTransform = "rotate(" + SpaceManager.profile.spaceships[i].getDegree() + 'deg)';

                        ship.firstElementChild.style.width = SpaceManager.profile.spaceships[i].getEnergy() + "%";
                        ship.lastElementChild.innerText = SpaceManager.profile.spaceships[i].getEnergy() + "%";
                    }
                }
            }
        }, 100);
    }
};
