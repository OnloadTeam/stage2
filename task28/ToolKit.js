/**
 * Created by bairong on 2016/4/16.
 */
/**
 * Created by bairong on 2016/4/15.
 */
var EPosition = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3,
    CENTER: 4
};
function FloatWindow(panel_id, panel_title_id, offset_x, offset_y) {
    var panel = document.getElementById(panel_id);
    var panel_title = document.getElementById(panel_title_id);

    if (offset_x == "right" || offset_x == EPosition.RIGHT) {
        offset_x = (window.innerWidth - panel.offsetWidth);
    }
    if (offset_y == "bottom" || offset_y == EPosition.BOTTOM) {
        offset_y = (window.innerHeight - panel.offsetHeight);
    }
    if (offset_x == "center" || offset_x == EPosition.CENTER) {
        offset_x = window.innerWidth / 2 - (panel.getBoundingClientRect().width / 2);
    }
    if (offset_y == "center" || offset_y == EPosition.CENTER) {
        offset_y = window.innerHeight / 2 - (panel.getBoundingClientRect().height / 2);
    }


    panel.style.left = offset_x + "px";
    panel.style.top = offset_y + "px";

    var draggingFlag = false;
    var offset = [0, 0];
    var init_pos = [
        panel.getBoundingClientRect().left,
        panel.getBoundingClientRect().top
    ];

    panel_title.addEventListener("mousedown", function (e) {
        offset[0] = e.clientX - init_pos[0];
        offset[1] = e.clientY - init_pos[1];
        draggingFlag = true;
        // console.log("position:" + init_pos);
        // console.log("start:" + offset);
    });

    addEventListener("mousemove", function (e) {
        if (draggingFlag) {
            init_pos[0] = e.clientX - offset[0];
            init_pos[1] = e.clientY - offset[1];


            if (init_pos[0] > window.innerWidth - panel.offsetWidth) {
                init_pos[0] = window.innerWidth - panel.offsetWidth;
            }
            if (init_pos[0] < 0) {
                init_pos[0] = 0;
            }
            if (init_pos[1] > window.innerHeight - panel.offsetHeight) {
                init_pos[1] = window.innerHeight - panel.offsetHeight;
            }
            if (init_pos[1] < 0) {
                init_pos[1] = 0;
            }

            panel.style.left = init_pos[0] + "px";
            panel.style.top = init_pos[1] + "px";
        }
    });

    addEventListener("mouseup", function () {
        draggingFlag = false;
    });
}
function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function Dictionary() {
    var dic = [];
    this.init = function (key) {
        dic[key] = [];
    };
    this.put = function (key, value) {
        if (typeof dic[key] != typeof []) {
            this.init(key);
        }
        dic[key].push(value);
    };
    this.get = function (key) {
        if (typeof dic[key] != typeof []) {
            console.log("Invalid Key");
            return;
        }
        return dic[key];
    }
}