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

    function ProfilesView() {
        View.apply(this, arguments);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.containerSurfaces = [];
        this.imageSurfaces = [];
        this.overlaySurfaces = [];
        this.modifiersForOverlay = [];
        this.overlayTransitionables = [];
        this.overlayModifiers = [];
        this.overlaySurfaceShowing = [];
        for(var i = 0; i < 9; i++) {
            this.overlayTransitionables.push(new Transitionable(0));

            this.overlaySurfaceShowing.push(false);
        }

        _setModifiers.call(this); 
        _createBackground.call(this);
        _setListeners.call(this);
        _setHoverListeners.call(this);
        _createProfileView.call(this);
    }
    function _createProfileView() {
        this.profileView = new ProfileView();
        this.add(this.profileView);
    }
    //Mike this is driving me crazy. If I do it with just a loop it will throw an error saying it can't access it
    //so this is my terrible solution so I can stop looking at it, aka put it in a collapsable function
    function _setModifiers() {
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[0].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[1].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[2].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[3].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[4].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[5].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[6].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
        this.overlayModifiers.push(new Modifier({
            transform: Transform.translate(0, 0, 0),
            transform: function() {
                var scale = this.overlayTransitionables[7].get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        }));
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


        this.popupGrid.sequenceFrom(this.containerSurfaces);

        for(var i = 0; i < 8; i++) {
            var tempContainerSurface = new ContainerSurface();

            this.imageSurfaces.push(new ImageSurface({
                content: 'img/tempPhoto.jpg', 
                size: [width,height], 
                properties: {
                    margin: '20px'
                }
            }));

            this.overlaySurfaces.push(new Surface({
                content: " I am the overlay for " + (i +1),
                size: [width, height - height/4],
                properties: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    textAlign: 'center',
                    margin: '20px'
                }
            }));

            this.tempModifier = new StateModifier({
                transform: Transform.translate(0, height/4, 0),
            });
            tempContainerSurface.add(this.imageSurfaces[i]);
            tempContainerSurface.add(this.overlayModifiers[i]).add(this.tempModifier).add(this.overlaySurfaces[i]);
            
            this.containerSurfaces.push(tempContainerSurface);
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
    //again this is frustrating the hell out of me. Spent more than 2 hours trying to debug this and just wanted something
    //functional so I just stuck this ridiculously long piece of code in here. If you can get the loop to work, great, I don't
    //even care at this point
    function _setHoverListeners() {
        this.containerSurfaces[0].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[0]) {
                this.overlayTransitionables[0].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[0] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[0].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[0]) {
                this.overlayTransitionables[0].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[0] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 2
        this.containerSurfaces[1].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[1]) {
                this.overlayTransitionables[1].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[1] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[1].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[1]) {
                this.overlayTransitionables[1].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[1] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 3
        this.containerSurfaces[2].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[2]) {
                this.overlayTransitionables[2].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[2] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[2].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[2]) {
                this.overlayTransitionables[2].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[2] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 4
        this.containerSurfaces[3].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[3]) {
                this.overlayTransitionables[3].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[3] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[3].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[3]) {
                this.overlayTransitionables[3].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[3] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 5
        this.containerSurfaces[4].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[4]) {
                this.overlayTransitionables[4].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[4] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[4].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[4]) {
                this.overlayTransitionables[4].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[4] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 6
        this.containerSurfaces[5].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[5]) {
                this.overlayTransitionables[5].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[5] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[5].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[5]) {
                this.overlayTransitionables[5].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[5] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 7
        this.containerSurfaces[6].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[6]) {
                this.overlayTransitionables[6].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[6] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[6].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[6]) {
                this.overlayTransitionables[6].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[6] = false;
                    }.bind(this));
            }
        }.bind(this));
        //Panel 8
        this.containerSurfaces[7].on('mouseenter', function() {
            if(!this.overlaySurfaceShowing[7]) {
                this.overlayTransitionables[7].set(1, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[7] = true;
                    }.bind(this));
            }
        }.bind(this));
        this.containerSurfaces[7].on('mouseleave', function() {
            if(this.overlaySurfaceShowing[7]) {
                this.overlayTransitionables[7].set(0, {duration: 0, curve: Easing.inOutQuart},
                    function() {
                        this.overlaySurfaceShowing[7] = false;
                    }.bind(this));
            }
        }.bind(this));
    }
    function _setListeners() {
        this.containerSurfaces[0].on('click', function() {
            this.profileView.show(); 
        }.bind(this));
        /*this.showEpisodesButtonContainer.on('click', function() {
            if(!this.episodesViewShowing) {
                this.showEpisodesButtonTransistionable.set(1);
                this.episodesView.show();
                this.episodesViewShowing = true;
            } else {
                this.episodesView.hide();
                this.episodesViewShowing = false;

            }
        }.bind(this));*/ 
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

