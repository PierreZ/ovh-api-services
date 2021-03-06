angular.module("ovh-api-services").service("OvhApiDedicatedNashaPartitionAccessAapi", function ($resource, $cacheFactory) {

    "use strict";

    var cache = $cacheFactory("OvhApiDedicatedNashaPartitionAccessAapi");

    var instancesResource = $resource("/dedicated/nasha/:serviceName/partition/:partitionName", {
        serviceName: "@serviceName",
        partitionName: "@partitionName"
    }, {
        authorizableIps: {
            url: "/dedicated/nasha/:serviceName/partition/:partitionName/authorizableIps",
            isArray: true,
            cache: cache,
            method: "GET",
            serviceType: "aapi"
        }
    });

    return instancesResource;

});
