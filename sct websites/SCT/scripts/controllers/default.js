/*********************************************************************************************************************
* Project: SCT                                                                                                       *
*                                                                                           Sergio A. Acosta         *
*                                                                          sergiox.a.acosta.lozano@intel.com         *
*                                                                                                      Intel         *
*                                                                                                 01/31/2013         *
* Default page client methods                                                                                        *
**********************************************************************************************************************/

var mainContent, dialog, loginForm, campusSelect, userInput, passwdInput, submitInput;
var session, validator;

$(document).ready(function () {
    mainContent = $("#div_maincontent").get(0);
    dialog = $("#div_dialog").get(0);
    loginForm = $("#div_login").get(0);
    userInput = $("#input_loginuser").get(0);
    passwdInput = $("#input_loginpasswd").get(0);
    campusSelect = $("#select_logincampus").get(0);
    CCSText = $('#input_ccstxt').get(0);
    submitInput = $("#input_loginsubmit").get(0);

    session = $.cookie("session");
    if (session != "null" && session != null) {
        $(location).attr('href', "init.aspx");
    }

    $("#div_login").draggable();
    if (!(navigator.appName.indexOf("Internet Explorer") != -1 && navigator.appVersion.indexOf("MSIE 8") == -1)) {
        $(mainContent).height($(window).height() - 18);
        $(window).resize(fitWindow);
    }
    getCampusList(campusSelect, "");

    validator = new validator();

    $(userInput).keyup(function () { validator.empty(userInput); });
    $(passwdInput).keyup(function () { validator.empty(passwdInput); });
    $(campusSelect).keyup(function () { validator.select(campusSelect); });//suma

    $(submitInput).click(checkUser);



    ////cucm cluster consolidation changes boc : Anoj
    $(campusSelect).change(function () {
        getclusterconsolidationstatus();
    });
    ////cucm cluster consolidation changes eoc : Anoj 
});

function fitWindow() {
    $(mainContent).height($(window).height());
}
//to get version
function getclusterconsolidationstatus() {
    //$(CCSText).val($(campusSelect).val());
    deleteSiblings(campusSelect);
    $.ajax({
        type: "POST"
        , dataType: "xml"
        , url: "clientAsync.aspx"
        , data: { method: "checkIPTV", campus: $(campusSelect).val() }
        , success: function (xml) {
            var response = $(xml).find("iptv");
            if (response.length > 0) {
                $(CCSText).val($(response[0]).text());
            }
            else {
                $(CCSText).val(" ");
            }
            
        }
        , error: function (xml) {
            $(CCSText).val("Failed to retrieve version details");
        }
    });
} 

function checkUser() {
    validator.empty(userInput);
    validator.empty(passwdInput);
    validator.select(campusSelect);//validator for campus select :suma
    deleteSiblings(submitInput);
    if (validator.validForm(loginForm) == 0) {
        $(userInput).addClass("loading");
        $(submitInput).attr("disabled","true");
        $.ajax({
            type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: { method: "checkUser", campus: $(campusSelect).val(), user: $(userInput).val(), passwd: $.base64.encode($(passwdInput).val()) }
            , success: function (xml) {
                var response = $(xml).find("sessionid");
                if (response.length > 0) {

                    var date = new Date();
                    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
                    $.cookie("session", $(response[0]).text(), { expires: date });
                    $(location).attr('href', "init.aspx");
                } else {
                    var error = $(xml).find("error");//temporary added cucm cluster consolidation please remove BOC :Anoj
                    var errormsg = $(error[0]).text();//temporary added cucm cluster consolidation please remove BOC :Anoj
                    //validator.error(submitInput, "Access denied");//temporary commented cucm cluster consolidation please uncomment :Anoj
                    validator.error(submitInput, errormsg);//temporary added cucm cluster consolidation please remove BOC :Anoj 
                }
                $(userInput).removeClass("loading");
                $(submitInput).removeAttr("disabled");
            }
            , error: function (xml) {
                $(userInput).removeClass("loading");
                $(submitInput).removeAttr("disabled");
                $(dialog).empty();
                var text = createElement("span", dialog, "", "ERROR loging in, Please contact the system administrator.", "", "");
                $(dialog).dialog({
                    resizable: false
                    , title: "ERROR"
                    , draggable: true
                    , dialogClass: "alert"
                    , height: 160
                    , modal: true
                    , show: { effect: "bounce" }
                    , hide: { effect: "explode" }
                    , buttons: { "Ok": function () { $(this).dialog("close"); }
                    }
                });
            }
        });
    }
}
