/*** EpisodesView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Easing          = require('famous/transitions/Easing');
    var ImageSurface    = require('famous/surfaces/ImageSurface');


    function EpisodesView() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createButtons.call(this);

        _setListeners.call(this);
    }

    EpisodesView.prototype = Object.create(View.prototype);
    EpisodesView.prototype.constructor = EpisodesView;

    EpisodesView.DEFAULT_OPTIONS = {
    };

    function _createBackground() {
        this.backgroundSurface = new Surface({
            size: [1, undefined],
            properties: {
                backgroundColor: "rgba(12,12,12, 0.5)"
            }
        });

        var backgroundModifier = new StateModifier({
            origin: [.5, 0.5],
            align : [.5, 0.5]
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

    function _setListeners() {
        //emitters
        this.showEpisodesButton.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));
    }

    module.exports = WebsiteView;
});

