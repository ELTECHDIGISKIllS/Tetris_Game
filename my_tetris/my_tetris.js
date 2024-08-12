function Liez(Fig_a, fiq_j) {
    Fig_a = Math.ceil(Fig_a);
    fiq_j = Math.floor(fiq_j);

    return Math.floor(Math.random() * (fiq_j - Fig_a + 1)) + Fig_a;
  }


  function view() {
    const view = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (view.length) {
      const rand = Liez(0, view.length - 1);
      const piece= view.splice(rand, 1)[0];
      view_nomi.push(piece);
    }
  }

  function nomiro() {
    if (view_nomi.length === 0) {
      view();
    }

    const voice= view_nomi.pop();
    const grid = nosmi[voice];

    const vert = perf_Act[0].length / 2 - Math.ceil(grid[0].length / 2);

    const file = voice=== 'I' ? -1 : -2;

    return {
      sing: voice,
      grid: grid, 
      file: file,        
      vert: vert         
    };
  }

  function spin_Piv(grid) {
    const n = grid.length - 1;
    const jed = grid.map((file, i) =>
      file.map((val, j) => grid[n - j][i])
    );

    return jed;
  }

  function good_hold(grid, gridfile, gridvert) {
    for (let file = 0; file < grid.length; file++) {
      for (let vert = 0; vert < grid[file].length; vert++) {
        if (grid[file][vert] && (
           
            gridvert + vert < 0 ||
            gridvert + vert >= perf_Act[0].length ||
            gridfile + file >= perf_Act.length ||
            
            perf_Act[gridfile + file][gridvert + vert])
          ) {
          return false;
        }
      }
    }

    return true;
  }

  function perf_act() {
    for (let file = 0; file < eng.grid.length; file++) {
      for (let vert = 0; vert < eng.grid[file].length; vert++) {
        if (eng.grid[file][vert]) {

     
          if (eng.file + file < 0) {
            return done_execu();
          }

          perf_Act[eng.file + file][eng.vert + vert] = eng.sing;
        }
      }
    }

    let fallFiles = 0;
    let ways = 0;
    for (let file = perf_Act.length - 1; file >= 0; ) {
      if (perf_Act[file].every(box => !!box)) {
        fallFiles++;
        ways++;

        for (let a = file; a >= 0; a--) {
          for (let q = 0; q < perf_Act[a].length; q++) {
            perf_Act[a][q] = perf_Act[a-1][q];

          }
        }
      }
      else {
        file--;
      }

    }

    eng = nomiro();
    if (fallFiles > 0 && ways > 0) {
        upmark(fallFiles);
        addfallways(ways);
    }

  }

  function addfallways() {
    document.getElementById("lines-dropped").innerHTML = fallways;
  }


  function fileflow(){
    for (let file = perf_Act.length - 1; file >= 0; ) {
      if (perf_Act[file].every(box => !!box)) {

        for (let a = file; a >= 0; a--) {
          for (let q = 0; q < perf_Act[a].length; q++) {
            perf_Act[a][q] = perf_Act[a-1][q];
          }
        }
      }
      else {
        file--;
      }

    }
  }



  function for_fileflow(){
    for (let file = perf_Act.length - 1; file >= 0; ) {
      if (perf_Act[file].every(box => !!box)) {

       
        for (let a = file; a >= 0; a--) {
          for (let q = 0; q < perf_Act[a].length; q++) {
            perf_Act[a][q] = perf_Act[a-1][q];
          }
        }
      }
      else {
        file--;
      }
    }
  }


  let win = 0;
  let fallways = 0;
  function upmark(fallflow) {
    switch(fallflow) {
        case 1:
            win += 100
            break;
        case 2:
            win += 300
            break;
        case 3:
            win += 500
            break;
        case 4:
            win += 800
            break;
        default:
            win = 0
    }

	const showmark = document.getElementById('score');
	showmark.innerHTML = win;

	let cord = Math.floor(win/100);
	if(cord > fallways){
		fallways = cord;
		addfallways();
	}
  }

 
  let grip = false;

  function hold_disp() {
   if (!grip) {
   
     removeInterval(dropInterval);
     grip = true;
   } else {
   
     dropInterval = setInterval(moveDown, speed);
     grip = false;
   }
  }


  
  function done_execu() {
    cancelAnimationFrame(demAJ);
    play_term = true;

    page.fillStyle = 'pink';
    page.globalAlpha = 0.75;
    page.fillRect(0, tap.height / 2 - 30, tap.width, 60);

    page.globalAlpha = 1;
    page.fillStyle = 'white';
    page.font = '36px monospace';
    page.textAlign = 'center';
    page.textBaseline = 'middle';
    page.fillText("GAME OVER!", tap.width / 2, tap.height / 2);
  }

  const tap = document.getElementById('playGame');
  const page = tap.getContext('2d');
  const grid = 32;
  const view_nomi = [];

  const perf_Act = [];

 
  for (let file = -2; file < 20; file++) {
    perf_Act[file] = [];

    for (let vert = 0; vert < 10; vert++) {
      perf_Act[file][vert] = 0;
    }
  }

  
  const nosmi = {
    'I': [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    'J': [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    'L': [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    'O': [
      [1,1],
      [1,1],
    ],
    'S': [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    'Z': [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    'T': [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  };

  const nimoniHues = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
  };

  let read = 0;
  let eng = nomiro();
  let demAJ = null;  
  let play_term = false;


 
  function Equal_paly() {
    demAJ = requestAnimationFrame(Equal_paly);
    page.clearRect(0,0,tap.width,tap.height);

    for (let file = 0; file < 20; file++) {
      for (let vert = 0; vert < 10; vert++) {
        if (perf_Act[file][vert]) {
          const sing= perf_Act[file][vert];
          page.fillStyle = nimoniHues[sing];

      
          page.fillRect(vert * grid, file * grid, grid-1, grid-1);
        }
      }
    }

    if (eng) {

      if (++read > 35) {
        eng.file++;
        read = 0;

        if (!good_hold(eng.grid, eng.file, eng.vert)) {
          eng.file--;
          perf_act();
        }
      }

      page.fillStyle = nimoniHues[eng.sing];

      for (let file = 0; file < eng.grid.length; file++) {
        for (let vert = 0; vert < eng.grid[file].length; vert++) {
          if (eng.grid[file][vert]) {

            
            page.fillRect((eng.vert + vert) * grid, (eng.file + file) * grid, grid-1, grid-1);
          }
        }
      }
    }

  }

  document.addEventListener('keydown', function(e) {
    if (play_term) return;
  
    
    if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 100 || e.keyCode === 102) {
      const file = e.keyCode === 37 ? eng.vert - 1 : eng.vert + 1;

      if (good_hold(eng.grid, eng.file, file)) {
        eng.vert = file;
      }
    }

    
    if (e.keyCode === 38 || e.keyCode === 65 || e.keyCode === 66) {
      const grid = spin_Piv(eng.grid);
      if (good_hold(grid, eng.file, eng.vert)) {
        eng.grid = grid;
      }
    }

    if(e.keyCode === 40 || e.keyCode === 98) {
      const vert = eng.file + 1;

      if (!good_hold(eng.grid, vert, eng.vert)) {
        eng.file = vert - 1;

        perf_act();
        return;
      }

      eng.file = vert;
    }

    if(e.keyCode === 32 || e.keyCode === 104) {
      while(good_hold){
        const file = eng.file + 1;
        if (!good_hold(eng.grid, file, eng.vert)) {
          eng.file = file - 1;

          perf_act();
          return;
        }

        eng.file = file;
      }

    }

  });

  window.addEventListener("DOMContentLoaded", function(e){
    const silen = document.querySelector("silen");
    silen.volume = 0.2;
    silen.play();
  });

  function End_play(){
    let silen = new Audio('Spook.mp3');
    if(silen.paused){
 
      silen.play();
    }else{
      silen.pause();
    }
  }

  demAJ = requestAnimationFrame(Equal_paly);
  End_play();


  function upcoming(){
    if(!grip){
      gameStarted();
    }
  }

  function termin(){

    let play_term = true;
    done_execu();
    End_play();

  }


  let btnStop = document.getElementById('btnStop');
    btnStop.addEventListener('click', event =>{
    termin();
  });
