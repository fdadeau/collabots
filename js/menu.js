var menu = (function() {


    /**
     *  [Private]
     *  Displays the page whose id is given in parameter. Hides all the others. 
     */
    var showPage = function(bcID) {
        // all front pages share the same class name ("bcPage")
        var bcPages = document.getElementsByClassName("bcPage");
        for (var i=0; i < bcPages.length; i++) {
            bcPages[i].style.display = (bcPages[i].id == bcID) ? "block" : "none";
        }
    }
     
    
    /** 
     *  Shows the title screen
     */ 
    this.showTitle = function() {
        isPlaying = false;
        showPage("bcTitle");
    }
        
    /** 
     *  Shows the option screen
     */
    this.showOptions = function() {
        isPlaying = false;
        showPage("bcOptions");
        this.updateChoixOptions();
    }

    /** 
     *  Shows the level selection screen
     */
    this.showLevels = function() {
        isPlaying = false;
        this.generateLevelMenu(levels[this.getCurrentLevel()].groupe);
        showPage("bcLevels");
    }
    
    /** 
     *  Shows the board screen
     */
    this.showBoard = function() {
        showPage("bcBoard");        
    }
    
    /** 
     *  Shows the credit screen
     */
    this.showCredits = function() {
        showPage("bcCredits");
    }
    

    /*************************************************************************
     *                          UTILITARY FUNCTIONS
     *************************************************************************/
    
    /** 
     *  Displays the title buttons
     */
    this.showTitleButtons = function() {
        document.getElementById("bcSubtitle").innerHTML = 
            "<span class='button' onclick='menu.showLevels(); if (xp) { xp.logDebutPartie(); }'>Jouer</span>" + 
            "<span class='button' onclick='menu.showOptions()'>Options</span>" + 
            "<span class='button' onclick='menu.showCredits()'>Crédits</span>";
    }

    /**
     *  Loads the current level
     */
    this.loadLevel = function(i) {
        // log
        if (xp) xp.logChoixNiveau(i+1);
        if (stage == null || stage.level != i) {
            stage = new Stage(i);
            document.getElementById("j1commands").style.display = "none";
            document.getElementById("j2commands").style.display = "none";
        }
        isPlaying = 1;
        this.showBoard();
    }
    
    /** 
     *  Computes the current level
     */
    this.getCurrentLevel = function() {
        return (stage == null) ? 1 : stage.level;
    }
    
    
    /** 
     *  Show/hide the commands
     */
    this.toggleCommands = function(id) {
        if (document.getElementById(id).style.display == "block") {
            document.getElementById(id).style.display = "none";
            // log
            if (xp) xp.logFermeturePanneau(id.charAt(1));
        }
        else {
            document.getElementById(id).style.display = "block";
            // log
            if (xp) xp.logOuverturePanneau(id.charAt(1));
        }
    }
    
    /** Show/hide the current instructions panel */
    this.showCurrentInstructions = function(b) {
        document.getElementById("instructionCourante1").style.display = (b) ? "block" : "none";
        document.getElementById("instructionCourante2").style.display = (b) ? "block" : "none";
    }
    
    
    /** Computes the level page content */
    this.generateLevelMenu = function(g) {

        var niveau = this.getCurrentLevel();
        var groupe = g;
        
        var subtitles = ["Déplacements", "Barrières", "Objets", "Téléporteurs"];
        var cesure = [3, 3, 3, 3];
        
        // titre
        var html = "<img src='./assets/img/choix.png' id='choix'>"; //Choix du niveau</h2>";
        
        //html += "<h3>" + subtitles[groupe-1] + "</h3>";
        
        // flèches gauches/droites + contenu
        if (groupe > 1) {
            html += '<img id="flechePrecedent" src="./assets/img/fleche_left.png" class="fleche" onclick="menu.generateLevelMenu(' + (groupe-1) + ')">';
        }
        if (groupe < subtitles.length) {
            html += '<img id="flecheSuivant" src="./assets/img/fleche_right.png" class="fleche" onclick="menu.generateLevelMenu(' + (groupe+1) + ')">';
        }
        
        html += '<div id="levelContent">';

        var nb = 0;
        // liste des niveaux
        for (var i=0; i < levels.length; i++) {
            if (levels[i].groupe == groupe) {
                nb++;
                var note = localStorage.getItem("note_level" + (i));
                html += "<div class='iconeNiveau";
                if (!note) {
                    html += " grise";
                    note = 0;
                }
                html += "' onclick='menu.loadLevel(" + (i) + ")'>" 
                    + "<img src='./assets/img/levels_icons/" + (i+1) + ".png' class='numero'><br>"
                    + "<img src='./assets/img/etoile" + (note < 1 ? "Off" : "") + ".png' class='etoile'>"  
                    + "<img src='./assets/img/etoile" + (note < 2 ? "Off" : "") + ".png' class='etoile'>"  
                    + "<img src='./assets/img/etoile" + (note < 3 ? "Off" : "") + ".png' class='etoile'>"  
                    + "</div>";
                if (nb == cesure[groupe-1]) {
                    html += "<br>";
                }
            }
        }
        
        html += '</div>' +
                '<div id="retour" onclick="menu.showTitle(); if (xp) { xp.logFinPartie(); }">Retour</div>';
        document.getElementById("bcLevels").innerHTML = html;
    }
    
    
    /**
     *  Called when an option is selected from the "Options" page
     */
    this.choixOption = function(elt) {
        switch (elt.id) {
            case "optMusiqueOui": 
                activerMusique = true;
                music.play();
                break;
            case "optMusiqueNon": 
                activerMusique = false;
                music.pause();
                break;
            case "optBruitagesOui": 
                activerBruitages = true;
                break;
            case "optBruitagesNon": 
                activerBruitages = false;
                break;
            case "optConfig1": 
                rotatecvs2 = false;
                document.getElementById("j2").style.transform = "none";
                document.getElementById("j2").style.WebKitTransform = "none";
                break;
            case "optConfig2": 
                rotatecvs2 = true;
                document.getElementById("j2").style.transform = "rotate(180deg)";
                document.getElementById("j2").style.WebKitTransform = "rotate(180deg)";
                break;
        }
        this.updateChoixOptions();
    }
    
    /** 
     *  Updates the display of the "Options" page to show the current status of the options
     */
    this.updateChoixOptions = function() {
        if (activerMusique) {
            document.getElementById("optMusiqueOui").style.fontSize = "150%";
            document.getElementById("optMusiqueNon").style.fontSize = "100%";
        }
        else {
            document.getElementById("optMusiqueOui").style.fontSize = "100%";
            document.getElementById("optMusiqueNon").style.fontSize = "150%";
        }
        if (activerBruitages) {
            document.getElementById("optBruitagesOui").style.fontSize = "150%";
            document.getElementById("optBruitagesNon").style.fontSize = "100%";
        }
        else {
            document.getElementById("optBruitagesOui").style.fontSize = "100%";
            document.getElementById("optBruitagesNon").style.fontSize = "150%";
        }
        if (rotatecvs2) {
            document.getElementById("optConfig1").style.fontSize = "100%";
            document.getElementById("optConfig2").style.fontSize = "150%";
        }
        else {
            document.getElementById("optConfig1").style.fontSize = "150%";
            document.getElementById("optConfig2").style.fontSize = "100%";
        }
    }
    
    
    // returns the current object
    return this;
            
})();


