<%@ Page Title="" Language="C#" MasterPageFile="~/main.Master" AutoEventWireup="true" CodeBehind="selfprov.aspx.cs" Inherits="SCT.selfprov" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <script src="scripts/libraries/idle-timer.js" type="text/javascript"></script>
      <script src="scripts/controls/loading.js" type="text/javascript"></script>
      <script src="scripts/controllers/selfprov.js" type="text/javascript"></script>

      <link href="css/selfprov.css" rel="stylesheet" type="text/css" />  
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="menu" runat="server">
    <div id="div_menu">
        <ul id="menu">
            <li><a href="selfprov.aspx" id="menu_home">Home</a></li>
            <li><a href="About.aspx" id="menu_about">About</a></li>
        </ul>
    </div>
</asp:Content>
<asp:Content ID="Content" ContentPlaceHolderID="body" runat="server">
    <form id="form_user" runat="server">
        <asp:HiddenField id="hidden_user" runat="server"></asp:HiddenField>
    </form>
    <div class="module">
        <div class="module-header"><h3>Skype for Business (SfB) Softphone</h3></div>
        <div class="module-content" id="div_userInfo" ></div>
    </div>
    <div id="div_submit" class="module">
        <div class="module-header">
        <h3>Softphone Version (See <a href="About.aspx">About</a> tab for more info)</h3>
        </div>
        <div class="module-content">
        <p>
            <input type="radio" name="lyncMode" id="lynconly" value="EnableLyncOnly" checked="checked" />
            <label for="lynconly">Skype Softphone Only (Assigned deskphone will be disabled)</label><br />            
        </p>
        <p>
            <input type="button" id="submitBtn" value="Submit" disabled="disabled" />
        </p>
        </div>
    </div>
</asp:Content>
