angular.module("ovh-api-services").service("OvhApiLicenseOfficeDomainLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiLicenseOfficeDomainLexi");
    var queryCache = $cacheFactory("OvhApiLicenseOfficeDomainLexiQuery");

    var domains = $resource("/license/office/:serviceName/domain/:domainName", {
        serviceName: "@serviceName",
        domainName: "@domainName"
    }, {
        query: { method: "GET", isArray: true, cache: queryCache },
        get: { method: "GET", cache: cache }
    });

    domains.resetCache = function () {
        cache.removeAll();
    };

    domains.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return domains;
});
