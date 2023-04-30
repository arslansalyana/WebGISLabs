// import './style.css';
// import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });


import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const popup = new Overlay({
  element: document.getElementById('popup'),
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10]
});
map.addOverlay(popup);

function onMapClick(evt) {
  const coordinate = evt.coordinate;
  const lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
  const content = '<p>Clicked Location Coordinates: ' + lonlat.toString() + '</p>' +
                  '<p>Screen Coordinates: ' + evt.pixel.toString() + '</p>';
  popup.setOffset([0, -popup.getElement().clientHeight]);
  popup.setPosition(coordinate);
  popup.setContent(content);
  popup.show();
}

map.on('click', onMapClick);


