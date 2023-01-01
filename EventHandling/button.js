const {Events,ModalBuilder,ActionRowBuilder,TextInputBuilder,TextInputStyle} =  require('discord.js');



module.exports = {
	ButtonHandler: async function(client,verificationQueue,db){

		client.on(Events.InteractionCreate,async interaction=>{

			if(!interaction.isButton()) return;
			// get 
			await interaction.showModal(await getModal());

			


		});
	}
}



async function getModal(){ // form to get wallet information from user
	const modal = new ModalBuilder()
		.setCustomId("WalletInput")
		.setTitle("Wallet Verification");
	const walletInput= new TextInputBuilder()
		.setCustomId('walletinput')
		.setLabel("Enter your wallet address for verification")
		.setStyle(TextInputStyle.Short);
	const actionRow=new ActionRowBuilder().addComponents(walletInput);
	modal.addComponents(actionRow);

	return modal;

}