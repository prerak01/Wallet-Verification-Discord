const {Events,ModalBuilder} =  require('discord.js');



module.exports = {
	ButtonHandler: async function(client,verificationQueue){

		client.on(Events.InteractionCreate,interaction=>{

			if(!interaction.isButton()) return;
				interaction.deferReply();


		});
	}
}

async function getWalletForm(){ // form to get wallet information from user
	
}