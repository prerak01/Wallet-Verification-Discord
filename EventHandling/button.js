const {Events,ModalBuilder,ActionRowBuilder,TextInputBuilder,TextInputStyle} =  require('discord.js');
const {projectid}=require('./../.config.json');
const needle=require('needle');
const fetch=require('node-fetch');
const sleepTime=30*60;


const base_api="https://cardano-preview.blockfrost.io/api/v0/";
const header= 
{
	headers:
	{
		project_id:projectid
	}
}

module.exports = { ButtonHandler: async function(client,verificationQueue,db){
// wallet verification popup on button press
client.on(Events.InteractionCreate,async interaction=>{
if(!interaction.isButton()) return; // add person in verification queue
			await interaction.showModal(await getModal());
		});
		// event after wallet has been submitted
		client.on(Events.InteractionCreate,async interaction=>{
			if(!interaction.isModalSubmit()) return;
			await pvtReply(interaction,'Address submitted',false)
			// add this user in the verification queue
			verifyData(interaction,verificationQueue,db);
		});

	}
}

async function verifyData(interaction,verificationQueue,db){
	const user_tag = interaction.member.user.tag;
	const submittedAddress=interaction.fields.getTextInputValue('walletinput');
	const userStakeAddress=await getStakeAddress(submittedAddress);

	if(userStakeAddress=="invalid"){
		await pvtReply(interaction,'invalid address',true);
		return;
	}
	// add user in verification queue
	if(user_tag in verificationQueue){
		await pvtReply(interaction,'user already in verification queue',true);
		return;
	}
	verificationQueue[user_tag]="in progress";
	// checking uniqueness in database
	db.find({ $or : [{_id:user_tag},{stake_address:submittedAddress}]} , function (err,docs){
		if(docs.length>0){
			pvtReply(interaction,'Either the discord user or address is already verified',true);
			delete verificationQueue[user_tag];
		}
		else{
			var randomAmount=Math.random();
			randomAmount+=2;
			randomAmount=randomAmount.toFixed(6); 
			var callTime=Date.now(); // unix time			

			pvtReply(interaction,"Send "+randomAmount+" ADA from your wallet to the submitted address to start verification. This may take upto 30 minutes.",true);
			
			setTimeout( function (){
				verifyWallet(interaction,randomAmount,submittedAddress,verificationQueue,callTime)
			}
			, sleepTime ); /*30 minutes*/

			
		}
	});
}

async function verifyWallet(interaction,randomAmount,submittedAddress,verificationQueue,callTime){

	var transactions=await getTransactions(submittedAddress,callTime);
	console.log(transactions);
	

	
	return;

}


async function getTransactions(submittedAddress,callTime){
	var transactions=[]
	var page=1;
	var api=base_api+"addresses/"+submittedAddress+"/transactions?order=desc&page="+String(page);
	var response=await fetch(api,header);
	var brek=false;
	while(!brek){
		var json = await response.json();
		// an array of transaction objects
		if(json.length==0)
			brek=true;
		for(const transaction of json ){
			if(transaction['block_time']<callTime){
				brek=true;
				break;
			}
			
			transactions.push(transaction['tx_hash']);

		};
		page++;
		api=base_api+"addresses/"+submittedAddress+"/transactions?order=desc&page="+String(page);
		response=await fetch(api,header);
	}
	return transactions;
}
async function getBlock(){
	var api=base_api+"blocks/latest";
	const response=await fetch(api,header);
	return  (await response.json())["height"];
}

async function getStakeAddress(address){
	var api=base_api+"addresses/"+address;
	const response=await fetch(api,header);
	if(!response.ok){
		return "invalid";
	}
	var json=await response.json();
	

	return json['stake_address'];
}

async function pvtReply(interaction,text,followup){
	if(!followup)
		await interaction.reply({content:text,ephemeral:true});
	else
		await interaction.followUp({content:text,ephemeral:true});
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