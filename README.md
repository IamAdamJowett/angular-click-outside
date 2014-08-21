angular-click-outside
=====================

An angular directive to detect a click outside of an elements scope. Great for closing dialogues, drawers and off screen menu's etc.

###Usage

To use this directive, ensure the element you want to close has an id (not class) assigned. Id's are needed as multiple elements may have the same class. Add the directive via the `click-outside` attribute, and give exceptions via the `outside-if-not` attribute.

Basic example:
    
    <div class="menu" id="main-menu" click-outside>
        ...
    </div>
    
With exceptions example:
    
    <button id="my-button">Menu Trigger Button</button>
    <div class="menu" id="main-menu" click-outside outside-if-not="my-button">
        ...
    </div>
    
You can also assign a callback function by adding it to the `click-outside` attribute:

    <button id="my-button">Menu Trigger Button</button>
    <div class="menu" id="main-menu" click-outside="closeThis()" outside-if-not="my-button">
        ...
    </div>
    
Where `closeThis()` is the function assigned to the scope via the controller such as:

    angular
        .module('myApp')
        .controller('MenuController', ['$scope', MenuController]);
        
    function MenuController($scope) {
        $scope.closeThis = function () {
            console.log('closing');
        }
    }
    
    <button id="my-button">Menu Trigger Button</button>
    <div ng-controller="MenuController">
        <div class="menu" id="main-menu" click-outside="closeThis()" outside-if-not="my-button">
            ...
        </div>
    </div>