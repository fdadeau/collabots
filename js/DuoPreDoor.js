/*
Classe gérant les duo de plaque pression et portes
*/
function DuoPreDoor(pcvs, pi, pj, pOn, dcvs, di, dj, dAngle, id)
{
	this.pcvs   = pcvs;
	this.pi		= pi;
	this.pj		= pj;
	this.pOn	= pOn;
	this.dcvs   = dcvs;
	this.di		= di;
	this.dj		= dj;
	this.dAngle = dAngle;
	this.id		= id;
}

DuoPreDoor.prototype.pressionRender = function() {
	// Plaque
	// Choix img porte ouverte/fermer
	var nam = 'plaque' + this.id;
	if (this.pOn)
		img = images.getResult(nam + 'On');
	else
		img = images.getResult(nam + 'Off');

	// Affichage sur le bon canvas
	affichageRotate(img, 0, this.pcvs, this.pi, this.pj);
};

DuoPreDoor.prototype.porteRender = function() {
	// Porte
	// Choix img porte ouverte/fermer
	var nam = 'porte' + this.id;
	if (this.pOn)
	{
		img = images.getResult(nam + 'Close');
		affichageRotate(img, this.dAngle, this.dcvs, this.di, this.dj);
		}
	else
	{
		img = images.getResult(nam + 'Open');
		affichageRotateAnimated(img, this.dAngle, this.dcvs, this.di, this.dj, img.width / 5);
	}
};

DuoPreDoor.prototype.update = function(botG, botD, boxes) {
	// Si bot sur la plaque
	if (this.pcvs == 1)
	{
		this.pOn = (botG.position[1] == this.pi && botG.position[0] == this.pj);
		}
	else
	{
		this.pOn = (botD.position[1] == this.pi && botD.position[0] == this.pj);
		}

	// Si niveau contient boites
	if (boxes)
	{
		// Si box sur une plaque, on teste pour toutes
		// les plaques
		var box, count = 0, len = boxes.length;
		for (count; count < len; count++)
		{
			box = boxes[count];
			this.pOn |= (box.droped && this.pcvs == box.cvs && this.pi == box.i && this.pj == box.j)
		}
	}
};

DuoPreDoor.prototype.reset = function(l) {
	this.pOn = l.pOn;
};

