<%@ Page Title="" Language="C#" MasterPageFile="~/main.Master" AutoEventWireup="true" CodeBehind="reports.aspx.cs" Inherits="SCT.selfprov" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="scripts/controls/loading.js" type="text/javascript"></script>
    <script src="scripts/controllers/reports.js" type="text/javascript"></script>
   
    <link href="css/init.css" rel="stylesheet" />
    <link href="css/reports.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="menu" runat="server">
    <div id="div_menu">
        <ul id="menu">
            <li><a href="reports.aspx" id="menu_usage_report">Usage Report</a></li>
            <li><a href="reports_savings.aspx" id="menu_savings_report">Time-Savings Report</a></li>
        </ul>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <form id="form_user" runat="server">
        <asp:HiddenField id="hidden_user" runat="server"></asp:HiddenField>
    </form>
    <h3>Usage Report</h3>
    <table id="table_reports">
        <tr>
            <td id="td_controls">
                <table>
                    <tr><td><label for="input_date_from">From: </label></td></tr>
                    <tr><td><input type="text" id="input_date_from" /></td></tr>

                    <tr><td><label for="input_date_to">To: </label></td></tr>
                    <tr><td><input type="text" id="input_date_to" /></td></tr>

                    <tr><td><label for="input_user">User: </label></td></tr>
                    <tr><td><select id="select_user" ><option value="0">All</option></select></td></tr>

                    <tr><td><label for="select_command">Command: </label></td></tr>
                    <tr><td><select id="select_command"><option value="0">All</option><option value="1">Lync Only</option><option value="2">Lync Companion</option></select></td></tr>

                    <tr><td><input type="button" id="button_find" value="find" /></td></tr>
                </table>
            </td>
            <td  id="td_report">
                <div id="div_report"></div>
            </td>
        </tr>
    </table>
</asp:Content>