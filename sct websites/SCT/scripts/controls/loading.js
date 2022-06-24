/*********************************************************************************************************************
* Project: SCT                                                                                                       *
*                                                                                           Sergio A. Acosta         *
*                                                                          sergiox.a.acosta.lozano@intel.com         *
*                                                                                                      Intel         *
*                                                                                                 01/31/2013         *
* Loading control                                                                                                    *
**********************************************************************************************************************/

function loading() {
    this.space = $("#div_loading").get(0);
    this.start = function () {
        $('.error').remove();
        if (!$(this.space).hasClass("loading")) {
            $(this.space).empty();
            addTextNode(this.space, "Loading...");
            $(this.space).addClass("loading");
            var inputs = $("input").get();
            for (var i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).attr("type") == "button") {
                    $(inputs[i]).attr("disabled", "true");
                    if ($(inputs[i]).hasClass("button")) {
                        $(inputs[i]).removeClass("button").addClass("button_disabled");
                    }
                }
            }
        }

        $("#div_loadingbg").css({
            "opacity": "0.7"
        });
        this.center();
        $("#div_loadingbg").fadeIn("slow");

        $("#div_bigloading").fadeIn("slow");
        $("#div_bigloading").draggable();
        this.status = 1;
    }

    this.stop = function () {
        if ($(this.space).hasClass("loading")) {
            $(this.space).empty();
            $(this.space).removeClass("loading");
            var inputs = $("input").get();
            for (var i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).attr("type") == "button") {
                    $(inputs[i]).removeAttr("disabled");
                    if ($(inputs[i]).hasClass("button_disabled")) {
                        $(inputs[i]).removeClass("button_disabled").addClass("button");
                    }
                }
            }
        }

        $("#div_loadingbg").fadeOut("slow");
        $("#div_bigloading").fadeOut("slow");
    }

    this.center = function () {
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $("#div_bigloading").height();
        var popupWidth = $("#div_bigloading").width();

        $("#div_bigloading").css({
            "position": "absolute",
            "top": windowHeight / 2 - popupHeight / 2,
            "left": windowWidth / 2 - popupWidth / 2
        });

        //only need force for IE6    
        $("#div_loadingbg").css({
            "height": windowHeight
        });
    }
}

