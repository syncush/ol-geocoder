console.log('Ol v' + ol.util.VERSION);

// Instantiate with photon, little button
const geocoderGlass = new Geocoder('nominatim', {
  provider: 'photon',
  targetType: 'glass-button',
  lang: 'en',
  placeholder: 'Search in proton',
  limit: 5,
  keepOpen: false,
});

// Instantiate with nominatim, outside of the map
const geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  targetType: 'text-input',
  lang: 'en',
  placeholder: 'Search in nominatim/OSM',
  limit: 5,
  keepOpen: false,
  target: document.body, // Attach this control out of the map
});

// Listen when an address is chosen
geocoder.on('addresschosen', (evt) => {
  window.setTimeout(() => {
    popup.show(evt.coordinate, evt.address.formatted);
  }, 1000);
});

const popup = new ol.Overlay.Popup();

new ol.Map({
  target: document.querySelector('#map'),
  view: new ol.View({
    center: [0, 0],
    zoom: 3,
  }),
  controls: [
    new ol.control.Zoom(),
    geocoderGlass,
    geocoder,
  ],
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  overlays: [
    popup,
  ],
});