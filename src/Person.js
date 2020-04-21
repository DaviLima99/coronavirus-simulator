import {
    PEOPLE_COLORS,
    HEALTH,
    SPEED
} from './constants.js';

export class Person {
    constructor(x, y, id, state, p5) {
        this.timeInfected = 0;
        this.time = 0;
        this.id = id;
        this.state = state;
        this.p5 = p5;
        this.radius = 8;
        this.pos = {
            x: x,
            y: y
        }
    }

    countRecover = function () {
        if (this.state === HEALTH.infected) {
            this.timeInfected++;
            this.timeRecover++;
        } else {
            this.timeRecover = 0;
        }

        if (this.timeInfected > 4000) {
            this.changeState(HEALTH.death);
        }

        if (this.timeRecover > 1000) {
            this.changeState(HEALTH.recovered);
        }
    }

    checkContact = function(people) {
        for (var i = 0; i < people.length; i++) {   

            for (var j = 0; j < people.length; j++) {
                if (i != j && people[i].intersects(people[j])) {

                    if (people[i].state !== HEALTH.death) {
                        people[i].applyInfect(people[j]);
                        people[j].applyInfect(people[i]);
                    }

                }
            }
        }
    }

    applyInfect = function (person) {
        if (this.state === HEALTH.healthy && person.state === HEALTH.infected) {
            this.changeState(HEALTH.infected)
            return;
        }

        if (this.state === HEALTH.infected && person.state === HEALTH.infected) {
            this.timeInfected = 0;
        }

    }

    intersects = function(other) {
        var d = this.p5.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

        if (d < this.radius + other.radius) {
            return true; 
        } else {
            return false;
        }
    
    }
    
    changeState = function (newState) {
        this.state = newState;
    }

    move = function() {

        if (this.state === HEALTH.death) {
            return;
        }
        
        this.pos.x += this.p5.random(-SPEED, SPEED);
        this.pos.y += this.p5.random(-SPEED, SPEED);
    }

    getColor = function() {
        switch (this.state) {
            case HEALTH.healthy:
                return PEOPLE_COLORS.healthy;
            case HEALTH.infected:
                return PEOPLE_COLORS.infected;
            case HEALTH.recovered:
                return PEOPLE_COLORS.recovered;
            case HEALTH.death:
                return PEOPLE_COLORS.death;
            default:
                return PEOPLE_COLORS.healthy;
        }
    }

    show = function () {
        const color = this.getColor();
        this.p5.stroke(50);
        this.p5.fill(color);
        this.p5.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }
}
