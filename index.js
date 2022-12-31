const {Client, Events, GatewayIntentBits} = require('discord.js')
const { token } = require('./.config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); // for the button in verify

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//part 2
const {ButtonHandler} = require('./EventHandling/button.js');
verificationQueue = {} // will contain all the users which are in the queue to be verified


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	sendVerifyMessage();
});

async function sendVerifyMessage(){
	const allGuilds = await client.guilds.fetch(); // map object (Snowflake,OAuth2 guild)

	// iterate through all OuthA2guilds now
	allGuilds.forEach(async function(value,key,map){
		var curGuild = await value.fetch(); // fetches guild structure
		
		// iterating through channels

		allChannels = await curGuild.channels.fetch();
		allChannels.forEach(async function(value,key,map){
			var curChannel = value;
			if (curChannel.type!=0 || curChannel.name!="wallet_verification")
				return;
			 // type 0  is for Guild Text based channels
				const row = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('verify!')
					.setStyle(ButtonStyle.Primary),
			);
			// check message history

			if((await curChannel.messages.fetch()).size==0){ // no verification messages have been sent earlier
				curChannel.send({content:'click to verify your wallet',components:[row]});
			}


			//for testing delete all current messages and then send a new one
//			console.log((await curChannel.messages.fetch()))		
		});
	});
}

// part 2
ButtonHandler(client,verificationQueue);



// function logs into 

client.login(token);