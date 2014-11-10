define(function(require, exports, module) {
    var Engine  = require('famous/core/Engine');
    var WebsiteView = require('views/WebsiteView');

    var mainContext = Engine.createContext();
    var websiteView = new WebsiteView();

    mainContext.add(websiteView);
});