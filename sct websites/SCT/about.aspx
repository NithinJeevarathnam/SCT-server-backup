<%@ Page Title="" Language="C#" MasterPageFile="~/main.Master" AutoEventWireup="true"  CodeBehind="about.aspx.cs" Inherits="SCT.about" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="scripts/controls/loading.js" type="text/javascript"></script>
      <script src="scripts/controllers/about.js" type="text/javascript"></script>
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
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <form id="form_user" runat="server">
        <asp:HiddenField id="hidden_user" runat="server"></asp:HiddenField>
    </form>    
    <div class="module">
        <div class="module-header"><h3>About</h3></div>
        <div class="module-content">
            <p>This tool is for users to request a SfB softphone. The tool checks your site ID and inet number in WDS to determine your eligibility for SfB Softphone. If you are eligible, just select SfB Softphone Only and "Submit" button; an automated process will kick off to configure your telephony and SfB settings for SfB Softphone. Once completed, you will receive a welcome email. You can check the status of your request in the "Status" field.</p>
        </div>
    </div>
    <div class="module">
        <div class="module-header"><h3>SfB Softphone Versions</h3></div>
        <div class="module-content">
            <p><b>SfB Softphone Only:</b> All incoming and outgoing calls go through your SfB softphone. If you have a deskphone, it will be disabled.</p>
        </div>
    </div>
    <div class="module">
        <div class="module-header"><h3>Eligibility Requirements</h3></div>
        <div class="module-content">
            <p>
            To be eligible for SfB softphone, you must meet all of the following requirements:
            </p>
            <ul>
                <li>You must be on the Cisco infrastructure</li>
                <li>You must have a valid Inet number in WDS</li>
                <li>Your Inet prefix (first 3 numbers) must be listed here:<br />
                    <span id="span_prefixes"></span>
                </li>
            </ul>
        </div>
    </div>
    <div class="module">
        <div class="module-header"><h3>Resolving Common Eligibility Issues</h3></div>
        <div class="module-content">
            <p>
            If this tool designates you as ineligible, please visit <a href="http://wiki.ith.intel.com/x/fAozCw">this site</a> for common eligibility issues and how to 
                potentially resolve them.
            </p>
        </div>
    </div>
</asp:Content>
