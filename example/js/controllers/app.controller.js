/* global angular */
(function() {
    'use strict';

    angular.module('exampleApp')
        .controller('AppController', AppController);

    function AppController($scope) {
        $scope.closeThis = closeThis;
        
        function closeThis() {
            console.log('clicked outside');
        }
    }
})();