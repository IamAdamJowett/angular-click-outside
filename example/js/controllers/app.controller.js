/* global angular */
(function() {
    'use strict';

    angular.module('exampleApp')
        .controller('AppController', ['$scope', '$document', AppController]);

    function AppController($scope, $document) {
        $scope.closeThis = closeThis;
        
        function closeThis() {
            console.log('clicked outside');
            $scope.showDropdown = false;
        }
    }
})();