let phrasesArray = ["Łódź", "Wrocław", "Warszawa", "Lublin", "Kraków", "Białystok", "Katowice", "Elbląg", "Wałbrzych", "Bytom", "Gdańsk", "Szczecin", "Bydgoszcz"];
let random = Math.floor(Math.random() * phrasesArray.length);
let phrase = phrasesArray[random].toUpperCase();

let phraseHidden = "";
let letters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];
let failCounter = 0;

let yes = new Audio("yes.wav");
let no = new Audio("no.wav");

for (i = 0; i < phrase.length; i++) {
    if (phrase.charAt(i) == ' ') {
        phraseHidden += ' ';
    } else {
        phraseHidden += '-';
    }
}

function putLetter() {
    document.getElementById("board").innerHTML = phraseHidden;
}

function start() {
    let alphabet = "";

    for (i = 0; i <= 34; i++) {
        let element = "letter" + i;
        alphabet += '<div class="letter" onclick="check(' + i + ')"id="' + element + '">' + letters[i] + '</div>';
        if ((i + 1) % 7 == 0) {
            alphabet = alphabet + `<div style="clear:both;"></div>`;
        }
    }

    document.getElementById("alphabet").innerHTML = alphabet;
    putLetter();
}

String.prototype.setChar = function (place, char) {
    if (place > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, place) + char + this.substr(place + 1);
    }
}

function check(nr) {
    let hit = false;

    for (i = 0; i < phrase.length; i++) {
        if (phrase.charAt(i) == letters[nr]) {
            phraseHidden = phraseHidden.setChar(i, letters[nr]);
            hit = true;
        }
    }

    if (hit == true) {
        yes.play();
        let element = "letter" + nr;

        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        putLetter();
    } else {
        no.play();
        let element = "letter" + nr;

        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        failCounter++;
        let image = "img/s" + failCounter + ".jpg";
        document.getElementById('gibbet').innerHTML = '<img src="' + image + '" alt="">';
    }

    //win
    if (phraseHidden == phrase) {
        document.getElementById('alphabet').innerHTML = "Udało się! Podano prawidłowe hasło: " + phrase + '<br><br><span class="reset" onclick="location.reload()">Jeszcze raz?</span>'
    }

    //lose
    if (failCounter >= 9) {
        document.getElementById('alphabet').innerHTML = "Przegrana! Podano prawidłowe hasło: " + phrase + '<br><br><span class="reset" onclick="location.reload()">Jeszcze raz?</span>'
    }
}

window.onload = start;