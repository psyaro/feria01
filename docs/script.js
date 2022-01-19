// 計算用数値を入れる変数１
let num1 = 0;
// 計算用数値を入れる変数２
let num2 = 0;
// 計算用演算子を入れる変数
let ope = "";
// 表示用数値を入れる変数
let dispnum = "0";
// 表示用演算子を入れる変数
let dispope = "";
// 演算子が押されたかどうか（次に数字を押した時だけ表示数値をリセットする）
let judgenum = false;
// 演算子が二回以上押されたかどうか（二度目以降に演算子を押されたら一度計算する）
let judgeope = false;
// イコールが押されたかどうか
let judgeequal = false;
// 数値が10桁を超えないようにする
let countnum = 0;
// エラーが出た際のボタン押下制限
let judgeerror = false;
// 0を入力した際に別の数値で上書きさせない
let judgezero = false;

// ディスプレイ左側（数値）表示用の関数
function displaytext() {
    // html上の要素取得
    let resulttext = document.getElementById("resulttext");
    // 該当要素に表示
    resulttext.innerHTML = dispnum;
}

// ディスプレイ右側（演算子）表示用の関数
function displayoperator() {
    // html上の要素取得
    let resultoperator = document.getElementById("resultoperator");
    // 該当要素に表示
    resultoperator.innerHTML = dispope;
}

// 計算用変数に入力された値を基に計算する関数
function calc() {
    if(ope === "+") {
        if(num1 + num2 < 10000000000 && num1 + num2 > -10000000000) {
            num1 += num2;
            num1 = Math.round(num1 * 100000000) / 100000000;
        } else {
            num1 = "ERROR 01";
            judgeerror = true;
        }
    } else if(ope === "-") {
        if(num1 - num2 < 10000000000 && num1 - num2 > -10000000000) {
            num1 -= num2;
            num1 = Math.round(num1 * 100000000) / 100000000;
        } else {
            num1 = "ERROR 01";
            judgeerror = true;
        }
    } else if(ope === "×") {
        if(num1 * num2 < 10000000000 && num1 * num2 > -10000000000) {
            num1 *= num2;
            num1 = Math.round(num1 * 100000000) / 100000000;
        } else {
            num1 = "ERROR 01";
            judgeerror = true;
        }
    } else if(ope === "÷") {
        if(num1 === 0 && num2 === 0) {
            num1 = "ERROR 04"
            judgeerror = true;
        } else if(num2 === 0) {
            num1 = "ERROR 03"
            judgeerror = true;
        } else if(num1 / num2 < 10000000000 && num1 / num2 > -10000000000) {
            num1 /= num2;
            num1 = Math.round(num1 * 100000000) / 100000000;
        } else {
            num1 = "ERROR 01";
            judgeerror = true;
        }
    } else {
        num1 = "ERROR 02"
        judgeerror = true;
    }
}

// 最初に数値0、演算子を表示しない状態にしておく処理
displaytext();

displayoperator();

// 入力に対する処理
function functionId(id) {
    // クリアを押した際に無条件で全て初期化する処理
    if(id === "C"){
        countnum = 0;
        num1 = 0;
        num2 = 0;
        ope = "";
        dispnum = "0";
        dispope = "";
        judgenum = false;
        judgeope = false;
        judgeequal = false;
        judgeerror = false;
        judgezero = false;
        displaytext();
        displayoperator();
    // クリア以外のボタンが押され、かつエラーが出力されていない場合、処理を行う
    } else if(judgeerror === false) {
        // 演算子が押された際の処理
        if(id === "+" || id === "-" || id === "×" || id === "÷") {
            // 直前に押されたのが数値である場合のみ処理
            if(judgenum === false) {
                countnum = 0;
                judgezero = false;
                // 演算子を押されたのが1回目だった場合の処理
                if(judgeope === false) {
                    num1 = Number(dispnum);
                    ope = id;
                    dispope = id;
                    judgenum = true;
                    judgeope = true;
                    judgeequal = false;
                    displayoperator();
                // 演算子を押されたのが2回目以降だった場合の処理
                } else {
                    num2 = Number(dispnum);
                    calc();
                    dispnum = num1;
                    displaytext();
                    ope = id;
                    dispope = id;
                    judgenum = true;
                    displayoperator();
                }
            // 演算子を連続で2回以上押した場合、処理を行わない
            } else {
                ;
            } 
        // =が押された場合の処理
        } else if(id === "=") {
            // 演算子が入力されており、かつ直前に入力したのが演算子ではない場合のみ処理を行う
            if(ope !== "" && judgenum === false) {
                countnum = 0;
                num2 = Number(dispnum);
                judgeope = false;
                judgeequal = true;
                judgezero = false;
                calc();
                dispnum = num1;
                ope = "";
                dispope = "";
                displaytext();
                displayoperator();
            }
        // 表示が0で、かつ入力されたのが0である場合の処理（最初に0を入力した際に別の数値で上書きさせない）
        } else if(dispnum === "0" && id === "0") {
            countnum++;
            dispnum = id;
            judgezero = true;
            displaytext();
        // 表示されているのが0で、かつ入力が0ではない場合の処理（初期値0を入力された数値で上書き）
        } else if(dispnum === "0" && judgezero === false) {
            countnum++;
            dispnum = id;
            displaytext();
        // 入力されたのが0で、かつ直前に演算子が押され、かつ入力が0ではない場合（num2の最初の数値として0を入力した際に別の数値で上書きさせない）
        } else if(id === "0" && judgenum === true && judgezero === false) {
            countnum++;
            dispnum = id;
            judgenum = false;
            judgezero = true;
            displaytext();
        // 上記の条件以外で、入力されたものが0~9の場合の処理
        } else {
            // 文字数が10文字以内の場合のみ、処理を行う
            if(countnum < 10 && judgezero === false) {
                // 演算子を押した直後でない場合の処理
                if(judgenum === false && judgeequal === false) {
                    countnum++;
                    dispnum += id;
                    displaytext();
                // 演算子を押した直後である場合の処理
                } else {
                    if(id === "0") {
                        judgezero = true;
                    }
                    countnum++;
                    dispnum = id;
                    judgenum = false;
                    judgeequal = false;
                    displaytext();
                }
            }
        }
    }
}
