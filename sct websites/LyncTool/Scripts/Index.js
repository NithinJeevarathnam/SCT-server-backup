/**********************************************************************************************************************
 * Project: Lync Diagnostic Tool                                               Intel® Copyright                       *
 *                                                                           Created by: Marchena, Daniela            *
 *                                                                           daniela.marchena.valladares@intel.com    *
 *                                                                                                                    *
 *                                                                                                                    *
 *                                                                            Last Change: 01/13/2016                 *
 * Description: Script to manipulate actions in the views                                                             *
 **********************************************************************************************************************/

function init() {
    var spinner = $("#divLoading");
    spinner.hide();
    $(document).keypress(function (e) {
        if (e.which == 13) {
            loading();
            $("#LyncForm").submit();
        }
    });
    $('#search').click(function (e) {
            loading();
            $("#LyncForm").submit();
    });
}

function buttonState() {
        $('#search').attr('disabled', 'disabled');
        if ($(this).val() == "") return false;
        $('#search').attr('disabled', '');
}
function loading() {
    if ($("#divLoading").is(":visible") == true) {
        var spinner = $("#divLoading");
        spinner.hide();
    }
    else {
        var spinner = $("#divLoading");
        spinner.show();
    }
}