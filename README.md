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
10. **PENDING**
	- what permissions should be there for the verify_wallet channel

## Start Coding the bot

1. import the keys and required objects
2. on client ready, send a hello world to stdout, then iterate through all the guilds the bot is in
3. check for channel wallet_verification and send a message if not already sent