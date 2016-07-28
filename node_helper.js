'use strict';

/* Magic Mirror
 * Module: voicecontrol
 *
 * By Alex Yaknin 
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const spawn = require('child_process').spawn;

module.exports = NodeHelper.create({
    start: function () {
        this.started = false;
        
    },

    socketNotificationReceived: function(notification, payload) {
		if (notification === "CONNECT") {
			this.startRecognition(payload);
			return;
		}
	},

    startRecognition : function(config) {

        var models = config.models;

        var kwsSensitivity = 0.5;
        this.started = true;
        var self = this;
        // Initilize the keyword spotter
        var params = ['./modules/voicecontrol/snowboy/kws-multiple.py']; //, modelFile1, modelFile2];


        models.forEach(function(model) {
            params.push(model.file);
        }, this);

        //var kwsProcess = spawn('python', ['./speech-osx/kws-multiple.py', modelFile1, modelFile2], { detached: false });
        var kwsProcess = spawn('python', params, { detached: false });
        // Handel messages from python script
        kwsProcess.stderr.on('data', function (data) {
            var message = data.toString();
            if (message.startsWith('INFO')) {
                var items = message.split(':');
                var index = parseInt(items[2].split(' ')[1]);
                var model = models[index - 1];
                self.sendSocketNotification("KEYWORD_SPOTTED", model);

            } else {
                console.error(message);
            }
        })
        kwsProcess.stdout.on('data', function (data) {
            console.log(data.toString());
        })
    }
  
});