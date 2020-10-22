if (! String.prototype.includes) {
    String.prototype.includes = function(s) {
        return this.indexOf(s) >= 0;
    }
}


/*
Fonction pour gerer les actions en fonction des touches voir readme
@param key, touche pressée
*/
function keyPush(key)
{
    return;
    
	// Changement de niveau
	var num = key.code.startsWith('Numpad') || key.code.startsWith("Digit");
	if (num)
	{
		num = parseInt(key.code.substr(-1));
		if (num != stage.level)
			stage = new Stage(num);
		}
	switch (key.key)
	{
	case 'a': stage = new Stage(10); break;
	case 'z': stage = new Stage(11); break;
	case 'e': stage = new Stage(12); break;
	case 'r': stage = new Stage(13); break;
	case 't': stage = new Stage(14); break;
	case 'y': stage = new Stage(15); break;
	case 'u': stage = new Stage(16); break;
	case 'i': stage = new Stage(17); break;
	case 'o': stage = new Stage(18); break;
	case 'p': stage = new Stage(19); break;
	case 'Escape':
		document.getElementById('menu_principal').style.display = 'none';
		break;
	}
}

/*
Quand on clqiue sur une instruction ajoute l'instruction au robot
et à la pile d'affichage
@param joueur, joueur concerné
@param balise, indique quelle image a été cliqué
*/
function changePictoToBeExec(joueur, balise)
{
    if (!boolCommandsOk) 
        return;
    
	// joueur pour savoir si gauche ou droite
	var img = new Image();
	var src = balise.src;

	// determiner l'action a effectuer
	if (joueur == 'gauche')
	{
		img.src			 = src;
		img.className	= balise.className;
		
        document.getElementById('j1exec').appendChild(img);

		// ajouter la commande au tableau toDo du robot A FAIRE EN FONCTION DE
		// LA CLASSE
		if (balise.className.includes('avancer'))
		{
			stage.botG.toDo[stage.botG.sizeToDo] = 'avancer';
			stage.botG.sizeToDo++;
			}
		else if (balise.className.includes('rotateRight'))
		{
			stage.botG.toDo[stage.botG.sizeToDo] = 'rotateRight';
			stage.botG.sizeToDo++;
			}
		else if (balise.className.includes('rotateLeft'))
		{
			stage.botG.toDo[stage.botG.sizeToDo] = 'rotateLeft';
			stage.botG.sizeToDo++;
			}
		else if (balise.className.includes('rest'))
		{
			stage.botG.toDo[stage.botG.sizeToDo] = 'rest';
			stage.botG.sizeToDo++;
			}
		else if (balise.className.includes('pick'))
		{
			stage.botG.toDo[stage.botG.sizeToDo] = 'pick';
			stage.botG.sizeToDo++;
		}
		}
	if (joueur == 'droite')
	{
		img.src			 = src;
		img.className	= balise.className;
		
        document.getElementById('j2exec').appendChild(img);

		// ajouter la commande au tableau toDo du robot A FAIRE EN FONCTION DE
		// LA CLASSE
		if (balise.className.includes('avancer'))
		{
			stage.botD.toDo[stage.botD.sizeToDo] = 'avancer';
			stage.botD.sizeToDo++;
			}
		else if (balise.className.includes('rotateRight'))
		{
			stage.botD.toDo[stage.botD.sizeToDo] = 'rotateRight';
			stage.botD.sizeToDo++;
			}
		else if (balise.className.includes('rotateLeft'))
		{
			stage.botD.toDo[stage.botD.sizeToDo] = 'rotateLeft';
			stage.botD.sizeToDo++;
			}
		else if (balise.className.includes('rest'))
		{
			stage.botD.toDo[stage.botD.sizeToDo] = 'rest';
			stage.botD.sizeToDo++;
			}
		else if (balise.className.includes('pick'))
		{
			stage.botD.toDo[stage.botD.sizeToDo] = 'pick';
			stage.botD.sizeToDo++;
		}
	}
	}

/*
Supprime la derniere instruction
@param joueur, indique le joueur gauche ou droite
*/
function cancelAction(joueur)
{
    if (!boolCommandsOk) 
        return;

	if (joueur == 'gauche')
	{
		var div   = document.getElementById('j1exec');
		var toRmI = div.children[div.children.length - 1];
		if (div.children.length != 0)
		{
			div.removeChild(toRmI);

			if (stage.botG.sizeToDo > 0)
			{
				stage.botG.toDo.splice(stage.botG.sizeToDo - 1);
				stage.botG.sizeToDo -= 1;
			}
		}
		}
	else
	{
		var div   = document.getElementById('j2exec');
		var toRmI = div.children[div.children.length - 1];
		if (div.children.length != 0)
		{
			div.removeChild(toRmI);

			if (stage.botD.sizeToDo > 0)
			{
				stage.botD.toDo.splice(stage.botD.sizeToDo - 1);
				stage.botD.sizeToDo -= 1;
			}
		}
	}
	}

/*
Supprime toutes les instructions
*/
function resetCommands()
{
	var div1 = document.getElementById('j1exec');
	var div2 = document.getElementById('j2exec');


	while (div1.hasChildNodes())
	{
		div1.removeChild(div1.lastChild);
		}


	while (div2.hasChildNodes())
	{
		div2.removeChild(div2.lastChild);
	}
	}

/*
Supprimer toutes les instructions pour un coté
@param div, div à Supprimer
*/
function resetSomeChildren(div)
{
	while (div.hasChildNodes())
	{
		div.removeChild(div.lastChild);
	}
	}

/*
Verifie si on peut lancer l'execution ou non
*/
function computeIfYouCan()
{
    if (!boolCommandsOk) {
        return ;
    }
        
    if (stage.botD.toDo.length == 0 && stage.botG.toDo.length == 0) {
        return;
    }
        
    isPlaying = true;
    
    // log
    if (xp) xp.logDebutExecution();
    
    // ferme les zones de saisie
	if (document.getElementById('j1commands').style.display == "block")
		menu.toggleCommands('j1commands');
	if (document.getElementById('j2commands').style.display == "block")
        menu.toggleCommands('j2commands');
    // montre le bandeau avec les instructions
    menu.showCurrentInstructions(true);
    // lance l'exécution
	stage.compute();
    // bloque l'edition des commandes
	boolCommandsOk = false;
}

/*
Supprime les instructions affiches a l'ecran
*/
function clearInstructions()
{
	var tmp1 = document.getElementById('instructionCourante1');
	var tmp2 = document.getElementById('instructionCourante2');
	resetSomeChildren(tmp1);
	resetSomeChildren(tmp2);
	}

/*
Affiche les instructions
@param bot, lien vers le robot
*/
function afficherPiles(bot)
{
	var pile1 = [];

	var tmp1 = document.getElementById('instructionCourante1');
	var tmp2 = document.getElementById('instructionCourante2');

	var borneSup = 0;
	if (bot.cote == 1)
	{
		resetSomeChildren(tmp1);
		}
	else
	{
		resetSomeChildren(tmp2);
		}

	if (bot.toDo.length - bot.pointeur <= 4)
	{
		borneSup = bot.toDo.length - bot.pointeur;
		}
	else
	{
		borneSup = 4;
		}

	for (var i = bot.pointeur; i < bot.pointeur + borneSup; i++)
	{
		var img2 = new Image();

		if (bot.cote == 1)
		{
			switch (bot.toDo[i])
			{
			case 'avancer': pile1[i] = './assets/img/forward_red.png'; break;
			case 'rotateLeft':
				pile1[i] = './assets/img/rotate_left_red.png';
				break;
			case 'rotateRight':
				pile1[i] = './assets/img/rotate_right_red.png';
				break;
			case 'rest': pile1[i] = './assets/img/rest_red.png'; break;
			case 'pick': pile1[i] = './assets/img/pickup_red.png'; break;
			}
			img2.src = pile1[i];

			tmp1.appendChild(img2);
			}
		else
		{
			switch (bot.toDo[i])
			{
			case 'avancer': pile1[i] = './assets/img/forward_blue.png'; break;
			case 'rotateLeft':
				pile1[i] = './assets/img/rotate_left_blue.png';
				break;
			case 'rotateRight':
				pile1[i] = './assets/img/rotate_right_blue.png';
				break;
			case 'rest': pile1[i] = './assets/img/rest_blue.png'; break;
			case 'pick': pile1[i] = './assets/img/pickup_blue.png'; break;
			}
			img2.src = pile1[i];

			tmp2.appendChild(img2);
		}
		}

}

/*
Affiche dans le bon canvas, l'image pivotée ou non
*/
function affichageRotate(img, angle, cote, i, j)
{
    var cvs;
    switch (cote) {
        case 1: cvs = cvs1; break;
        case 2: cvs = cvs2; break;
        case 10: cvs = cvs1Back; angle = 0; break;
        case 20: cvs = cvs2Back; angle = 0; break;
    }

    var ratio = img.width / img.height;
    var angleR = angle * Math.PI / 180;
    
    if (angle == 0) {
        cvs.drawImage(img, 0, 0, img.width, img.height, i * taillew, j * tailleh, taillew, tailleh);
    }
    else {
        cvs.save();
		cvs.translate(i * taillew + taillew / 2, j * tailleh + tailleh / 2);
        cvs.rotate(angle * Math.PI / 180);
		cvs.drawImage(img, 0, 0, img.width, img.height, -taillew/2, -tailleh / 2, taillew, tailleh);
        cvs.restore();
    }
}


/*
Affiche une image en tenant compte de l'animation
*/
function affichageRotateAnimated(img, angle, cote, i, j, tx) {
	var sx = Math.floor(cptRender / Math.floor(fps / 5)) * tx;

    var cvs;
    
    switch (cote) {
        case 1: cvs = cvs1; break;
        case 2: cvs = cvs2; break;
    }
    
    if (angle == 0) {
        cvs.drawImage(img, sx, 0, tx, img.height, i * taillew, j * tailleh, taillew, tailleh);
    }
	else {
        cvs.save();
        cvs.translate(i * taillew + taillew / 2, j * tailleh + tailleh / 2);
        cvs.rotate(angle * Math.PI / 180);
        cvs.drawImage(img, sx, 0, tx, img.height, -taillew / 2, -tailleh / 2, taillew, tailleh);
        cvs.restore();
    }
}


/*
Fonction generant le rendu
 http://creativejs.com/resources/requestanimationframe/
*/
function draw()
{
	window.requestAnimFrame(draw);
	if (isPlaying) {
        stage.render();
    }
}



