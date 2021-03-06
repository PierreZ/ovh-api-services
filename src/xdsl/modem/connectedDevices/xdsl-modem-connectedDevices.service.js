angular.module("ovh-api-services").service("OvhApiXdslModemDevices", function ($injector, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiXdslModemDevices");

    return {
        Lexi: angular.noop,
        Aapi: function () {
            return $injector.get("OvhApiXdslModemDevicesAapi");
        },
        resetCache: cache.removeAll,
        cache: cache
    };
});
