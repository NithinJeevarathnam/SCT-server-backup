
function createElement(type,parent,id,textNode,styleClass,attributes){
  var element = document.createElement(type);
  if(element != null && element != ''){
    element.id = id;
  }else if(id == undefined || id == null){
    element.id = "";
  }
  if (textNode != null && textNode != undefined && textNode != '') {
      $(element).text(textNode);
  }
  if(styleClass != null && styleClass != undefined && styleClass != ''){
    element.className = styleClass;
  }
  if(attributes != null && attributes != undefined && attributes != ''){
    var attr = attributes.split("&");
    for(var i=0;i<attr.length;i++){
      var values = attr[i].split("=");
      element.setAttribute(values[0],values[1]);
    }
  }
  parent.appendChild(element);
  return element;
}

function getElement(id, parent) {
    var element;
    if (!parent) {
        element = document.getElementById(id);
        if (!element) {
            element = document.getElementsByTagName(id)[0];
        }
    } else {
        element = parent.getElementsByTagName(id)[0];
    }
    return element;
}

function getElements(tag, doc) {
    return doc.getElementsByTagName(tag);
}

function getValue(element) {
    if (!element) {
        return "";
    } else if (element.firstChild != null) {
        return element.firstChild.nodeValue;
    } else {
        return "";
    }
}

function deleteSiblings(element){
  while(element != undefined && element != undefined && (element.nextSibling != null || element.nextSibling != undefined)){
    element.parentNode.removeChild(element.parentNode.lastChild);
  }
}

function addTextNode(node,text){
  var tNode = document.createTextNode(text);
  node.appendChild(tNode);
  return node;
}

function addBr(parent){
  var br = document.createElement("br");
  br.id = "";
  parent.appendChild(br);
  return br;
}

function addOption(select, value, text) {
    var option = document.createElement("option");
    option.value = value;
    option.text = text;
    select.appendChild(option);
    return option;
}

function getActivatedObject(e){
  var obj;
  if (!e){
    // early version of IE
    obj = window.event.srcElement;
  }else if (e.srcElement){
    // IE 7 or later
    obj = e.srcElement;
  }else {
    // DOM Level 2 browser
    obj = e.target;
  }
  return obj;
}

function getUrlVars(){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function isArrayElement(array,element){
    var temp = 0;
    for(var i=0;i<array.length;i++){
        if(array[i] == element){
            temp++;
            break;
        }
    }
    if(temp == 0){
        return false;
    }else{
        return true;
    }
}

function isDateGreater(date1,date2){
    var firstDate = date1.split("-");
    var date1Year = parseInt(firstDate[0]);
    var month = firstDate[1];
    if(month[0] == "0"){
        month = month.replace("0","");
    }
    var date1Month = parseInt(month);
    var date1Day = parseInt(firstDate[2]);
    
    var secondDate = date2.split("-");
    var date2Year = parseInt(secondDate[0]);
    var date2Month = parseInt(secondDate[1]);
    var date2Day = parseInt(secondDate[2]);

    if((date1Year > date2Year) ||
       (date1Year == date2Year && date1Month > date2Month) ||
       (date1Year == date2Year && date1Month == date2Month && date1Day > date2Day)){
        return true;
    }else{
        return false;
    }
}

function clearForm(form,disabledFields) {
    var inputs = $(form).find("input");
    var selects = $(form).find("select");
    for (var i = 0; i < selects.length; i++) {
        $(selects[i])[0].selectedIndex = 0;
    }
    for (i = 0; i < inputs.length; i++) {
        deleteSiblings(inputs[i]);
        if ($(inputs[i]).attr("type") == "checkbox") {
            $(inputs[i]).removeAttr("checked");
        }
        if ($(inputs[i]).attr("type") == "text" || $(inputs[i]).attr("type") == "password") {
            $(inputs[i]).val("");
        }
    }
    if (disabledFields != undefined && disabledFields != null) {
        for (var i = 0; i < disabledFields.length; i++) {
            $(disabledFields[i]).attr("disabled", "true");
        }
    }
}

function getCampusList(select, selected) {
    $(select).attr("disabled", "disbled");
    $.ajax({
        type: "POST"
        //type: "GET"
        , dataType: "xml"
        , url: "clientAsync.aspx"
        //cucm cluster consolidation changes BOC
        , data: { method: "getCampusList", selectedcampus: selected }
        //cucm cluster consolidation changes EOC 


      //  , data: { method: "getCampusList" }
        , success: function (xml) {
            var sites = $(xml).find("site");
            for (var i = 1; i < sites.length; i++) { 
                if (selected != "" && selected == $(sites[i]).text()) {
                    createElement("option", select, "", $(sites[i]).text(), "", "value=" + $(sites[i]).text()+"&selected=selected");
                } else {
                    createElement("option", select, "", $(sites[i]).text(), "", "value=" + $(sites[i]).text());
                }
            }
            $(select).removeAttr("disabled");
        }
        , error: function (xml) {
            $(dialog).empty();
            var text = createElement("span", dialog, "", "ERROR getting campus list, Please contact the system administrator.", "", "");
            //$(text).addClass("ui-icon ui-icon-alert");
            $(dialog).dialog({
                resizable: false
                , title: "ERROR"
                , draggable: true
                , dialogClass: "alert"
                , height: 160
                , modal: true
                , buttons: { "Ok": function () { $(this).dialog("close"); }
                }
            });
        }
    });
}

function addTable(parent, id, styleClass, tbodyId) {
    var table = createElement("table", parent, id, "", styleClass,"");
    var thead = createElement("thead", table, "", "", "", "");
    var tbody = createElement("tbody", table, tbodyId, "", "", "");
    var tfoot = createElement("tfoot", table, "", "", "", "");
    return table;
}

function addHeadRow(parent, id, styleClass) {
    var thead = getElement("thead", parent);
    return createElement("tr", thead, id, "", styleClass, "");
}

function addRow(parent, id, styleClass) {
    var tbody = getElement("tbody", parent);    
    return createElement("tr", tbody, id, "", styleClass, "");
}

function addFootRow(parent, id, styleClass) {
    var thead = getElement("tfoot", parent);
    return createElement("tr", thead, id, "", styleClass, "");
}

function addHeadColumn(parent, id, text, styleClass) {
    return createElement("th", parent, id, text, styleClass, "");
}

function addColumn(parent, id, text, styleClass) {
    return createElement("td", parent, id, text, styleClass, "");
}
