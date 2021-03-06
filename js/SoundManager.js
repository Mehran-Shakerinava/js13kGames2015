"use strict";

var SoundManager =
{
    audioOn: true,
    musicOn: true,

    audioCtx: null,
    
    errorSource: null,
    clickSource: null,
    
    errorBiquadFilter: null,
    clickBiquadFilter: null,

    gainNode: null,
	
	init: function()
	{
		SoundManager.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        SoundManager.gainNode = SoundManager.audioCtx.createGain();
		SoundManager.gainNode.gain.value = (SoundManager.audioOn ? 1 : 0);
		SoundManager.gainNode.connect(SoundManager.audioCtx.destination);

        SoundManager.errorBiquadFilter = SoundManager.audioCtx.createBiquadFilter();
        SoundManager.errorBiquadFilter.type = "lowpass";
        SoundManager.errorBiquadFilter.frequency.value = 200;
        SoundManager.errorBiquadFilter.Q.value = 10;
        SoundManager.errorBiquadFilter.gain.value = 1;
        SoundManager.errorBiquadFilter.connect(SoundManager.gainNode);

        SoundManager.clickBiquadFilter = SoundManager.audioCtx.createBiquadFilter();
        SoundManager.clickBiquadFilter.type = "lowpass";
        SoundManager.clickBiquadFilter.frequency.value = 1500;
        SoundManager.clickBiquadFilter.Q.value = 35;
        SoundManager.clickBiquadFilter.gain.value = 10;
        SoundManager.clickBiquadFilter.connect(SoundManager.gainNode);

        /* TODO: load musicOn */
	},

    playError: function()
    {
        SoundManager.errorSource = SoundManager.audioCtx.createOscillator();
        
        SoundManager.errorSource.frequency.value = 130;
        SoundManager.errorSource.detune.value = -700;
        SoundManager.errorSource.type = "sawtooth";
        
        SoundManager.errorSource.connect(SoundManager.errorBiquadFilter);
        SoundManager.errorSource.start(SoundManager.audioCtx.currentTime);
        SoundManager.errorSource.stop(SoundManager.audioCtx.currentTime + 0.15);
    },

    playClick: function()
    {
        SoundManager.clickSource = SoundManager.audioCtx.createOscillator();
        
        SoundManager.clickSource.frequency.value = 333;
        SoundManager.clickSource.detune.value = -1200;
        SoundManager.clickSource.type = "sine";
        
        SoundManager.clickSource.connect(SoundManager.clickBiquadFilter);
        SoundManager.clickSource.start(SoundManager.audioCtx.currentTime);
        SoundManager.clickSource.stop(SoundManager.audioCtx.currentTime + 0.10);
    },

    toggleAudio: function()
    {
        var gain = SoundManager.gainNode.gain;
        if(gain.value > 0)
        {
            gain.value = 0;
            SoundManager.audioOn = false;
        }
        else
        {
            gain.value = 1;
            SoundManager.audioOn = true;
        }
    },

    toggleMusic: function()
    {
        SoundManager.musicOn = !SoundManager.musicOn;
    }
};