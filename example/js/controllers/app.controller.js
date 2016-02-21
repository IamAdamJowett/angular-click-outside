/* global angular */
(function() {
    'use strict';

    angular.module('exampleApp')
        .controller('AppController', ['$scope', '$document', AppController]);

    function AppController($scope, $document) {
        $scope.feedback = '';
        $scope.closeThis = closeThis;
        
        function closeThis() {
            console.log('clicked outside');
            $scope.feedback = 'clicked outside';
        }
        
        $document.on('mousedown', function (e) {
            $scope.feedback = '';
        });
    }
})();