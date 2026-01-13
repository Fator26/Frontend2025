function calculate(): void {
    const inputElem = <HTMLInputElement>document.getElementById('equation');
    const emptyExep = 'emptyEx';
    const operandsEx = 'operandsEx';
    const bracketEx = 'bracketEx';
    let inputValue: string;
    inputValue = inputElem.value;

    const operands = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '−': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    const parsePn = expression => {
        const stringValue = expression.toString().trim();
        if (stringValue.length == 0) {
            return emptyExep;
        }

        let operandsExist = false;
        for (const key in operands) {
            if (stringValue.indexOf(key) !== (-1)) {
                operandsExist = true;
            }
        }
        if (!operandsExist) {
            return operandsEx.toString();
        }
        let bracketCorrect: boolean = false;
        const openedBracket = stringValue.split("(");
        const closedBracket = stringValue.split(")");
        if (openedBracket.length === closedBracket.length) {
            bracketCorrect = true;
        }

        if (!bracketCorrect) {
            return bracketEx;
        }

        let resultValue: string = stringValue;
        while (resultValue.indexOf('(') !== -1)
            resultValue = resultValue.replace('(', ' ');

        while (resultValue.indexOf(')') !== -1)
            resultValue = resultValue.replace(')', ' ');

        return resultValue.trim();
    };

    const calculatePN = expression => {
        const tokens = expression.split(/\s+/g);
        return +tokens.reduceRight((stack, current) => {
            if (current in operands)
                stack.push(operands[current](+stack.pop(), +stack.pop()));
            else
                stack.push(parseInt(current));
            return stack;
        }, []).pop();
    };

    const parsedPn: string = parsePn(inputValue);

    if (parsedPn === emptyExep)
        printResult("Ну ты введи чего-нибудь для приличия")
    else if (parsedPn === operandsEx)
        printResult("А че, а где вычислять? может плюсик добавим?")
    else if (parsedPn === bracketEx)
        printResult("Иди считай скобки, математег")
    else {

        const calculatedValue = calculatePN(parsedPn);
        if (isNaN(calculatedValue))
          printResult('Че-то все равно не то')
        else
          printResult(calculatedValue.toString());
    }
}

function printResult(resultValue: string): void {
    const messageArea = getMessageArea();
    if (Number(resultValue)) {
        messageArea.textContent = "Ну ты чего. Ошибка жеж."
    }
    messageArea.textContent = "Решала сказал: " + resultValue;
}

function getMessageArea(): HTMLParagraphElement {
    return <HTMLParagraphElement>document.getElementById('result_message');
}