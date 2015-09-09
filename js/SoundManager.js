"use strict";

var SoundManager =
{
    audioCtx: null,
    
    errorSource: null,

    biquadFilter: null,
	gainNode: null,
	
	init: function()
	{
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        this.gainNode = this.audioCtx.createGain();
		this.setVolume(1);
		this.gainNode.connect(this.audioCtx.destination);

        this.biquadFilter = this.audioCtx.createBiquadFilter();
        this.biquadFilter.type = "lowshelf";
        this.biquadFilter.frequency.value = 100;
        this.biquadFilter.gain.value = 50;
        this.biquadFilter.connect(this.gainNode);
	},

	setVolume: function(vol)
	{
		this.gainNode.gain.value = vol;
	},

    playError: function()
    {
        this.errorSource = this.audioCtx.createOscillator();
        this.errorSource.type = "sine";
        this.errorSource.frequency.value = 100;
        this.errorSource.connect(this.biquadFilter);
        this.errorSource.start(this.audioCtx.currentTime);
        this.errorSource.stop(this.audioCtx.currentTime + 0.15);
    }
};