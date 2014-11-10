/*** WebsiteView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Easing          = require('famous/transitions/Easing');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var ContainerSurface= require('famous/surfaces/ContainerSurface');
 //   var EpisodesView    = require('views/EpisodesView');



    function WebsiteView() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createButtons.call(this);
        _createTitle.call(this);
        _createHeaderButtons.call(this);
     //   _createEpisodesView.call(this);

        _setListeners.call(this);

    }

    WebsiteView.prototype = Object.create(View.prototype);
    WebsiteView.prototype.constructor = WebsiteView;

    WebsiteView.DEFAULT_OPTIONS = {
    };

    function _createBackground() {
        this.backgroundSurface = new ImageSurface({
            size: [undefined, undefined],
            content: 'img/Cover.jpg'
        });

        this.add(this.backgroundSurface);
    }

    function _createButtons() {
        this.showEpisodesButton = new ImageSurface({
            size: [160,45],
            content: 'img/ViewEpisodesButton.png'
        });

        var showEpisodesButtonModifier = new StateModifier({
            origin: [.5, 0.8],
            align : [.5, 0.8]
        }); 

        this.add(showEpisodesButtonModifier).add(this.showEpisodesButton);
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
      /* var toBackground = new StateModifier({
            transform: Transform.translate(0,0,-10)
        });
        this.add(toBackground).add(this.episodesView2); */
    } 

    function _setListeners() {
        //emitters
        this.showEpisodesButton.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));
    }

    module.exports = WebsiteView;
});

