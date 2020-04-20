import {Person} from './Person.js';
import {
    MAX_PEOPLE,
    HEALTH
} from './constants.js';

let people = [];

const cavasSimulator = ( sketch ) => {
  
    sketch.setup = () => {
        var canvas = sketch.createCanvas(710, 400);
        canvas.parent('canvas');
        generatePeople();
    };
    
    sketch.draw = () => {
        sketch.background(60);
        drawPeople();
    };

    const getRandomState = () => {
        return 'healthy'
    }

    const generatePeople =  () => {
        const qntd = 20;

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
            person.show();
        });
    }
  };

let myp5 = new p5(cavasSimulator);