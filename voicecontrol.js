
'use strict';
/* Magic Mirror
 * Module: voicecontrol
 *
 * By Alex Yakhnin
 * MIT Licensed.
 */

Module.register("voicecontrol", {

	// Default module config.

    defaults: {
		models: []
	},

    start: function() { 

        this.sendSocketNotification("CONNECT", this.config);

    },

    socketNotificationReceived: function(notification, payload){
        if (notification === "KEYWORD_SPOTTED"){
            //Broadcast the message
            this.sendNotification(payload.message, {type: "notification"});
        }
		
	},

});