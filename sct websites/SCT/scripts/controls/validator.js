/*********************************************************************************************************************
* Project: SCT                                                                                                       *
*                                                                                           Sergio A. Acosta         *
*                                                                          sergiox.a.acosta.lozano@intel.com         *
*                                                                                                      Intel         *
*                                                                                                 01/31/2013         *
* Validator control                                                                                                  *
**********************************************************************************************************************/

function validator(){
    this.date = function(newdate){
        var date = new Date(newdate);
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getYear();
        
        if(parseInt(month) > 12 || parseInt(month) < 1){ 
            return false;
        }else if((parseInt(month) == 4 || parseInt(month)==6 || parseInt(month)==9 || parseInt(month)==11) && parseInt(day) > 30){ 
            return false; 
        }else if(parseInt(month) == 2 && this.leapYear(year) && parseInt(day) > 29){
            return false;
        }else if(parseInt(month) == 2 && !this.leapYear(year) && parseInt(day) > 28){
            return false;
        }else if(parseInt(day) > 31 || parseInt(day) < 1){
            return false;
        }else{
            return true;
        }
    }

    this.leapYear = function(year){
        var leap;
        if(parseInt(year)%4==0){
            if(parseInt(year)%100==0){ 
                if(parseInt(year)%400==0){ 
                    leap=true;
                }else{
                    leap=false;
                }
            }else{
                leap=true;
            }
        }else
            leap=false;
        return leap;	
    }
    
    this.empty = function(field,msg){
        deleteSiblings(field);
        if(field.value == ""){
            if(msg == undefined){
                msg = "* Cannot be empty";
            }
            this.error(field,msg);
            return true;
        }else{
            return false;
        }
    }
    //Added to check select campus default value:suma
    this.select = function (field,msg){
        deleteSiblings(field);
        if (field.value == "Select Campus") {
            if (msg == undefined) {
                msg = "* Please select campus";
            }
            this.error(field, msg);
            return true;
        } else {
            return false;
        }
    }

    this.spinnerempty = function (field, msg) {
        deleteSiblings(field.parentNode);
        if (field.value == "") {
            if (msg == undefined) {
                msg = "* Is empty and mandatory";
            }
            this.spinnererror(field, msg);
            return true;
        } else {
            return false;
        }
    }
    
    this.minchars = function(field,minValue,msg){
        deleteSiblings(field);
        if(parseInt(field.value.length) < parseInt(minValue)){
            if(msg == undefined){
                msg = "* At least "+minValue+" characters";
            }
            this.error(field,msg);
            return true;
        }else{
            return false;
        }
    }
    
    this.equal = function(field1,field2,msg){
        deleteSiblings(field1);
        if(field1.value != field2.value){
            if(msg == undefined){
                msg = "* Are not matching";
            }
            this.error(field1,msg);
            return true;
        }else{
            return false;
        }
    }

    this.emptyAndEqual = function(field1,field2,msg){
        if(!this.empty(field1)){
            this.equal(field1,field2,msg);
        }
    }

    this.string = function(field,msg){
        deleteSiblings(field);
        if(!field.value.match(/^[a-zA-ZÑÁÉÍÓÚÜñáéíóúü\s]+$/) && field.value != "" && field.value.match(/^[\s]+$/)){
            if(msg == undefined){
                msg = "* Invalid characters";
            }
            this.error(field,msg);
        }
    }
    
    this.emptyAndString = function(field){
        if(!this.empty(field)){
            this.string(field);
        }
    }
    
    this.number = function(field,msg){
        deleteSiblings(field);
        if(!field.value.match(/^[0-9]+$/)&& field.value != ""){
            if(msg == undefined){
                msg = "* Invalid characters";
            }
            this.error(field,msg);
        }
    }
    
    this.emptyAndNumber = function(field){
        if(!this.empty(field)){
            this.number(field);
            return false;
        }else{
            return true;
        }
    }

    this.mincharsAndNumber = function (field,minChars) {
        if (!this.minchars(field,minChars)) {
            this.number(field);
            return false;
        } else {
            return true;
        }
    }

    this.mail = function(field,msg){
        deleteSiblings(field);
        if(!field.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)  && field.value != ""){
            if(msg == undefined){
                msg = "* Invalid e-mail";
            }
            this.error(field,msg);
        }
    }

    this.emptyAndMail = function(field,msg){
        if(!this.empty(field,"* Is empty and mandatory")){
            this.mail(field,msg);
        }
    }
    
    this.phone = function(field,msg){
        deleteSiblings(field);
        if(!field.value.match(/^[0-9]{10}$/)  && field.value != ""){
            if(msg == undefined){
                msg = "* Invalid phone number";
            }
            this.error(field,msg);
        }
    }

    this.emptyAndPhone = function(field,msg){
        if (!this.empty(field, "* Is empty and mandatory")) {
            this.phone(field,msg);
        }
    }
    
    this.zipcode = function(field,msg){
        deleteSiblings(field);
        if(!field.value.match(/^[0-9]{5}$/) && field.value != ""){
            if(msg == undefined){
                msg = "* Invalid zip code";
            }
            this.error(field,msg);
        }
    }
    
    this.userPass = function(field,minchars,msg){
        if(!this.empty(field)){
            if(!this.minchars(field,minchars)){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }

    this.phoneField = function (field) {
        deleteSiblings(field);
        if (!field.value.match(/^[8]{1}[0-9]{7}$/)) {
            this.error(field,"The phone number must start with 8 and must have 8 digits");
        }
    }

    this.error = function(field,msg){
        var parent = field.parentNode;
        deleteSiblings(field);
        addBr(parent);
        createElement("span",parent,"",msg,"error","");
    }

    this.errorMsg = function (parent, msg) {
        addBr(parent);
        createElement("span", parent, "", msg, "error", "");
    }

    this.success = function (field, msg) {
        var parent = field.parentNode;
        deleteSiblings(field);
        addBr(parent);
        createElement("span", parent, "", msg, "success", "");
    }
    
    this.spinnererror = function(field,msg){
        var parent = field.parentNode.parentNode;
        deleteSiblings(field.parentNode);
        addBr(parent);
        createElement("span",parent,"",msg,"error","");
    }
    
    this.removeError = function(field){
        var parent = field.parentNode;
        deleteSiblings(field);
    }

    this.validForm = function (form) {
        var fieldsets = $(form).find("fieldset");
        var inputs = $(form).find("input");
       // var selects = $(form).find("select");// suma verify whether its used anywhere
        var check = false;
        for (var i = 0; i < fieldsets.length; i++) {
            if (fieldsets[i].childElementCount > 1) {
                check = true;
            }
        }
        for (i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).attr("type") == "text" && $(inputs[i]).attr("disabled") != "disabled" && $(inputs[i]).val() == "") {
                check = true;
            }
        }
        return check;
    }
}
