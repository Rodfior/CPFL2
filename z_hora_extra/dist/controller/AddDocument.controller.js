sap.ui.define([
	"z_hora_extra/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"z_hora_extra/model/formatter",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/MessageToast",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/CheckBox",
	"jquery.sap.global"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, History, MessageBox, Dialog, Button, MessageToast, Text,
	TextArea, CheckBox, jQuery) {

	// return BaseController.extend
	var Ccontroller = BaseController.extend("z_hora_extra.controller.AddDocument", {
		formatter: formatter,

		initializeNewDocumentData: function() {

			this.getView().getModel("newDocument").setData({
				Quantity: " ",
				Comments: " ",
				Reason: " "

			});
		},

		onInit: function() {
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "newDocument");
			this.initializeNewDocumentData();
			this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({
				pattern: "yyyy-MM-dd",
				calendarType: sap.ui.core.CalendarType.Gregorian
			});
		},

		// 	showErrorAlert : function(sMessage) {
		// jQuery.sap.require("sap.m.MessageBox");
		// sap.m.MessageBox.alert(sMessage);
		// },

		dateFromString: function(oEvent) {
			// try to create date directly
			var oCalendar = oEvent.oSource;
			var aSelectedDates = oCalendar.getSelectedDates();
			var oText = this.getView().byId("selectedDate");
			var oDate = this.oFormatYyyymmdd.format(aSelectedDates[0].getStartDate());
			oText.setText(oDate);
			var oDate = oDate.replace("-", "");
			var oDate = oDate.replace("-", "");
			// var oDate = new Date(sDate);
			// // if this is not working build manually
			// if (!(oDate instanceof Date && isFinite(oDate))) {
			// 	var d = sDate.split(".").reverse();
			// 	for (var i in d) {
			// 		d[i] = parseInt(d[i]);
			// 	}
			// 	oDate = new Date(d[0], d[1], d[2]);
			// }
			var mData = this.getView().getModel("newDocument").getData();
			mData.Zdate = oDate;
		},

		// saveDocument : function() {
		// var mNewDocument = this.getView().getModel("newDocument").getData().Detail;
		// // Basic payload data
		// var mPayload = {
		// 	WeekendHollydays: mNewDocument.WeekendHollydays,
		// 	Night: mNewDocument.Night,
		// 	Reason: mNewDocument.Reason,
		// 	Comments: mNewDocument.Comments,
		// 	ZDate: this.dateFromString(mNewDocument.ZDate),
		// 	Quantity: mNewDocument.Quantity.toString()
		// };
		// var oModel = this.getView().getModel();

		// oModel.create("/Hora_ExtraSet", mPayload,{
		// 	success : jQuery.proxy(function() {
		// 		this.initializeNewProductData();
		// 		sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist");
		// }

		// )

		// });
		// },

		checkDoneW: function(oEvent) {

			// var check = oEvent.getParameters("selected");// not working
			var checkV = this.byId("chkWknd").getSelected();
			return checkV;
		},

		checkDoneN: function(oEvent) {
			// var check = oEvent.getParameters("selected");// not working
			var checkV = this.byId("chkNight").getSelected();
			return checkV;
		},

		onSave: function() {

			var mData = this.getView().getModel("newDocument").getData();
			mData.WeekendHollydays = this.checkDoneW();
			mData.Night = this.checkDoneN();
			mData.Quantity = mData.Quantity.replace(/ /g, '');
			// mData.Zdate = this.dateFromString();
			var mNewDocument = {
				"WeekendHollydays": mData.WeekendHollydays,
				"Comments": mData.Comments,
				"Reason": mData.Reason,
				"Night": mData.Night,
				"Zdate": mData.Zdate,
				// "Zdate": this.dateFromString(mData.Zdate),
				"Quantity": parseInt(mData.Quantity)
				//"Phone": parseInt(mData.Phone)
			};

			var oModel = this.getView().getModel();

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oThis = this;
			
		
			
			
		if (!mData.Zdate||mData.Quantity===" "||mData.Reason===" ") {
			if (!this.oAlertDialog) {
				this.oAlertDialog = sap.ui.xmlfragment("z_hora_extra.view.NameRequiredDialog", this);
				this.getView().addDependent(this.oAlertDialog);
			}
			this.oAlertDialog.open();
		}
			
		else{	
			var dialog = new Dialog({
				title: "Create",
				type: "Message",
				content: new Text({
					text: "Are you sure you want create entry?"
				}),
				beginButton: new Button({
					text: "Yes",
					press: function() {

						oModel.create("/Hora_ExtraSet", mData, {
							success: jQuery.proxy(function(mResponse){
								jQuery.sap.require("sap.m.MessageToast");
								sap.m.MessageToast.show("Entry Created ");
								oRouter.navTo("worklist");
								oThis.initializeNewDocumentData();
							}, this),
							error: jQuery.proxy(function() {
								//        alert("Problem creating new user");
								sap.m.MessageToast.show("Problem creating new document");
							}, this)
						});
						dialog.close();	// sap.ui.getCore().byId("z_hora_extra.view.AddDocument").getModel().refresh(true);
					}
				}),
				endButton: new Button({
					text: "No",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		}
			/*	oModel.create("/Hora_ExtraSet", mData, {
				success: jQuery.proxy(function(mResponse) {
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("Entry Created ");
					this.initializeNewDocumentData();
					// this.getView().getModel("newDocument").setData({
					// 	Quantity: " ",
					// 	Comments: " ",
					// 	Reason: " "
					// });
					sap.ui.core.UIComponent.getRouterFor(this).navTo("worklist");
				}, this),
				error: jQuery.proxy(function() {
					//        alert("Problem creating new user");
					sap.m.MessageToast.show("Problem creating new document");
				}, this)
			});*/
		},

		onCancel: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oThis = this;
			var dialog = new Dialog({
				title: "Cancel",
				type: "Message",
				content: new Text({
					text: "Are you sure you want cancel entry?"
				}),
				beginButton: new Button({
					text: "Yes",
					press: function() {
						oRouter.navTo("worklist");
						oThis.initializeNewDocumentData();
					}
				}),
				endButton: new Button({
					text: "No",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		
		onInput: function(oEvent){
			
			// var value = parseInt(oEvent.getSource().getProperty("value"));
			var value = parseInt(oEvent.getParameter("value"));
			var value2 = oEvent.getParameter("value");
			var value2 = value2.replace(/\d+/g, '');
			var value2 = value2.replace(/ /g, '');
			var valueState = isNaN(value) ? "Error": value2 ? "Error": value > 999 ? "Error" : "Success";
			oEvent.getSource().setValueState(valueState);
		},

		handleSuggest: function(oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var aFilters = [];
			if (sTerm) {
				aFilters.push(new Filter("Name", sap.ui.model.FilterOperator.StartsWith, sTerm));
			}
			oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
		},
	onDialogClose : function(oEvent) {
		this.oAlertDialog.close();
	},
		onNavBack: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("worklist");

		}

	});

	return Ccontroller;

});