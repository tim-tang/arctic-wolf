define(function(require, exports, module) {

    var GLOBAL_CONSTANT = {

        WS_HOST: 'http://localhost:5000',

        // ----------------- Define Security Resources -------------------//
        /**
         *  Resource that need be authorized
         */
        SECURITY_RESOURCES: ['#dashboard/', '#vehicle-mgmt/', '#user-group-mgmt/', '#user-mgmt/', '#role-mgmt/', '#privilege-mgmt/', '#criteria-mgmt/', '#generic-filter/'],
        /**
         * Resource that is public
         */
        PUBLIC_RESOURCES: ['', '#security/login', '#security/forgot-password', '#security/reset-password'],
        /**
         * Cancelled access resources while user authenticated.
         */
        CANCELLED_WHILE_AUTH_DONE: ['#security/login'],
    };

    module.exports = GLOBAL_CONSTANT;
});
