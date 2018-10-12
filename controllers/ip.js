const Telegram = require('telegram-node-bot');
const DAO = require('./db');

class IpController extends Telegram.TelegramBaseController {

    ip($){
        const id = $.message.from.id;
        let newIP = $.message.text.split(' ').slice(1).join(' ');

        if(newIP === ""){
		$.sendMessage("Merci de me donner une adresse IP à enregistrer ! Exemple d'utilisation : /ip 127.0.0.1 ");
	} else {
		DAO.registerNewIP(id, newIP).then(
                        () => {$.sendMessage("J'ai bien enregistré ton adresse IP");},
                        () => { 
				console.log("ERROR trying to register new IP"); 
				$.sendMessage("Suite à un incident technique, je n'ai pas pu enregistrer ta nouvelle adresse IP");
			})
	}
    }

    info($){
        const id = $.message.from.id;
	DAO.getUserInfo(id).then(rows => {
            let ip = rows[0].ip;
            if(!!ip){
                $.sendMessage("Voici l'adresse que j'ai en mémoire : *"+ ip+ "*", {parse_mode: "Markdown"});
            } else {
	    	$.sendMessage("Je n'ai aucune adresse IP enregistrée. Utilise la fonction ```/ip <ipAdresse>``` pour que je puisse l'enregistrer", {parse_mode:"Markdown"})
	    }
	})
    }
    
    get routes(){
	return{ 'ipCommand': "ip", 'infoCommand': "info"};
    }

}

module.exports = IpController;
