var header, loggedUser, loading;
var reportContainer, from, to, user, command, find, savingsFind;

$(document).ready(function () {
    loading = new loading();

    header = $("#td_headerContent").get(0);
    loggedUser = $("#body_hidden_user").val();
    reportContainer = $("#div_report").get(0);
    from = $("#input_date_from").get(0);
    to = $("#input_date_to").get(0);
    user = $("#select_user").get(0);
    command = $("#select_command").get(0);

    var now = new Date();
    var headerString = "Welcome: " + loggedUser + " | " + (now.getMonth() + 1).toString() + "/" + now.getDate().toString() + "/" + now.getFullYear().toString();
    createElement("span", header, "", headerString, "", "");

    var month = (parseInt(now.getMonth()) + 1).toString();
    month = month.length = 1 ? "0" + month : month;
    var nowFormated = month + "/" + now.getDate() + "/" + now.getFullYear();

    $(from).val(nowFormated);
    $(from).datepicker({
          maxDate: "today"
        , onSelect: function (dt) {
            $(to).datepicker('option', 'minDate', new Date($(this).val()));
            $(this).datepicker('option', 'maxDate', new Date($(to).val()));
        }
    });
    $(to).val(nowFormated);
    $(to).datepicker({
          maxDate: "today"
        , onSelect: function (dt) {
            $(this).datepicker('option', 'minDate', new Date($(from).val()));
            $(from).datepicker('option', 'maxDate', new Date($(this).val()));
        }
    });

    savingsFind = $("#button_savings_find").get(0);
    $(savingsFind).addClass("button");
    $(savingsFind).click(function () { setSavingsReport(); });

    setSavingsReport();
    loadUsersToList();

    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        alert("This browser is not supported, please try Google Chrome, Firefox or IE9-10 with compatibility view disabled");
    }
});

function loadUsersToList() {
    loading.start();
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: { method: "getBulkToolUserList"}
            , success: function (xml) {
                loading.stop();
                var users = $(xml).find("user");
                for (var i = 0; i < users.length; i++) {
                    createElement("option", user, "", $(users[i]).text(), "", "value=" + $(users[i]).text());
                }
            }
            , error: function (xml) {
                loading.stop();
            }
    });
}

function setSavingsReport() {
    $(reportContainer).empty();
    loading.start();
    $("#div_report").empty();
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: {
                method: "setSavingsReport"
                , from: $(from).val()
                , to: $(to).val()
                , user: $(user).val()
                , command: $(command).val()
            }
            , success: function (xml) {
                var rows = $(xml).find("element");
                if (rows.length > 0) {
                    var total = $(xml).find("totalTimeSaved").text();
                    createElement("p",reportContainer,"","Total time saved: " + total, "left", "");
                    grid(reportContainer, "savings_report", rows, "tbody_savings_report");
                    var pLeyend = createElement("p", reportContainer, "", "Saving time:  Lync Companion 10 minutes, Lync Only 6 minutes.", "left", "");
                } else {
                    var error = createElement("p", reportContainer, "", "There is no results, please try another search", "error", "");
                    $(error).addClass("left");
                }
                loading.stop();
            }
            , error: function (xml) {
                loading.stop();
            }
    });
}