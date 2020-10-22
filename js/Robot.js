/*
Classe Robot gérant un bot,

@param position, position sur le fond
@param fond, lien vers le fond du robot
@param angle, angle du robot
*/
function Robot(position, fond, angle, cote)
{
	this.cote	 = cote;	 // Cvs 1 ou 2
	this.position = position; // Position robot
	this.toDo	 = [];		  // Action à faire
	this.sizeToDo = 0;		  // nombre action
	this.pointeur = 0;		  // Pointeur instruction courante
	this.fond	 = fond;	 // Fond damier du robot

	this.angle	 = {ca: angle, ta: angle, st: 0}; // Angle
	this.state	 = 0;			   // 0:arret, 1: mouvement, 2:pivote
	this.vector	= {x: 0, y: 0}; // Vecteur de deplacement
	this.animation = {
		cX: Math.floor(this.position[1] * taillew + taillew / 2),
		cY: Math.floor(this.position[0] * tailleh + tailleh / 2),
		tX: Math.floor(this.position[1] * taillew + taillew / 2),
		tY: Math.floor(this.position[0] * tailleh + tailleh / 2),
		time: Date.now(),
		angle: 0,
		sens: 1
	};					  // Position de base
	this.hasBox  = false; // si a une boite
	this.isAlive = true;  // Si en vie
}

/*
Remet à zero le robot, la position, les angles, ...
*/
Robot.prototype.reset = function(level) {
	var bot = this.cote - 1;
	this.position =
		new Array(levels[level].begin[bot][0], levels[level].begin[bot][1]);
	this.pointeur	 = 0;
	this.state		  = 0;
	this.vector.x	 = 0;
	this.vector.y	 = 0;
	this.animation.cX = this.animation.tX =
		Math.floor(this.position[1] * taillew + taillew / 2);
	this.animation.cY = this.animation.tY =
		Math.floor(this.position[0] * tailleh + tailleh / 2);

	this.angle.ca = levels[level].angle[bot];
	this.angle.ta = levels[level].angle[bot];
	this.angle.st = 0;
	this.hasBox   = false;
	this.isAlive  = true;
};

/*
Appelle la fonction correspondante selon l'algorithme
*/
Robot.prototype.update = function() {
	afficherPiles(this);
	this.isAlive = !this.isOnDoorClosed();
	if (this.pointeur < this.toDo.length && this.isAlive)
	{
		var action = this.toDo[this.pointeur];

		// Appelle la bonne fonction d'apres le tableau des instructions
		switch (action)
		{
		case 'avancer': this.forward(); break;
		case 'rotateRight': this.rotateR(); break;
		case 'rotateLeft': this.rotateL(); break;
		case 'pick': this.pick(); break;
		}
		this.pointeur += 1;
	}
};

/*
Fait 'avancer' le robot, appelle la bonne fonction
d'apres l'angle
*/
Robot.prototype.forward = function() {
	// Appelle la bonne fonction d'apres l'angle
	switch (Math.floor(this.angle.ca / 90))
	{
	case 0: this.up(); break;
	case 1: this.right(); break;
	case 2: this.down(); break;
	case 3: this.left(); break;
	}
};

/*
Deplace le robot d'une case vers le haut si possible
*/
Robot.prototype.up = function() {
	// Test
	// Trop haut
	if (this.position[0] <= 0)
		return;

	// Vide
	var newPos = [this.position[0] - 1, this.position[1]];
	if (this.fond[newPos[0]][newPos[1]] == 0)
		return;

	// Si va vers sur porte fermée
	this.isOnDoorClosed(newPos);

	// Okay
	this.position		= newPos;
	this.state			= 1;
	this.animation.tY   = this.animation.cY - tailleh;
	this.vector.x		= 0;
	this.vector.y		= -1;
	this.animation.time = Date.now();
	if (activerBruitages)
	{
		createjs.Sound.play('forward');
	}
};

/*
Deplace le robot d'une case vers la droite si possible
*/
Robot.prototype.right = function() {
	// Test
	// Trop droite
	if (this.position[1] == nb_case_width - 1)
		return;

	// Vide
	var newPos = [this.position[0], this.position[1] + 1];
	if (this.fond[newPos[0]][newPos[1]] == 0)
		return;

	// Si va vers sur porte fermée
	this.isOnDoorClosed(newPos);

	this.position		= newPos;
	this.state			= 1;
	this.animation.tX   = this.animation.cX + taillew;
	this.vector.x		= 1;
	this.vector.y		= 0;
	this.animation.time = Date.now();
	if (activerBruitages)
	{
		createjs.Sound.play('forward');
	}
};

/*
Deplace le robot d'une case vers le bas si possible
*/
Robot.prototype.down = function() {
	// Test
	// Trop bas
	if (this.position[0] == nb_case_height - 1)
		return;

	// Case vide
	var newPos = [this.position[0] + 1, this.position[1]];
	if (this.fond[newPos[0]][newPos[1]] == 0)
		return;

	// Si va vers sur porte fermée
	this.isOnDoorClosed(newPos);

	// Okay
	this.position		= newPos;
	this.state			= 1;
	this.animation.tY   = this.animation.cY + tailleh;
	this.vector.x		= 0;
	this.vector.y		= 1;
	this.animation.time = Date.now();
	if (activerBruitages)
	{
		createjs.Sound.play('forward');
	}
};

/*
Deplace le robot d'une case vers la gauche si possible
*/
Robot.prototype.left = function() {
	// Test
	// Trop gauche
	if (this.position[1] == 0)
		return;

	// Vide
	var newPos = [this.position[0], this.position[1] - 1];
	if (this.fond[newPos[0]][newPos[1]] == 0)
		return;

	// Si va vers sur porte fermée
	this.isOnDoorClosed(newPos);

	this.position		= newPos;
	this.state			= 1;
	this.animation.tX   = this.animation.tX - taillew;
	this.vector.x		= -1;
	this.vector.y		= 0;
	this.animation.time = Date.now();
	if (activerBruitages)
	{
		createjs.Sound.play('forward');
	}
};

/*
Pivote vers la gauche
*/
Robot.prototype.rotateL = function() {
	if (activerBruitages)
	{
		createjs.Sound.play('rotate');
	}
	this.state			= 2;
	this.angle.ta		= (this.angle.ta + 270) % 360;
	this.angle.st		= 'L';
	this.animation.time = Date.now();
};

/*
Pivote vers la droite
*/
Robot.prototype.rotateR = function() {
	if (activerBruitages)
	{
		createjs.Sound.play('rotate');
	}
	this.state			= 2;
	this.angle.ta		= (this.angle.ta + 90) % 360;
	this.angle.st		= 'R';
	this.animation.time = Date.now();
};

/*
Attrape la boite si le bot est sur une boite
et depose s'il en a une sur lui
*/
Robot.prototype.pick = function() {
	// Si le niveau contient des boites
	if (stage.boxes)
	{
		// Si a pas deja une boite
		if (!this.hasBox)
		{
			var box, count = 0, len = stage.boxes.length;
			// On teste pour toutes les boites
			for (count; count < len; count++)
			{
				box = stage.boxes[count];
				// Si bot sur une boite au sol
				if (box.cvs == this.cote && box.i == this.position[1] &&
					box.j == this.position[0] && box.droped == true)
				{
					// Boite dans le robot
					this.hasBox = box;
					// Boite plus au sol
					box.droped = false;
				}
			}
			}
		else // Si a deja une boite
		{
			var box, count = 0, len = stage.boxes.length;
			// On teste pour toutes les boites
			// si pas deja boite sur la case au sol
			for (count; count < len; count++)
			{
				box = stage.boxes[count];
				if (box.cvs == this.cote && box.i == this.position[1] &&
					box.j == this.position[0] && box.droped == true)
					return;
			}

			// Si libre
			this.hasBox.droped = true;			   // Boite au sol
			this.hasBox.i	  = this.position[1]; // Boite pos du bot
			this.hasBox.j	  = this.position[0];
			this.hasBox		   = false; // Bot plus de boite
		}
	}
};

/*
Affiche le robot selon les coordonnées et l'angle et gere l'animation
*/
Robot.prototype.render = function() {
	// Si bot arrivé position
	if (this.state > 0 && (Date.now() - this.animation.time) >= vitesseBot)
	{
		this.state			 = 0;
		this.vector.x		 = 0;
		this.vector.y		 = 0;
		this.animation.cX	= this.animation.tX;
		this.animation.cY	= this.animation.tY;
		this.animation.angle = 0;
		this.angle.ca		 = this.angle.ta;
		this.angle.st		 = 0;
		}

	// Si en mouvement modifie position
	if (this.state == 1)
	{
		var now	= Date.now();
		var deltaT = vitesseBot - (now - this.animation.time);
		var div;
		if (this.vector.x != 0)
		{
			div = taillew / vitesseBot;
			this.animation.cX =
				Math.floor(this.animation.tX - (this.vector.x * div * deltaT));
			}

		if (this.vector.y != 0)
		{
			div = tailleh / vitesseBot;
			this.animation.cY =
				Math.floor(this.animation.tY - (this.vector.y * div * deltaT));
			}

		var nbDandine = 2; // NE PAS CHANGER

		deltaT	= now - this.animation.time;
		div		  = angleDandine * 2 * nbDandine / vitesseBot;
		var total = deltaT * div;
		var util  = (total % (angleDandine * 2 * nbDandine));

		//[0, 20[
		if (util >= 0 && util <= angleDandine)
		{
			this.animation.angle = util;
			}
		// [20, 40[
		else if (util > angleDandine && util <= angleDandine * 2)
		{
			this.animation.angle = angleDandine - (util - angleDandine);
			}
		//[40, 60[
		else if (util > angleDandine * 2 && util <= angleDandine * 3)
		{
			this.animation.angle = (util - angleDandine * 2) * -1;
			}
		//[60, 80[
		else
		{
			this.animation.angle = ((angleDandine * 4) - util) * -1;
		}
		// console.log(this.animation.angle);
		// console.log('util' + util + ' div' + div + ' total' + total);
		// console.log(total);
		}

	// Si pivote modifie angle
	if (this.state == 2)
	{
		var deltaT = vitesseBot - (Date.now() - this.animation.time);
		var div	= 90 / vitesseBot;
		// console.log(deltaT);
		if (this.angle.st == 'R')
		{
			this.angle.ca = (this.angle.ta - (deltaT * div)) % 360;
			}
		if (this.angle.st == 'L')
		{
			this.angle.ca = (this.angle.ta + (deltaT * div)) % 360;
		}
		}

	if (this.isAlive)
	{
		// Image
		var bot2image;
		if (this.sizeToDo != 0 && this.toDo[this.pointeur] != null)
		{
			bot2image = this.chooseImageResult(this.toDo[this.pointeur]);
			}
		else
		{
			bot2image = (this.cote == '1') ? 'bot1' : 'bot2';
			if (this.hasBox != false)
				bot2image += 'box';
		}
		img = images.getResult(bot2image);
		}
	else
	{
		img = images.getResult('explosion');
		}

	// Affichage
	if (this.cote == 1)
	{
		cvs1.save();
		cvs1.translate(this.animation.cX, this.animation.cY);
		cvs1.rotate((this.angle.ca + this.animation.angle) * Math.PI / 180);
		cvs1.drawImage(
			img, 0, 0, img.width, img.height, -taillew / 2, -tailleh / 2,
			taillew, tailleh);
		cvs1.restore();
		}
	else
	{
		cvs2.save();
		cvs2.translate(this.animation.cX, this.animation.cY);
		cvs2.rotate((this.angle.ca + this.animation.angle) * Math.PI / 180);
		cvs2.drawImage(
			img, 0, 0, img.width, img.height, -taillew / 2, -tailleh / 2,
			taillew, tailleh);
		cvs2.restore();
	}
};

/*
Fonction qui choisi la bonne image d'apres l'action à executer
*/
Robot.prototype.chooseImageResult = function() {
	var toReturn = 'bot' + this.cote;
	if (this.hasBox != false)
		toReturn += 'box';

	return toReturn;
};

/*
Teste si va sur une porte ou si est sur une porte
@param newPos, optionnel nouvelle position
*/
Robot.prototype.isOnDoorClosed = function(newPos) {
	// Si on teste pas sur une nouvelle position
	// On teste sur la position actuelle
	if (newPos === undefined)
		newPos = this.position;

	if (levels[stage.level].duoPreDoor)
	{
		var img, duo, count = 0, len = stage.duoPreDoor.length;
		for (count; count < len; count++)
		{
			duo = stage.duoPreDoor[count];

			if (duo.dcvs == this.cote && newPos[0] == duo.dj &&
				newPos[1] == duo.di && duo.pOn == 0)
			{
                setTimeout(function() {
                    //stage.afficherMessage(messageExplosion);
				    this.isAlive = false;
				    if (activerBruitages) {
					   createjs.Sound.play('explosion');
					}
                }.bind(this), vitesseBot / 2);
				return true;
			}
		}
		}
	return false;
}

Robot.prototype.killRobot = function() {
    this.isAlive = false;
    
}



