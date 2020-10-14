let phrase = "Praktyka czyni mistrza";
phrase = phrase.toUpperCase();
let phraseHidden = "";
let letters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];
let failCounter = 0;

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
        let element = "let" + i;
        alphabet += '<div class="letter" onclick="check('+i+')"id="'+element+'">' + letters[i] + '</div>';
        if ((i + 1) % 7 == 0) {
            alphabet = alphabet + `<div style="clear:both;"></div>`;
        }
    }

    document.getElementById("alphabet").innerHTML = alphabet;

    putLetter();
}

String.prototype.setChar = function(place, char) {
    if (place > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, place) + char + this.substr(place+1);
    }
}

function check(nr) {
    let hit = false;


    for (i=0; i<phrase.length; i++) {
        if (phrase.charAt (i) == letters[nr]) {
            phraseHidden = phraseHidden.setChar(i, letters[nr]);
            hit = true;
        }
    }

    if (hit == true) {
        let element = "let" + nr;   
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        putLetter();
    } else {
        let element = "let" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";

        failCounter++;
        let image = "img/s" + failCounter + ".jpg";
        document.getElementById('gibbet').innerHTML = '<img src="'+image+'" alt="">';
    }

    
}

window.onload = start;

console.log(alphabet)