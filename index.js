const {Client, Events, GatewayIntentBits} = require('discord.js')
const { token } = require('./.config.json');

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
				value.send("why me ?");

			} 
				
		});

	});


	
}


// function logs into 


client.login(token);