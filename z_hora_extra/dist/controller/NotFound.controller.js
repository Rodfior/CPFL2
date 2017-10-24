sap.ui.define([
	"z_hora_extra/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("z_hora_extra.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed: function() {
			this.getRouter().navTo("worklist");
		}

	});

});