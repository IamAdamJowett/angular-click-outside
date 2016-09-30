/* global angular */
(function() {
    'use strict';

    angular.module('exampleApp')
        .controller('AppController', ['$scope', '$document', AppController]);

    function AppController($scope, $document) {
        $scope.closeThis = closeThis;
        
        $scope.data = {
            availableOptions: [{
                id: '1',
                name: 'Option A'
            }, {
                id: '2',
                name: 'Option B'
            }, {
                id: '3',
                name: 'Option C'
            }],
            selectedOption: {
                id: '3',
                name: 'Option C'
            } //This sets the default value of the select in the ui
        };

        function closeThis() {
            console.log('clicked outside');
            $scope.showDropdown = false;
        }
    }
})();