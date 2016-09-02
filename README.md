# Module: Voice Control 
The `voicecontrol` module allows to use voice control in the MagicMirror.
This module based on the https://snowboy.kitt.ai/. The snowboy.kitt has a few dependencies which you can install running this command line on your raspberry pi:

````javascript
sudo apt-get install python-pyaudio python3-pyaudio sox
````


## Using the module

In order to use this module you should create a trained model for each command/keyword at https://snowboy.kitt.ai/. 
Download the model and copy it into the root of the MagicMirror directory. Besides recognizing the voice commands the module could display a list of commands on the mirror.


To use this module, add it to the modules array in the `config/config.js` file with the following settings:
````javascript
modules: [
	{
			module: 'voicecontrol',
			position: 'bottom_left',
			config: {
				models: [
					{
						keyword: "playMusic",   // keyword 
						description: "Say 'Play Music' to start playing",
						file: "playMusic.pmdl", // trained model file name
						message: "PLAY_MUSIC"   // notification message that's broadcast in the MagicMirror app
					},
					{
						keyword: "stopMusic",
						description: "Say 'Stop Music' to stop playing",
						file: "stopMusic.pmdl",
						message: "STOP_MUSIC"
					},
				]
			}
		}
]
````

When a command is detected a notification message is send with sendNotification to every other module. You will need to subscribe for a specific type of message in your module:

````javascript

 notificationReceived: function(notification, payload, sender) {
		if (notification === "PLAY_MUSIC"){
			this.media.play();
		}

        if (notification === "STOP_MUSIC"){
			this.media.pause();
		}
	},

````
