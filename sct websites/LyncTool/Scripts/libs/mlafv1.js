/* --------------------------
 * BASE MLAF v1.0.2
 * JavaScript behaviors for components
 * Instructions: https://github.intel.com/pages/IT-UI-Assets/IT-Master-Look-and-Feel-StyleSheet/home.html
 * Github Repo: https://github.intel.com/IT-UI-Assets/IT-Master-Look-and-Feel-StyleSheet
 * --------------------------
*/

function initMasterLookAndFeel() {
	try {	
		/*** ACCORDION ***/
		var acrdns = document.querySelectorAll(".intel-accordion");
		for (var i = 0, j = acrdns.length; i < j; i++) {
			var acrdn = acrdns[i];
			var tmpAcc = new IAccordion(acrdn, false);
			tmpAcc.init();
		}
		
		/*** TAB ***/		
		var tabs = document.querySelectorAll(".intel-tab");
		for (var i = 0, j = tabs.length; i < j; i++) {
			var tab = tabs[i];
			var tabContent = IUtility.nextElementSibling(tab);
			if (!(IUtility.hasClass(tabContent, "intel-tab-content"))) {
				throw new Error("intel-tab sibling intel-tab-content not found");
			}
			var iTab = new ITab(tab, tabContent);
			iTab.init();
		}
		
		/*** TABLE ***/		
		var tables = document.querySelectorAll(".intel-table");
		for (var i = 0, j = tables.length; i < j; i++) {
			var tbl = new ITable(tables[i]);
			tbl.init();
		}
	}
	catch (ex) {
		console.log(ex.name + " " + ex.message);
	}	
}

/**
Class Description
@class IAccordion
@param {String} newContext
@param {Boolean} setActiveOnLoad - sets the active menu item on load via Regex
@requires jQuery
@constructor
**/
var IAccordion = function ( elem, setActiveOnLoad ) {
	this.elem = elem;	
	if (!(this.elem.getAttribute('id'))) {
		IUtility.assignID(this.elem, "acd");
	}
	this.id = "#" + this.elem.getAttribute("id");
	this.setActiveOnLoad = setActiveOnLoad;
};

/**
Method description 
@method init
**/
IAccordion.prototype.init = function() {
	try {
		var self = this;
		if (this.elem.getAttribute("init") != "true") {					
			this.elem.setAttribute("init", "true");
			var toggleHeader = function() {	
				IUtility.toggleClass(this, "active");
				IUtility.toggleClass(IUtility.nextElementSibling(this), "active");
			};
			
			var headers = document.querySelectorAll(this.id + " > h3, "+ this.id +" > ul > li > h3");
			for (var i = 0, j = headers.length; i < j; i++) {
				var header = headers[i];
				header.onclick = toggleHeader;
			}
			
			var toggleAll = function() {
				var toggle = self.elem.getAttribute("toggle");
				var targets = [];
				var target;
				if (toggle == "true") {
					this.textContent = "Expand All";
					self.elem.setAttribute("toggle", "false");
					
					targets = document.querySelectorAll(self.id + " > h3, "+ self.id +" > h3 + *");
					for (var m = 0, n = targets.length; m < n; m++) {
						target = targets[m];
						IUtility.removeClass(target, "active");
					}
				} 
				else {
					this.textCotent = "Collapse All";
					self.elem.setAttribute("toggle", "true");
					
					targets = document.querySelectorAll(self.id + " > h3, "+ self.id +" > h3 + *");
					for (var m = 0, n = targets.length; m < n; m++) {
						target = targets[m];
						IUtility.addClass(target, "active");
					}
				}
			};
			
			var tglAllButtons = this.elem.querySelectorAll(".intel-accordion-toggle");
			for (var k = 0, l = tglAllButtons.length; k < l; k++) {
				var btn = tglAllButtons[k];
				btn.onclick = toggleAll;
				btn.innerHTML = "Expand All";
			}	
				
			var toggleLink = function() {		
				//Get rid of the other selected items && close active menus
				var selections = self.elem.querySelectorAll(".intel-selected, .active");
				for (var q = 0, r = selections.length; q < r; q++) {
					var selection = selections[q];
					if (IUtility.hasClass(selection, "intel-selected")) {
						IUtility.removeClass(selection, "intel-selected");
					}
					
					if (IUtility.hasClass(selection, "active")) {
						IUtility.removeClass(selection, "active");
					}
				}
				
				//Apply active to parent menus (title and list)
				var selectParents = function(root, elem) {
					var tmpParent = elem.parentNode;
					if (tmpParent == root) {
						return;
					}
					else if (tmpParent.nodeName == "UL") { 
						IUtility.addClass(tmpParent, "active");
						IUtility.addClass(tmpParent.previousSibling.previousSibling, "active");
						return selectParents(root, tmpParent);
					}
					else {
						return selectParents(root, tmpParent);
					}
				};
				selectParents(self.elem, this);
				
				//Apply selected to current link
				IUtility.addClass(this,"intel-selected");
			};
		
			var links = document.querySelectorAll(this.id + " > a, "+ this.id+" > ul > li > a, "+ this.id+" > ul > li > ul > li > a");
			for (var o = 0, p = links.length; o < p; o++) {
				var link = links[o];
				link.onclick = toggleLink;
			}			
				
			//sets the active menu item on load via Regex
			if (this.setActiveOnLoad) {
				var hash = window.location.hash;
				var sPath = window.location.pathname;
				var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
				var activations = this.elem.querySelectorAll("a");
				var matches = [];
				
				for (var s = 0, t = activations.length; s < t; s++) {
					var activation = activations[s];
					var href = activation.getAttribute("href");
					var re = new RegExp(href);
					if (re.test(sPage)) {
						matches.push(activation);
					}
					else if (re.test(hash)) {
						matches.push(activation);
					}
				}
				
				var confidence = 0;
				var match = null;
				for (var u = 0, v = matches.length; u < v; u++) {
					var len = matches[u].getAttribute("href").length;
					if (confidence <= len) {
						match = matches[u];
						confidence = len;
					}
				}
				
				if (match) {
					IUtility.addClass(match,"intel-selected");
				}
			}
		}
	}
	catch (e) {
		console.log("IAccordion.init.exception: " + e.name + ":" + e.message);
	}
};

/**
Class Description
@class ITab
@param {String} tab
@param {String} tabContent
@constructor
**/
var ITab = function ( tab, tabContent ) {
	this.tab = tab;	
	this.content = tabContent;

	if (!(this.tab.getAttribute('id'))) {
		IUtility.assignID(this.tab, "tab");
	}
	this.tabID = this.tab.getAttribute("id");
	
	if (!(this.content.getAttribute('id'))) {
		IUtility.assignID(this.content, "tbc");
	}
	this.contentID = this.content.getAttribute("id");	
};

ITab.prototype.init = function() {
	try {
		if (this.tab.getAttribute("init") != "true") {
			var self = this;
			this.tab.setAttribute("init", "true");
			
			var anchors = this.tab.querySelectorAll("a");
			for (var i = 0, j = anchors.length; i < j; i++) {
				var anchor = anchors[i];
				anchor.onclick = function() {
					//Tab
					var parent = this.parentNode.parentNode;
					var prev = parent.querySelectorAll('.active');
					IUtility.removeClass(prev[0], 'active');
					IUtility.addClass(this, 'active');
					
					//Content
					var target = this.getAttribute("tab").replace("#", "");
					var oldContent = self.content.querySelectorAll('.active');
					IUtility.removeClass(oldContent[0], 'active');
					IUtility.addClass(document.getElementById(target), 'active');
				};
			}
			
			if (this.content.querySelectorAll(".active").length < 1) {
				var firstChild = this.tab.querySelectorAll(":first-child a")[0];
				IUtility.addClass(firstChild, 'active');
				
				var initContentID = firstChild.getAttribute("tab");
				initContentID = initContentID.replace("#", "");
				IUtility.addClass(document.getElementById(initContentID), 'active');
			}
		}
	}
	catch (e) {
		console.log("ITab.init.exception: " + e.name + ":" + e.message);
	}				
};



/**
Class Description
@class ITable
@param {String} newContext
@requires jQuery
@constructor
**/
var ITable = function ( elem ) {
	try {
		this.elem = elem;
		if (!(this.elem.getAttribute('id'))) {
			IUtility.assignID(this.elem, "tbl");
		}
		this.id = this.elem.getAttribute("id");		
	}
	catch (e) {
		console.log("ITable.constructor.exception: " + e.name + ":" + e.message);
	}
};

ITable.prototype.init = function() {
	try {
		if (this.elem.nodeName == "TABLE") {
			if (this.elem.getAttribute("init") != "true") {
				this.elem.setAttribute("init", "true");
				var children = this.elem.querySelectorAll("td, tfoot th");
				for (var i = 0, j = children.length; i < j; i++) {
					var cell = children[i];
					if (IUtility.isNumeric(cell.innerHTML)) {
						IUtility.addClass(children[i], "intel-right");
					}
				}				
			}
		}		
	}
	catch (e) {
		console.log("ITable.init.exception: " + e.name + ":" + e.message);
	}		
};

var IUtility = function() {};
	/**
	A utility function for use in generating a GUID 
	@method S4
	@return {String} subGuid Generated substring of a GUID.
	@private
	*/
	IUtility.S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	
	/**
	This function generates a GUID (globally unique identifier).
	@method guid	 
	@return {String} guid The generated GUID.
	**/
	IUtility.guid = function() {
	    return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
	};
	
	IUtility.assignID = function(elem, prefix) {
		try {
			elem.setAttribute('id', prefix + IUtility.guid());
		}
		catch (e) {
			console.log("IUtility.assignID.exception: " + e.name + ":" + e.message);
		}
	};
	
	IUtility.addClass = function(elem, className) {
		try {
			var classList = IUtility.classList(elem);
			if (classList.length) {
				classList.push(className);
				elem.className = classList.join(" ");
			}
			else {
				elem.className += " " + className;
			}
		}
		catch (e) {
			console.log("IUtility.addClass.exception: " + e.name + ":" + e.message);
		}
	};
	
	IUtility.removeClass = function(elem, className) {
		try {
			var classList = IUtility.classList(elem);
			if (classList.length) {
				//classList.splice( classList.indexOf(className), 1 );
				for (var i = 0, j = classList.length; i < j; i++) {
					if (classList[i] == className) {
						delete classList[i];
						break;
					}
				}				
				elem.className = classList.join(" ");
			}	  
			else {
				elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}
		catch (e) {
			console.log("IUtility.removeClass.exception: " + e.name + ":" + e.message);
		}
	};
	
	IUtility.hasClass = function(elem, className) {
		try {
			var classList = IUtility.classList(elem);
			if (classList.length) {
				return (0 <= classList.join(" ").indexOf(className));
			}
			else {
				return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
			}
		}
		catch (e) {
			console.log("IUtility.hasClass.exception: " + e.name + ":" + e.message);
		}
	};
	
	IUtility.classList = function(elem) {
		try {
			if (elem.className == null || elem.className == "") {
				return [];
			}
			else {
				return elem.className.split(" ");
			}
		}
		catch (e) {
			console.log("IUtility.classList.exception: " + e.name + ":" + e.message);
			return [];
		}
	};
	
	IUtility.nextElementSibling = function(elem) {
		try {
			var siblings = elem.parentNode.childNodes;
			if (siblings.length > 0) {
				var target = -1;
				for (var i = 0, j = siblings.length; i < j; i++) {
					var item = siblings.item(i);
					if (item == elem) {
						for (var k = i + 1, l = siblings.length; k < l; k++) {
							if (!(siblings.item(k).nodeName.match(/text/i))) {
								target = k;
								break;
							}
						}
						break;
					}
				}
				
				if (target > 0) {
					return siblings.item(target);
				}
			}
			return null;
		}
		catch (e) {
			console.log("IUtility.nextElementSibling.exception: " + e.name + ":" + e.message);
			return null;
		}
	};
	
	IUtility.toggleClass = function(elem, className) {
		try {
			if (IUtility.hasClass(elem, className)) {
				IUtility.removeClass(elem, className);
			}
			else {
				IUtility.addClass(elem, className);
			}
		}
		catch (e) {
			console.log("IUtility.toggleClass.exception: " + e.name + ":" + e.message);
		}
	};
	
	IUtility.isNumeric = function(input) {
		try {
			input = input.replace(",","");
			input = input.replace("%","");
			input = input.split('.').join('');
			var re = /^-?\d+\.?\d*$/;	
			return re.test(input);
		}
		catch (e) {
			console.log("IUtility.isNumeric.exception: " + e.name + ":" + e.message);
			return false;
		}
	};