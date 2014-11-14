/*** ProfilesView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Modifier        = require("famous/core/Modifier");
    var Easing          = require('famous/transitions/Easing');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var GridLayout      = require("famous/views/GridLayout");
    var Transitionable  = require('famous/transitions/Transitionable');
    var ContainerSurface= require('famous/surfaces/ContainerSurface');
    var Timer           = require('famous/utilities/Timer');

    var ProfileView     = require('views/ProfileView');
    var ProfileCardView = require('views/ProfileCardView');

    function ProfilesView() {
        View.apply(this, arguments);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.profileCardArray = [];
        this.profileArray = [];

        _createBackground.call(this);
        _setListeners.call(this);
        _createProfileView.call(this);
    }
    function _createProfileView() {
        for(var i = 0; i < 8; i++) {
            this.profileArray.push(new ProfilesView(i));
            this.add(this.profileView[i]); 
        }
    }

    ProfilesView.prototype = Object.create(View.prototype);
    ProfilesView.prototype.constructor = ProfilesView;

    ProfilesView.DEFAULT_OPTIONS = {};

    function _createBackground() {

        this.backgroundSurface = new Surface ({
            size: [undefined,undefined],
            properties: {
                backgroundColor: "rgba(112,112,112, 0.8)"
            }
        });

        this.popupGrid = new GridLayout({
            dimensions: [4, 2]
        });

        this.gridTransitionable = new Transitionable(0);

        this.containerWidth = this.windowWidth - (this.windowWidth/4);
        this.containerHeight = this.windowHeight - (this.windowHeight/4);

        var marginPx = 40;

        var width = this.containerWidth/4 - marginPx;
        var height = this.containerHeight/2 - marginPx;


        this.popupGrid.sequenceFrom(this.profileCardArray);

        for(var i = 0; i < 8; i++) {
            this.profileCardArray.push(new ProfileCardView('img/tempPhoto.jpg', 'I am a surface', width, height, this.marginPx));
        }

        var popupModifier = new Modifier({
            size: [this.containerWidth, this.containerHeight],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: function() {
                // cache the value of transitionable.get()
                // to optimize for performance
                var scale = this.gridTransitionable.get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        });

        var backgroungModifier = new Modifier({
            size: [this.containerWidth, this.containerHeight],
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: function() {
                // cache the value of transitionable.get()
                // to optimize for performance
                var scale = this.gridTransitionable.get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        });

        this.add(backgroungModifier).add(this.backgroundSurface);
        this.add(popupModifier).add(this.popupGrid);
    }
    function _setListeners() {
        for(var i = 0; i < 8; i++) {
            this.profileCardArray[i].containerSurface.on('click', function() {
                this.profileView[i].show(); 
            }.bind(this));
        }   
    }

    ProfilesView.prototype.show = function () {
        this.gridTransitionable.set(1, {
            duration: 500,
            curve: Easing.outBack
        });
    };

    ProfilesView.prototype.hide = function () {
        this.gridTransitionable.set(0, {
            duration: 100,
            curve: Easing.out
        });
    };

    module.exports = ProfilesView;
});

