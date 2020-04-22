import {Person} from './Person.js';
import {ValuesHandler} from './ValuesHandler.js';
import {
    MAX_PEOPLE,
    HEALTH,
    VALUES,
    RUN
} from './constants.js';

let canvas;
let people = [];
var handlerValue;
let cycle = 0;

const cavasSimulator = ( sketch ) => {

    sketch.setup = () => {
        canvas = sketch.createCanvas(900, 500);
        canvas.parent('canvas');

        handlerValue = new ValuesHandler();
        generatePeople();
        handlerValue.initValues(people)
    };
    
    sketch.draw = () => {
        sketch.background('#1f2831');
        drawPeople();

        cycle++;
        if (VALUES.healthy === 0) {
            // RUN = false;
            handlerValue.showResult(cycle);
            sketch.noLoop();
        }
        
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