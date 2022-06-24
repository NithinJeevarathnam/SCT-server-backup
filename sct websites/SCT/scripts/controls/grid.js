/*********************************************************************************************************************
* Project: SCT                                                                                                       *
*                                                                                           Sergio A. Acosta         *
*                                                                          sergiox.a.acosta.lozano@intel.com         *
*                                                                                                      Intel         *
*                                                                                                 01/31/2013         *
* Grid control                                                                                                       *
**********************************************************************************************************************/

var transactionsInterval = false, transactionsCount = 0;

function grid(parent, id, xmlRows, tbodyId) {
    var pagesize = 10;
    var table = addTable(parent, id, "grid", tbodyId);
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");    

    var rowTitles = $(xmlRows[0]).children();

    rowTitlesLength = rowTitles.length;

    var colspan = 0;
    if (id == "grdHungJobs") {
        colspan = parseInt(rowTitlesLength);
    } else {
        colspan = parseInt(rowTitlesLength) - 1;
    }

    var header = addHeadRow(table, "", "tableHeader");
    var leftColumn = addColumn(header, "menuContainer", "", "leftColumn");
    var rightColumn = addColumn(header, "rightColumn", "", "rightColumn");
    rightColumn.setAttribute("colspan", colspan);
    /*
    var span = createElement("span", rightColumn, "", "Search: ", "");
    var filterBox = createElement("input", rightColumn, "filterBoxOne", "", "");
    filterBox.setAttribute("type", "text");
    */
    var titleGrid = addHeadRow(table, "", "");

    if (id == "grdHungJobs") {
        var hdColumn = addHeadColumn(titleGrid, "", "Select", "");
        $(hdColumn).addClass("titleGridNoSort");
    }

    for (var i = 0; i < rowTitles.length; i++) {
        var columnName = ""
        switch (rowTitles[i].tagName.toLowerCase()) {
            case "bulkrequestsid":
                columnName = "Id";
                break;
            case "submittedby":
                columnName = "Submited By";
                break;
            case "submitdate":
                columnName = "Submit Date";
                break;
            case "transactionid":
                columnName = "Transaction Id";
                pagesize = 50;
                break;
            case "bulkRequestid":
                columnName = "Bulk Request Id";
                break;
            case "command":
                columnName = "Command";
                break;
            case "idsid":
                columnName = "Idsid";
                break;
            case "inetnumber":
                columnName = "Inet";
                break;
            case "transactionresponse":
                columnName = "Transaction Response";
                break;
            case "saving":
                columnName = "Time Saved (hours)";
                break;
            default:
                columnName = rowTitles[i].tagName;
                break;
        }
        addHeadColumn(titleGrid, "", columnName, "");
    }

    gridContent(xmlRows, id, tbodyId);

    if (id == "grdHungJobs") {
        rowTitlesLength = (parseInt(rowTitlesLength) + 1).toString();
    }

    var pagerRow = addFootRow(table, "", "");
    var pagerCol = addColumn(pagerRow, "", "", "");
    pagerCol.setAttribute("colspan", rowTitlesLength);
    var pager = createElement("div", pagerCol, "pager", "", "");
    var first = createElement("img", pager, "first", "first", "first");
    first.setAttribute("src", "images/first.png");
    var prev = createElement("img", pager, "prev", "prev", "prev");
    prev.setAttribute("src", "images/prev.png");
    var text = createElement("input", pager, "pagedisplay", "", "pagedisplay");
    var next = createElement("img", pager, "next", "next", "next");
    next.setAttribute("src", "images/next.png");
    var last = createElement("img", pager, "last", "last", "last");
    last.setAttribute("src", "images/last.png");
    var size = createElement("select", pager, "pagesize", "", "pagesize");
    addOption(size, "10", "10");
    addOption(size, "20", "20");
    addOption(size, "30", "30");
    addOption(size, "40", "40");
    var option50 = addOption(size, "50", "50");
    if (pagesize == 50) {
        $(option50).attr("selected", "selected");
    }
    var filter = getElement("filterBoxOne");
    var clear = getElement("clearFilterOne");

    if (id == "grdHungJobs") {
        $(table)
            .tablesorter({
                sortList: [[1, 0], [2, 0]],
                cssAsc: 'titleSortUp',
                cssDesc: 'titleSortDown',
                cssHeader: 'titleGrid',
                widgets: ['zebra'],
                headers: {
                    0: { sorter: false }
                }
            })
            .tablesorterPager({
                container: $(pager)
                , positionFixed: false
                , size: pagesize
            });
        //.tablesorterFilter({
        //    filterContainer: $(filter),
        //    filterClearContainer: $(clear),
        //    filterColumns: [0, 1, 2, 3],
        //    filterCaseSensitive: false
        //})
    } else {
        $(table)
            .tablesorter({
                cssAsc: 'titleSortUp',
                cssDesc: 'titleSortDown',
                cssHeader: 'titleGrid',
                widgets: ['zebra']
            })
            .tablesorterPager({
                container: $(pager)
                , positionFixed: false
                , size: pagesize
            });
            //.tablesorterFilter({
            //    filterContainer: $(filter),
            //    filterClearContainer: $(clear),
            //    filterColumns: [0, 1, 2, 3],
            //    filterCaseSensitive: false
            //})
    }
    return table;
}

function dialogLyncBulkTransacctions(id) {
    $(dialog).empty();
    if (transactionsCount == 0) {
        loading.start();
    }
    transactionsCount++;
    $.ajax({
        type: "POST"
            , dataType: "xml"
            , url: "clientAsync.aspx"
            , data: { method: "loadGridBulkTransacctions", id: id }
            , success: function (xml) {
                loading.stop();
                var rows = $(xml).find("row");
                grid(dialog, "grdTrans", rows, "tbodyTrans");
                $(dialog).dialog({
                    resizable: true
                    //MTR Migration changes : BOC
                    //, title: "Lync Bulk Transactions"
                    , title: "Bulk Transactions"
                    //MTR Migration changes : EOC
                        , draggable: true
                        , dialogClass: "alert"
                        , width: 1024
                        , height: 768
                        , modal: true
                        , show: { effect: "bounce" }
                        , hide: { effect: "explode" }
                        , close: function (event, ui) {
                            clearInterval(transactionsInterval);
                            transactionsInterval = false;
                            transactionsCount = 0;
                            $(dialog).empty();
                        }
                        , open: function (event, ui) {
                            if (transactionsInterval != false) { clearInterval(transactionsInterval); transactionsInterval = false; }
                            transactionsInterval = setInterval(function () { dialogLyncBulkTransacctionsBody(id) }, 1000 * 20);
                        }
                        , buttons: { "Ok": function () {
                            $(this).dialog("close");
                            $(dialog).empty();
                        }
                        }
                });
            }
            , error: function (xml) {
                loading.stop();
            }
    });
    }

function dialogLyncBulkTransacctionsBody(id) {
    $.ajax({
        type: "POST"
        , dataType: "xml"
        , url: "clientAsync.aspx"
        , data: { method: "loadGridBulkTransacctions", id: id }
        , success: function (xml) {
            var rows = $(xml).find("row");
            gridContent(rows, "grdTrans", "tbodyTrans");
        }
        , error: function (xml) {
        }
    });
}

function gridContent(xmlRows, tableId, tbodyId) {        
    var table = $("#" + tableId).get(0);        
    $("#" + tbodyId).empty();
    
    for (i = 0; i < xmlRows.length; i++) {
        var currentRow = addRow(table, "", "");
        var columns = $(xmlRows[i]).children();

        if (tableId == "grdHungJobs") {
            var selectColumn = addColumn(currentRow, "", "", "");
            createElement("input", selectColumn, "kill_ " + getValue(columns[0]) + "_" + getValue(columns[1]), "", "", "type=checkbox");
        }
        for (var j = 0; j < columns.length; j++) {
            if (columns[j].tagName.toLowerCase() == "bulkrequestsid") {                
                var tempColumn = createElement("td", currentRow, "", "", "", "");
                var tempLink = createElement("a", tempColumn, "link_" + getValue(columns[j]), getValue(columns[j]), "idColumn", "href=#");
                tempLink.id = "link_" + getValue(columns[j]);
                $(tempLink).click(function () {
                    var id = $(this).attr("id").split("_")[1];
                    dialogLyncBulkTransacctions(id);
                });
            } else {
                addColumn(currentRow, "", getValue(columns[j]), "");                    
            }
        }
    }



    $("#" + tableId).trigger("update");
    $("#" + tableId).trigger("appendCache");

    $(".grid tbody tr").mouseover(function () {
        $(this).addClass("overGrid");
    });

    $(".grid tbody tr").mouseout(function () {
        $(this).removeClass("overGrid");
    });

    $(".grid tbody tr").click(function () {
        if ($(this).hasClass("selectedGrid")) {
            $(this).removeClass("selectedGrid");
        } else {
            $(this).addClass("selectedGrid");
        }
    });

}

/*function gridIncidentsContent(xmlRows, tableId, tbodyId) {
    var table = $("#" + tableId).get(0);
    $("#" + tbodyId).empty();

    for (i = 0; i < xmlRows.length; i++) {
        var currentRow = addRow(table, "", "");
        var columns = $(xmlRows[i]).children();

        if (tableId == "grdHungJobs") {
            var selectColumn = addColumn(currentRow, "", "", "");
            createElement("input", selectColumn, "kill_ " + getValue(columns[0]) + "_" + getValue(columns[1]), "", "", "type=checkbox");
        }
        for (var j = 0; j < columns.length; j++) {
            if (columns[j].tagName.toLowerCase() == "bulkrequestsid") {
                var tempColumn = createElement("td", currentRow, "", "", "", "");
                var tempLink = createElement("a", tempColumn, "link_" + getValue(columns[j]), getValue(columns[j]), "idColumn", "href=#");
                tempLink.id = "link_" + getValue(columns[j]);
                $(tempLink).click(function () {
                    var id = $(this).attr("id").split("_")[1];
                    dialogLyncBulkTransacctions(id);
                });
            //} else {
                addColumn(currentRow, "", getValue(columns[j]), "");
            //}
        }
    }



    $("#" + tableId).trigger("update");
    $("#" + tableId).trigger("appendCache");

    $(".grid tbody tr").mouseover(function () {
        $(this).addClass("overGrid");
    });

    $(".grid tbody tr").mouseout(function () {
        $(this).removeClass("overGrid");
    });

    $(".grid tbody tr").click(function () {
        if ($(this).hasClass("selectedGrid")) {
            $(this).removeClass("selectedGrid");
        } else {
            $(this).addClass("selectedGrid");
        }
    });

}*/

function gridIncidentsContent(parent, id, xmlRows, tbodyId) {
    var pagesize = 10;
    var table = addTable(parent, id, "grid", tbodyId);
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");

    var rowTitles = $(xmlRows[0]).children();

    rowTitlesLength = rowTitles.length;

    var colspan = 0;
    if (id == "grdHungJobs") {
        colspan = parseInt(rowTitlesLength);
    } else {
        colspan = parseInt(rowTitlesLength) - 1;
    }

    var header = addHeadRow(table, "", "tableHeader");
    var leftColumn = addColumn(header, "menuContainer", "", "leftColumn");
    var rightColumn = addColumn(header, "rightColumn", "", "rightColumn");
    rightColumn.setAttribute("colspan", colspan);

    var titleGrid = addHeadRow(table, "", "");

    for (var i = 0; i < rowTitles.length; i++) {
        var columnName = ""
        switch (rowTitles[i].tagName.toLowerCase()) {
            case "ServiceNowTicket":
                columnName = "Ticket Number";
                break;
            case "submitdate":
                columnName = "Submit Date";
                break;
            case "Status":
                columnName = "Status";
                break;
            default:
                columnName = rowTitles[i].tagName;
                break;
        }
        addHeadColumn(titleGrid, "", columnName, "");
    }

    gridContent(xmlRows, id, tbodyId);

    if (id == "grdHungJobs") {
        rowTitlesLength = (parseInt(rowTitlesLength) + 1).toString();
    }

    var pagerRow = addFootRow(table, "", "");
    var pagerCol = addColumn(pagerRow, "", "", "");
    pagerCol.setAttribute("colspan", rowTitlesLength);
    var pager = createElement("div", pagerCol, "pager", "", "");
    var first = createElement("img", pager, "first", "first", "first");
    first.setAttribute("src", "images/first.png");
    var prev = createElement("img", pager, "prev", "prev", "prev");
    prev.setAttribute("src", "images/prev.png");
    var text = createElement("input", pager, "pagedisplay", "", "pagedisplay");
    var next = createElement("img", pager, "next", "next", "next");
    next.setAttribute("src", "images/next.png");
    var last = createElement("img", pager, "last", "last", "last");
    last.setAttribute("src", "images/last.png");
    var size = createElement("select", pager, "pagesize", "", "pagesize");
    addOption(size, "10", "10");
    addOption(size, "20", "20");
    addOption(size, "30", "30");
    addOption(size, "40", "40");
    var option50 = addOption(size, "50", "50");
    if (pagesize == 50) {
        $(option50).attr("selected", "selected");
    }
    var filter = getElement("filterBoxOne");
    var clear = getElement("clearFilterOne");

    if (id == "grdHungJobs") {
        $(table)
            .tablesorter({
                sortList: [[1, 0], [2, 0]],
                cssAsc: 'titleSortUp',
                cssDesc: 'titleSortDown',
                cssHeader: 'titleGrid',
                widgets: ['zebra'],
                headers: {
                    0: { sorter: false }
                }
            })
            .tablesorterPager({
                container: $(pager)
                , positionFixed: false
                , size: pagesize
            });

    } else {
        $(table)
            .tablesorter({
                cssAsc: 'titleSortUp',
                cssDesc: 'titleSortDown',
                cssHeader: 'titleGrid',
                widgets: ['zebra']
            })
            .tablesorterPager({
                container: $(pager)
                , positionFixed: false
                , size: pagesize
            });
    }
    return table;
}