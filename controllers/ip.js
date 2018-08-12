const Telegram = require('telegram-node-bot');
const DAO = require('./db');

class IpController extends Telegram.TelegramBaseController {

    ip($){
        const id = $.message.from.id;
        let newIP = $.message.text.split(' ').slice(1).join(' ');

        DAO.getUserInfo(id).then(rows => {
            let ip = rows[0].ip;
            if(!!ip){
                $.sendMessage("Voici l'adresse que j'ai en mémoire : *"+ ip+ "*", {parseMode: 'Markdown'});
            }

            if(newIP === ""){
                $.sendMessage("J'ai pas d'adresse enregistrée et tu m'as pas donné d'adresse");
            } else {
                DAO.registerNewIP(id, newIP)
                    .then(
                        () => {$.sendMessage("J'ai enregistré ta nouvelle IP");},
                        () => { console.log("ERROR trying to register new IP")})
            }
        })
    }

	get routes(){
		return{ 'ipCommand': "ip"};
	}

}

module.exports = IpController;
