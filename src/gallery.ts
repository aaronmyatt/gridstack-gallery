import './style.css';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';
import { GridItemHTMLElement, GridStackNode } from 'gridstack/dist/types';

import * as PubSub from 'pubsub-js';
import Utils from './utils';

const GSG_DEFAULT_RENDER_SELECTOR = '.gsg';
const GSG_IMAGES_SELECTOR = '#gsg-images';

enum Topics {
  SWAP_ITEM = 'gsg.swap.image',
}

type SwapTopic = {
  el: GridItemHTMLElement;
};

interface GSGConfig {
  selector: string;
  images: string[];
  gridItemTemplate: (src?: string) => string;
}

export default function GridStackGallery(
  config: GSGConfig = {
    selector: GSG_DEFAULT_RENDER_SELECTOR,
    images: [],
    gridItemTemplate: (src) =>
      `<img class="cursor-pointer rounded-lg object-cover" src="${src}" />`,
  }
): GridStack {
  config = processConfig(config);
  let grid = initialiseGrid(config);
  grid = createGridItems(grid, config);
  grid.compact();
  grid = setupGridEvents(grid);
  return grid;
}

function processConfig(config: GSGConfig): GSGConfig {
  if (config.images.length > 0) {
    // user has passed images
  } else {
    // check dom for .gsg-images json
    const jsonTemplate = document.querySelector(GSG_IMAGES_SELECTOR);
    if (jsonTemplate && jsonTemplate.textContent) {
      config.images = JSON.parse(jsonTemplate.textContent);
    }
  }

  return config;
}

function initialiseGrid(config: GSGConfig) {
  /*
    Initialise Grid inside target element
    disableOneColumnMode - Prevents the grid from automatically
      squeezing every grid item into a uniform columnar layout
      on devices below 700ish pixels
    margin - let every grid item sit right next to one another
  */
  const grid = GridStack.init(
    {
      disableOneColumnMode: true,
      margin: '1px',
    },
    config.selector
  );
  return grid;
}

function createGridItems(grid: GridStack, config: GSGConfig): GridStack {
  /* 
  Create a fixed number of small (2x2) grid items
  with placeholder images
  */
  const batcher = grid.batchUpdate();
  for (let src of config.images) {
    console.log(src);
    grid.addWidget({
      content: config.gridItemTemplate(src),
      h: 2,
      w: 2,
    });
  }
  const firstItem = Utils.first(batcher.getGridItems());
  firstItem && batcher.update(firstItem, { h: 8, w: 8 });
  batcher.commit();
  return grid;
}

function setupGridEvents(grid: GridStack): GridStack {
  /*
    Iterate gridItems, attach event listeners
  */
  grid.getGridItems().forEach(function (item: GridItemHTMLElement) {
    setupGalleryItemClickListeners(item);
  });

  /*
    Reset all items to standard size
    Enlarge clicked item
  */
  PubSub.subscribe(Topics.SWAP_ITEM, function (_topic, data: SwapTopic) {
    const batcher = grid.batchUpdate();
    for (const gridItem of grid.getGridItems()) {
      if (gridItem === data.el) {
        batcher.update(gridItem, { w: 8, h: 8 });

        // how can we incorporate the following conditional
        // into the above update call?
        // perhaps check which column the item is occupying?
        //  Then we can determine whether increasing to a width of 8
        //  will cause the item to exceed the bounds of the parent grid

        if (((gridItem.gridstackNode as GridStackNode)?.w || 0) < 8) {
          grid.update(gridItem, { x: 2, y: 2, w: 8, h: 8 });
        }
      } else {
        batcher.update(gridItem, { w: 2, h: 2 });
      }
    }
    batcher.commit();
    grid.compact();
  });

  return grid;
}

function setupGalleryItemClickListeners(gridItem: GridItemHTMLElement) {
  gridItem.addEventListener('click', function () {
    gridItem.querySelectorAll('img').forEach(() => {
      PubSub.publish(Topics.SWAP_ITEM, {
        el: gridItem,
      } as SwapTopic);
    });
  });
}

if (typeof window !== undefined) {
  GridStackGallery();
}
