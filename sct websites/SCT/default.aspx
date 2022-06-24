<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<%--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">--%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <script src="scripts/libraries/jquery-1.9.1.js" type="text/javascript"></script>
        <script src="scripts/libraries/jquery.base64.js" type="text/javascript"></script>
        <script src="scripts/libraries/jquery.cookie.js" type="text/javascript"></script>
        <script src="scripts/libraries/jquery-ui-1.10.1intel.js" type="text/javascript"></script>
        <script src="scripts/libraries/utils.js" type="text/javascript"></script>
        <script src="scripts/controls/validator.js" type="text/javascript"></script>
        <script src="scripts/controllers/default.js" type="text/javascript"></script>

        <link href="css/jquery-ui-1.10.1.intel.css" rel="stylesheet" type="text/css" />
        <link href="css/main.css" rel="stylesheet" type="text/css" />
        <link href="css/default.css" rel="stylesheet" type="text/css" />

        <title>Intel - SCT</title>
    </head>
    <body>
        <div id="div_maincontent">
            <div id="div_background">
                <table cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <h2 >Welcome to Station Configuration Tool</h2>
                                
                                <div id="div_login">
                                    <p id="p_login">Please login</p>
                                    <table cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label for="input_loginuser">Username:</label> 
                                                </td>
                                                <td class="fieldCol">
                                                    <fieldset>
                                                        <%--cucm cluster consolidation Changes - INCREASED FROM 16 TO 40 : BOC--%>
                                                        <input id="input_loginuser" type="text" maxlength="40" />
                                                        <%--cucm cluster consolidation Changes - INCREASED FROM 16 TO 40 : EOC--%>
                                                    </fieldset>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label for="input_loginpasswd">Password:</label> 
                                                </td>
                                                <td class="fieldCol">
                                                    <fieldset>
                                                        <%--cucm cluster consolidation Changes - INCREASED FROM 20 TO 40 : BOC--%>
                                                        <input id="input_loginpasswd" type="password" maxlength="40" />
                                                        <%--cucm cluster consolidation Changes - INCREASED FROM 20 TO 40 : EOC--%> 
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label for="select_logincampus" >Campus:</label>
                                                </td>
                                                <td class="fieldCol">
                                                    <%-- added placeholder and select campus as default value --%>
                                                    <fieldset>
                                                        <select id="select_logincampus" placeholder="Select Campus" style="opacity:0.5" runat="server" >
                                                            <option value="Select Campus" default="" selected="" runat="server"  >Select Campus</option>
                                                        </select>
                                                    </fieldset>
                                                </td>
                                            </tr>


                                            <%--cucm cluster consolidation Changes - BOC--%>
                                        <tr>
                                            <td>
                                                <label for="input_txt">IPTVersion: </label>
                                                
                                            </td>
                                            <td class="fieldCol">
                                                <fieldset>
                                                    <input id="input_ccstxt" disabled="disabled" type="text" maxlength="20" />
                                                </fieldset>
                                            </td>
                                            
                                        </tr>
                                        <%--cucm cluster consolidation Changes - EOC--%> 


                                            <tr>
                                                <td colspan="2">
                                                    <fieldset>
                                                        <input id="input_loginsubmit" type="button" value="Submit" />
                                                    </fieldset>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="div_dialog"></div>
    </body>
</html>
