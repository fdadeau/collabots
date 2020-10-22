/*
Classe representant un couple de teleporteur, entrée et sortie

*/
function Teleporter(inCvs, inI, inJ, angleIn, outCvs, outI, outJ, angleOut, id)
{
	this.inCvs	= inCvs;
	this.inI	  = inI;
	this.inJ	  = inJ;
	this.angleIn  = angleIn;
	this.outCvs   = outCvs;
	this.outI	 = outI;
	this.outJ	 = outJ;
	this.angleOut = angleOut;
	this.id		  = id;
	this.time	 = Date.now();
	this.active   = true;
}

Teleporter.prototype.render = function() {
	var now	= Date.now();
	var deltaT = now - this.time;

	if (deltaT >= vitesseRotationTele)
	{
		this.time	= now;
		this.angleIn = this.angleOut = 0;
		}

	// Fait tourner si actif
	if (this.active)
	{
		var div = - 360 / vitesseRotationTele;
		// Pivote selon deltat
		this.angleIn  = div * deltaT;
		this.angleOut = div * deltaT;
	}

	// Affichage le teleporteur IN
	img = 'TIn' + this.id;
	img = images.getResult(img);
	affichageRotate(img, this.angleIn, this.inCvs, this.inI, this.inJ);

	// Affichage le teleporteur IOUT
	img = 'TOut' + this.id;
	img = images.getResult(img);
	affichageRotate(img, this.angleOut, this.outCvs, this.outI, this.outJ);
};



/*
Affiche dans le bon canvas, l'image pivotéé ou non
*/
function affichageRotateTeleporteur(img, angle, cote, i, j)
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
Metà jour les teleporteurs et les boites i besoin
@param boxes, lien vers les boites du niveau
*/
Teleporter.prototype.update = function(boxes) {
	// Regarde toutes les boites
	if (this.active)
	{
		var box, count = 0, len = boxes.length;
		for (count; count < len; count++)
		{
			box = boxes[count];
			if (box.cvs == this.inCvs && box.droped == true && box.i == this.inI &&
				box.j == this.inJ) // Si boite sur entre tele
			{
				// Si la sortie est libre
				var libre = true;

				// Si boite sur la sortie
				var box2, count2 = 0, len2 = boxes.length;
				for (count2; count2 < len2 && libre; count2++)
				{
					box2 = boxes[count2];
					if (box2.cvs == this.outCvs && box2.droped == true && box2.i == this.outI &&
						box2.j == this.outJ) // Si boite sur sortie tele
						libre = false;
					}

				// Si libre on deplace la box
				if (libre)
				{
					box.cvs		= this.outCvs;
					box.i		= this.outI;
					box.j		= this.outJ;
					this.active = false;
				}
			}
		}
	}
};

Teleporter.prototype.reset = function(l) {
	this.active = true;
};


