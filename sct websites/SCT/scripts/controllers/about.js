var header, user, prefixesList;

$(document).ready(function () {
    header = $("#td_headerContent").get(0);
    user = $("#body_hidden_user").val();
    prefixesList = $("#span_prefixes").get(0);
    loading = new loading();

    var date = new Date();
    var headerString = "Welcome: " + user + " | " + (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
    createElement("span", header, "", headerString, "", "");

    getPrefixesList();
});

function getPrefixesList() {
    loading.start();
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: { method: "getPrefixesList" }
            , success: function (xml) {
                loading.stop();
                var prefixes = $(xml).find("prefix");
                var prefixesString = "";
                for (var i = 0; i < prefixes.length; i++) {
                    prefixesString += $(prefixes[i]).text();
                    if (i < prefixes.length - 1) {
                        prefixesString += ", ";
                    }
                }
                $(prefixesList).text(prefixesString);
            }
            , error: function (xml) {
                loading.stop();
            }
    });
}