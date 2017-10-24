sap.ui.define([], function() {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		/**
		 * Returns a configuration object for the {@link sap.ushell.ui.footerbar.AddBookMarkButton} "appData" property
		 * @public
		 * @param {string} sTitle the title for the "save as tile" dialog
		 * @returns {object} the configuration object
		 */
		shareTileData: function(sTitle) {
			return {
				title: sTitle
			};
		}, 
		
		StatusText: function(sText){
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			if (sText==="Approved"||sText==="APPROVED")
			{
			return oResourceBundle.getText("invoiceTextA");
			}
			if (sText==="Rejected"||sText==="REJECTED")
			{
			return oResourceBundle.getText("invoiceTextB");
			}
			else{
			return oResourceBundle.getText("invoiceTextC");	
			}
		},
		
		StatusState: function(sText){
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			if (sText==="Approved"||sText==="APPROVED")
			{
			return oResourceBundle.getText("invoiceStatusA");
			}
			if (sText==="Rejected"||sText==="REJECTED")
			{
			return oResourceBundle.getText("invoiceStatusB");
			}
			else{
			return "None";	
			}
		},
		
		sformatDate: function(sDate) {
				  
				  var oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({
						 
						calendarType: sap.ui.core.CalendarType.Gregorian,
						UTC: "false",
						style: "medium",
						source: {pattern: "yyyyMMdd"}
				});
				  
				  sDate = oFormatYyyymmdd.format(oFormatYyyymmdd.parse(sDate));

				  return sDate;
	}
		
	};

});