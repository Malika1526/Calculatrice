"use strict";

const container = document.querySelector('.container');
const resultat = document.querySelector('.resultat');
let firstValue = null, operator = null, secondValue = null;
const buttons = [

    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=', '/',
    'ac', 'c',

];

buttons.forEach(element => {

    let btn = document.createElement('button');
    btn.textContent = element;
    btn.addEventListener('click', () => {

        if (btn.textContent === 'c') {

            if (operator === null) {

                firstValue = firstValue.slice(0,-1);
                resultat.textContent = firstValue;

            } else {
    
                secondValue = secondValue.slice(0,-1);
                resultat.textContent = secondValue;

            }

            return
        }

        if (btn.textContent === 'ac') {

            firstValue = null;
            operator = null;
            secondValue = null;
            resultat.textContent = '';
            return;
        }

        if (btn.textContent === '=') {

            if (firstValue !== null && operator !== null && secondValue !== null) {

                const total = new Calculatrice(parseFloat(firstValue), operator, parseFloat(secondValue));
                resultat.textContent = total.calc();
                firstValue = resultat.textContent;
                operator = null;
                secondValue = null;
            }

            return;
        }

        if (isNaN(btn.textContent) && btn.textContent !== '.') {

            operator = btn.textContent;
            return;
        }

        if (operator === null) {

            firstValue = (firstValue || '') + btn.textContent;
            resultat.textContent = firstValue;

        } else {

            secondValue = (secondValue || '') + btn.textContent;
            resultat.textContent = secondValue;

        }
        
        console.log(firstValue, operator, secondValue);
    });

    container.append(btn);

});

class Calculatrice {

    constructor(nb1, operator, nb2) {

        this.nb1 = nb1;
        this.operator = operator;
        this.nb2 = nb2;

    }

    add() {

        return this.nb1 + this.nb2;

    }

    sous() {

        return this.nb1 - this.nb2;

    }

    mult() {

        return this.nb1 * this.nb2;

    }

    div() {

        if (this.nb1 !==0 && this.nb2 !== 0) {

            return this.nb1 / this.nb2;

        } else {

            return "Division impossible";
        }
    }

    calc() {

        switch (this.operator) {

            case "+":
                return this.add();

            case "-":
                return this.sous();

            case "*":
                return this.mult();

            case "/":
                return this.div();
                
            default:
                return "Error";

        }
    }
}