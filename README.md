#angular-click-outside

An angular directive to detect a click outside of an elements scope. Great for closing dialogues, drawers and off screen menu's etc.

###Recent changes

- Shortened bower description to remove bower warning on install (thanks @jcubic)
- Thanks to @Lorelei for the pull request to pass the event back in the callback function
- Thanks to @CosticaPuntaru for the improvement to now allow the directive to no longer need an id on the element for this to work
- Added basic ngdocs documentation
- Removed the addition of the element id to the classes array as now it no longer needs to be checked

###Roadmap

- Addition of outside-if attribute. Ability to restrict click outside registering to defined elements (opposite of outside-if-not) rather than anywhere outside an element
- Look into the worth of converting directive to Angular 1 component
- Conversion of directive to Angular 2 component

###Installation

There are two easy ways to install the clickoutside directive:

#### Manual download

Download the `clickoutside.directive.js` file, and include it in your index.html file with something like:

    <script type="text/javascript" src="/path/to/clickoutside.directive.js"></script>

Also be sure to include the module in your app.js file with:

    angular.module('yourAppName', ['angular-click-outside'])
    
####npm

    npm install @iamadamjowett/angular-click-outside

####Bower

    bower install angular-click-outside --save

###Usage

The directive will work with either id's or classes, however be wary of using classes as quite often some unwanted elements may have the same class, and so will be excluded/included unintentionally. 

If you are sure that you want to exclude/include all elements with a class however the directive will work just fine as it looks through the classNames as well as looking at the given id list.

General though ID's will suffice, but instances of dynamically inserted list items may require the use of classes.

Add the directive via the `click-outside` attribute, and give exceptions via the `outside-if-not` attribute.

Basic example:

    <div class="menu" click-outside="closeThis">
        ...
    </div>

This is of little use though without a callback function to do something with that click:

    <div class="menu" click-outside="closeThis()">
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
        <div class="menu" click-outside="closeThis()" outside-if-not="my-button">
            ...
        </div>
    </div>

###Adding Exceptions
You can also add exceptions via the `outside-if-not` tag, which executes the callback function, but only if the id's or classes listed aren't clicked.

In this case `closeThis()` will be called only if clicked outside _and_ #my-button wasn't clicked as well (note .my-button also would be an exception). This can be great for things like slide in menus that might have a button outside of the menu scope that triggers it:

    <button id="my-button">Menu Trigger Button</button>
    <div class="menu" id="main-menu" click-outside="closeThis()" outside-if-not="my-button">
        ...
    </div>

You can have more than one exception by comma delimiting a list such as:

	<button id="my-button">Menu Trigger Button</button>
    <div class="menu" id="main-menu" click-outside="closeThis()" outside-if-not="my-button, another-button">
        ...
    </div>
	<button id="another-button">A second trigger button</button>
