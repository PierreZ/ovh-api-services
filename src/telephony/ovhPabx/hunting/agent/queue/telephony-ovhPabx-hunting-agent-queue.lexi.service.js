angular.module("ovh-api-services").service("OvhApiTelephonyOvhPabxHuntingAgentQueueLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiTelephonyOvhPabxHuntingAgentQueueLexi");
    var queryCache = $cacheFactory("OvhApiTelephonyOvhPabxHuntingAgentQueueLexiQuery");

    var interceptor = {
        response: function (response) {
            cache.remove(response.config.url);
            queryCache.removeAll();
            return response.resource;
        }
    };

    var res = $resource("/telephony/:billingAccount/ovhPabx/:serviceName/hunting/agent/:agentId/queue/:queueId", {
        billingAccount: "@billingAccount",
        serviceName: "@serviceName",
        agentId: "@agentId",
        queueId: "@queueId"
    }, {
        query: {
            method: "GET",
            isArray: true,
            cache: queryCache
        },
        get: {
            method: "GET",
            cache: cache
        },
        create: {
            url: "/telephony/:billingAccount/ovhPabx/:serviceName/hunting/agent/:agentId/queue",
            method: "POST",
            interceptor: interceptor
        },
        change: {
            method: "PUT",
            interceptor: interceptor
        },
        remove: {
            method: "DELETE",
            interceptor: interceptor
        }
    });

    res.resetCache = function () {
        cache.removeAll();
    };

    res.resetQueryCache = function () {
        queryCache.removeAll();
    };

    res.resetAllCache = function () {
        this.resetCache();
        this.resetQueryCache();
    };

    return res;
});
