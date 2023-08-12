/**
 *  @NAPIVersion 2.0
 *  @NModuleScope Public
 */

define(['N/search'], function (search) {
    function create(options) {
        return search.create(options);
    }

    function lookupFields(options) {
        return search.lookupFields(options);
    }

    function get(options) {
        return create(options).run().getRange({ start: 0, end: 1000 });
    }

    function getAll(options) {
        var searchResult = create(options).run();
        return getAllResults(searchResult);
    }

    function getOne(options) {
        return create(options).run().getRange({ start: 0, end: 1 });
    }

    function hasAny(options) {
        return getOne(options).length > 0;
    }

    function getAllResults(resultSet) {
        var batch, batchResults, results = [], searchStart = 0;
        if (!resultSet.getRange) {
            resultSet = resultSet.run();
        }

        do {
            batch = resultSet.getRange({ start: searchStart, end: searchStart + 1000} );
            batchResults = (batch || []).map(function (row) {
                searchStart++;
                return row;
            }, this);
            results = results.concat(batchResults);
        } while ((batchResults || []).length === 1000);

        return results;
    }

    return {
        create: create,
        lookupFields: lookupFields,
        get: get,
        getAll: getAll,
        getOne: getOne,
        hasAny: hasAny,
        getAllResults: getAllResults
    };
});
