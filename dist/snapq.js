//  Underscore.snapQ
//  (c) 2014 Christophe Novalet
//  Documentation: https://github.com/chsneo/underscore.snapQ
//  Version '1.0.3'

(function () {
    _.mixin({
        //Navigate to the next array item (rotation)
        nextItem: function (array, item) {
            var index = _.indexOf(array, item),
                length = array.length - 1;

            if (index < length) {
                return array[index + 1];
            } else {
                return _.first(array);
            }
        },

        //Navigate to the previous array item (rotation)
        previousItem: function (array, item) {
            var index = _.indexOf(array, item);

            if (index > 0) {
                return array[index - 1];
            } else {
                return _.last(array);
            }
        },

        //Finds an item by value for a given key and returns the items index
        keyIndex: function (array, key, value) {
            var item = _.findWhere(array, {key: value});

            var index = _.indexOf(array, item);

            if (index === -1) {
                return null;
            }

            return index;
        },

        //pluck allowing to retrieve multiple properties
        //usage: _.pluckMany(array, "key1, "key2");
        pluckMultiple: function () {
            var args = _.rest(arguments, 1);
            return _.map(arguments[0], function (item) {
                var obj = {};
                _.each(args, function (arg) {
                    obj[arg] = item[arg];
                });
                return obj;
            });
        },

        //Filters out objects using an array of values for a given key
        //usecase: Filter out objects by a list of ids
        //usage: _.rejectValues(array, [1,2,3], 'id')
        rejectMultiple: function (array, unwantedValues, key) {
            return _.reject(array, function (item) { return unwantedValues.indexOf(item[key]) != -1; })
        },

        //Keeps objects using an array of values for a given key
        //usecase: Find objects by a list of ids
        //usage: _.findValues(array, [1,2,3], 'id')
        findMultiple: function (array, wantedValues, key) {
            return _.filter(array, function (item) { return wantedValues.indexOf(item[key]) != -1; })
        },

        //Converts arrays to comma delimted strings
        toCommaString: function (array, property, delimiter) {
            property = property || 'id';
            delimiter = delimiter || ',';
            return  _.pluck(array, property).join(delimiter);
        },

        //Toggles array values (usefull for checkbox lists)
        addToggle: function (array, value, property) {
            array = array || [];
            var itemExists;

            //check if array contains value
            if (!property) {
                itemExists = _.indexOf(array, function (item) {
                    return item === value;
                });

                //yes remove it
                if (itemExists > -1) {
                    return _.filter(array, function (item) {
                        return item !== value;
                    })
                }
            } else {
                itemExists = _.find(array, function (item) {
                    return item[property] === value[property];
                });

                //yes remove it
                if (itemExists) {
                    return _.filter(array, function (item) {
                        return item[property] !== value[property];
                    })
                }
            }

            //no add it
            array.push(value);

            return array;
        },

        //deletes array items
        deleteItem: function (array, item) {
            var i = array.indexOf(item);
            if (i != -1) {
                array.splice(i, 1);
            }
        },

        //Move to snapT.js
        //Extracts Hours from date string
        //Formats :  "13 juin 212, 15:00:00" OR "13 juin 212, 3:00:00 PM"
        getTime: function (string) {
            var hh = '00', mm = '00', ss = '00';
            var stringArray, hourSection, isPM, splittedHours, lastSection, is24;

            try {
                //check format
                stringArray = string.split(' ');
                lastSection = _.last(stringArray);

                if (lastSection === 'AM' || lastSection === 'am') {
                    hourSection = _.previousItem(stringArray, lastSection);
                } else if (lastSection === 'PM' || lastSection === 'pm') {
                    hourSection = _.previousItem(stringArray, lastSection);
                    isPM = true;
                } else {
                    hourSection = lastSection;
                    is24 = true;
                }

                splittedHours = hourSection.split(':');

                hh = parseInt(splittedHours[0]);

                if (!is24 && !isPM && hh === 12) hh = 0; //12am
                else if (!is24 && !isPM) {} //12 pm
                else if (!is24 && isPM && hh === 12) hh = 12; //12 pm
                else if (!is24) hh += 12; //3pm = 15

                mm = parseInt(splittedHours[1]);
                ss = parseInt(splittedHours[2]);
            } catch (error) {
                console.error('! unable to parse ' + string)
            }

            return{ hh: hh, mm: mm, ss: ss }
        },

        //Returns elapsed seconds or milliseconds between 2 dates
        elapsedTime: function (olderDate, newerDate) {

            var taDate = new Date(olderDate);
            var tbDate = new Date(newerDate);

            var result = (tbDate.getTime() - taDate.getTime());

            return { milliseconds: result, seconds: result / 1000 };
        },

        //Removes undefined properties from object
        compactObject: function (obj, deleteProperty) { //todo accept array
            var clone = _.clone(obj);
            _.each(clone, function (v, k) {
                if (!v)
                    delete clone[k];
                else if (deleteProperty && k == deleteProperty) {
                    delete clone[k];
                }
            });
            return clone;
        }
    });
})();