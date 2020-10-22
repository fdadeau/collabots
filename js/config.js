/*
Fichier décrivant les niveaux, les variables globales, ...
On a un tableau d'objet, chaque objet décrivant un nuveau
*/
var levels = [
	{
	  // 0 Avancer
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[5, 2], [5, 2]],
	  // Position de fin des bots
	  end: [[1, 2], [1, 2]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
          {m: 'Level 1'},
		  {m: 'Drive each robot to its destination.', l: '60%', t: '60%', s: 500},
		  {
			m: 'To program your robot, use the <img src="./assets/img/gear_red.png" class="icone"> icon.',
			l: '20%',
			t: '40%',
			s: 1500
		  },
		  {
			m: 'To make your robot go forward, use the <img src="./assets/img/forward_red.png" class="icone"> icon.',
			l: '10%',
			t: 't'
		  },
		  {
			m: 'In case of error, use the <img src="./assets/img/undo_red.png" class="icone"> icon to erase.',
			l: '10%',
			t: 't'
		  },
		  {
			m: 'To run the program, press the <img src="./assets/img/launch.png" class="icone"> button.',
			l: '10%',
			t: 't'
		  },
		  {m: 'Let\'s go!', l: 'l', t: 't', s: 500}
	  ],
	  // Nombre d'actions pour reussir parfaitement
	  nbActionTotal: 8, 
      // instructions disponibles
      instructions: ['avancer'],
      groupe: 1
	},
	{
	  // 1 Avancer tourner
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 3, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0],
		  [0, 3, 1, 2, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0]
	  ],
	  droite: [
		  [0, 0, 0, 0, 0], [0, 1, 1, 2, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0],
		  [0, 3, 1, 2, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0]
	  ],
	  begin: [[6, 3], [6, 1]],
	  end: [[1, 3], [1, 1]],
	  angle: [0, 0],
	  messages: [
		  {m: 'Level 2', l: '42%', t: '40%', s: 1000},
		  {m: 'Time to turn!', l: 'l', t: 't', s: 1500},
		  {m: 'Use icon <img src="./assets/img/rotate_right_red.png" class="icone"> to perform a quarter turn to the right.', l: 'l', t: 't', s: 1500},
		  {m: 'Use icon <img src="./assets/img/rotate_left_red.png" class="icone"> to perform a quarter turn to the left.', l: 'l', t: 't', s: 1500},
		  {m: 'Warning: the robot remains on its cell to turn.', l: 'l', t: 't', s: 1500},
		  {m: 'The patterns on the floor are here to help you.', l: 'l', t: 't'},
		  {m: 'Let\'s go!', l: 'l', t: 't'}
	  ],
	  nbActionTotal: 24, 
      // instructions disponibles
      instructions: ['avancer','rotateLeft','rotateRight'],
      groupe: 1
	},
	{
	  // 2 Avancer tourner changement de vue
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0],
		  [0, 3, 1, 3, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  droite: [
		  [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0],
		  [0, 2, 1, 2, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  begin: [[1, 3], [1, 1]],
	  end: [[1, 1], [1, 3]],
	  angle: [180, 180],
	  messages: [{m: 'Level 3', l: '40%', t: '40%'}],
	  nbActionTotal: 20, 
      instructions: ['avancer','rotateLeft','rotateRight'],
      groupe: 1
	},
	{
	  // 3 Avancer tourner compter
	  gauche: [
		  [3, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [3, 1, 1, 2, 0],
		  [0, 0, 0, 1, 0], [0, 3, 1, 2, 0], [0, 1, 0, 0, 0]
	  ],
	  droite: [
		  [0, 1, 1, 1, 2], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 3, 1, 1, 2],
		  [0, 1, 0, 0, 0], [0, 3, 1, 2, 0], [0, 0, 0, 1, 0]
	  ],
	  begin: [[6, 1], [6, 3]],
	  end: [[0, 3], [0, 1]],
	  angle: [0, 0],
	  messages: [{m: 'Level 4', l: '40%', t: '40%'}],
      instructions: ['avancer','rotateLeft','rotateRight'],
	  nbActionTotal: 38, 
      groupe: 1
	},
	{
	  // 4 Avancer tourner compter changement de vue
	  gauche: [
		  [0, 0, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 1, 0, 0], [1, 0, 3, 1, 2],
		  [1, 0, 0, 0, 1], [2, 1, 1, 1, 2], [0, 0, 0, 0, 0]
	  ],
	  droite: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 1], [0, 0, 1, 0, 1], [3, 1, 2, 0, 1],
		  [1, 0, 0, 0, 1], [3, 1, 1, 1, 3], [0, 0, 0, 0, 0]
	  ],
	  begin: [[1, 0], [1, 4]],
	  end: [[1, 2], [1, 2]],
	  angle: [180, 180],
	  messages: [{m: 'Level 5', l: '40%', t: '40%'}],
	  instructions: ['avancer','rotateLeft','rotateRight'],
	  nbActionTotal: 36, 
      groupe: 1
	},
	{
	  // 5 plaque porte
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[5, 2], [5, 2]],
	  // Position de fin des bots
	  end: [[1, 2], [1, 2]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [ 
          {m: 'Level 6', l: '40%', t: '40%'},
          {m: 'Electric barriers can be deactivated by placing a robot on the switch with the same color.', l: '40%', t: '40%'},
          {m: 'Icon <img src="./assets/img/rest_red.png" class="icone"> lets the robot still for a round.', l: '40%', t: '40%'}
      
      ],
	  duoPreDoor:
		  [{pcvs: 2, pi: 2, pj: 4, pOn: 0, dcvs: 1, di: 2, dj: 3, dAngle: 0}],
	  instructions: ['avancer','rotateLeft','rotateRight','rest'],
	  nbActionTotal: 11, 
      groupe: 2
	},
	{
	  // 6 2 plaques portes fluide
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 1, 1, 2, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0],
		  [1, 1, 1, 2, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 3, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0],
		  [0, 3, 1, 2, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[4, 0], [5, 3]],
	  // Position de fin des bots
	  end: [[1, 1], [1, 3]],
	  // Angle de depart
	  angle: [90, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 7', l: '35%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 1, pi: 3, pj: 4, pOn: 0, dcvs: 2, di: 2, dj: 4, dAngle: 90},
		  {pcvs: 2, pi: 1, pj: 1, pOn: 0, dcvs: 1, di: 2, dj: 1, dAngle: 90}
	  ],
	  nbActionTotal: 21, 
      instructions: ['avancer','rotateLeft','rotateRight','rest'],
	  groupe: 2
	},
	{
	  // 7 2 plaques portes
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 1, 2, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 3, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0],
		  [0, 3, 1, 2, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[5, 2], [5, 3]],
	  // Position de fin des bots
	  end: [[1, 1], [1, 3]],
	  // Angle de depart
	  angle: [00, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 8', l: '40%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 1, pi: 2, pj: 4, pOn: 0, dcvs: 2, di: 3, dj: 4, dAngle: 135},
		  {pcvs: 2, pi: 1, pj: 3, pOn: 0, dcvs: 1, di: 2, dj: 1, dAngle: 135}
	  ],
	  nbActionTotal: 22, 
      instructions: ['avancer','rotateLeft','rotateRight','rest'],
	  groupe: 2
	},
	{
	  // 8 Dance Revolution
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0], [0, 0, 1, 0, 0],
		  [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0],
		  [0, 0, 0, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[2, 2], [1, 3]],
	  // Position de fin des bots
	  end: [[1, 2], [5, 1]],
	  // Angle de depart
	  angle: [180, 270],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
		  {m: 'Level 9', l: '40%', t: '40%', s: 1000},
		  {m: 'Dance Revolution !!', l: 'l', t: 't'}
	  ],
	  duoPreDoor: [
		  {pcvs: 1, pi: 1, pj: 2, pOn: 0, dcvs: 2, di: 1, dj: 1, dAngle: 225},
		  {pcvs: 1, pi: 3, pj: 2, pOn: 0, dcvs: 2, di: 2, dj: 3, dAngle: 90},
		  {pcvs: 1, pi: 2, pj: 3, pOn: 0, dcvs: 2, di: 3, dj: 5, dAngle: 135}
	  ],
	  nbActionTotal: 38, 
      instructions: ['avancer','rotateLeft','rotateRight','rest'],
	  groupe: 2
	},
	{
	  // 9 3 portes + choix
	  // Canvas gauche
	  gauche: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0],
		  [0, 1, 0, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[0, 2], [6, 2]],
	  // Position de fin des bots
	  end: [[5, 2], [1, 2]],
	  // Angle de depart
	  angle: [180, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 10', l: '40%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 2, pi: 2, pj: 4, pOn: 0, dcvs: 1, di: 2, dj: 3, dAngle: 0},
		  {pcvs: 1, pi: 1, pj: 5, pOn: 0, dcvs: 2, di: 3, dj: 2, dAngle: 0},
		  {pcvs: 1, pi: 3, pj: 5, pOn: 0, dcvs: 2, di: 1, dj: 2, dAngle: 0}
	  ],
	  instructions: ['avancer','rotateLeft','rotateRight','rest'],
	  nbActionTotal: 33, 
      groupe: 2
	},
	{
	  // 10 boit + plaque
	  // Canvas gauche
	  gauche: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[0, 2], [6, 2]],
	  // Position de fin des bots
	  end: [[6, 2], [0, 2]],
	  // Angle de depart
	  angle: [180, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
		  {m: 'Level 11', l: '40%', t: '40%', s: 1000},
		  {m: 'You can pick up boxes...', l: 'l', t: 't', s: 1000},
		  {m: 'and drop them on plates to unlock barriers.', l: 'l', t: 't', s: 1000},
		  {m: 'With instruction <img src="./assets/img/pickup_red.png" class="icone"> the robot can pick up/drop the box on its current cell.', l: 'l', t: 't', s: 1000}
	  ],
	  duoPreDoor: [
		  {pcvs: 1, pi: 2, pj: 2, pOn: 0, dcvs: 1, di: 2, dj: 4, dAngle: 0},
		  {pcvs: 2, pi: 2, pj: 4, pOn: 0, dcvs: 2, di: 2, dj: 2, dAngle: 0},
	  ],
	  boxes: [
		  {cvs: 1, i: 2, j: 1, droped: true},
		  {cvs: 2, i: 2, j: 5, droped: true}
	  ],
	  nbActionTotal: 16, 
      groupe: 3
	},
	{
	  // 11 boit + plaque
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[5, 2], [5, 2]],
	  // Position de fin des bots
	  end: [[1, 2], [1, 2]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 12', l: '40%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 1, pi: 1, pj: 3, pOn: 0, dcvs: 2, di: 2, dj: 2, dAngle: 0},
		  {pcvs: 2, pi: 3, pj: 3, pOn: 0, dcvs: 1, di: 2, dj: 2, dAngle: 0}
	  ],
	  boxes: [
		  {cvs: 1, i: 3, j: 3, droped: true},
		  {cvs: 2, i: 1, j: 3, droped: true}
	  ],
	  nbActionTotal: 32, 
      groupe: 3
	},
	{
	  // 12 4 boites + 4 plaques
	  // Canvas gauche
	  gauche: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0],
		  [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0],
		  [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[5, 3], [5, 1]],
	  // Position de fin des bots
	  end: [[0, 2], [0, 2]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 13', l: '40%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 1, pi: 3, pj: 3, pOn: 0, dcvs: 2, di: 2, dj: 2, dAngle: 0},
		  {pcvs: 1, pi: 1, pj: 4, pOn: 0, dcvs: 1, di: 2, dj: 2, dAngle: 0},
		  {pcvs: 2, pi: 3, pj: 4, pOn: 0, dcvs: 1, di: 2, dj: 1, dAngle: 0},
		  {pcvs: 2, pi: 1, pj: 3, pOn: 0, dcvs: 2, di: 2, dj: 1, dAngle: 0}
	  ],
	  boxes: [
		  {cvs: 1, i: 1, j: 3, droped: true},
		  {cvs: 1, i: 3, j: 4, droped: true},
		  {cvs: 2, i: 3, j: 3, droped: true},
		  {cvs: 2, i: 1, j: 4, droped: true}
	  ],
	  nbActionTotal: 36, 
      groupe: 3
	},
	{
	  // 13 Peut pas prendre 2 boites
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0],
		  [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0],
		  [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]
	  ],
	  // Position depart des bots
	  begin: [[6, 2], [6, 2]],
	  // Position de fin des bots
	  end: [[2, 0], [2, 4]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 14', l: '40%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 1, pi: 2, pj: 3, pOn: 0, dcvs: 1, di: 0, dj: 2, dAngle: 90},
		  {pcvs: 1, pi: 2, pj: 2, pOn: 0, dcvs: 2, di: 4, dj: 2, dAngle: 90},
		  {pcvs: 2, pi: 2, pj: 2, pOn: 0, dcvs: 1, di: 1, dj: 2, dAngle: 90},
		  {pcvs: 2, pi: 2, pj: 3, pOn: 0, dcvs: 2, di: 3, dj: 2, dAngle: 90}
	  ],
	  boxes: [
		  {cvs: 1, i: 2, j: 4, droped: true},
		  {cvs: 1, i: 2, j: 5, droped: true},
		  {cvs: 2, i: 2, j: 4, droped: true},
		  {cvs: 2, i: 2, j: 5, droped: true}
	  ],
	  nbActionTotal: 34, 
      groupe: 3
	},
	{
	  // 14
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 1, 1, 0],
		  [0, 1, 1, 1, 0], [0, 1, 1, 1, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 0],
		  [0, 1, 1, 1, 0], [0, 1, 1, 1, 0]
	  ],
	  // Position depart des bots
	  begin: [[6, 2], [6, 2]],
	  // Position de fin des bots
	  end: [[1, 3], [1, 1]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [{m: 'Level 15', l: '40%', t: '40%'}],
	  duoPreDoor: [
		  {pcvs: 1, pi: 1, pj: 4, pOn: 0, dcvs: 2, di: 3, dj: 3, dAngle: 0},
		  {pcvs: 2, pi: 3, pj: 4, pOn: 0, dcvs: 1, di: 1, dj: 3, dAngle: 0},
		  {pcvs: 1, pi: 1, pj: 1, pOn: 0, dcvs: 2, di: 2, dj: 1, dAngle: 90},
		  {pcvs: 2, pi: 3, pj: 1, pOn: 0, dcvs: 1, di: 2, dj: 1, dAngle: 90}
	  ],
	  boxes: [
		  {cvs: 1, i: 2, j: 5, droped: true},
		  {cvs: 2, i: 2, j: 5, droped: true},
		  {cvs: 1, i: 1, j: 2, droped: true},
		  {cvs: 2, i: 3, j: 2, droped: true}
	  ],
	  nbActionTotal: 30, 
      groupe: 3
	},
	{
	  // 15 teleporteur + boite
	  // Canvas gauche
	  gauche: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0],
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[5, 2], [6, 2]],
	  // Position de fin des bots
	  end: [[0, 2], [0, 2]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
          {m: 'Level 16', l: '40%', t: '40%'},
          {m: 'You can send boxes to the other robot using teleporters.', l: 'l', t: 't', s: 1000},
          {m: 'Drop the box on the teleporter entry to transfer it to the other side.', l: 'l', t: 't', s: 1000}
      ],
	  // Boites
	  boxes: [{cvs: 1, i: 2, j: 4, droped: true}],
	  // Teleporteurs
	  teleporters: [{
		  inCvs: 1,
		  inI: 2,
		  inJ: 3,
		  angleIn: 0,
		  outCvs: 2,
		  outI: 2,
		  outJ: 3,
		  angleOut: 0
	  }],
	  // Porte
	  duoPreDoor:
		  [{pcvs: 2, pi: 2, pj: 2, pOn: 0, dcvs: 2, di: 2, dj: 1, dAngle: 0}],
	  // Nombre d'actions pour reussir parfaitement
	  nbActionTotal: 15, 
      groupe: 4
	},
	{
	  // 16 1 boxs 1 teleporteurs <3
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [0, 0, 1, 1, 1], [0, 1, 1, 1, 1],
		  [0, 0, 1, 1, 1], [0, 0, 0, 1, 1], [0, 0, 0, 0, 1]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 0, 0], [1, 1, 1, 1, 0],
		  [1, 1, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[6, 4], [6, 0]],
	  // Position de fin des bots
	  end: [[1, 3], [1, 1]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
		  {m: 'Level 17', l: '40%', t: '40%'},
	  ],
	  duoPreDoor:
		  [{pcvs: 2, pi: 1, pj: 3, pOn: 0, dcvs: 2, di: 1, dj: 2, dAngle: 0}],
	  boxes: [{cvs: 1, i: 4, j: 5, droped: true}],
	  teleporters: [{
		  inCvs: 1,
		  inI: 3,
		  inJ: 4,
		  angleIn: 0,
		  outCvs: 2,
		  outI: 1,
		  outJ: 4,
		  angleOut: 0
	  }],
	  nbActionTotal: 20, 
      groupe: 4
	},
	{
	  // 16 2 boxs 2 teleporteurs
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 1, 1, 1, 1],
		  [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1],
		  [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1]
	  ],
	  // Position depart des bots
	  begin: [[5, 0], [6, 4]],
	  // Position de fin des bots
	  end: [[0, 4], [0, 0]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
		  {m: 'Level 18', l: '40%', t: '40%'},
	  ],
	  duoPreDoor: [
		  {pcvs: 2, pi: 3, pj: 3, pOn: 0, dcvs: 2, di: 2, dj: 3, dAngle: 90},
		  {pcvs: 1, pi: 4, pj: 1, pOn: 0, dcvs: 1, di: 4, dj: 0, dAngle: 0}
	  ],
	  boxes: [
		  {cvs: 1, i: 0, j: 5, droped: true},
		  {cvs: 2, i: 2, j: 3, droped: true}
	  ],
	  teleporters: [
		  {
			inCvs: 1,
			inI: 0,
			inJ: 4,
			angleIn: 0,
			outCvs: 2,
			outI: 4,
			outJ: 3,
			angleOut: 0
		  },
		  {
			inCvs: 2,
			inI: 1,
			inJ: 3,
			angleIn: 0,
			outCvs: 1,
			outI: 4,
			outJ: 2,
			angleOut: 0
		  }
	  ],
	  nbActionTotal: 31, 
      groupe: 4
	},
	{
	  // 18 2 boxs 2 teleporteurs
	  // Canvas gauche
	  gauche: [
		  [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1],
		  [0, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [1, 1, 1, 1, 1],
		  [0, 1, 0, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[3, 4], [3, 0]],
	  // Position de fin des bots
	  end: [[3, 0], [3, 4]],
	  // Angle de depart
	  angle: [270, 90],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
		  {m: 'Level 19', l: '40%', t: '40%'},
	  ],
	  duoPreDoor: [
		  {pcvs: 1, pi: 3, pj: 3, pOn: 0, dcvs: 2, di: 2, dj: 3, dAngle: 90},
		  {pcvs: 1, pi: 1, pj: 2, pOn: 0, dcvs: 1, di: 1, dj: 3, dAngle: 90}
	  ],
	  boxes: [{cvs: 2, i: 1, j: 3, droped: true}],
	  teleporters: [{
		  inCvs: 2,
		  inI: 3,
		  inJ: 3,
		  angleIn: 0,
		  outCvs: 1,
		  outI: 2,
		  outJ: 2,
		  angleOut: 0
	  }],
	  nbActionTotal: 20, 
      groupe: 4
	},
	{
	  // 19 2 boxs 2 teleporteurs
	  // Canvas gauche
	  gauche: [
		  [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1],
		  [1, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]
	  ],
	  // Canvas droite
	  droite: [
		  [0, 0, 1, 0, 0], [0, 0, 1, 0, 1], [0, 0, 1, 0, 1], [0, 1, 1, 1, 1],
		  [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]
	  ],
	  // Position depart des bots
	  begin: [[6, 2], [5, 2]],
	  // Position de fin des bots
	  end: [[4, 0], [1, 4]],
	  // Angle de depart
	  angle: [0, 0],
	  // Liste des messages, positions, temps avant le prochain
	  messages: [
		  {m: 'Level 20', l: '40%', t: '40%'},
	  ],
	  duoPreDoor: [
		  {pcvs: 2, pi: 2, pj: 3, pOn: 0, dcvs: 2, di: 2, dj: 2, dAngle: 0},
		  {pcvs: 1, pi: 2, pj: 2, pOn: 0, dcvs: 2, di: 4, dj: 2, dAngle: 0},
		  {pcvs: 1, pi: 3, pj: 0, pOn: 0, dcvs: 2, di: 4, dj: 3, dAngle: 45},
		  {pcvs: 2, pi: 4, pj: 2, pOn: 0, dcvs: 1, di: 0, dj: 3, dAngle: 45}
	  ],
	  boxes: [
		  {cvs: 2, i: 2, j: 4, droped: true},
		  {cvs: 2, i: 2, j: 1, droped: true},
		  {cvs: 2, i: 4, j: 3, droped: true}
	  ],
	  teleporters: [
		  {
			inCvs: 2,
			inI: 2,
			inJ: 0,
			angleIn: 0,
			outCvs: 1,
			outI: 2,
			outJ: 0,
			angleOut: 0
		  },
		  {
			inCvs: 2,
			inI: 3,
			inJ: 3,
			angleIn: 0,
			outCvs: 1,
			outI: 2,
			outJ: 1,
			angleOut: 0
		  }
	  ],
	  nbActionTotal: 51, 
      groupe: 4
	}
];

/* --- Valeur ---
- 0 : vide
- 1 : case normale grise
- 2 : case normale blanche (tourner gauche)
- 3 : case normale noire/grise (tourner droite)
*/

/* --- Formalisme messages --- ⚠
- { m: 'Touche moi et je disparais', l: 'l', t: 't', s: 500 }
- m: messages
- l: position left, 'l' pour aleatoire
- t: position top, 't' pour aleatoire
- s: temps avant prochain message (ms)
*/

// assets
// Fichier Manifest des images
var imagesManifest = [
	// Mur
	{id: 'wall1', src: './assets/img/wall1.png'},
	{id: 'wall2', src: './assets/img/wall2.png'},
	{id: 'wall3', src: './assets/img/wall3.png'},

	// Balises
	{id: 'begin1', src: './assets/img/begin1.png'},
	{id: 'begin2', src: './assets/img/begin2.png'},
	{id: 'end', src: './assets/img/end.png'},

	// Bots
	{id: 'bot1', src: './assets/img/dd_red.png'},
	{id: 'bot2', src: './assets/img/dd_blue.png'},
	{id: 'box', src: './assets/img/box.png'},
	{id: 'bot1box', src: './assets/img/dd_red_box.png'},
	{id: 'bot2box', src: './assets/img/dd_blue_box.png'},

	// Teleporteurs
	{id: 'TIn1', src: './assets/img/teleport_violet_in.png'},
	{id: 'TOut1', src: './assets/img/teleport_violet_out.png'},
	{id: 'TIn2', src: './assets/img/teleport_yellow_in.png'},
	{id: 'TOut2', src: './assets/img/teleport_yellow_out.png'},

	// Plaque Porte
	{id: 'plaque1On', src: './assets/img/pression_blue_on.png'},
	{id: 'plaque1Off', src: './assets/img/pression_blue_off.png'},
	{id: 'porte1Close', src: './assets/img/barrier_blue_off.png'},
	{id: 'porte1Open', src: './assets/img/barrier_blue_on_animated.png'},

	{id: 'plaque2On', src: './assets/img/pression_green_on.png'},
	{id: 'plaque2Off', src: './assets/img/pression_green_off.png'},
	{id: 'porte2Close', src: './assets/img/barrier_green_off.png'},
	{id: 'porte2Open', src: './assets/img/barrier_green_on_animated.png'},

	{id: 'plaque3On', src: './assets/img/pression_red_on.png'},
	{id: 'plaque3Off', src: './assets/img/pression_red_off.png'},
	{id: 'porte3Close', src: './assets/img/barrier_red_off.png'},
	{id: 'porte3Open', src: './assets/img/barrier_red_on_animated.png'},

	{id: 'plaque4On', src: './assets/img/pression_orange_on.png'},
	{id: 'plaque4Off', src: './assets/img/pression_orange_off.png'},
	{id: 'porte4Close', src: './assets/img/barrier_orange_off.png'},
	{id: 'porte4Open', src: './assets/img/barrier_orange_on_animated.png'},

	// Explosion
	{id: 'explosion', src: './assets/img/explosion.png'}
];

var soundsManifest = [
	{id: 'forward', src: './assets/sounds/forward.mp3'}, // Son avance
	{id: 'rotate', src: './assets/sounds/rotate.mp3'},   // Son pivote
	{
	  id: 'succes1',
	  src: './assets/sounds/triumphal_fanfare.mp3'
	}, // Son victoire
	{
	  id: 'succes2',
	  src: './assets/sounds/Jingle_victoire.mp3'
	},														  
	{id: 'explosion', src: './assets/sounds/explosion.mp3'}, // Son explosionD
	{id: 'Collabots', src: './assets/sounds/CollaBots.mp3'}  // Musique du jeu
];

// Variables globales
var nb_case_width  = 5;
var nb_case_height = 7;
var width, height;
var images, sounds;
//var nbLoadComplete	= 0;
//var nbLoadCompleteMax = 2;
var stage;
var boolCommandsOk;
var cvs1, cvs2, cvs1Back, cvs2Back;
var taillew, tailleh;
var menu_offset = 0;
var isPlaying = 0;      // 0 : jeu en pause (pas de render dans la boucle de jeu) ; 1 : jeu en cours 

// Config
var multiplicateurPolice = 0.1; // Taille de la police en fonction de la hauteur
var messageFinLevel		 = 'Congratulations!';
var messageUnPasFini	 = 'One out of two!';
var tempsEntreLevel		 = 3000; // (ms)
var tempsEntreUpdate	 = 1000; // (ms)
var messageErreurExec	= 'Finish before executing';
var messageNote			 = ['You can do better!', 'Almost there!', 'Perfect!'];
var fps					 = 60;
var afficheMessages		 = false;
var cptRender			 = 0;
var vitesseBot			 = 600; // ms deplacement 1 case
var angleDandine		 = 30;
var vitesseRotationTele  = 2000; // ms pour un tour
var tempsDecalageBot	 = tempsEntreUpdate / 2;
// Gestion des sons
var activerMusique		 = true;
var activerBruitages	 = true;
var rotatecvs2			 = false;
// Audio 
var music                = null;


