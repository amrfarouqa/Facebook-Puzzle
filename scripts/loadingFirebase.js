var config = {
    apiKey: "AIzaSyA_9TbMEMskB7x6pH3v4pP6UItqGV1I0xM",
    authDomain: "hallabgame-a375a.firebaseapp.com",
    databaseURL: "https://hallabgame-a375a.firebaseio.com",
    storageBucket: "hallabgame-a375a.appspot.com",
    messagingSenderId: "814095488723"
};
firebase.initializeApp(config);
var firTotalTime = 0;
var firTotalScore = 0;
var firTotalMoves = 0;
function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("HomeContent").style.display = "block";
}


function writeUserData(ide, namee, firstnamee, lastnamee, gendere, picturee, emaile, locatione) {
    localStorage["ide"] = ide;
    localStorage["namee"] = namee;
    firebase.database().ref('users/' + ide).set({
        name: namee,
        firstName: firstnamee,
        lastName: lastnamee,
        gender: gendere,
        profile_picture: picturee,
        email : emaile,
        location: locatione
    }).then(function() {
        document.location.href = "home.html";
    });
}
function ClearLocalStorage(){
    localStorage.clear();
}


function writeUserScoreHistory(TopTotalScore,TopTotalMoves,TopTotalTime) {
    firebase.database().ref('userScoreHistory/' + Date()).set({
        name: localStorage.getItem("namee"),
        id: localStorage.getItem("ide"),
        piecesMoved: totalPiecesMoved,
        Time: globalTime + " Seconds",
        score: totalScore,
        Bonus: parseInt(localStorage.getItem("b")),
        TopTotalScore: TopTotalScore,
        TopTotalMoves: TopTotalMoves,
        TopTotalTime: TopTotalTime
    });
}


function writeTotalScoresHistoryWithBonus(bonus) {
    var id = localStorage.getItem("ide");
    firebase.database().ref('usersTotalScore/' + id).set({
        name: localStorage.getItem("namee"),
        score: parseInt(localStorage.getItem("currentScore")),
        piecesMoved: parseInt(localStorage.getItem("currentMoves")),
        Time: parseInt(localStorage.getItem("currentTime")),
        Bonus: bonus,
        TopTotalScore: parseInt(localStorage.getItem("topScore")),
        TopTotalMoves: parseInt(localStorage.getItem("topMoves")),
        TopTotalTime: parseInt(localStorage.getItem("topTime"))
    });
}

function writeTotalScoresWithBonus(bonus) {
    var id = localStorage.getItem("ide");
    firebase.database().ref('usersTotalScore/' + id).set({
        name: localStorage.getItem("namee"),
        score: parseInt(localStorage.getItem("currentScore")),
        piecesMoved: parseInt(localStorage.getItem("currentMoves")),
        Time: parseInt(localStorage.getItem("currentTime")),
        Bonus: bonus,
        TopTotalScore: parseInt(localStorage.getItem("topScore")),
        TopTotalMoves: parseInt(localStorage.getItem("topMoves")),
        TopTotalTime: parseInt(localStorage.getItem("topTime"))
    }).then(function() {
        modall.style.display = "block";
        document.getElementById("loaderGame").style.display = "none";
    });
}
var modall = document.getElementById('myModal');
function writeTotalScores(TopTotalScore,TopTotalMoves,TopTotalTime) {
    var id = localStorage.getItem("ide");
    firebase.database().ref('usersTotalScore/' + id).set({
        name: localStorage.getItem("namee"),
        score: totalScore,
        piecesMoved: totalPiecesMoved,
        Time: globalTime,
        Bonus: parseInt(localStorage.getItem("b")),
        TopTotalScore: TopTotalScore,
        TopTotalMoves: TopTotalMoves,
        TopTotalTime: TopTotalTime
    }).then(function() {
        document.getElementById("loaderGame").style.display = "none";
        $('#myModal').css('display', 'block');
    });
}

function readTotalData(){
    var userId = localStorage.getItem("ide");
    firebase.database().ref('usersTotalScore/' + userId).once('value').then(function(snapshot) {
        if(snapshot.val()==null){
            firTotalMoves = 0;
            firTotalScore = 0;
            firTotalTime = 0;
        }else{
            firTotalTime = snapshot.val().TopTotalTime;
            firTotalScore = snapshot.val().TopTotalScore;
            firTotalMoves = snapshot.val().TopTotalMoves;
        }
    });
}

function CongratsReadUserScoreData(){
    var userId = localStorage.getItem("ide");
    firebase.database().ref('usersTotalScore/' + userId).once('value').then(function(snapshot) {
        if(snapshot.val()==null){
            document.getElementById("YourTopScore").innerHTML = 0;
            document.getElementById("YourTopMoves").innerHTML = 0;
            document.getElementById("YourTopTime").innerHTML = 0;
            document.getElementById("YourScore").innerHTML = 0;
            document.getElementById("YourMoves").innerHTML = 0;
            document.getElementById("YourTime").innerHTML = 0;
            document.getElementById("yaay").style.display = "none";
        }else{
            document.getElementById("yaay").style.display = "inline-block";
            document.getElementById("YourScore").innerHTML = snapshot.val().score;
            document.getElementById("YourMoves").innerHTML = snapshot.val().piecesMoved;
            document.getElementById("YourTime").innerHTML = snapshot.val().Time;
            document.getElementById("YourTopTime").innerHTML = snapshot.val().TopTotalTime;
            document.getElementById("YourTopScore").innerHTML = snapshot.val().TopTotalScore;
            document.getElementById("YourTopMoves").innerHTML = snapshot.val().TopTotalMoves;
        }
    });
}

function readUserPicture(){
    var userId = localStorage.getItem("ide");
    firebase.database().ref('users/' + userId + '/profile_picture/').once('value').then(function(snapshot) {
        if(snapshot.val()==null){
            document.getElementById("UserProfileImg").setAttribute("src", "images/profile.png");
        }else{
            document.getElementById("UserProfileImg").setAttribute("src", snapshot.val());
        }
    });
}

function setTopScoreData(){
    var localScoreDataPics = JSON.parse(localStorage.getItem("ScoreDataPics"));
    var localScoreData = JSON.parse(localStorage.getItem("scoreData"));
    if(dataCount == 0){
        document.getElementById("loaderCongrats").style.display = "none";
    }else if(dataCount == 1){
        document.getElementById("scoreRow1").style.display= "block";
        document.getElementById("scoreRow3").style.display= "none";
        document.getElementById("scoreRow4").style.display= "none";
        document.getElementById("scoreRow5").style.display= "none";
        document.getElementById("Name1").innerHTML = localScoreData[0].Name;
        document.getElementById("Time1").innerHTML = localScoreData[0].Time;
        document.getElementById("Score1").innerHTML = localScoreData[0].Score;
        document.getElementById("Moves1").innerHTML = localScoreData[0].Moves;
        document.getElementById("Bonus1").innerHTML = localScoreData[0].Bonus;
        document.getElementById("Total1").innerHTML = localScoreData[0].Final;
        document.getElementById("Img1").setAttribute("src", localScoreDataPics[0].img);
    }else if(dataCount == 2){
        document.getElementById("scoreRow1").style.display= "block";
        document.getElementById("scoreRow4").style.display= "none";
        document.getElementById("scoreRow5").style.display= "none";
        document.getElementById("Name1").innerHTML = localScoreData[0].Name;
        document.getElementById("Time1").innerHTML = localScoreData[0].Time;
        document.getElementById("Score1").innerHTML = localScoreData[0].Score;
        document.getElementById("Moves1").innerHTML = localScoreData[0].Moves;
        document.getElementById("Bonus1").innerHTML = localScoreData[0].Bonus;
        document.getElementById("Total1").innerHTML = localScoreData[0].Final;
        document.getElementById("Img1").setAttribute("src", localScoreDataPics[0].img);
        document.getElementById("scoreRow2").style.display= "block";
        document.getElementById("Name2").innerHTML = localScoreData[1].Name;
        document.getElementById("Time2").innerHTML = localScoreData[1].Time;
        document.getElementById("Score2").innerHTML = localScoreData[1].Score;
        document.getElementById("Moves2").innerHTML = localScoreData[1].Moves;
        document.getElementById("Bonus2").innerHTML = localScoreData[1].Bonus;
        document.getElementById("Total2").innerHTML = localScoreData[1].Final;
        document.getElementById("Img2").setAttribute("src", localScoreDataPics[1].img);
    }else if(dataCount == 3){
        document.getElementById("scoreRow1").style.display= "block";
        document.getElementById("scoreRow5").style.display= "none";
        document.getElementById("Name1").innerHTML = localScoreData[0].Name;
        document.getElementById("Time1").innerHTML = localScoreData[0].Time;
        document.getElementById("Score1").innerHTML = localScoreData[0].Score;
        document.getElementById("Moves1").innerHTML = localScoreData[0].Moves;
        document.getElementById("Bonus1").innerHTML = localScoreData[0].Bonus;
        document.getElementById("Total1").innerHTML = localScoreData[0].Final;
        document.getElementById("Img1").setAttribute("src", localScoreDataPics[0].img);
        document.getElementById("scoreRow2").style.display= "block";
        document.getElementById("Name2").innerHTML = localScoreData[1].Name;
        document.getElementById("Time2").innerHTML = localScoreData[1].Time;
        document.getElementById("Score2").innerHTML = localScoreData[1].Score;
        document.getElementById("Moves2").innerHTML = localScoreData[1].Moves;
        document.getElementById("Bonus2").innerHTML = localScoreData[1].Bonus;
        document.getElementById("Total2").innerHTML = localScoreData[1].Final;
        document.getElementById("Img2").setAttribute("src", localScoreDataPics[1].img);
        document.getElementById("scoreRow3").style.display= "block";
        document.getElementById("Name3").innerHTML = localScoreData[2].Name;
        document.getElementById("Time3").innerHTML = localScoreData[2].Time;
        document.getElementById("Score3").innerHTML = localScoreData[2].Score;
        document.getElementById("Moves3").innerHTML = localScoreData[2].Moves;
        document.getElementById("Bonus3").innerHTML = localScoreData[2].Bonus;
        document.getElementById("Total3").innerHTML = localScoreData[2].Final;
        document.getElementById("Img3").setAttribute("src", localScoreDataPics[2].img);
    }else if(dataCount == 4){
        document.getElementById("scoreRow1").style.display= "block";
        document.getElementById("Name1").innerHTML = localScoreData[0].Name;
        document.getElementById("Time1").innerHTML = localScoreData[0].Time;
        document.getElementById("Score1").innerHTML = localScoreData[0].Score;
        document.getElementById("Moves1").innerHTML = localScoreData[0].Moves;
        document.getElementById("Bonus1").innerHTML = localScoreData[0].Bonus;
        document.getElementById("Total1").innerHTML = localScoreData[0].Final;
        document.getElementById("Img1").setAttribute("src", localScoreDataPics[0].img);
        document.getElementById("scoreRow2").style.display= "block";
        document.getElementById("Name2").innerHTML = localScoreData[1].Name;
        document.getElementById("Time2").innerHTML = localScoreData[1].Time;
        document.getElementById("Score2").innerHTML = localScoreData[1].Score;
        document.getElementById("Moves2").innerHTML = localScoreData[1].Moves;
        document.getElementById("Bonus2").innerHTML = localScoreData[1].Bonus;
        document.getElementById("Total2").innerHTML = localScoreData[1].Final;
        document.getElementById("Img2").setAttribute("src", localScoreDataPics[1].img);
        document.getElementById("scoreRow3").style.display= "block";
        document.getElementById("Name3").innerHTML = localScoreData[2].Name;
        document.getElementById("Time3").innerHTML = localScoreData[2].Time;
        document.getElementById("Score3").innerHTML = localScoreData[2].Score;
        document.getElementById("Moves3").innerHTML = localScoreData[2].Moves;
        document.getElementById("Bonus3").innerHTML = localScoreData[2].Bonus;
        document.getElementById("Total3").innerHTML = localScoreData[2].Final;
        document.getElementById("Img3").setAttribute("src", localScoreDataPics[2].img);
        document.getElementById("scoreRow4").style.display= "block";
        document.getElementById("Name4").innerHTML = localScoreData[3].Name;
        document.getElementById("Time4").innerHTML = localScoreData[3].Time;
        document.getElementById("Score4").innerHTML = localScoreData[3].Score;
        document.getElementById("Moves4").innerHTML = localScoreData[3].Moves;
        document.getElementById("Bonus4").innerHTML = localScoreData[3].Bonus;
        document.getElementById("Total4").innerHTML = localScoreData[3].Final;
        document.getElementById("Img4").setAttribute("src", localScoreDataPics[3].img);
    }else{
        document.getElementById("scoreRow1").style.display= "block";
        document.getElementById("Name1").innerHTML = localScoreData[0].Name;
        document.getElementById("Time1").innerHTML = localScoreData[0].Time;
        document.getElementById("Score1").innerHTML = localScoreData[0].Score;
        document.getElementById("Moves1").innerHTML = localScoreData[0].Moves;
        document.getElementById("Bonus1").innerHTML = localScoreData[0].Bonus;
        document.getElementById("Total1").innerHTML = localScoreData[0].Final;
        document.getElementById("Img1").setAttribute("src", localScoreDataPics[0].img);
        document.getElementById("scoreRow2").style.display= "block";
        document.getElementById("Name2").innerHTML = localScoreData[1].Name;
        document.getElementById("Time2").innerHTML = localScoreData[1].Time;
        document.getElementById("Score2").innerHTML = localScoreData[1].Score;
        document.getElementById("Moves2").innerHTML = localScoreData[1].Moves;
        document.getElementById("Bonus2").innerHTML = localScoreData[1].Bonus;
        document.getElementById("Total2").innerHTML = localScoreData[1].Final;
        document.getElementById("Img2").setAttribute("src", localScoreDataPics[1].img);
        document.getElementById("scoreRow3").style.display= "block";
        document.getElementById("Name3").innerHTML = localScoreData[2].Name;
        document.getElementById("Time3").innerHTML = localScoreData[2].Time;
        document.getElementById("Score3").innerHTML = localScoreData[2].Score;
        document.getElementById("Moves3").innerHTML = localScoreData[2].Moves;
        document.getElementById("Bonus3").innerHTML = localScoreData[2].Bonus;
        document.getElementById("Total3").innerHTML = localScoreData[2].Final;
        document.getElementById("Img3").setAttribute("src", localScoreDataPics[2].img);
        document.getElementById("scoreRow4").style.display= "block";
        document.getElementById("Name4").innerHTML = localScoreData[3].Name;
        document.getElementById("Time4").innerHTML = localScoreData[3].Time;
        document.getElementById("Score4").innerHTML = localScoreData[3].Score;
        document.getElementById("Moves4").innerHTML = localScoreData[3].Moves;
        document.getElementById("Bonus4").innerHTML = localScoreData[3].Bonus;
        document.getElementById("Total4").innerHTML = localScoreData[3].Final;
        document.getElementById("Img4").setAttribute("src", localScoreDataPics[3].img);
        document.getElementById("scoreRow5").style.display= "block";
        document.getElementById("Name5").innerHTML = localScoreData[4].Name;
        document.getElementById("Time5").innerHTML = localScoreData[4].Time;
        document.getElementById("Score5").innerHTML = localScoreData[4].Score;
        document.getElementById("Moves5").innerHTML = localScoreData[4].Moves;
        document.getElementById("Bonus5").innerHTML = localScoreData[4].Bonus;
        document.getElementById("Total5").innerHTML = localScoreData[4].Final;
        document.getElementById("Img5").setAttribute("src", localScoreDataPics[4].img);
    }
    document.getElementById("loaderCongrats").style.display = "none";
}


function readTopScorePics(id, score){
    firebase.database().ref('users/' + id + '/profile_picture/').once('value').then(function(snapshott) {
        PicObj = {
            img: snapshott.val(),
            TotalScore :score
        };
        scoreDataPics.push(PicObj);
        scoreDataPics.sort(function(a, b) {
            return parseFloat(b.TotalScore) - parseFloat(a.TotalScore);
        });
        localStorage["ScoreDataPics"] = JSON.stringify(scoreDataPics);
        setTopScoreData();
    });
}
var PicObj = {};
var scoreData = [];
var scoreDataPics = [];
var obj = {};
var dataCount = 0;
function readTopScoresData(){
    var playersRef = firebase.database().ref('usersTotalScore');
    playersRef.orderByChild("TopTotalScore").on("child_added", function(data) {
        readTopScorePics(data.key, data.val().TopTotalScore);
        obj = {
            Name: data.val().name,
            id: data.key,
            Score: data.val().TopTotalScore,
            Moves: data.val().TopTotalMoves,
            Time: data.val().TopTotalTime,
            Bonus: data.val().Bonus,
            Final: parseInt(data.val().TopTotalScore)+parseInt(data.val().Bonus)
        };
        scoreData.push(obj);
        dataCount +=1;
        scoreData.sort(function(a, b) {
            return parseFloat(b.Score) - parseFloat(a.Score);
        });
        localStorage["scoreData"] = JSON.stringify(scoreData);
    });
}
