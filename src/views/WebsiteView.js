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


    function WebsiteView() {
        View.apply(this, arguments);

        this.episodesViewShowing = false;
        this.episodesButtonHighlighted = false;

        _createBackground.call(this);
        _createButtons.call(this);
        _createTitle.call(this);
        //_createHeaderButtons.call(this);
        _createEpisodesView.call(this);

        _setListeners.call(this);

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
            align : [.5, 0.8]
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
            transform: Transform.translate(0, 0, 1)
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

    function _setListeners() {
        this.showEpisodesButtonContainer.on('mouseover', function() {
            if(!this.episodesButtonHighlighted) {
                this.showEpisodesButtonTransistionable.set(1, {
                    duration: 100,
                    curve: Easing.inOutQuart
                }, function() {
                    this.episodesButtonHighlighted = true;
                }.bind(this));
            }
        }.bind(this));

        this.showEpisodesButtonContainer.on('mouseout', function() {
            if(this.episodesButtonHighlighted && !this.episodesViewShowing) {
                this.showEpisodesButtonTransistionable.set(0, {
                    duration: 100,
                    curve: Easing.inOutQuart
                }, function () {
                    this.episodesButtonHighlighted = false;
                }.bind(this));
            }

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
                }, function () {
                    this.episodesButtonHighlighted = false;
                }.bind(this));
            }
        }.bind(this));
    }

    module.exports = WebsiteView;
});

