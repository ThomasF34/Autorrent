 const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
	handle($){
		$.sendMessage("Désolé je n'ai pas compris votre message");
		this.help($);
	}

	help($){
		$.sendMessage("Voici ce que je peux faire pour vous" +
		"\n /info Affiche les informations dont je dispose" +
		"\n /ip <ipAdress> Enregistre l'adrrese ip de votre raspberry / NAS" + 
		"\n /torrent <torrentName> Déclenche la recherche d'un torrrent" + 
		"\n /help Affice ce message d'aide" +
		"\n\n *Si vous avez entré l'adresse ip de votre raspberry / NAS :*"+
		"\n /status Permet de connaître le status des téléchargements", {parse_mode : "Markdown"});
	}

	get routes(){
		return{ 'helpCommand': "help"};
	}
}

module.exports = OtherwiseController;
