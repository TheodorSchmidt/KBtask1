var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

String.prototype.strToBin = function() {
    const l = this.length;
    let res = "";
    for (let i = 0; i <= l; i++) {
        let val = this.charCodeAt(i);
        let bin = new String();
        while (val > 0) {
            if (val % 2 == 1) {
                bin += '1';
            } else {
                bin += '0';
            }
            val /= 2;
        }
        res += bin.reverse();
    }
    return res;
}

function readFile(file) {
    let text = "";
    let raw = new XMLHttpRequest();
    raw.open("GET", file, false);
    raw.onreadystatechange = function () {
        if (raw.readyState === 4) {
            if (raw.status === 200 || raw.status == 0) {
                text += raw.responseText;
            }
        }
    }
    raw.send(null);
    return text;
}

let text = new String();
text = readFile("file:///Users/bogdanzaharov/Documents/SSU/KB/Task1/KBtask1/input.txt");
let binText = text.strToBin();
console.log(binText);
let newText = readFile("file:///Users/bogdanzaharov/Documents/SSU/KB/Task1/KBtask1/text.txt");
let ans = "";
let pos = 0;
while (pos < newText.length) {
    if (binText == "") {
        break;
    }
    if (newText[pos] == ' ') {
        if (newText[pos - 1] == ' ' && newText[pos - 2] == ' ') {
            pos += 1;
            continue;
        } else {
            if (newText[pos - 1] == ' ') {
                if (binText[0] == "1") {
                    pos += 1;
                    continue;
                } else {
                    newText = newText.substring(0, pos) + ' ' + newText.substring(pos);
                    binText = binText.slice(1);
                    pos += 1;
                }
            } else {
                if (binText[0] == '1') {
                    newText = newText.substring(0, pos) + '  ' + newText.substring(pos);
                    pos += 1;
                } else {
                    newText = newText.substring(0, pos) + ' ' + newText.substring(pos);
                }
                binText = binText.slice(1);
            }
        }
    }
    pos += 1;
} 

if (binText != "") {
    let s = "";
    while (binText != "") {
        if (binText[0] == "1") {
            s += "  ";
        } else {
            s += " ";
        } 
        binText = binText.slice(1);
    }
    newText += s;
}

console.log(newText);   