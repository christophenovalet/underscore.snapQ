//  Underscore.snapQ
//  (c) 2014 Christophe Novalet
//  Documentation: https://github.com/chsneo/underscore.snapQ
//  Version '1.0.1'

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
        //
        toCommaString: function (array, property, delimiter) {
            property = property || 'id';
            delimiter = delimiter || ',';
            _.pluck(array, property).join(delimiter);
        }

    });

})();


