/*** ProfileView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Modifier        = require('famous/core/Modifier');
    var Easing          = require('famous/transitions/Easing');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var GridLayout      = require('famous/views/GridLayout');
    var Transitionable  = require('famous/transitions/Transitionable');
    var ContainerSurface= require('famous/surfaces/ContainerSurface');
    var Timer           = require('famous/utilities/Timer');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var ScrollContainer = require('famous/views/ScrollContainer');

    function ProfileView() {
        View.apply(this, arguments);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        _createLayout.call(this);
        _createHeader.call(this);

        _createBackground.call(this);

        _setListeners.call(this);
    }

    ProfileView.prototype = Object.create(View.prototype);
    ProfileView.prototype.constructor = ProfileView;

    ProfileView.DEFAULT_OPTIONS = {};
    function _createLayout() {
        this.headerFooterLayout = new HeaderFooter({
            //start large and then scale with scrolling
            headerSize: this.windowHeight/2
        }); 

        this.pageTransitionable = new Transitionable(0); 

        var layoutModifier = new Modifier({
            size: [undefined, undefined],
            transform: function() {
                var scale = this.pageTransitionable.get();
                return Transform.scale(scale, scale, 10);
            }.bind(this)
        }); 

        this.add(layoutModifier).add(this.headerFooterLayout);

    }
    function _createHeader() {
        this.backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        this.headerTransitionable = new Transitionable(0);

        /*var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });*/

        this.exitButton = new ImageSurface({
            content: 'img/exitButton.png',
            size: [50,50],
            properties: {
                padding: '15px'
            }
        });

        var exitButtonModifier = new StateModifier({
            transform: Transform.translate(0,0,1),
            align: [0.95, 0]
        });

        this.headerFooterLayout.header.add(this.backgroundSurface);
        this.headerFooterLayout.header.add(exitButtonModifier).add(this.exitButton);

    }
    function _createBackground() {
        this.backbackSurface = new Surface({
            properties: {
                backgroundColor: 'white'
            }
        })

        this.scrollContainer = new ScrollContainer();

        var surfaces = [];
        for(var i = 0; i < 5; i++) {
            surfaces.push(new Surface({
                content: "I am surface" + (i+1),
                properties: {
                    backgroundColor: 'white'
                }
            }));
            surfaces[i].pipe(this.scrollContainer); 
        }

        this.scrollContainer.sequenceFrom(surfaces);
        this.headerFooterLayout.content.add(this.backbackSurface);
        this.headerFooterLayout.content.add(this.scrollContainer);

    }


        /*
        this.popupGrid = new GridLayout({
            dimensions: [4, 2]
        });

       

        this.containerWidth = this.windowWidth - (this.windowWidth/4);
        this.containerHeight = this.windowHeight - (this.windowHeight/4);

        var marginPx = 40;

        var width = this.containerWidth/4 - marginPx;
        var height = this.containerHeight/2 - marginPx;


        var surfaces = [];
        this.popupGrid.sequenceFrom(surfaces);

        for(var i = 0; i < 8; i++) {
            surfaces.push(new Surface({
                content: "I am panel " + (i + 1),
                size: [width,height],
                properties: {
                    backgroundColor: "white",
                    color: "black",
                    textAlign: 'center',
                    margin: '20px'
                }
            }));
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
    }*/

    function _setListeners() {
        this.exitButton.on('click', function() {
            this.hide()
        }.bind(this));
    }

    ProfileView.prototype.show = function () {
        this.pageTransitionable.set(1, {
            duration: 500,
            curve: Easing.outBack
        });
    };

    ProfileView.prototype.hide = function () {
        this.pageTransitionable.set(0, {
            duration: 100,
            curve: Easing.out
        });
    };

    module.exports = ProfileView;
});

