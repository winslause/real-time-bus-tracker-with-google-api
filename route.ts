declare const google: any;

let map: any;
let markers: any[] = [];
let routeLines: any[] = [];

// Route data
const stopsRoute1 = [
  { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School', icon: 'schoolIcon' },
  { lat: -1.17793, lng: 36.98324, title: 'New Paleah Wholesalers Ltd' },
  { lat: -1.19513, lng: 36.95832, title: 'MASTER BROWN INTERNATIONAL INSTITUTE' },
  { lat: -1.19392, lng: 36.93817, title: 'Kahawa Sukari Baptist Church' },
  { lat: -1.18888, lng: 36.93147, title: 'Ceptacore Systems Limited' },
  { lat: -1.16824, lng: 36.98919, title: 'Springfield Park' },
  { lat: -1.19170, lng: 36.92872, title: 'Ruda Education Center' },
  { lat: -1.16029, lng: 36.95833, title: 'Shell - Kihunguro' },
  { lat: -1.19475, lng: 36.95216, title: 'Kijana Msafi Caterers' },
  { lat: -1.16475, lng: 36.95007, title: 'Sara kwa booster' },
  { lat: -1.19722, lng: 36.90549, title: 'Horeb Ministries Githurai 45' },
  { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School' }
];

const stopsRoute2 = [
  { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School', icon: 'schoolIcon' },
  { lat: -1.218972, lng: 36.923028, title: 'Kevis Beauty Salon and Barbershop' },
  { lat: -1.219500, lng: 36.924278, title: 'Jeremy Entertainments' },
  { lat: -1.220944, lng: 36.923417, title: 'Carlcare Service Ltd' },
  { lat: -1.219889, lng: 36.926028, title: 'Riverbank Hotel' },
  { lat: -1.221333, lng: 36.924250, title: 'Gigiri Towers Apartment' },
  { lat: -1.223694, lng: 36.922750, title: 'Wema Flats' },
  { lat: -1.222750, lng: 36.924944, title: 'Dove Apartments' },
  { lat: -1.221111, lng: 36.927861, title: 'Zion Temple Kasarani' },
  { lat: -1.221417, lng: 36.926611, title: 'Kibukahs Apartments' },
  { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School' }
];

const stopsRoute3 = [
  { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School', icon: 'schoolIcon' },
  { lat: -1.226500, lng: 36.916972, title: 'Transline Galaxy - Kasarani' },
  { lat: -1.225611, lng: 36.919361, title: 'PCEA Ciiko Church' },
  { lat: -1.227083, lng: 36.918667, title: 'Kasarani Hunters Genesis 2nd Street' },
  { lat: -1.227417, lng: 36.922139, title: 'Santon Chemist' },
  { lat: -1.225611, lng: 36.923278, title: 'ACK Good Samaritan Church Ciiko' },
  { lat: -1.229556, lng: 36.921722, title: 'Mwiki Road Hospital & Pharmacy' },
  { lat: -1.229361, lng: 36.924444, title: 'Anesmar Flats' },
  { lat: -1.227611, lng: 36.926389, title: 'Claycity Business Center - Kasarani' },
  { lat: -1.227944, lng: 36.924611, title: 'Rware Flats' },
  { lat: -1.229361, lng: 36.927194, title: 'Vibramatt Supermarket' },
  { lat: -1.225778, lng: 36.929000, title: 'LPG Gas Authorized Dealer' },
  { lat: -1.226167, lng: 36.932833, title: '13th Street - Deliverance Road' },
  { lat: -1.233028, lng: 36.930306, title: 'Deliverance Church Kasarani Mwiki' },
  { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School' }
];

// Initialize map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -1.22419, lng: 36.9176 },  // Default center (Mount Laverna School)
    zoom: 14,
    scrollwheel: true,  // Enable map scroll zoom
  });
}

// Clear the map and add markers for the selected route
function showRoute(route: any) {
  clearRoute();
  route.forEach((stop: any) => {
    const marker = new google.maps.Marker({
      position: { lat: stop.lat, lng: stop.lng },
      map: map,
      title: stop.title,
      icon: stop.icon ? stop.icon : undefined,
    });
    markers.push(marker);
  });

  const routePath = route.map((stop: any) => ({ lat: stop.lat, lng: stop.lng }));
  const polyline = new google.maps.Polyline({
    path: routePath,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  polyline.setMap(map);
  routeLines.push(polyline);
}

// Clear previous route and markers
function clearRoute() {
  markers.forEach(marker => marker.setMap(null));
  routeLines.forEach(line => line.setMap(null));
  markers = [];
  routeLines = [];
}

document.getElementById('route1')?.addEventListener('click', () => showRoute(stopsRoute1));
document.getElementById('route2')?.addEventListener('click', () => showRoute(stopsRoute2));
document.getElementById('route3')?.addEventListener('click', () => showRoute(stopsRoute3));
