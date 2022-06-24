var header, content, loading, dialog, submitform, submitButton, lyncMode;
var user, inet, sitecode, approval, status;

$(document).ready(function () {
    user = $("#body_hidden_user").val();

    header = $("#td_headerContent").get(0);
    content = $("#div_userInfo").get(0);
    submitform = $("#div_submit").get(0);
    submitButton = $("#submitBtn").get(0);
    lyncMode = $("#lyncMode").get(0);

    loading = new loading();    
    dialog = $("#div_dialog").get(0);

    var date = new Date();
    var headerString = "Welcome: " + user + " | " + (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
    createElement("span", header, "", headerString, "", "");
    
    createElement("h3", content, "", "User Info", "", "");
    $(submitform).hide();
    getUserData();

    $(submitButton).click(function () { setSoftPhone(); });    
});

function getUserData() {
    loading.start();
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: { method: "getSelfProvData", idsid: user }
            , success: function (xml) {
                loading.stop();                
                inet = $(xml).find("inet").text();
                sitecode = $(xml).find("sitecode").text();
                approval = $(xml).find("approval").text();
                status = $(xml).find("status").text();
               
                if (status == null || status == undefined || status == "") {
                    status = "You have not submitted a request to enable Skype softphone yet";
                }
                if (approval == "True") {
                    approval = "You're eligible for SfB Softphone!";
                    $(submitform).show();
                } else {
                    approval = "Sorry, you are currently ineligible for SfB Softphone. Please see the 'Eligibility Requirements' section on the 'About' tab for more info or visit <a href='http://wiki.ith.intel.com/x/fAozCw'>this site</a> for resolving common eligibility issues.";
                    $(submitform).hide();
                }
                if (!inet) {
                    inet = "<a href='https://ease.intel.com/es/Phonebook/EditEmployeeRec.aspx' target='_blank'>Please add it clicking here</a>";
                }
                var table = createElement("table", content, "", "", "", "");
                var tr = createElement("tr", table, "", "", "", "");
                var td = createElement("td", tr, "", "User: ", "", "");
                td = createElement("td", tr, "", user, "", "");

                tr = createElement("tr", table, "", "", "", "");
                td = createElement("td", tr, "", "Site ID:", "", "");
                td = createElement("td", tr, "", sitecode, "", "");

                tr = createElement("tr", table, "", "", "", "");
                td = createElement("td", tr, "", "Inet #:", "", "");
                $(tr).append("<td>"+inet+"</td>");

                tr = createElement("tr", table, "", "", "", "");
                td = createElement("td", tr, "", "Eligibility:", "", "");
                td = createElement("td", tr, "", "", "", "");
                $(td).append(approval);

                tr = createElement("tr", table, "", "", "", "");
                td = createElement("td", tr, "", "Status:", "", "");
                td = createElement("td", tr, "", status, "", "");
            }
            , error: function (xml) {
                loading.stop();
            }
    });
}

function setSoftPhone() {    
    loading.start();
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: { method: "setSoftPhone", idsid: user, inet: inet, lyncmode: $("input:radio[name=lyncMode]").val() }
            , success: function (xml) {
                loading.stop();
                $(submitButton).attr("disabled", "disabled");

                $(dialog).empty();
                var text = createElement("span", dialog, "", "Your request has been submited, please wait for email with further instructions", "", "");

                $(dialog).dialog({
                    resizable: false
                    , title: "MESSAGE"
                    , draggable: true
                    , dialogClass: "alert"
                    , height: 160
                    , modal: true
                    , show: { effect: "bounce" }
                    , hide: { effect: "explode" }
                    , buttons: {
                        "Ok": function () {
                            $(this).dialog("close");
                        }
                    }
                    , close: function (event, ui) { location.reload(); }
                });
            }
            , error: function (xml) {
                loading.stop();
                $(submitButton).attr("disabled", "disabled");                
            }
    });
}