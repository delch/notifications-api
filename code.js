var Notify = {},
    i = 0;

function disableForm() {
    $("input").attr("disabled", "disabled");
};

function getCurrentPermission() {
    if( Notification.permission ) {
        $(".permissionState").text(Notification.permission);
    }
    else {
        $(".permissionState").text("не удалось получить статус разрешения");
        $(".warning").text("Notifications.permission не определен (hello, google chrome)");
    }
};

function addToLog(val, event) {
    var msg = "<div class='msg'>событие <span class='red'>" + event + "</span> сработало на уведомлении: " + val + "</div>";
    $(".notificationLog").append(msg);
};

function sendNoficiation() {
    if($("input[name=theme]").val() === "") {
        alert("укажите тему уведомления");
        return false;
    };

    Notification.requestPermission( function(result) { $(".permissionState").text(result); } );

    var theme = $("input[name=theme]").val();
    if ($("input[name=tag]").val() != "") var tag = $("input[name=tag]").val();
    if ($("input[name=body]").val() != "") var body = $("input[name=body]").val();
    if ($("input[name=icon]").val() != "") var icon = $("input[name=icon]").val();

    if(tag, body, icon) {
        var params = {
            body : (body) ? body : "",
            tag : (tag) ? tag : "",
            icon : (icon) ? icon : ""
        };
    };

    Notify["notification" + i] = (params) ? new Notification(theme, params) : new Notification(theme);
    Notify["notification" + i].onshow = function() { addToLog(theme,"onshow") };
    Notify["notification" + i].onclick = function() { addToLog(theme,"onclick") };
    Notify["notification" + i].onclose = function() { addToLog(theme,"onclose") };
    Notify["notification" + i].onerror = function() { addToLog(theme,"onerror") };
    i++;
    delete tag, body, icon, params;
};


$(function(){
    $("input[name=send]").on("click", sendNoficiation);

    if( window.Notification ) {
        getCurrentPermission();
    }
    else {
        $(".warning").text("Notifications API не поддерживается");
        disableForm();
    }
});
