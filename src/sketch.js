import {Person} from './Person.js';
import {ValuesHandler} from './ValuesHandler.js';
import {
    MAX_PEOPLE,
    HEALTH,
    VALUES
} from './constants.js';

let people = [];
var handlerValue;

const cavasSimulator = ( sketch ) => {

    sketch.setup = () => {
        var canvas = sketch.createCanvas(900, 500);
        handlerValue = new ValuesHandler();
        canvas.parent('canvas');
        generatePeople();
        handlerValue.initValues(people)
    };
    
    sketch.draw = () => {
        sketch.background('#1f2831');
        drawPeople();
    };

    const getRandomState = () => {
        var arrHealth = [
            HEALTH.infected,
            HEALTH.healthy
        ];

        return arrHealth[Math.floor(Math.random() * arrHealth.length)];
    }

    const generatePeople =  () => {
        const qntd = MAX_PEOPLE;

        for (let index = 0; index < qntd; index++) {
            var x = sketch.random(sketch.width);
            var y = sketch.random(sketch.height);
            people.push(new Person(
                x, y, index, getRandomState(), sketch, handlerValue
            ));

        }
    }

    const drawPeople = () => {
        people.forEach(person => {
            person.checkContact(people);
            person.move();
            person.countRecover();
            person.show();
        });  
    }
  };

let myp5 = new p5(cavasSimulator);