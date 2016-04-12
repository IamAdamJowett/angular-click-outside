/*global angular*/

(function() {
    'use strict';

    angular
        .module('angular-click-outside', [])
        .directive('clickOutside', ['$document', '$parse', '$timeout', clickOutside]);

    function clickOutside($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {
                
                // postpone linking to next digest to allow for unique id generation
                $timeout(function() {
                    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.replace(/, /g, ',').split(',') : [],
                        fn;

                    // add the elements id so it is not counted in the click listening
                    if (attr.id !== undefined) {
                        classList.push(attr.id);
                    }

                    function eventHandler(e) {

                        // check if our element already hidden and abort if so
                        if (angular.element(elem).hasClass("ng-hide")) {
                            return;
                        }

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

                            // Unwrap SVGAnimatedString classes
                            if (classNames && classNames.baseVal !== undefined) {
                                classNames = classNames.baseVal;
                            }

                            // loop through the elements id's and classnames looking for exceptions
                            for (i = 0; i < l; i++) {
                                // If there are multiple classes on element, check each of them
                                if (classNames.indexOf(" ") > 0) {
                                    var classNamesArr = classNames.split(" ");
                                    for (e = 0; e < classNamesArr.length; e++) {
                                        // exit out if _isAllowed returns true, as it is an element that has been defined as being ignored for clicking outside
                                        if (_isAllowed(id, classNamesArr[e], classList[i])) return;
                                    }
                                } else {
                                    // exit out if _isAllowed returns true, as it is an element that has been defined as being ignored for clicking outside
                                    if (_isAllowed(id, classNames, classList[i])) return;
                                }
                            }
                        }

                        // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                        $scope.$apply(function() {
                            fn = $parse(attr['clickOutside']);
                            fn($scope);
                        });
                    }

                    // if the devices has a touchscreen, listen for this event
                    if (_hasTouch()) {
                        $document.on('touchstart', eventHandler);
                    }

                    // still listen for the click event even if there is touch to cater for touchscreen laptops
                    $document.on('click', eventHandler);

                    // when the scope is destroyed, clean up the documents event handlers as we don't want it hanging around
                    $scope.$on('$destroy', function() {
                        if (_hasTouch()) {
                            $document.off('touchstart', eventHandler);
                        }

                        $document.off('click', eventHandler);
                    });

                    // private function that checks for exact matches on id's or classes, but only if they exist in the first place
                    function _isAllowed(id, className, allowedIdOrClassName) {                        
                        if ((id !== undefined && id === allowedIdOrClassName) || (className && className === allowedIdOrClassName)) {
                            return true;
                        }
                        return false;
                    }

                    // private function to attempt to figure out if we are on a touch device
                    function _hasTouch() {
                        // works on most browsers, IE10/11 and Surface
                        return 'ontouchstart' in window || navigator.maxTouchPoints;
                    };
                });
            }
        };
    }
})();
