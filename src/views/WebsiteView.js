/*** WebsiteView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var ContainerSurface= require('famous/surfaces/ContainerSurface');
    var Modifier        = require("famous/core/Modifier");
    var Easing          = require('famous/transitions/Easing');
    var Transitionable  = require('famous/transitions/Transitionable');
    var Timer           = require('famous/utilities/Timer');


    var EpisodesView    = require('views/EpisodesView');
    var ProfilesView    = require('views/ProfilesView');
    var ProfileView     = require('views/ProfileView');


    function WebsiteView() {
        View.apply(this, arguments);

        this.episodesViewShowing = false;
        this.episodesButtonHighlighted = false;

        _createBackground.call(this);
        _createButtons.call(this);
        _createTitle.call(this);
        _createEpisodesView.call(this);
        _createProfilesView.call(this);
        _setListeners.call(this);

         //_createHeaderButtons.call(this);

    }

    WebsiteView.prototype = Object.create(View.prototype);
    WebsiteView.prototype.constructor = WebsiteView;

    WebsiteView.DEFAULT_OPTIONS = {
    };

    function _createBackground() {
        this.backgroundSurface = new ImageSurface({
            size: [undefined, undefined],
            content: 'img/Cover.png'
        });

        this.add(this.backgroundSurface);
    }

    function _createButtons() {
        this.showEpisodesButtonContainer = new ContainerSurface({
            size: [160,45]
        });

        this.showEpisodesButton = new ImageSurface({
            size: [undefined,undefined],
            content: 'img/ViewEpisodesButton.png'
        });

        this.showEpisodesButtonHighlighted = new ImageSurface({
            size: [undefined,undefined],
            content: 'img/ViewEpisodesButtonPressed.png'
        });

        var showEpisodesButtonModifier = new StateModifier({
            origin: [.5, 0.8],
            align : [.4, 0.8]
        });

        this.showEpisodesButtonTransistionable = new Transitionable(0);

        var modifier = new Modifier({
            origin: [0.5, 0.8],
            align: [0.5, 0.8],
            transform: function() {
                // cache the value of transitionable.get()
                // to optimize for performance
                var scale = this.showEpisodesButtonTransistionable.get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        });

        this.showEpisodesButtonContainer.add(this.showEpisodesButton);
        this.showEpisodesButtonContainer.add(modifier).add(this.showEpisodesButtonHighlighted);

        this.add(showEpisodesButtonModifier).add(this.showEpisodesButtonContainer);
        ///////////////////////////
        this.showProfilesButtonConatiner = new ContainerSurface({
            size: [160, 45]
        });

        this.showProfilesButton = new ImageSurface({
            size: [undefined, undefined],
            content: 'img/ViewEpisodesButton.png'
        });

        this.showProfilesButtonHighlighted = new ImageSurface({
            size: [undefined, undefined],
            content: 'img/ViewEpisodesButtonPressed.png'
        });

        var showProfilesButtonModifier = new StateModifier({
            origin: [0.5, 0.8],
            align: [0.6, 0.8]
        });

        this.showProfilesButtonTransitionable = new Transitionable(0);

        var modifier2 = new Modifier({
            origin: [0.5, 0.8],
            align: [0.5, 0.8],
            transform: function() {
                var scale = this.showProfilesButtonTransitionable.get();
                return Transform.scale(scale, scale, 1);
            }.bind(this)
        });

        this.showProfilesButtonConatiner.add(this.showProfilesButton);
        this.showProfilesButtonConatiner.add(modifier2).add(this.showProfilesButtonHighlighted);

        this.add(showProfilesButtonModifier).add(this.showProfilesButtonConatiner);

    }

    //begin Jonathan edits
    function _createTitle() {
        this.titleSurface = new Surface({
            size: [true, true],
            content: 'THE<br>VENTURED<br>LIFE',
            properties: {
                fontFamily: 'Trebuchet MS',
                color: 'white', 
                padding: '10px',
                fontSize: '200%'
            }
        });
        var titleSurfaceModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(titleSurfaceModifier).add(this.titleSurface);
    }

    function _createHeaderButtons() {
        this.headerButtonsContainer = new ContainerSurface();

        this.homeButton = new Surface({
            size: [true, true],
            content: '<div id="webviewbuttons">HOME</div>',
        });
        this.headerButtonsContainer.add(this.homeButton);

        this.aboutButton = new Surface({
            size: [true, true],
            content: '<div id="webviewbuttons">ABOUT</div>',
        });
        var aboutButtonModifier = new StateModifier({
            transform: Transform.translate(150, 0, 0)
        });
        this.headerButtonsContainer.add(aboutButtonModifier).add(this.aboutButton);

        this.followUsButton = new Surface({
            size: [true, true],
            content: '<div id="webviewbuttons">FOLLOW US</div>',
        });
        var followUsButtonModifier = new StateModifier({
            transform: Transform.translate(300, 0, 0)
        });
        this.headerButtonsContainer.add(followUsButtonModifier).add(this.followUsButton);

        var headerButtonsContainerModifier = new StateModifier({
            align: [0.6, 0]
        });

        this.add(headerButtonsContainerModifier).add(this.headerButtonsContainer);
    }

    function _createEpisodesView() {
       this.episodesView = new EpisodesView();
        this.add(this.episodesView);
    }

    //creates ProfilesView
    function _createProfilesView() {
        this.profilesView = new ProfilesView();
        this.add(this.profilesView);
    }

    function _setListeners() {
        this.showEpisodesButtonContainer.on('mouseenter', function() {
                this.showEpisodesButtonTransistionable.set(1, {
                    duration: 200,
                    curve: Easing.inOutQuart
                });
        }.bind(this));

        this.showEpisodesButtonContainer.on('mouseleave', function() {
                this.showEpisodesButtonTransistionable.set(0, {
                    duration: 200,
                    curve: Easing.inOutQuart
                });
        }.bind(this));

        this.showEpisodesButtonContainer.on('click', function() {
            if(!this.episodesViewShowing) {
                this.showEpisodesButtonTransistionable.set(1);
                this.episodesView.show();
                this.episodesViewShowing = true;
            } else {
                this.episodesView.hide();
                this.episodesViewShowing = false;
            }
        }.bind(this));

        this.backgroundSurface.on('click', function() {
            if(this.episodesViewShowing) {
                this.episodesView.hide();
                this.episodesViewShowing = false;

                this.showEpisodesButtonTransistionable.set(0, {
                    duration: 200,
                    curve: Easing.inOutQuart
                });
            }
            if(this.profilesViewShowing) {
                this.profilesView.hide();
                this.profilesViewShowing = false;

                this.showProfilesButtonTransitionable.set(0, {
                    duration: 200,
                    curve: Easing.inOutQuart
                });
            }
        }.bind(this));

        this.showProfilesButtonConatiner.on('mouseenter', function() {
                this.showProfilesButtonTransitionable.set(1, {
                    duration: 200,
                    curve: Easing.inOutQuart
                });
        }.bind(this));

        this.showProfilesButtonConatiner.on('mouseleave', function() {
                this.showProfilesButtonTransitionable.set(0, {
                    duration: 200,
                    curve: Easing.inOutQuart
                });
        }.bind(this));

         this.showProfilesButtonConatiner.on('click', function() {
            if(!this.profilesViewShowing) {
                this.showProfilesButtonTransitionable.set(1);
                this.profilesView.show();
                this.profilesViewShowing = true;
            } else {
                this.profilesView.hide();
                this.profilesViewShowing = false;
            }
        }.bind(this));

    }

    module.exports = WebsiteView;
});

