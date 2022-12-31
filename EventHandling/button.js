const {Events,ModalBuilder} =  require('discord.js');



module.exports = {
	ButtonHandler: async function(client,verificationQueue,db){

		client.on(Events.InteractionCreate,interaction=>{

			if(!interaction.isButton()) return;
			// checking presence of wallet
			
				


		});
	}
}

async function getWalletForm(){ // form to get wallet information from user
	
}