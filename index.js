const {Client, Events, GatewayIntentBits} = require('discord.js')
const { token } = require('./.config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); // for the button in verify

const client = new Client({ intents: [GatewayIntentBits.Guilds] });




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
			if(curChannel.type==0 && curChannel.name=="wallet_verification"){ // type 0  is for Guild Text based channels
				const row = new ActionRowBuilder()
				.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);
			curChannel.send({content:'click to verify',components:[row]});

			} 
				
		});

	});


	
}

// function logs into 

client.login(token);