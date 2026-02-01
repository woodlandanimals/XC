import type { LaunchSite } from '../types/weather';

export const launchSites: LaunchSite[] = [
    {
        name: 'Marshall Peak (Crestline)',
        latitude: 34.2100,
        longitude: -117.3029,
        elevation: 4000,
        orientation: 'S',
        maxWind: 15,
        description: 'Premier mountain site in Southern California. Good thermal and soaring.'
    },
    {
        name: 'Kagel Mountain (Sylmar)',
        latitude: 34.3332,
        longitude: -118.3844,
        elevation: 3500,
        orientation: 'SSW',
        maxWind: 15,
        description: 'World class thermal site. Home of the SHGA.'
    },
    {
        name: 'Dunlap',
        latitude: 36.7641,
        longitude: -119.0976,
        elevation: 4600,
        orientation: 'SW',
        maxWind: 12,
        description: 'Famous for big XC potential in the Central Valley.'
    },
    {
        name: 'Torrey Pines',
        latitude: 32.8950,
        longitude: -117.2520,
        elevation: 320,
        orientation: 'W',
        maxWind: 18,
        description: 'Coastal ridge soaring site near San Diego. Smooth laminar air.'
    },
    {
        name: 'Slide Mountain',
        latitude: 39.3105,
        longitude: -119.8661,
        elevation: 9650,
        orientation: 'NE',
        maxWind: 15,
        description: 'High altitude mountain flying near Reno/Tahoe.'
    },
    {
        name: 'Ed Levin',
        latitude: 37.4754,
        longitude: -121.8613,
        elevation: 1750,
        orientation: 'SW', // Varies by launch, common is 1750
        maxWind: 15,
        description: 'Training hill and thermal site in the Bay Area.'
    }
];
