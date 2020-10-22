/*
Classe gérant les niveaux

@param level, le numéro du level
*/

function Stage(level)
{
	this.decal = 0;
	if (level >= levels.length)
	{
		console.log('!!! level ' + level + ' existe pas !!!');
        return;
	}
	this.level = level;
	var l	  = levels[level];

	// Copie de levels
	this.begin		   = JSON.parse(JSON.stringify(l.begin));
	this.end		   = JSON.parse(JSON.stringify(l.end));
	this.nbActionTotal = JSON.parse(JSON.stringify(l.nbActionTotal));
	this.messages	  = JSON.parse(JSON.stringify(l.messages));

	this.fondG = JSON.parse(JSON.stringify(l.gauche));
	this.fondD = JSON.parse(JSON.stringify(l.droite));

	this.botG = new Robot(
		new Array(this.begin[0][0], this.begin[0][1]), this.fondG, l.angle[0],
		1);
	this.botD = new Robot(
		new Array(this.begin[1][0], this.begin[1][1]), this.fondD, l.angle[1],
		2);
	this.time = Date.now();


	// Crée les elements de jeu, porte, boites, ...
	this.createElements(l);

	// Nettoie l'affichage
	this.cleanMessages();
	resetCommands();

	// Affiche premier message
	this.afficher(0);

	this.updateTeleporters(); // Met à jour les teleporteurs
	this.updateDuoPreDoor();  // Met à jours les plaques
	this.renderBackground();  // Fait un rendu du fond

    if (l.instructions) {
        // virage à droite
        document.getElementById("rotateRight1").style.visibility = (l.instructions.indexOf("rotateRight") >= 0) ? "visible" : "hidden";
        document.getElementById("rotateRight2").style.visibility = (l.instructions.indexOf("rotateRight") >= 0) ? "visible" : "hidden";
        // virage à gauche
        document.getElementById("rotateLeft1").style.visibility = (l.instructions.indexOf("rotateLeft") >= 0) ? "visible" : "hidden";
        document.getElementById("rotateLeft2").style.visibility = (l.instructions.indexOf("rotateLeft") >= 0) ? "visible" : "hidden";
        // attendre
        document.getElementById("rest1").style.visibility = (l.instructions.indexOf("rest") >= 0) ? "visible" : "hidden";
        document.getElementById("rest2").style.visibility = (l.instructions.indexOf("rest") >= 0) ? "visible" : "hidden";
        // ramasser
        document.getElementById("pick1").style.visibility = (l.instructions.indexOf("pick") >= 0) ? "visible" : "hidden";
        document.getElementById("pick2").style.visibility = (l.instructions.indexOf("pick") >= 0) ? "visible" : "hidden";
    }
    else {
        document.getElementById("rotateRight1").style.visibility = "visible";
        document.getElementById("rotateRight2").style.visibility = "visible";
        // virage à gauche
        document.getElementById("rotateLeft1").style.visibility = "visible";
        document.getElementById("rotateLeft2").style.visibility = "visible";
        // attendre
        document.getElementById("rest1").style.visibility = "visible";
        document.getElementById("rest2").style.visibility = "visible";
        // ramasser
        document.getElementById("pick1").style.visibility = "visible";
        document.getElementById("pick2").style.visibility = "visible";
    } 
        
	// menu_region = Math.floor(this.level / 5);
};

/*
Fait un unique rendu du background pour tout le niveau
*/
Stage.prototype.renderBackground = function() {
	// Efface tout
	cvs1Back.clearRect(0, 0, cvs1Back.width, cvs1Back.height);
	cvs2Back.clearRect(0, 0, cvs2Back.width, cvs2Back.height);

	// Affichage du fond -------------------
	for (var i = 0; i < nb_case_height; i++)
	{
		for (var j = 0; j < nb_case_width; j++)
		{
			if (this.fondG[i][j] != 0)
			{
				img = images.getResult('wall' + this.fondG[i][j]);
				affichageRotate(img, 0, 10, j, i);
				}

			if (this.fondD[i][j] != 0)
			{
				img = images.getResult('wall' + this.fondD[i][j]);
				affichageRotate(img, 0, 20, j, i);
			}
		}
	}

	// Affichage borne debut et fin
	// Debut
	img = images.getResult('begin1');
	affichageRotate(img, 0, 10, this.begin[0][1], this.begin[0][0]);
	img = images.getResult('begin2');
	affichageRotate(img, 0, 20, this.begin[1][1], this.begin[1][0]);

	// Fin
	img = images.getResult('end');
	affichageRotate(img, 0, 10, this.end[0][1], this.end[0][0]);
	affichageRotate(img, 0, 20, this.end[1][1], this.end[1][0]);
};

/*
Fonction qui vrifie si les deux robots sont sur la case de fin,
apres la fin de l'execution
*/
Stage.prototype.isFinish = function() {
	// Teste si robot sont sur leur position de fin
	if (this.botG.position[0] == this.end[0][0] &&
		this.botG.position[1] == this.end[0][1] &&
		this.botD.position[0] == this.end[1][0] &&
		this.botD.position[1] == this.end[1][1])
	{
		var note = this.finish();
        // log
        if (xp) xp.logFinExecution("OK","OK", note);
		}
    else 
	// Si botG arrivé mais pas botD
	if (this.botG.position[0] == this.end[0][0] &&
		this.botG.position[1] == this.end[0][1] &&
		(this.botD.position[0] != this.end[1][0] ||
		 this.botD.position[1] != this.end[1][1]))
	{
		this.afficherMessage(messageUnPasFini);
        // log
        if (xp) xp.logFinExecution("OK","KO");
		}
    else 
	// Si botD arrivé mais pas botG
	if (this.botD.position[0] == this.end[1][0] &&
		this.botD.position[1] == this.end[1][1] &&
		(this.botG.position[0] != this.end[0][0] ||
		 this.botG.position[1] != this.end[0][1]))
	{
		this.afficherMessage(messageUnPasFini);
        // log
        if (xp) xp.logFinExecution("KO","OK");
	}
    else {
        // log
        if (xp) xp.logFinExecution("KO","KO");
        this.reset();
    }
    
	clearInstructions(); // Efface les instructions
    
    // masque la barre au dessus
    menu.showCurrentInstructions(false);
    
	// Autorise la modification des ordres
	boolCommandsOk = true;
};

/*
Fonction en cas de victoire, calcul la note du niveau et la note dans le
localstorage
*/
Stage.prototype.finish = function() {
	boolCommandsOk = false;
	var note =
		(this.botG.toDo.length + this.botD.toDo.length) / this.nbActionTotal;

	if (note > 0 && note <= 1) {
		note = 3;
    }
	else if (note > 1 && note <= 1.5) {
		note = 2;
    }
	else {
        note = 1
    }
        
	localStorage.setItem('note_level' + this.level, note);

	// Joue un son suivant la note
	if (note == 3 && activerBruitages)
		createjs.Sound.play('succes1');
	else
		createjs.Sound.play('succes2');

	this.afficherMessageFin(note);
    
    return note;
};

/*
Fonction qui execute l'algoritme, reset
et appelle la fonction update qui se charge d'executer
*/
Stage.prototype.compute = function() {
	// Remet a zero position, angle, fond, boites, ...
	this.reset();
	// Ecrit dans le log les instructions
	this.log();
	// Et appelle la fonction apres temporisation
	window.setTimeout(function() { stage.update(); }, tempsEntreUpdate);
};

/*
Fonction qui reset, remet le fond de base,
l'angle et la position des robots à celle decrit dans le level
avec tous les objets
*/
Stage.prototype.reset = function() {
	var l = levels[this.level];
	// Fait des copies
	// Damier de fond
	this.fondG = JSON.parse(JSON.stringify(l.gauche));
	this.fondD = JSON.parse(JSON.stringify(l.droite));

	// Reset bots
	this.botG.reset(this.level);
	this.botD.reset(this.level);

	// Reset elements
	this.resetElements();
};

/*
Fonction qui execute l'algorithme en appellant les fonctions updates
des 2 bots, fait un rendu et se rappelle si besoin
*/
Stage.prototype.update = function() {
	// Interdit la modification des ordres
	boolCommandsOk = false;

	// Update les bots une fois sur 2
	if (this.decal == 0)
	{
		if (this.botG.isAlive)
			this.botG.update();
		}
	else
	{
		if (this.botD.isAlive)
			this.botD.update();
	}

	// Update les teleporteurs
	this.updateTeleporters();

	// Update les plaques et les barrieres
	this.updateDuoPreDoor();

	// Si apres avoir update bot G et D
	if (this.decal == 1)
	{
		// Procaine execution
		this.decal = (this.decal + 1) % 2;

		// Si il reste ordre et les deux bots vivants
		if ((this.botG.toDo.length > this.botG.pointeur ||
			 this.botD.toDo.length > this.botD.pointeur) &&
			this.botG.isAlive && this.botD.isAlive)
		{
			// On met a jour apres un délai
			window.setTimeout(function() { stage.update(); }, tempsEntreUpdate);
			}

		// Si les deux bots ont plus d'instruction ou que l'un des deux est mort
		if ((this.botG.toDo.length == this.botG.pointeur &&
			 this.botD.toDo.length == this.botD.pointeur) ||
			!this.botD.isAlive || !this.botG.isAlive)
		{
			// Test si fini apres temp
			window.setTimeout(function() {
				stage.isFinish();
			}, tempsEntreLevel / 2);
		}
		}
	else
	{
		// Appelle l'update pour mettre a jour le bot D
		this.decal = (this.decal + 1) % 2;
		window.setTimeout(function() { stage.update(); }, tempsDecalageBot);
	}
};

/*
Efface les canvas et réaffiche le fond, les bots, ...
Et appelles les fonction sd'affichage des bots
*/
Stage.prototype.render = function() {
	cptRender = (cptRender + 1) % 60;
	var img;
	// Calcule taille de chaque image

	// Clean les canvas
	cvs1.clearRect(0, 0, cvs1.width, cvs1.height);
	cvs2.clearRect(0, 0, cvs2.width, cvs2.height);

	// Teleporteurs
	this.teleporterRender();

	// Plaques pressions
	this.pressionRender();

	// Boites
	this.boxesRender();

	// Affichage des bots
	this.botG.render();
	this.botD.render();

	// Portes
	this.porteRender();
};


/*
Affiche les plaques et les portes
*/
Stage.prototype.teleporterRender = function() {
	if (this.teleporters)
	{
		var img, tele, count = 0, len = this.teleporters.length;
		for (count; count < len; count++)
		{
			this.teleporters[count].render();
		}
	}
};

/*
Crée les teleporteurs d'apres la description des niveaux

@param l, variable du level dans la config
*/
Stage.prototype.createElements = function(l) {
	var count, len;

	// Generation objet couple teleporteur
	if (l.teleporters)
	{
		len				 = l.teleporters.length;
		this.teleporters = new Array();
		for (count = 0; count < len; count++)
		{
			tele = l.teleporters[count];
			this.teleporters.push(new Teleporter(
				tele.inCvs, tele.inI, tele.inJ, tele.angleIn, tele.outCvs,
				tele.outI, tele.outJ, tele.angleOut, count + 1));
		}
		}

	// Generation objet des boites
	if (l.boxes)
	{
		len		   = l.boxes.length;
		this.boxes = new Array();
		for (count = 0; count < len; count++)
		{
			boxe = l.boxes[count];
			this.boxes.push(new Boxe(boxe.cvs, boxe.i, boxe.j, boxe.droped));
		}
		}

	// Generation objet duo pression door
	if (l.duoPreDoor)
	{
		len				= l.duoPreDoor.length;
		this.duoPreDoor = new Array();
		for (count = 0; count < len; count++)
		{
			duo = l.duoPreDoor[count];
			this.duoPreDoor.push(new DuoPreDoor(
				duo.pcvs, duo.pi, duo.pj, duo.pOn, duo.dcvs, duo.di, duo.dj,
				duo.dAngle, count + 1));
		}
	}
};

/*
Reset all elements
*/
Stage.prototype.resetElements = function() {
	var count, len, l = levels[this.level];

	// Generation objet couple teleporteur
	if (this.teleporters)
	{
		len = this.teleporters.length;
		for (count = 0; count < len; count++)
		{
			this.teleporters[count].reset(l);
		}
		}

	// Generation objet des boites
	if (this.boxes)
	{
		len = this.boxes.length;
		for (count = 0; count < len; count++)
		{
			this.boxes[count].reset(l.boxes[count]);
		}
		}

	// Generation objet duo pression door
	if (this.duoPreDoor)
	{
		len = this.duoPreDoor.length;
		for (count = 0; count < len; count++)
		{
            this.duoPreDoor[count].reset(l);
			//this.duoPreDoor[l.duoPreDoor[count]].reset(l);
		}
	}

};

/*
Met à jour les plaques de pression et les portes
*/
Stage.prototype.updateDuoPreDoor = function() {
	if (this.duoPreDoor)
	{
		// Parcourt tous les duo de plaque barriere
		var count = 0, len = this.duoPreDoor.length;
		for (count; count < len; count++)
		{
			if (this.boxes)
				(this.duoPreDoor[count])
					.update(this.botG, this.botD, this.boxes);
			else
				(this.duoPreDoor[count]).update(this.botG, this.botD);
		}
	}
};

/*
Affiche les plaques de pression
*/
Stage.prototype.pressionRender = function() {
	if (this.duoPreDoor)
	{
		var count = 0, len = this.duoPreDoor.length;
		for (count; count < len; count++)
		{
			this.duoPreDoor[count].pressionRender();
		}
	}
};

/*
Affiche les portes
*/
Stage.prototype.porteRender = function() {
	if (this.duoPreDoor)
	{
		var img, duo, count = 0, len = this.duoPreDoor.length;
		for (count; count < len; count++)
		{
			this.duoPreDoor[count].porteRender();
		}
	}
};


/*
Affiche les boites si sur le sol
*/
Stage.prototype.boxesRender = function() {
	// S'il y a des boites
	if (this.boxes)
	{
		var count = 0, len = this.boxes.length;
		// Parcourt les boites
		for (count; count < len; count++)
		{
			this.boxes[count].render();
		}
	}
};

/*
Met à jour les teleporteurs, transfere ou non les boites
*/
Stage.prototype.updateTeleporters = function() {
	if (this.teleporters && this.boxes)
	{
		// Regarde tous les teleporteurs
		var count = 0, len = this.teleporters.length;
		for (count; count < len; count++)
		{
			this.teleporters[count].update(this.boxes);
		}
	}
};

/*
Permet d'afficher un 'joli' message, le num_ieme effacable en cliquant
dessus
d'apres la description du level
@param num, numero du message a afficher
*/
Stage.prototype.afficher = function(num) {
	var l, t;
	// Si left pas definie = random
	var l = (this.messages[num].l == 'l') ?
				Math.floor(Math.random() * 70) + 10 + '%' :
				this.messages[num].l;

	// Si top pas defini = random
	var t = (this.messages[num].t == 't') ?
				Math.floor(Math.random() * 70) + 10 + '%' :
				this.messages[num].t;

    var mes = document.getElementById("message");
    
    mes.style.left = "50%";
    mes.style.top = "50%";   
    mes.innerHTML = this.messages[num].m;
    
	// Supprime le message et affiche le prochain s'il y a
	document.getElementById("bcMessages").onclick = function(e) {
		
        // Appelle fonction qui affiche prochain apres tempo
        if (num + 1 < levels[stage.level].messages.length) {
            //window.setTimeout(function() {            // closure retirée pour éviter les bugs inattendus d'affichage
                stage.afficher(num + 1);
            //}, levels[stage.level].messages[num].s);
        }
        else {
            document.getElementById("bcMessages").style.display = "none";
        }
	};
    
    document.getElementById("bcMessages").style.display = "block";
};

/*
Supprime tous les messages
*/
Stage.prototype.cleanMessages = function() {
	document.getElementById("bcMessages").style.display = "none";    
};

/*
Affiche un message position aleatoire effacable au clic
@param message, texte du message
*/
Stage.prototype.afficherMessage = function(message) {
	var l   = Math.floor(Math.random() * 60) + 10 + '%';
	var t   = Math.floor(Math.random() * 60) + 10 + '%';
	var mes = document.getElementById("message");
    mes.style.left = "50%";
	mes.style.top  = "50%";
    mes.innerHTML = message;
    
    document.getElementById("bcMessages").onclick = function(e) { this.style.display = "none"; stage.reset(); };
    
    document.getElementById("bcMessages").style.display = "block";
};

/*
Affiche le message de fin de niveau avec la note et sauvegarde le nombre d
etoile
@param note, note donnée pour la resolution du niveau
*/
Stage.prototype.afficherMessageFin = function(note) {
	// Création du message

	var mes = document.getElementById('message');
    var h = messageFinLevel 
        + "<p><img src='./assets/img/etoile" + (note < 1 ? "Off" : "") + ".png' class='etoile' style='width: 50px;'>"  
        + "<img src='./assets/img/etoile" + (note < 2 ? "Off" : "") + ".png' class='etoile' style='width: 50px;'>"  
        + "<img src='./assets/img/etoile" + (note < 3 ? "Off" : "") + ".png' class='etoile' style='width: 50px;'></p>"
        //+ "<p>" + messageNote[note - 1] + "</p>" 
        + "<p><img id='btnAgain' src='./assets/img/btnAgain.png' onclick='menu.loadLevel(" + this.level + ")'>";
    if (levels[this.level+1]) {
        h += "<img id='btnNext' src='./assets/img/btnNext.png' onclick='menu.loadLevel(" + (this.level+1) + ")'>";
    }
    h += "</p>";
    mes.innerHTML = h;
    document.getElementById("btnAgain").onclick = function(e) {
        e.stopImmediatePropagation();
        stage.reset();
        document.getElementById("bcMessages").style.display = "none";
    }.bind();
    document.getElementById("btnNext").onclick = function(e) {
        e.stopImmediatePropagation();
        menu.loadLevel(this.level+1);
    }.bind(this);
    document.getElementById("bcMessages").onclick = function(e) { };
    document.getElementById("bcMessages").style.display = "block";
    mes.style.left = "50%";
    mes.style.top = "50%";
};

/*
Ecrit dans le log les instructions saisies
*/
Stage.prototype.log = function() {
	/*
	var fileSystem = new ActiveXObject('Scripting.FileSystemObject');
	var monfichier = fileSystem.OpenTextFile('log.txt', 8, true);

	monfichier.WriteLine('Level ' + this.level + ':');
	monfichier.WriteLine(this.botG.toDo);
	monfichier.WriteLine(this.botD.toDo);
	*/
	var G = D = [];
	this.botD.toDo.forEach(function(e) {
		switch (e)
		{
		case 'avancer': D.push('↑'); break;
		case 'rotateRight': D.push('↷'); break;
		case 'rotateLeft': D.push('↶'); break;
		case 'pick': D.push('✋'); break;
		case 'rest': D.push('z'); break;
		}
	});
	this.botG.toDo.forEach(function(e) {
		switch (e)
		{
		case 'avancer': G.push('↑'); break;
		case 'rotateRight': G.push('↷'); break;
		case 'rotateLeft': G.push('↶'); break;
		case 'pick': G.push('✋'); break;
		case 'rest': G.push('z'); break;
		}
	});
	var str = 'Level ' + this.level + ':\nG:' + G + '\nD:' + D;
	// console.log(str);
};

