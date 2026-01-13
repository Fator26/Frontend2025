function calculate() {
    var inputElem = document.getElementById('equation');
    var emptyExep = 'emptyEx';
    var operandsEx = 'operandsEx';
    var bracketEx = 'bracketEx';
    var inputValue;
    inputValue = inputElem.value;
    var operands = {
        '+': function (a, b) { return a + b; },
        '-': function (a, b) { return a - b; },
        '−': function (a, b) { return a - b; },
        '*': function (a, b) { return a * b; },
        '/': function (a, b) { return a / b; }
    };
    var parsePn = function (expression) {
        var stringValue = expression.toString().trim();
        if (stringValue.length == 0) {
            return emptyExep;
        }
        var operandsExist = false;
        for (var key in operands) {
            if (stringValue.indexOf(key) !== (-1)) {
                operandsExist = true;
            }
        }
        if (!operandsExist) {
            return operandsEx.toString();
        }
        var bracketCorrect = false;
        var openedBracket = stringValue.split("(");
        var closedBracket = stringValue.split(")");
        if (openedBracket.length === closedBracket.length) {
            bracketCorrect = true;
        }
        if (!bracketCorrect) {
            return bracketEx;
        }
        var resultValue = stringValue;
        while (resultValue.indexOf('(') !== -1)
            resultValue = resultValue.replace('(', ' ');
        while (resultValue.indexOf(')') !== -1)
            resultValue = resultValue.replace(')', ' ');
        return resultValue.trim();
    };
    var calculatePN = function (expression) {
        var tokens = expression.split(/\s+/g);
        return +tokens.reduceRight(function (stack, current) {
            if (current in operands)
                stack.push(operands[current](+stack.pop(), +stack.pop()));
            else
                stack.push(parseInt(current));
            return stack;
        }, []).pop();
    };
    var parsedPn = parsePn(inputValue);
    if (parsedPn === emptyExep)
        printResult("Ну ты введи чего-нибудь для приличия");
    else if (parsedPn === operandsEx)
        printResult("А че, а где вычислять? может плюсик добавим?");
    else if (parsedPn === bracketEx)
        printResult("Иди считай скобки, математег");
    else {
        var calculatedValue = calculatePN(parsedPn);
        if (isNaN(calculatedValue))
            printResult('Че-то все равно не то');
        else
            printResult(calculatedValue.toString());
    }
}
function printResult(resultValue) {
    var messageArea = getMessageArea();
    if (Number(resultValue)) {
        messageArea.textContent = "Ну ты чего. Ошибка жеж.";
    }
    messageArea.textContent = "Решала сказал: " + resultValue;
}
function getMessageArea() {
    return document.getElementById('result_message');
}
