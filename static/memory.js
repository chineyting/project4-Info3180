window.onload = function(){
    allowed_turns= 24;
    if (localStorage.game_state == null) {
        turns = 0;
        var deck = createDeck();
        showDeck(deck);
        layout_cards();
        set_controls();
        turns_counter();
        console.log("Part A");
    } else {
        set_controls();
        showScore();

        $('.sideBox').html(localStorage.game_state);
        turns = parseInt(localStorage.turns);
        turns_counter();
    };
    

    $( ".cover" ).click(function() {
        flipcard($(this));
    });

}

function createDeck() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["2", "3", "4", "5"];
    var suits = ["♣", "♦", "♥", "♠"]; 
    var j, k, index = 0;
    var pack_size;

    pack_size = ranks.length * suits.length;
    var cards = [];


    while (index < (pack_size)){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
    console.log(cards.length);
    return cards;
}


function showCards(cardJSON, card_num) {
    txt = cardJSON.rank + cardJSON.suite;    
    card = document.createElement("div");
    card2 = document.createElement("div");
    card.innerHTML = "<p>"+cardJSON.rank+"</p>";
    card2.innerHTML = "<p>"+cardJSON.rank+"</p>";
    card.classList.add('card');
    card2.classList.add('card');
    card.classList.add(txt);
    card2.classList.add(txt);

    if (cardJSON.suite=='♥') {
        card.classList.add('heart_suit');
        card2.classList.add('heart_suit');
    } else if(cardJSON.suite =='♦' ){
        card.classList.add('diamond_suit');
        card2.classList.add('diamond_suit');
    }else if(cardJSON.suite =='♣'){
        card.classList.add('club_suit');
        card2.classList.add('club_suit');
    }else{
        card.classList.add('spade_suit');
        card2.classList.add('spade_suit');
    };
    document.querySelector(".sideBox").appendChild(card);
    document.querySelector(".sideBox").appendChild(card2);
}

function showDeck(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            showCards(deck[idx], idx);
    }
}

function layout_cards(){
    var  cards = [].slice.call(document.getElementsByClassName('card'));
    console.log(cards);
    var shuffled = shuffle(cards);
    console.log(cards);
    var index = 0;
    for (var h = 0; h < 4; h++) {
        for (var w = 0; w < 8; w++){
            cards[index].style.top = (h*170)+"px";
            cards[index].style.left = (w*120)+"px";
            cards[index].id = index;
            cover = document.createElement("div");
            cover.classList.add("cover");
            cover.classList.add(index);
            document.querySelector(".sideBox").appendChild(cover);
            cover.style.top = (h*170)+"PX";
            cover.style.left = (w*120)+"px";
            index++;
        };
    };

    if (localStorage.attempts == null) {
        localStorage.attempts = 1;
    } else{
        localStorage.attempts = parseInt(localStorage.attempts) + 1;
    };
}

function flipcard(e){
    console.log(e);
    $('.flip').get(0).play();
    classes = e.attr('class').match(/[\d\w-_]+/g);
    card_id = classes[1];
    e.addClass('flippedcover');
    $('#' + card_id).addClass('flipped');
    console.log("class changed");
    setTimeout(checkmatch, 700);
}

///////////

function shuffle(list) {
  var i = list.length, j, tempi, tempj;
    if ( i == 0 ) 
      {return false;}
    while ( i-- ) {
      j = Math.floor( Math.random() * (i + 1));
      tempi = list[i];
      tempj = list[j];
      list[i] = tempj;
      list[j] = tempi;
    }
      return list;
}


function checkmatch(){
    var check = $('.flipped');
    if (check.length >= 2) {
        
        var card1 = check[0];
        console.log(card1);
        id1 = card1.className.match(/[\d\w-_♣♦♥♠]+/g)[1];
        console.log(id1);
        var card2 = check[1];
        id2 = card2.className.match(/[\d\w-_♣♦♥♠]+/g)[1];
        console.log(id2);
        if (id1 == id2) {
            $('.tada').get(0).play();
            $('.flipped').addClass('permflipped');
            $('.permflipped').removeClass('flipped');
            $('.flippedcover').addClass('permflippedcover');
            $('.permflippedcover').removeClass('flippedcover');

        } else {
            $(".flipped").removeClass('flipped');
            $('.flippedcover').removeClass('flippedcover');
        }
        win_check();
        turns = turns + 1;
        turns_counter();
        if (turns >= allowed_turns) {
            alert("You lose!!!");
            turns = 0;
            $(".sideBox").html('');
            turns = 0;
            var deck = createDeck();
            showDeck(deck);
            layout_cards();
            set_controls();
            console.log("Part A");

            $( ".cover" ).click(function() {
                flipcard($(this));
            });
        };
    };
    

}

function set_controls () {
     $('#num_attempts').html("This is attempt # "+ localStorage.attempts);
     turns_counter();
}

function submitName() {
  localStorage.playername = $("#playername").val();
  $("#welcome").html("<p>Welcome " + localStorage.playername + ", Let's play!</p>");
}

/*function saveGame() {
    localStorage.game_state = $('.sideBox').html();
    localStorage.turns = turns;
    console.log("success");
}*/

function turns_counter () {
    $('.remains').html(allowed_turns-turns);
}

function win_check() {
    if ($('.permflippedcover').length == $('.card').length) {
            $('.yay').get(0).play();
            console.log('You win!');
            turns = 0;
            $(".sideBox").html('');
            turns = 0;
            var deck = createDeck();
            showDeck(deck);
            layout_cards();
            set_controls();
            console.log("Part A");
    };
}

/*function promptPlayer() {
    var mode = confirm("Do you want to play in two-player mode?");

    if (mode == true) {

        localStorage.player1 = prompt("Enter Player 1 name:");
        localStorage.player2 = prompt("Enter Player 2 name:");

        if (localStorage.player1 && localStorage.player2 != null) {
            x = "Welcome " + localStorage.player1 + " & " + localStorage.player2 + "! Let's play!";
            document.getElementById("welcome").innerHTML = x;

        } else {
            alert("Please refresh the page and enter names!");
        }

    } else {
        alert("Welcome Single Player!");
        return false;
    }
} */

function showScore() {
   var i;
   var players = [];
   var curPlayer = 0;
   for (i = 0; i < players.length; i += 1) {
      x = '<b>Player ' + (i + 1) + '</b>: matches: ' + players[i].matches + '; turns: ' + players[i].turns;
      document.getElementById('PlayScore').innerHTML = x;
      if (curPlayer === i) {
         document.getElementById('PlayScore').addClass('active');
      } else {
         document.getElementById('PlayScore').removeClass('active');
      }
   }
};


/*
$(document).ready(function(){
  $("#pressplay").click(function(){
    $("gamelayer").toggleClass("gamelayer2");
  });
}); 


  $(document).ready(function() {
   
    $('#1').click(function(){Timeout = 1000;});
    $('#2').click(function(){Timeout = 2000;});
    $('#3').click(function(){Timeout = 3000;});
    $('#pressplay').click(function(){
        
        $('#newGame').css('z-index', -2);
        $("gamelayer").toggleClass("gamelayer2");
      });
   });     
*/
/*
function changeCover(imgName) {
   image = document.querySelector('.cover background');
   image.src = imgName;
}

 function changeCover() {
if (document.querySelector){
 var outerdiv=document.querySelector('.cover1')
 outerdiv.onclick=function(){
  this.querySelector('.cover').style.background="red design.jpg"
 }
 outerdiv.onclick=function(){
  this.querySelector('.cover').style.background="design.jpg"
 }
}
} */
