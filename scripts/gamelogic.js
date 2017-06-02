var canvas;
var context;
var sectionWidth;
var sectionHeight;
var mouseX = 0;
var mouseY = 0;
var piecesMoved = 0;
var timeForOneGame = 0;
var minimumMoves1 = 0;
var minimumTime1 = 0;
var minimumMoves2 = 0;
var minimumTime2 = 0;
var movingPiece = false;
var currentMovingFromPiece = -1;
var currentMovingToPiece = 0;
var offsetX = 0;
var offsetY = 0;
var solved = false;
var currentImageNumber = 1;
var imageObj = new Image();
var PIECES = 16;
var SIDES = 4;
var isAnimating = false;
var IMAGECOUNT = 38;
var playingStatus = false;
var globalTime = 0;
var firstGameTime = 0;
var secondGametime = 0;
var scoreFirst = 0;
var scoreSecond =0;
var totalScore = 0;
var gamesPlayed = 0;
var artTitle = new Array(38);
var isFirstFinished = false;
var currentDate;
var CCOUNT = 60;
var paused = false;
var interval;
var totalPiecesMoved = 0;
var t, count;
var formulaScore = 0;
var formulaScore1 = 0;
var formulaScore2 = 0;

function populateImages(){
    for(var i=0;i<39;i++){
        artTitle[i] = 'pic' + i + '.jpeg';
    }
}

function counter(){
    var initialDate = new Date();
    interval = setInterval(function() {
        if(!paused) {
            currentDate = new Date();
            $("#gametime").html("Time: " + Math.abs(Math.floor((currentDate - initialDate)/1000)) + "s");
            globalTime = Math.abs(Math.floor((currentDate - initialDate)/1000));
        }else{
            globalTime = Math.abs(Math.floor((currentDate - initialDate)/1000));
        }
    }, 1000);
}

function pauseOrResumeTimer(){
    paused = !paused;
}

function loader() {
    var myVar = setTimeout(showPage, 3000);
    cdreset();
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
}


function toggle(button) {
    if(button.value=="OFF") {
        button.value="ON";
        button.innerHTML = "Stop Playing";
        finishTime = 0;
        startupPopUp();
    } else {
        button.value="OFF";
        button.innerHTML = "Start Playing";
        currentImageNumber++;
        if (currentImageNumber > IMAGECOUNT) {
            currentImageNumber = 0;
        }
        initArrays();
        loadImage();
        cdreset();
        playingStatus = false;
        var x = "Stopped Playing Puzzle";
        document.getElementById("gameStatus").innerHTML = x;
    }
}

function StartResetData(){
    var button = document.getElementById("playButton");
    button.value="ON";
    button.innerHTML = "Stop Playing";
    playingStatus = true;
    var x = "Started Playing Puzzle";
    document.getElementById("gameStatus").innerHTML = x;
}

function cddisplay() {
    // displays time in span
    document.getElementById('time').innerHTML = count;
    document.getElementById('finishTime').innerHTML = finishTime;
}

function displayFinishTime(){
    if (finishTime >= 30 && finishTime <= 40) {
        document.getElementById('score').innerHTML = "Your Score Is " + 800 + " Points!";
    }
    if(finishTime <= 30){
        document.getElementById('score').innerHTML = "Your Score Is " + 1000 + " Points!";
    }
    if(finishTime >= 40){
        document.getElementById('score').innerHTML = "Your Score Is " + 500 + " Points!";
    }
}

function countdown() {
    // starts countdown
    cddisplay();
    if (count == 0) {
        // time is up
        gameFinishedWithScore();
    } else {
        if (solved == true){
            gameFinishedWithScore();
        }else{
            count--;
            finishTime++;
            t = setTimeout("countdown()", 1000);
        }
    }
}

function cdpause() {
    // pauses countdown
    clearTimeout(t);
}

function cdreset() {
    // resets countdown
    cdpause();
    count = CCOUNT;
    finishTime = 0;
    cddisplay();
}

function gameFinishedWithScore() {
    checkForAllPiecesInCorrectSlot();
    var x;
    if (solved == false){
        alert("Hallab Puzzle, Your Score Is: ");
        playingStatus = false;
        x = "Finished Playing Puzzle";
        document.getElementById("gameStatus").innerHTML = x;
        displayFinishTime();
        finishTime = 0;
        toggle(document.getElementById("playButton"));
    }else{
        alert("Hallab Puzzle, Congratulations You Won! Your Score Is: ");
        displayFinishTime();
        finishTime = 0;
        playingStatus = false;
        x = "Finished Playing Puzzle";
        document.getElementById("gameStatus").innerHTML = x;
        toggle(document.getElementById("playButton"));
    }

}

function checkAnswers() {
    if (playingStatus == true){
        checkForAllPiecesInCorrectSlot();
        var x;
        if (solved == false){
            alert("Hallab Puzzle, You Didn't Finish Yet! Your Score Now Is: ");
        }else{
            alert("Hallab Puzzle, Congratulations You Won! Your Score Is: ");
            playingStatus = false;
            x = "Finished Playing Puzzle";
            document.getElementById("gameStatus").innerHTML = x;
        }
    }else{
        alert("Hallab Puzzle, You Didn't Click Play Yet!");
    }

}


function startupPopUp() {
    var x;
    if (confirm("Hallab Puzzle, Would You Like To Play Hallab Puzzle?!") == true) {
        StartResetData();
        cdreset();
        countdown();
        currentImageNumber++;
        if (currentImageNumber > IMAGECOUNT) {
            currentImageNumber = 0;
        }
        initArrays();
        loadImage();
        playingStatus = true;
        x = "Puzzle Started!";
        document.getElementById("gameStatus").innerHTML = x;
    } else {
        toggle(document.getElementById("playButton"));
    }
}


function Piece() {
	var pieceNumber;
	var x;
	var y;
}

var pieceArray = new Array();

function Slot() {
	var slotNumber;
	var x;
	var y;
	var Piece;
}

var slotArray = new Array();

// 720 x 450 image for canvas
function nextPuzzle(){
    document.getElementById("NextPuzzleButton").style.display = "none";
    changeDifficulty();
    nextImage();
    pauseOrResumeTimer();
}

function nextImage(){
    currentImageNumber++;
    if (currentImageNumber > IMAGECOUNT) {
        currentImageNumber = 0;
    }
    initArrays();
    loadImage();
}

function changeDifficulty(){
    if (SIDES > 5) {
        SIDES = 2;
        PIECES = SIDES * SIDES;
    } else {
        SIDES++;
        PIECES = SIDES * SIDES;
    }

    sectionWidth = canvas.width / SIDES;
    sectionHeight = canvas.height / SIDES;
    initArrays();
    loadImage();
}

function init(document) {
	canvas = document.getElementById('puzzleCanvas');
	currentImageNumber = Math.floor(Math.random() * IMAGECOUNT);
	var canvasOffset = $("#puzzleCanvas").offset();
	offsetX = Math.round(canvasOffset.left);
	offsetY = Math.round(canvasOffset.top);
    sectionWidth = canvas.width / SIDES;
	sectionHeight = canvas.height / SIDES;
	canvas.addEventListener("mousedown", doMouseDown, false);
	canvas.addEventListener("mouseup", doMouseUp, false);
	canvas.addEventListener("mousemove", doMouseMove, false);
	canvas.addEventListener("mouseout", doMouseOut, false);
	context = canvas.getContext('2d');
    document.getElementById("BonusScore").innerHTML = "Bonus: " + localStorage.getItem("b");
    initArrays();
	loadImage();
    $('#gameLoader').css({'display': 'none'});
}

function adjustOffset() {
    var canvasOffset = $("#puzzleCanvas").offset();
    offsetX = Math.round(canvasOffset.left);
    offsetY = Math.round(canvasOffset.top);
}

function clearCanvas() {
	context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	context.restore();
	context.fillStyle = "#bababb";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function initArrays() {
	pieceArray = new Array();
	slotArray = new Array();
	for (i = 0; i < PIECES; i++) {
		pieceArray[i] = new Piece();
		pieceArray[i].pieceNumber = i;
		slotArray[i] = new Slot();
		slotArray[i].slotNumber = i;
		slotArray[i].piece = pieceArray[i];
	}

	for (y = 0; y < SIDES; y++) {
		for (x = 0; x < SIDES; x++) {
			var index = x + (y * SIDES);
			var w = x * sectionWidth;
			var h = y * sectionHeight;
			slotArray[index].x = w;
			slotArray[index].y = h;
			pieceArray[index].x = w;
			pieceArray[index].y = h;
		}
	}
}

function loadPreviousImage() {
	isAnimating = true;
	imageObj.src = 'images/' + artTitle[currentImageNumber];
	imageObj.onload = function() {
        isAnimating = false;
        checkForAllPiecesInCorrectSlot();
        drawCanvas();
	}
}

function loadImage() {
	isAnimating = true;
	solved = false;
	imageObj.src = 'images/' + artTitle[currentImageNumber];
	imageObj.onload = function() {
		putPiecesInRandomSlots();
		isAnimating = false;
		checkForAllPiecesInCorrectSlot();
		drawCanvas();
	}
}

function doMouseDown(event) {
	if (solved == false && isAnimating == false) {
		mouseX = event.clientX - offsetX;
		mouseY = event.clientY - offsetY;
		currentMovingFromPiece = getCurrentPiece(mouseX, mouseY);
		drawCanvas();
	}
}

function doMouseMove(event) {
	if (solved == false && isAnimating == false) {
		mouseX = event.clientX - offsetX;
		mouseY = event.clientY - offsetY;
		drawCanvas();
	}
}

function doMouseUp(event) {
	if (solved == false && isAnimating == false) {
		mouseX = event.clientX - offsetX;
		mouseY = event.clientY - offsetY;
		currentMovingToPiece = getCurrentPiece(mouseX, mouseY);
		switchPieces(currentMovingFromPiece, currentMovingToPiece);
		currentMovingFromPiece = -1;
        totalPiecesMoved++;
        document.getElementById("gamemoves").innerHTML = "Moves: " + totalPiecesMoved;
        document.getElementById("BonusScore").innerHTML = "Bonus: " + localStorage.getItem("b");
        checkForAllPiecesInCorrectSlot();
        if(solved == true){
            piecesMoved = 1;
        }else{
            piecesMoved++;
        }
        console.log(timeForOneGame, piecesMoved);
		drawCanvas();
	}
}

function checkForAllPiecesInCorrectSlot() {
    var piecesSolved = 0;
    for (var int = 0; int < PIECES; int++) {
		if (slotArray[int].slotNumber == slotArray[int].piece.pieceNumber) {
			piecesSolved++;
		}
	}
	if (piecesSolved == PIECES) {
        solved = true;
        gamesPlayed += 1;
        if (gamesPlayed == 1) {
            minimumTime1 = 100;
            minimumMoves1 = 8;
            firstGameTime = globalTime;
            scoreFirst = parseInt((minimumTime1/firstGameTime)*(minimumMoves1/piecesMoved)*1000);
            pauseOrResumeTimer();
            totalScore = scoreFirst+scoreSecond;
            document.getElementById("gamescore").innerHTML = "Score: " + totalScore;
            document.getElementById("BonusScore").innerHTML = "Bonus: " + localStorage.getItem("b");
            document.getElementById("NextPuzzleButton").style.display = "block";
            localStorage["x"] = totalScore;
            localStorage["y"] = globalTime;
            localStorage["z"] = totalPiecesMoved;
        } else if (gamesPlayed == 2) {
            minimumTime2 = 150;
            minimumMoves2 = 10;
            secondGametime = globalTime-firstGameTime;
            scoreSecond =  parseInt((minimumTime2/(secondGametime))*(minimumMoves2/piecesMoved)*1000);
            pauseOrResumeTimer();
            totalScore = scoreFirst+scoreSecond;
            document.getElementById("gamescore").innerHTML = "Score: " + totalScore;
            document.getElementById("BonusScore").innerHTML = "Bonus: " + localStorage.getItem("b");
            document.getElementById("NextPuzzleButton").style.display = "none";
            localStorage["x"] = totalScore;
            localStorage["y"] = globalTime;
            localStorage["z"] = totalPiecesMoved;
            setTimeout(saveData, 2000);
        }
    }
}

function doMouseOut(event) {
	currentMovingFromPiece = -1;
	drawCanvas();
}

function getCurrentPiece(x, y) {
	var xIndex = 0;
	var tempSectionWidth = sectionWidth;
	while (x >= tempSectionWidth) {
		xIndex++;
		tempSectionWidth += sectionWidth;
	}

	var yIndex = 0;
	var tempSectionHeight = sectionHeight;
	while (y >= tempSectionHeight) {
		yIndex++;
		tempSectionHeight += sectionHeight;
	}

	var pieceIndex = xIndex + (yIndex * SIDES);

	return pieceIndex;
}

function putPiecesInRandomSlots() {
	var isRandom = false;
	var attempts = 0;
	var moves = 0;
	if (PIECES % 2 == 0) {
		moves = PIECES / 2;
	} else {
		moves = (PIECES / 2) + 1;
	}
	while (!isRandom) {
		attempts++;
		for (var from = 0; from < moves; from++) {
			var to = Math.floor(Math.random() * PIECES);
			while (from == to) {
				to = Math.floor(Math.random() * PIECES);
			}
			switchPieces(from, to);
		}

		isRandom = true;
		for (var int = 0; int < slotArray.length; int++) {
			if (slotArray[int].slotNumber == slotArray[int].piece.pieceNumber) {
				isRandom = false;
			}
		}
	}
}

function switchPieces(fromSlot, toSlot) {
	var tempPiece = slotArray[toSlot].piece;
	slotArray[toSlot].piece = slotArray[fromSlot].piece;
	slotArray[fromSlot].piece = tempPiece;
}

function drawCanvas() {
	// Store the current transformation matrix
	clearCanvas();
	drawPieces();
}

function drawBorder() {
	context.strokeStyle = "#000000";
	context.lineWidth = 3;
	context.beginPath();

	var tempWidth;
	var tempHeight;
	for (var int = 1; int <= SIDES - 1; int++) {
		tempWidth = sectionWidth * int;

		context.moveTo(tempWidth, 0);
		context.lineTo(tempWidth, 0);
		context.lineTo(tempWidth, canvas.height);

		tempHeight = sectionHeight * int;

		context.moveTo(0, tempHeight);
		context.lineTo(0, tempHeight);
		context.lineTo(canvas.width, tempHeight);
	}

	context.stroke();
}

function drawPieces() {
	for (var int = 0; int < PIECES; int++) {
		var slot = slotArray[int];
		var piece = slotArray[int].piece;
		var movingPiece;
		if (currentMovingFromPiece != int) {
			context.drawImage(imageObj, piece.x, piece.y, sectionWidth,
					sectionHeight, slot.x, slot.y, sectionWidth, sectionHeight);
		} else {
			movingPiece = piece;
		}

		if (solved == false) {
			drawBorder();
		}

		if (movingPiece != null) {
			var centerX = mouseX - sectionWidth / 2;
			var centerY = mouseY - sectionHeight / 2;
			context.drawImage(imageObj, movingPiece.x, movingPiece.y,
					sectionWidth, sectionHeight, centerX, centerY,
					sectionWidth, sectionHeight);
		}
	}
}
function saveData(){
    document.getElementById("loaderGame").style.display = "block";
    clearInterval(interval);
    if(firTotalScore == 0){
        writeUserScoreHistory(totalScore,globalTime,totalPiecesMoved);
        writeTotalScores(totalScore,globalTime,totalPiecesMoved);
        localStorage["currentScore"]=totalScore;
        localStorage["currentTime"]=globalTime;
        localStorage["currentMoves"]=totalPiecesMoved;
        localStorage["topScore"]=totalScore;
        localStorage["topTime"]=globalTime;
        localStorage["topMoves"]=totalPiecesMoved;
    }else if(firTotalScore == null) {
        localStorage["currentScore"]=totalScore;
        localStorage["currentTime"]=globalTime;
        localStorage["currentMoves"]=totalPiecesMoved;
        localStorage["topScore"]=totalScore;
        localStorage["topTime"]=globalTime;
        localStorage["topMoves"]=totalPiecesMoved;
        writeUserScoreHistory(totalScore,globalTime,totalPiecesMoved);
        writeTotalScores(totalScore,globalTime,totalPiecesMoved);
    }else if(totalScore > firTotalScore){
        localStorage["currentScore"]=totalScore;
        localStorage["currentTime"]=globalTime;
        localStorage["currentMoves"]=totalPiecesMoved;
        localStorage["topScore"]=totalScore;
        localStorage["topTime"]=globalTime;
        localStorage["topMoves"]=totalPiecesMoved;
        writeUserScoreHistory(totalScore,globalTime,totalPiecesMoved);
        writeTotalScores(totalScore,globalTime,totalPiecesMoved);
    }else if(firTotalScore > totalScore){
        localStorage["currentScore"]=totalScore;
        localStorage["currentTime"]=globalTime;
        localStorage["currentMoves"]=totalPiecesMoved;
        localStorage["topScore"]=firTotalScore;
        localStorage["topTime"]=firTotalTime;
        localStorage["topMoves"]=firTotalMoves;
        writeUserScoreHistory(firTotalScore,firTotalTime,firTotalMoves);
        writeTotalScores(firTotalScore,firTotalTime,firTotalMoves);
        $('#myModal').css('display', 'block');
        document.getElementById("loaderGame").style.display = "none";
    }else if(firTotalScore == totalScore){
        localStorage["currentScore"]=totalScore;
        localStorage["currentTime"]=globalTime;
        localStorage["currentMoves"]=totalPiecesMoved;
        localStorage["topScore"]=firTotalScore;
        localStorage["topTime"]=firTotalTime;
        localStorage["topMoves"]=firTotalMoves;
        writeUserScoreHistory(firTotalScore,firTotalTime,firTotalMoves);
        writeTotalScores(firTotalScore,firTotalTime,firTotalMoves);
        $('#myModal').css('display', 'block');
        document.getElementById("loaderGame").style.display = "none";
    }
}
