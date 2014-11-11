/*** EpisodesView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Modifier        = require("famous/core/Modifier");
    var Easing          = require('famous/transitions/Easing');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var GridLayout      = require("famous/views/GridLayout");



    function EpisodesView() {
        View.apply(this, arguments);

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        _createBackground.call(this);

        _setListeners.call(this);
    }

    EpisodesView.prototype = Object.create(View.prototype);
    EpisodesView.prototype.constructor = EpisodesView;

    EpisodesView.DEFAULT_OPTIONS = {};

    function _createBackground() {
        this.popupGrid = new GridLayout({
            dimensions: [4, 2]
        });


        this.containerWidth = this.windowWidth - (this.windowWidth/3);
        this.containerHeight = this.windowHeight - (this.windowHeight/4);

        var marginPx = 10;

        var width = this.containerWidth/4 - 10;
        var height = this.containerHeight/2 - 10;

        this.popupGridModifier = new StateModifier ({
            transform: Transform.translate(0, 0, -1)
        });

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
                    margin: '5px'
                }
            }));
        }

        this.add(new Modifier({
            size: [this.containerWidth, this.containerHeight],
            origin: [.5, .5],
            align: [.5, .5]
        })).add(this.popupGridModifier).add(this.popupGrid);
    }

    function _setListeners() {

    }

    EpisodesView.prototype.show = function () {
        this.popupGridModifier.setTransform(Transform.translate(0, 0, 5), {
            duration: 1000,
            curve: Easing.outBack
        });
    };

    module.exports = EpisodesView;
});

