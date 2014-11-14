/*** ProfileCardView.js ***/

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

    function ProfileCardView(backgroundImageName, displayText, width, height, marginPx) {
        View.apply(this, arguments);

        this.width = width;
        this.height = height;
        this.marginPx = marginPx;
        this.displayText = displayText;
        this.backgroundImageName = backgroundImageName;

        this.overlayTransitionable = new Transitionable(0); 
        this.overlaySurfaceShowing = false;

        _setModifiers.call(this); 
        _createBackground.call(this);
        _setHoverListeners.call(this);

    }

    function _setModifiers() {
        this.overlayModifier = new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionable.get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        });
    }

    ProfileCardView.prototype = Object.create(View.prototype);
    ProfileCardView.prototype.constructor = ProfileCardView;

    ProfileCardView.DEFAULT_OPTIONS = {};

    function _createBackground() {

        this.containerWidth = this.windowWidth - (this.windowWidth/4);
        this.containerHeight = this.windowHeight - (this.windowHeight/4);

       this.containerSurface = new ContainerSurface();
       this.imageSurface = new ImageSurface({
            content: this.backgroundImageName, 
            size: [this.width,this.height], 
            properties: {
                margin: '20px'
            }
       });
       this.overlaySurface = new Surface({
            content: this.displayText,
            size: [this.width, this.height -this.height/4],
            properties: {
                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                textAlign: 'center',
                margin: '20px'
            }
       });
       this.overlayStateModifier = new StateModifier({
            transform: Transform.translate(0, this.height/4, 0)
       });
       this.containerSurface.add(this.imageSurface);
       this.containerSurface.add(this.overlayModifier).add(this.overlayStateModifier).add(this.overlaySurface);
       this.add(this.containerSurface);
       console.log("Card Finsihed");

    }

    function _setHoverListeners() {
        this.containerSurface.on('mouseenter', function() {
            if(!this.overlaySurfaceShowing) {
                this.overlayTransitionable.set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurface.on('mouseleave', function() {
            if(this.overlaySurfaceShowing) {
                this.overlayTransitionable.set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing = false;
                    }.bind(this));
            }
        }.bind(this));
    }

    module.exports = ProfileCardView;
});

