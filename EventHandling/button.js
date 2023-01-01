const {Events,ModalBuilder,ActionRowBuilder,TextInputBuilder,TextInputStyle} =  require('discord.js');



module.exports = {
	ButtonHandler: async function(client,verificationQueue,db){
		// wallet verification popup on button press
		client.on(Events.InteractionCreate,async interaction=>{
			if(!interaction.isButton()) return;
			await interaction.showModal(await getModal());
		});
		// event after wallet has been submitted
		client.on(Events.InteractionCreate,async interaction=>{
			if(!interaction.isModalSubmit()) return;
			const submittedAddress=interaction.fields.getTextInputValue('walletinput');
			
			//using ephemeral response
			await interaction.reply({content:'address submitted',ephemeral:true})


			// interaction.reply("|");interaction.deleteReply(); // a jugaad since if i do not react to interaction, it says error happend to usre




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