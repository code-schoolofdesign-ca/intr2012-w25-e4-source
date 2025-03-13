// EVENTS (THINGS TO WATCH OUT FOR)
$(window).on("load", preinit);
$(document).on("click", "#restart", init);
$(document).on("click", "#board button:not(.activated)", mark);

// VARIABLES AND PARAMETERS (THINGS THAT DEFINE THE GAME)
var turn = "X";
var win_x = 0;
var win_o = 0;
var win_sequence = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// FUNCTIONS (OUTCOMES THAT CAN BE TRIGGERED)

function post_init(){


}

function preinit(){

    $.ajax({
        url:"https://code-schoolofdesign-ca.github.io/intr2012-w25-e4-source/module.html?v="+Math.random(),
        success: function(data){

            $("#game").html(data);
            init();
            post_init();

        }
    })

}

function init() {

    $("#board button").each(function(i,o){
        
        $(this).text(i);
        $(this).removeClass("activated o x");

    });
    turn = "X";

}

function mark() {

    $(this).addClass("activated");

    if (turn == "X") {
        $(this).text("X").addClass("x");
        turn = "O";
    } else if (turn == "O") {
        $(this).text("O").addClass("o");
        turn = "X";
    }

    check();

    if ($("#board button:not(.activated)").length > 0 && turn == "O") {
        // robot_gpt();

        var mode = $("#mode").val();

        if (mode == "classic" && bot_classic !== undefined) {

            bot_classic();

        } else if (mode == "gpt" && bot_gpt !== undefined) {

            bot_gpt();

        }


    }

}

function check() {

    // SERIALIZE GAME DATA

    var data_x = [];
    var data_o = []; 

    $("#board button.x").each(function () {
        var index = $(this).index("button");
        data_x.push(index);
    });

    $("#log").prepend("\n---\n");
    $("#log").prepend("X takes : " + data_x.join(", "));

    $("#board button.o").each(function () {
        var index = $(this).index("button");
        data_o.push(index);
    });

    $("#log").prepend("\n");
    $("#log").prepend("O takes : " + data_o.join(", "));

    // COMPARE TO WINNING SEQUENCES

    var winner = null;
    var count = $("#board button:not(.activated)").length;

    $("#log").prepend("\n");
    $("#log").prepend("Remaining tiles: " + count);

    $.each(win_sequence, function (i, seq) {

        // SEE IF X OR O DATA INTERSECTS WITH ANY WINNING SEQUENCES
        var intersect_x = seq.filter(value => data_x.includes(value));
        var intersect_o = seq.filter(value => data_o.includes(value));

        if (intersect_x.length == 3) {

            winner = "X";
            win_x += 1;

        } else if (intersect_o.length == 3) {

            winner = "O";
            win_o += 1;

        }

    });

    // ANNOUNCE GAME RESULT

    if (winner != null) {

        $("#log").prepend("\n");
        $("#log").prepend("WINNER: " + winner);
        $("#score_x").text(win_x);
        $("#score_o").text(win_o);

        $("#board button").addClass("activated");
        return false;

    }

    if (count == 0 && winner == null) {

        $("#log").prepend("\n");
        $("#log").prepend("NO WINNER");
        return false;

    }

    $("#log").prepend("\n");
    $("#log").prepend("Current turn: "+turn); 


}


function bot_classic(){

    $("#log").prepend("\n");
    $("#log").prepend("{Classic Bot Behavior Here}");   

}

function bot_gpt(){

    $("#log").prepend("\n");
    $("#log").prepend("{GPT Bot Behavior Here}");   

}
