const {Events,ModalBuilder,ActionRowBuilder,TextInputBuilder,TextInputStyle} =  require('discord.js');
const {projectid}=require('./../.config.json');


module.exports = {
	ButtonHandler: async function(client,verificationQueue,db){
		// wallet verification popup on button press
		client.on(Events.InteractionCreate,async interaction=>{
			if(!interaction.isButton()) return;
			// add person in verification queue

			await interaction.showModal(await getModal());
		});
		// event after wallet has been submitted
		client.on(Events.InteractionCreate,async interaction=>{
			if(!interaction.isModalSubmit()) return;
			await pvtReply(interaction,'Address submitted');
			// add this user in the verification queue
			verifyData(interaction,verificationQueue,db);
		});

	}
}

async function verifyData(interaction,verificationQueue,db){
	const user_tag = interaction.member.user.tag;
	const submittedAddress=interaction.fields.getTextInputValue('walletinput');
	const userStakeAddress=await getStakeAddress(submittedAddress);
	console.log(userStakeAddress);
	// add user in verification queue
	if(user_tag in verificationQueue){
		pvtReply(interaction,'user already in verification queue');
		return;
	}
	verificationQueue.user_tag="in progress";

	// checking uniqueness in database
	db.find({ $or : [{_id:user_tag},{stake_address:submittedAddress}]} , function (err,docs){
		if(docs.length>0){
			pvtReply(interaction,'Either the discord user or address is already verified');
			delete verificationQueue.user_tag;
		}
		else{




		}
	});
}
async function getStakeAddress(address){
	return await fetch('https://cardano-preview.blockfrost.io/api/v0/addresses/${address}',{
		headers:{
			project_id:projectid
		}
	});
}

async function pvtReply(interaction,text){
	await interaction.reply({content:text,ephemeral:true});
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
/*


addr_test1qzucx7ndcutltm7z63hqr69sy79v9pv85h06h9d2alnl59y5fqtf5qdql69mszhtvwt44sy4hz407r43qmxnupyggn4q62nn77


*/