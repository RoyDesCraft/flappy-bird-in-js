const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const birdImages = [
  new Image(),
  new Image(),
  new Image()
];

birdImages[0].src = "image/flappyBird1.png";
birdImages[1].src = "image/flappyBird2.png";
birdImages[2].src = "image/flappyBird3.png";

const pipeImage1 = new Image();
pipeImage1.src = "image/pipe1.png";

const pipeImage2 = new Image();
pipeImage2.src = "image/pipe2.png";

const groundImage = new Image();
groundImage.src = "image/ground.png";

const dieBirdImage = new Image();
dieBirdImage.src = "image/dieBirdImage.png";

const smashRef = new Image();
smashRef.src = "image/smashRef.png";

const menuImage = new Image();
menuImage.src = "image/menu.png";

let 	currentFrameIndex 	= 0,
	y 			= canvas.height / 2,
	birdSpeedY 		= -10,
	bird2SpeedY 		= -10,
	pipe 			= [],
	pipeSpeed 		= 5,
	score 			= 0,
	birdX 			= canvas.width/2-0,
	birdX2 			= canvas.width/2-100,
	xGround 		= 0,
	xGround1 		= canvas.width/2,
	canPlay 		= true,
	birdSpeedY2 		= 0,
	birdSpeedY22 		= 0,
	mostScore 		= localStorage.getItem("meilleur score"),
	birdHitPipe 		= false,
	birdHitPipe2 		= false,
	birdSpeedX 		= 0,
	birdSpeedX2 		= 0,
	smashRefTime 		= false,
	reload 			= true;
	deaths 			= localStorage.getItem("deaths"),
	menuVue 		= true;

const gravity = 0.4;

menuImage.onload = function() {
    ctx.drawImage(menuImage, canvas.width/2-370, canvas.height/2, 37, 25);
};


if (localStorage.getItem("meilleur score") === "null") {
    localStorage.setItem("meilleur score",0);
}

document.addEventListener("keydown", function(event) {
if (canPlay) {
        if (event.key === " ") {
            birdSpeedY2 = -8; 
            birdSpeedY = -8; 
        }
}
});

document.addEventListener("mousedown", function() {
        if (canPlay) {
            birdSpeedY2 = -8;
            birdSpeedY = -8;
        } 
});

document.addEventListener("keydown", function(event) {
if (canPlay) {
        if (event.key === "ArrowUp") {
            birdSpeedY2 = -8;
            birdSpeedY = -8; 
        }
}
});



document.addEventListener("keydown", function(event) {
if (canPlay) {
        if (event.key === "ArrowUp") {
            birdSpeedY2 = -8;
            birdSpeedY = -8; 
        }
}
});


function imageLoop() {
    if (currentFrameIndex === 2) {
        currentFrameIndex = 0;
    } else {
        currentFrameIndex++;
    }
    setTimeout(() => {
        requestAnimationFrame(imageLoop);
    }, 100);
}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

if (menuVue) {
    //ctx.drawImage(menuImage, canvas.width/2-370, canvas.height/2, 370, 250);
}


if (!canPlay && pipeSpeed == 0) {
    setTimeout(() => {
        if (reload) {
            location.reload();
            deaths ++
            localStorage.setItem("deaths",deaths)
            reload = false
        }
    }, 2000);
}

birdX += birdSpeedX
if (score > mostScore) {
mostScore = score
localStorage.setItem("meilleur score",score)
}

    
    
    y += birdSpeedY;
   
    birdSpeedY += gravity;
    birdSpeedY2 += gravity;

    if (pipeSpeed < 0.5 && canPlay == false) {
        pipeSpeed = 0
    }

    if (birdSpeedY > 10 ) {
        birdSpeedY = 10;
    }


if (birdSpeedY2 > 20 && birdHitPipe ) {
    if (y > canvas.height-100-36) {
        birdSpeedY = 0
        y = (canvas.height-100)-36
        ctx.drawImage(dieBirdImage, birdX, y, 60,48);
        pipeSpeed = 0
        canPlay = false
    } 
} else {
    if (y > canvas.height-100-36) {
        
        canPlay = false
        birdSpeedY -= pipeSpeed*2
        pipeSpeed -= pipeSpeed /8
    }
}

if (!canPlay) {
    birdSpeedY2 = 0
}
    
   if (smashRefTime) {
    ctx.drawImage(smashRef, 0, 0, 1500, 1000)
   } 


pipe.forEach(p => {

/*/mode cheat  p.y = y-700 /*/ 



if (birdHitPipe) {
    setTimeout(() => {
        birdSpeedY -= 20
        birdSpeedX -= 20
        smashRefTime = true
        

    }, 500);
}

        ctx.drawImage(pipeImage2, p.x, p.y, 96, 600)

    ctx.drawImage(pipeImage1, p.x, p.y+750, 96, 600)

    p.x -= pipeSpeed ;

    if (p.sa) {
        if (p.x < birdX) {
        p.sa = false
        score ++

        }
    }


});

removeOffscreenPipes()



checkCollision();

    ctx.drawImage(groundImage, xGround, canvas.height-100, canvas.width, 111);

    ctx.drawImage(groundImage, xGround1, canvas.height-100, canvas.width+400, 111);


    if (pipeSpeed < 0 && canPlay == false && birdHitPipe == false|| pipeSpeed == 0 && canPlay == false && birdHitPipe == false) {
        birdSpeedY = 0
        y = (canvas.height-100)-36
        ctx.drawImage(dieBirdImage, birdX, y, 60,48);
        } else {
            ctx.drawImage(birdImages[currentFrameIndex], birdX, y, 54, 36);
    }


    ctx.font = '48px "Press Start 2P"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(score, canvas.width / 2, 100);

ctx.font = '30px "Press Start 2P"';
ctx.fillText(mostScore, canvas.width / 2, 150);

ctx.fillStyle = 'red';
ctx.font = '25px "Press Start 2P"';
ctx.fillText(deaths, canvas.width / 2, 40);
    requestAnimationFrame(gameLoop);
}

birdImages[0].onload = function() {
    gameLoop();
    imageLoop();
};

function pipey() {
    const randomY = (Math.random() * canvas.height)-600;
    

    if (randomY > -300) {
        pipey()
    } else {
        pipeGen(randomY)
    }
}

setInterval(() => {
    
    pipey()  
}, 2000);

function removeOffscreenPipes() {
    pipe = pipe.filter(p => p.x > -100);
}

function pipeGen(y) {
    pipe.push({ x: canvas.width, y: y ,sa:true});
}

setInterval(() => {
    upPipeSpeed()
}, 500);

function upPipeSpeed() {
    pipeSpeed += pipeSpeed/128
    
}

function switchPosXGround1() {
    xGround -= pipeSpeed;
    xGround1 -= pipeSpeed;

    if (xGround <= -canvas.width) {
        xGround = canvas.width;
        xGround1 = 0;
    }

    if (xGround1 <= -canvas.width) {
        xGround1 = canvas.width;
        xGround = 0;
    }
    requestAnimationFrame(switchPosXGround1)
}

function checkCollision() {
    for (let i = 0; i < pipe.length; i++) {
        const p = pipe[i];

        if (
            birdX + 54 > p.x &&
            birdX < p.x + 96 &&
            y < p.y + 600
        ) {
            birdHitPipe = true;
            birdSpeedY = 0
            canPlay = false
            pipeSpeed = 0
        }

        if (
            birdX + 54 > p.x &&
            birdX+10 < p.x + 96 &&
            y + 36 > p.y + 750
        ) {
            
            birdHitPipe = true; 
            birdSpeedY = 0
            canPlay = false
            pipeSpeed = 0
        }
    }
}

switchPosXGround1()
