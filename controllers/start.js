const Telegram = require('telegram-node-bot');
const DAO = require('./db');

class StartController extends Telegram.TelegramBaseController {

	starting($){

	    const id = $.message.from.id;
	    console.log(id + " commence une conversation");

	    let message = "Salut " + $.message.from.firstName +"\n";

	    DAO.getUserInfo(id).then(rows => {
            if(rows.length > 0){
                let ip = rows[0].ip;
                if(!!ip){
                    message += "Je te connais bien toi. L'IP sur laquelle je lance les torrents est *"+ip+"*";
                } else {
                    message += "Je te connais deja mais je n'ai pas ton IP";
                }
            } else {
                message += "Je m'appelle Autorrent et je suis là pour t'aider à télécharger des torrents à distance ! \nPour ça j'ai besoin de l'IP de ton rasp ou de ton NAS. " +
                    "Utilise la commande /ip suivi de *l'adresse IP de ton raspberry* pour que je puisse l'enregistrer. Ainsi je pourrais y accéder et lancer le téléchargement des torrents automatiquement";
                DAO.createUser(id);
            }

            $.sendMessage(message, {parse_mode : 'Markdown'});
        });


    }

	get routes(){
		return{ 'startCommand': "starting"};
	}

}

module.exports = StartController;
