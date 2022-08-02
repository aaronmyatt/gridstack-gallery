"use strict";
exports.__esModule = true;
exports.GridStackGallery = void 0;
var gridstack_1 = require("gridstack");
require("gridstack/dist/gridstack.min.css");
require("gridstack/dist/h5/gridstack-dd-native");
var PubSub = require("pubsub-js");
var utils_1 = require("./utils");
var GSG_DEFAULT_RENDER_SELECTOR = '.gsg';
var GSG_IMAGES_SELECTOR = '#gsg-images';
var Topics;
(function (Topics) {
    Topics["SWAP_ITEM"] = "gsg.swap.image";
})(Topics || (Topics = {}));
function GridStackGallery(config) {
    if (config === void 0) { config = {
        selector: GSG_DEFAULT_RENDER_SELECTOR,
        images: [],
        gridItemTemplate: function (src) {
            return "<img class=\"cursor-pointer rounded-lg object-cover\" src=\"".concat(src, "\" />");
        }
    }; }
    config = processConfig(config);
    var grid = initialiseGrid(config);
    grid = createGridItems(grid, config);
    grid.compact();
    grid = setupGridEvents(grid);
    return grid;
}
exports.GridStackGallery = GridStackGallery;
function processConfig(config) {
    if (config.images.length > 0) {
        // user has passed images
    }
    else {
        // check dom for .gsg-images json
        var jsonTemplate = document.querySelector(GSG_IMAGES_SELECTOR);
        if (jsonTemplate && jsonTemplate.textContent) {
            config.images = JSON.parse(jsonTemplate.textContent);
        }
    }
    return config;
}
function initialiseGrid(config) {
    /*
      Initialise Grid inside target element
      disableOneColumnMode - Prevents the grid from automatically
        squeezing every grid item into a uniform columnar layout
        on devices below 700ish pixels
      margin - let every grid item sit right next to one another
    */
    var grid = gridstack_1.GridStack.init({
        disableOneColumnMode: true,
        margin: '1px'
    }, config.selector);
    return grid;
}
function createGridItems(grid, config) {
    /*
    Create a fixed number of small (2x2) grid items
    with placeholder images
    */
    var batcher = grid.batchUpdate();
    for (var _i = 0, _a = config.images; _i < _a.length; _i++) {
        var src = _a[_i];
        console.log(src);
        grid.addWidget({
            content: config.gridItemTemplate(src),
            h: 2,
            w: 2
        });
    }
    var firstItem = utils_1["default"].first(batcher.getGridItems());
    firstItem && batcher.update(firstItem, { h: 8, w: 8 });
    batcher.commit();
    return grid;
}
function setupGridEvents(grid) {
    /*
      Iterate gridItems, attach event listeners
    */
    grid.getGridItems().forEach(function (item) {
        setupGalleryItemClickListeners(item);
    });
    /*
      Reset all items to standard size
      Enlarge clicked item
    */
    PubSub.subscribe(Topics.SWAP_ITEM, function (_topic, data) {
        var _a;
        var batcher = grid.batchUpdate();
        for (var _i = 0, _b = grid.getGridItems(); _i < _b.length; _i++) {
            var gridItem = _b[_i];
            if (gridItem === data.el) {
                batcher.update(gridItem, { w: 8, h: 8 });
                // how can we incorporate the following conditional
                // into the above update call?
                // perhaps check which column the item is occupying?
                //  Then we can determine whether increasing to a width of 8
                //  will cause the item to exceed the bounds of the parent grid
                if ((((_a = gridItem.gridstackNode) === null || _a === void 0 ? void 0 : _a.w) || 0) < 8) {
                    grid.update(gridItem, { x: 2, y: 2, w: 8, h: 8 });
                }
            }
            else {
                batcher.update(gridItem, { w: 2, h: 2 });
            }
        }
        batcher.commit();
        grid.compact();
    });
    return grid;
}
function setupGalleryItemClickListeners(gridItem) {
    gridItem.addEventListener('click', function () {
        gridItem.querySelectorAll('img').forEach(function () {
            PubSub.publish(Topics.SWAP_ITEM, {
                el: gridItem
            });
        });
    });
}
