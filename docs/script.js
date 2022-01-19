let num1 = null;
let reset_flug = false;

function displaytext(disp) {
    document.getElementById("resulttext").innerHTML = disp;
}
function addText(disp) {
    if (document.getElementById("resulttext").innerHTML === '0'){
        displaytext(disp);
        return;
    }
    document.getElementById("resulttext").innerHTML = 
        document.getElementById("resulttext").innerHTML + disp;
}

function displayoperator(disp) {
    document.getElementById("resultoperator").innerHTML = disp;
}

function calc(o, n1, n2) {
    console.log(o, n1, n2);
    // せっかく関数があるのでローカルな変数と戻り値を設定したい
    // 想定されないopeでcalc関数が実行されるのは想定しにくいのでelseは冗長かもしれない
    // 関数が短くなるように早期リターンをするようにした
    // 桁オーバーの処理はできれば分離したい
    if(o === "+") {
        n1 += n2;
    } else if(o === "-") {
        n1 -= n2;
    } else if(o === "×") {
        n1 *= n2;
    } else if(o === "÷") {
        if(n1 === 0 && n2 === 0) {
            return "ERROR 04";
        } else if(n2 === 0) {
            return "ERROR 03";
        }
        n1 /= n2;
    }
    if(n1 > 10000000000 && n1 < -10000000000){
        return "ERROR 01";        
    }
    return Math.round(n1 * 100000000) / 100000000;

}

function functionId(id) {
    if(id === "C"){
        num1 = null;
        displaytext('0');
        displayoperator('');
        return
    }

    if(id === "+" || id === "-" || id === "×" || id === "÷" || id === "=") {
        if(document.getElementById("resultoperator").innerHTML === "="){
            displayoperator(id);
            return
        }
        reset_flug = true;
        if (num1 === null){
            num1 = Number(document.getElementById("resulttext").innerHTML);
            displayoperator(id);
            return;
        }
        num1 = calc(
            document.getElementById("resultoperator").innerHTML, // 演算子
            num1, // 記憶領域
            Number(document.getElementById("resulttext").innerHTML) // 表示
        ); // 戻り値は計算結果数値あるいはエラーコード文字列。エラーコードの場合はERRORを含む。
        displaytext(num1);
        displayoperator(id);
        return;        
    }

    if(reset_flug === true) {
        displaytext(id);
        reset_flug = false;
        return;
    }
    addText(id);
}
