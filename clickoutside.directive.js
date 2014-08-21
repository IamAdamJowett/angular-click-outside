angular
    .module('clickOutside', [])
    .directive('clickOutside', ['$document', clickOutside]);

function clickOutside($document) {
    return {
        restrict: 'A',
        scope: {
            clickOutside: '&'
        },
        link: function ($scope, elem, attr) {
            var classList = attr.outsideIfNot.replace(', ', ',').split(',');


            $document.on('click', function (e) {
                var i = 0,
                    element;

                if (!e.target) return;

                for (element = e.target; element; element = element.parentNode) {
                    var classNames = element.className;
                    if (classNames !== undefined) {
                        for (i = 0; i < classList.length; i++) {
                            if (classNames.indexOf(classList[i]) > -1) {
                                return;
                            }
                        }
                    }
                }

                $scope.$eval($scope.clickOutside);
            });
        }
    }
}
