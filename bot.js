'use strict';



const token = '<DISCORDBOTTOKENGOESHERE>';
const key = '<YOUTUBEAPIKEYGOESHERE>';
const prefix = "/";


const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key);
const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');


const play = prefix+'play';
const stop = prefix+'stop';

//start app and log server data
bot.on('ready', () => {
  console.log('Enjoy your tunes');
});

//gives kill command to audio
bot.on('message', message => {
	if (message.content === stop || stop + "") {
		const voiceChannel = message.member.voice.channel;
		if (!message.content.startsWith(stop) || message.author.bot) return;
		if (message.channel.type !== 'text') return;
		voiceChannel.leave();	
	}
  });

//this is your play command. simple, one page. no cogs...
bot.on('message', message => {
	const voiceChannel = message.member.voice.channel;
	if (!message.content.startsWith(play) || message.author.bot) return;
	if (message.channel.type !== 'text') return;

	//play command start
	else if (message.content.startsWith(play)) {	
	let searchQuery = message.content.slice(play.length);
  
  //play function is here. uses promises 
	function playSong() {
		youtube.searchVideos(searchQuery, 4)
		.then(function(results) {	
			let url = results[0].url;			
			if (!voiceChannel) { 
				return message.reply('join a channel or i shall hit you')
			}
			if (voiceChannel) {
				voiceChannel.join()
				.then(connection => {
					let stream = ytdl(url, { filter: 'audioonly' });
					let dispatcher = connection.play(stream);
					dispatcher;

				})}})}
//holy cannoli play command end now lets call it
		playSong();
//this bot is a simple boi. it cannot store conversion files on its server. i might expand that later in parallel to pybot
}
})
//bot server and discord api token
bot.login(token);

