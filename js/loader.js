

window.addEventListener('touchmove', function(e) { e.preventDefault(); });

window.addEventListener('resize', function(e) { initVar(); initCvs(); if (stage) { stage.renderBackground(); stage.render(); } })

// logs
var xp = null;

/*
Fonction s'executant en tout premier, servant d'initialisation,
de création des objets, de chargement des assets, de création des listener,
...
*/
function init() {
    console.log("init()");
	initVar();
	initCvs();
	initEvent();
	loadAssets();
}

/*
Fonction utilisant le preloader, chargant les assets imgs et sons
*/
function loadAssets()
{
    console.log("loading sounds...");
	// Chargement sound
	var sounds = new createjs.LoadQueue(false);
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
	sounds.installPlugin(createjs.Sound);
	createjs.Sound.alternateExtensions = ['mp3'];
    document.getElementById("bcSubtitle").innerHTML = "Chargement des sons...";
	sounds.addEventListener('complete', function() {
        // Chargement images
        console.log("loading graphics...");
	    images = new createjs.LoadQueue(false);
        document.getElementById("bcSubtitle").innerHTML = "Chargement des images...";
        images.addEventListener('complete', function() {
            menu.showTitleButtons();
            draw();
        });
        images.loadManifest(imagesManifest);        
        createjs.Sound.play("Collabots");
    });
	sounds.loadManifest(soundsManifest);
}

/*
initialise les variables globales
*/
function initVar()
{
	height = window.innerHeight;
	width  = window.innerWidth;    
    
	taillew = Math.floor(width / 2 / nb_case_width);
	tailleh = Math.floor(height / nb_case_height);

	// Taille police
	// document.body.style.fontSize = height * multiplicateurPolice + 'px';

	boolCommandsOk = true;
	}

/*
Initialise les canvas
*/
function initCvs()
{
	// Canvas
	cvs1	 = document.getElementById('cvs1').getContext('2d');
	cvs2	 = document.getElementById('cvs2').getContext('2d');
	cvs1Back = document.getElementById('cvs1_back').getContext('2d');
	cvs2Back = document.getElementById('cvs2_back').getContext('2d');

    var fullwidth = width/2;
    
    if (taillew > tailleh) 
        taillew = tailleh;
    else
        tailleh = taillew;
    
    height = tailleh * 7;
    width = taillew * 10;
    
    var left = fullwidth - width;
    
	// Set taille des canvas
	document.getElementById('cvs1_back').height = height;
	document.getElementById('cvs1_back').width  = (width / 2);
	cvs1Back.height								= height;
	cvs1Back.width								= width / 2;

	document.getElementById('cvs2_back').height = height;
	document.getElementById('cvs2_back').width  = (width / 2);
	cvs2Back.height								= height;
	cvs2Back.width								= width / 2;

	document.getElementById('cvs1').height = height;
	document.getElementById('cvs1').width  = (width / 2);
	cvs1.height							   = height;
	cvs1.width							   = width / 2;

	document.getElementById('cvs2').height = height;
	document.getElementById('cvs2').width  = (width / 2);
	cvs2.height							   = height;
	cvs2.width							   = width / 2;
}



/*
Fonction d'initialisation des evenements
*/
function initEvent()
{
	document.getElementById('boutonCommands1')
		.addEventListener('click', function(e) {
			menu.toggleCommands('j1commands');
			e.stopPropagation();
			e.preventDefault();
		});

	document.getElementById('boutonCommands2')
		.addEventListener('click', function(e) {
			menu.toggleCommands('j2commands');
			e.stopPropagation();
			e.preventDefault();
		});

	window.addEventListener('keyup', keyPush);

	// INIT DES EVENTS PICTO

	var pic1 = document.getElementsByClassName('pictoj1');
	for (var i = 0; i < pic1.length; ++i)
	{
		pic1[i].addEventListener('click', function(e) {
			changePictoToBeExec('gauche', this);
			e.stopPropagation();
			e.preventDefault();
		});
		}

	var pic2 = document.getElementsByClassName('pictoj2');

	for (var i = 0; i < pic2.length; ++i)
	{
		pic2[i].addEventListener('click', function(e) {
			changePictoToBeExec('droite', this);
			e.stopPropagation();
			e.preventDefault();
		});
	}

	// Bouton executer
	document.getElementById('boutonExec')
		.addEventListener('click', function(e) {
			computeIfYouCan();
			e.stopPropagation();
			e.preventDefault();
		});

	// Boutons annuler
	document.getElementById('cancel1').addEventListener('click', function(e) {
		cancelAction('gauche');
		e.stopPropagation();
		e.preventDefault();
	});
	document.getElementById('cancel2').addEventListener('click', function(e) {
		cancelAction('droite');
		e.stopPropagation();
		e.preventDefault();
	});

    // Bouton menu
	document.getElementById('menu_mobile')
		.addEventListener('click', function(e) {
			if (!boolCommandsOk) return;
            // log
            if (xp) xp.logRetourMenu();
            menu.showLevels();
			e.stopPropagation();
			e.preventDefault();
		});
    
    
    // messages 
    document.getElementById('bcMessages').onclick = function(e) {
       this.style.display = "none"; 
    };
    
}




/*
Fonction qui fait le rendu en fonction du navigateur, du systeme et des fps
*/
window.requestAnimFrame = (function() {     
    return window.requestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.oRequestAnimationFrame
 || window.msRequestAnimationFrame
 || null; 
})(); 


init();

