angular.module("ovh-api-services").service("OvhApiTelephonyTask", function ($injector) {
    "use strict";
    return {
        Lexi: function () {
            return $injector.get("OvhApiTelephonyTaskLexi");
        }
    };
});
