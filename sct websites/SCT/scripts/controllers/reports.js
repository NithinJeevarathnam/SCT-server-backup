var header, loggedUser, loading;
var reportContainer, from, to, user, command, find, savingsFind;

google.load("visualization", "1", { packages: ["corechart"] });

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

    find = $("#button_find").get(0);
    $(find).addClass("button");
    $(find).click(function () { setReport(); });

    setReport();
    loadUsersToList();

    //google.setOnLoadCallback(drawChart);
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

function setReport() {
    loading.start();
    $(reportContainer).empty();
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: {
                  method: "setUsageReport"
                , from: $(from).val()
                , to: $(to).val()
                , user: $(user).val()
                , command: $(command).val()
            }
            , success: function (xml) {
                data = $(xml).find("element");
                if (data.length > 0) {
                    var date, month, cDate, number;
                    var myDataValues = [];
                    myDataValues.push(["Date", "Processed"]);
                    for (var i = 0; i < data.length; i++) {
                        date = new Date($(data[i]).find("date").text());
                        var month = (parseInt(date.getMonth()) + 1).toString();
                        cDate = month + "/" + date.getDate() + "/" + date.getFullYear();
                        number = $(data[i]).find("processed").text();
                        myDataValues.push([cDate, parseInt(number)]);
                    }
                    drawChart(myDataValues);
                } else {
                    var msg = createElement("p", reportContainer, "", "There is no results, please try another search.", "error", "");
                    $(msg).addClass("left");
                }
                loading.stop();
            }
            , error: function (xml) {
                loading.stop();
            }
    });
}

function drawChart(myDataValues) {
    var data = google.visualization.arrayToDataTable(myDataValues);

    var options = {
          title: 'Successul Configurations'
        , vAxis: { title: 'Accounts processed' }
        , hAxis: { title: 'Dates' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('div_report'));
    chart.draw(data, options);
}