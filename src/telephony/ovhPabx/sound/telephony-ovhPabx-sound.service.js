angular.module("ovh-api-services").service("OvhApiTelephonyOvhPabxSound", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiTelephonyOvhPabxSoundLexi");
        }
    };
});
