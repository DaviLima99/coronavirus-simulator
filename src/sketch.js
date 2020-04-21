import {Person} from './Person.js';
import {
    MAX_PEOPLE,
    HEALTH
} from './constants.js';

let people = [];

const cavasSimulator = ( sketch ) => {
  
    sketch.setup = () => {
        var canvas = sketch.createCanvas(900, 500);
        canvas.parent('canvas');
        generatePeople();
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
        const qntd = 30;

        for (let index = 0; index < qntd; index++) {
            var x = sketch.random(sketch.width);
            var y = sketch.random(sketch.height);
            people.push(new Person(
                x, y, index, getRandomState(), sketch
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