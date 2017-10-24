jQuery.sap.declare("ws.com.ZTWSExtension.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "ws.com",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/ZTWS"
		// we use a URL relative to our own component
		// extension application is deployed with customer namespace
});

this.ws.com.Component.extend("ws.com.ZTWSExtension.Component", {
	metadata: {
		manifest: "json"
	}
});