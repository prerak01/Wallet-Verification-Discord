
# LOGS

## Setup

1. init empty github file  *optional*
2. install discord.js
3. *optional* - add node_modules to .gitignore
4. make bot on discord website 
5. Making discord application
	- turn on developer mode
	- go to discord dev portal and make new app
	- add a bot & save its token
	- make a new server and make a channel called whale in it which should be private
	- make a new role called whale
6. Adding the bot to your server
	- go to ouath2 link generator
	- choose bot and applications.commands
		(+) choose the permissions that are needed by the bot
	- make invite link and add the bot to server
7. make a wallet verification channel
8. Add another user which would initially be unable to view the whale channel
9. **optional for security** -  add the token to a config file and add config file in .gitignore
10.
	- make channel read only for everyone
	- give the bot all permissions inside the channel

## Start Coding the bot

1. import the keys and required objects
2. on client ready, send a hello world to stdout, then iterate through all the guilds the bot is in
3. check for channel wallet_verification and send a message if not already sent

## Ideally be part 2 of the tutorial 

Assuming addresses to be shelley since stakeAddress  is used to identify unique addresses.
one wallet should only be associated with one discord account and vice versa.  

Ephemeral responses should be used for communication insteda of private threads  

Assumption that the user will be submitting the right address and not some mumbo jumbo.  


- install nedb and instantiate it
- make a new directory, add file for button interaction handling there
- after button interaction, a popup should come for user for wallet verification
- member should be added to verification queue on pressing verify button abd inputting the address
- On getting added to verification queue, following tests should take place for the modal submission
	- presence of user in queue
	- presence of user in database  
	**database documents will contain two fields = _id and address which will contain user tag and stakeAddress respectively**
	- presence of address in database - addresses will be  

- cardano stuff starts now, add your key in .config.json and import it in the project
- first tried AXIOS but it is terrible at handling error when requests fails so using node-fetch
- if address is invalid, exit else give the user 30 minutes to send transaction after display of random amount(upto 6 digits)
- wake up after 30 minutes and iterate through the user's transactions upto the block number when the program slept. doing this using unix time
- for transaction to be valid, all inputs should be from the same stake address and output should include the address to be checked with the appropriate lovelace in that address
	- there can be more than one output to that address but atleast one should have the specified amount output



## Optional part 3
- if both input and output condition valid, save in database and assign role (whale on > 100 ADA) depending on amount
- if failure only remove from queue
- send appropriate messages
- remove from queue  
- **video was getting too long**, so this part is going to focus on assigning whale tag to users
- at the end of the success function, another function needs to be added which would fetch balance of all the addresses of the user stake address and accordingly assign whale tag
- once whale tag is assigned, the user will have access to the whale only text room  