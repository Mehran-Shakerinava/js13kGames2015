"use strict";

var SoundManager =
{
	audioCtx: null,
	gainNode: null,
	source: null,
	
	audio: null,

	init: function()
	{
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.gainNode = this.audioCtx.createGain();
		this.setGain(0.2);

		this.audio = new Audio();
		this.createSource();
		this.createAudioGraph();
		this.audio.src = "audio/ObservingTheStar-min.ogg";
		this.audio.preload = "auto";
		this.audio.loop = true;
	},

	setGain: function(vol)
	{
		this.gainNode.gain.value = vol;
	},

	createSource: function()
	{
		this.source = this.audioCtx.createMediaElementSource(this.audio);
	},

	createAudioGraph: function()
	{
		this.source.connect(this.gainNode);
		this.gainNode.connect(this.audioCtx.destination);
	},

	playAudio: function()
	{
		//this.audio.play();
	}
};