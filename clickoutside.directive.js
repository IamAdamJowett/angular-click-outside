(function() {
    'use strict';

    angular
        .module('angular-click-outside', [])
        .directive('clickOutside', ['$document', '$parse', clickOutside]);

    function clickOutside($document, $parse) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {
                var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.replace(', ', ',').split(',') : [],
                    fn = $parse(attr['clickOutside']);

                // add the elements id so it is not counted in the click listening
                if (attr.id !== undefined) {
                    classList.push(attr.id);
                }

                // assign the document click handler to a variable so we can un-register it when the directive is destroyed
                $document.on('click', function(e) {
                    var i = 0,
                        element;

                    // if there is no click target, no point going on
                    if (!e || !e.target) {
                        return;
                    }

                    // loop through the available elements, looking for classes in the class list that might match and so will eat
                    for (element = e.target; element; element = element.parentNode) {
                        var id = element.id,
                            classNames = element.className,
                            l = classList.length;

                        // loop through the elements id's and classnames looking for exceptions
                        for (i = 0; i < l; i++) {
                            // check for id's or classes, but only if they exist in the first place
                            if ((id !== undefined && id.indexOf(classList[i]) > -1) || (classNames && classNames.indexOf(classList[i]) > -1)) {
                                // now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                return;
                            }
                        }
                    }

                    // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                    return $scope.$apply(function () {
                        return fn($scope);
                    });
                });

                // when the scope is destroyed, clean up the documents click handler as we don't want it hanging around
                $scope.$on('$destroy', function() {
                    $document.off('click');
                });
            }
        };
    }
})();
