angular.module("ovh-api-services").service("OvhApiIpLoadBalancingFarmLexi", function ($resource, $cacheFactory) {
    "use strict";

    var queryCache = $cacheFactory("OvhApiIpLoadBalancingFarmLexiQuery");

    var iplbFarm = $resource("/ipLoadbalancing/:serviceName/definedFarms", {
        serviceName: "@serviceName"
    }, {
        query: { method: "GET", isArray: true, cache: queryCache }
    });

    iplbFarm.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return iplbFarm;
});

_.forEach(["tcp", "udp", "http"], function (type) {
    "use strict";

    var farmType = _.capitalize(type);
    angular
        .module("ovh-api-services")
        .service("OvhApiIpLoadBalancingFarm" + farmType + "Lexi",
                 ["$resource", "$cacheFactory", function ($resource, $cacheFactory) {
                     var cache = $cacheFactory("OvhApiIpLoadBalancingFarm" + farmType + "Lexi");
                     var queryCache = $cacheFactory("OvhApiIpLoadBalancingFarm" + farmType + "LexiQuery");

                     var interceptor = {
                         response: function (response) {
                             cache.remove(response.config.url);
                             queryCache.removeAll();
                             return response.resource;
                         }
                     };

                     var iplbFarm = $resource("/ipLoadbalancing/:serviceName/" + type + "/farm/:farmId", {
                         serviceName: "@serviceName",
                         farmId: "@farmId"
                     }, {
                         query: { method: "GET", isArray: true, cache: queryCache },
                         get: { method: "GET", cache: cache },
                         post: { method: "POST", interceptor: interceptor },
                         put: { method: "PUT", interceptor: interceptor },
                         "delete": { method: "DELETE", interceptor: interceptor }
                     });

                     iplbFarm.resetCache = function () {
                         cache.removeAll();
                     };

                     iplbFarm.resetQueryCache = function () {
                         queryCache.removeAll();
                     };

                     return iplbFarm;
                 }]);
});
