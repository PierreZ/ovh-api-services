angular.module("ovh-api-services").service("OvhApiDedicatedHousing", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiDedicatedHousingLexi");
        }
    };
});
