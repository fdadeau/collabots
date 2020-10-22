/*
Classe gerant les boites

*/

function Boxe(cvs, i, j, droped)
{
	this.cvs	= cvs;
	this.i		= i;
	this.j		= j;
	this.droped = droped;
}

Boxe.prototype.render = function() {
	// Affiche la boite si elle est au sol
	if (this.droped)
	{
		var img = images.getResult('box');
		affichageRotate(img, 0, this.cvs, this.i, this.j);
	}
};

Boxe.prototype.reset = function(l) {
	this.cvs	= l.cvs;
	this.i		= l.i;
	this.j		= l.j;
	this.droped = l.droped;
}


