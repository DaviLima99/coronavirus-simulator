import {
    HEALTH,
    VALUES
} from './constants.js';


export class ValuesHandler {

    initValues = function (people) {

        people.forEach(person => {
            switch (person.state) {
                case HEALTH.healthy:
                    VALUES.healthy++;
                    break;
                case HEALTH.infected:
                    VALUES.infected++;
                    break;      
                default:
                    break;
            }
        });

        this.update();
    }

    addValue = function (next, old) {
        VALUES[next]++;
        VALUES[old]--;

        this.update();
    }
    
    
    update = function() {
        this.forEach(VALUES, function (value, prop, obj) {
            document.getElementById(prop).innerHTML = value;
        });
    }

    
    forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };
}