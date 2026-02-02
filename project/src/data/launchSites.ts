import { LaunchSite } from '../types/weather';

export const launchSites: LaunchSite[] = [
  {
    id: 'tollhouse',
    name: 'Tollhouse',
    elevation: 4200,
    latitude: 37.0331,
    longitude: -119.3372,
    orientation: 'SW-W',
    maxWind: 18,
    siteType: 'thermal'  // Central Valley thermal site
  },
  {
    id: 'ed-levin',
    name: 'Ed Levin',
    elevation: 1750,
    latitude: 37.4656,
    longitude: -121.8531,
    orientation: 'SW-NW',
    maxWind: 20,
    siteType: 'mixed'  // Training hill + thermals
  },
  {
    id: 'mt-vaca',
    name: 'Mt Vaca',
    elevation: 2800,
    latitude: 38.3700,
    longitude: -122.0200,
    orientation: 'SW-W',
    maxWind: 22,
    siteType: 'mixed'  // Both ridge and thermal
  },
  {
    id: 'slide',
    name: 'Slide Mountain',
    elevation: 9600,
    latitude: 39.2900,
    longitude: -119.9400,
    orientation: 'W-NW',
    maxWind: 25,
    siteType: 'thermal'  // High altitude thermal
  },
  {
    id: 'whaleback',
    name: 'Whaleback',
    elevation: 2400,
    latitude: 36.7500,
    longitude: -121.8000,
    orientation: 'W-NW',
    maxWind: 20,
    siteType: 'mixed'  // Coastal influence + thermals
  },
  {
    id: 'blue-rock',
    name: 'Blue Rock',
    elevation: 3200,
    latitude: 37.2500,
    longitude: -122.1800,
    orientation: 'W-NW',
    maxWind: 18,
    siteType: 'mixed'  // Ridge + thermal
  },
  {
    id: 'mt-diablo',
    name: 'Mt Diablo',
    elevation: 3849,
    latitude: 37.8814,
    longitude: -121.9142,
    orientation: 'W-SW',
    maxWind: 20,
    siteType: 'thermal'  // Strong thermal generator
  },
  {
    id: 'mission-peak',
    name: 'Mission Peak',
    elevation: 2517,
    latitude: 37.5133,
    longitude: -121.8808,
    orientation: 'W-NW',
    maxWind: 22,
    siteType: 'mixed'  // Ridge + thermal
  },
  {
    id: 'potato-hill',
    name: 'Potato Hill',
    elevation: 2200,
    latitude: 37.3500,
    longitude: -121.7500,
    orientation: 'W-NW',
    maxWind: 18,
    siteType: 'mixed'  // Training site, both modes
  },
  {
    id: 'mt-tamalpais',
    name: 'Mt Tamalpais',
    elevation: 2574,
    latitude: 37.9236,
    longitude: -122.5969,
    orientation: 'W-SW',
    maxWind: 25,
    siteType: 'soaring'  // Coastal ridge soaring
  },
  {
    id: 'dunlap',
    name: 'Dunlap',
    elevation: 3200,
    latitude: 36.7400,
    longitude: -119.1000,
    orientation: 'SW-W',
    maxWind: 20,
    siteType: 'thermal'  // Famous XC thermal site
  },
  {
    id: 'mcgee',
    name: 'McGee',
    elevation: 8500,
    latitude: 37.5800,
    longitude: -118.8300,
    orientation: 'E-SE',
    maxWind: 22,
    siteType: 'thermal'  // High Sierra thermal
  },
  {
    id: 'mussel-rock',
    name: 'Mussel Rock',
    elevation: 160,
    latitude: 37.6600,
    longitude: -122.4900,
    orientation: 'W-NW',
    maxWind: 25,
    siteType: 'soaring'  // Coastal ridge only
  },
  {
    id: 'ej-bowl',
    name: 'EJ Bowl',
    elevation: 250,
    latitude: 34.4042,
    longitude: -119.7465,
    orientation: 'W-NW',
    maxWind: 22,
    siteType: 'soaring'  // Coastal ridge soaring
  }
];
