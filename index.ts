function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 13,
      center: { lat: -1.22419, lng: 36.9176 }, // Centered at Mount Laverna School
    }
  );

  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Custom icon for Mount Laverna School
  const schoolIcon = {
    url: "https://img.icons8.com/ios/50/school.png", // URL for the school icon
    scaledSize: new google.maps.Size(40, 40), // Size of the icon
  };

  // First route (using the same Mount Laverna School as start point)
  const stopsRoute1 = [
    { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School', icon: schoolIcon }, // Starting point for Route 1
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
    { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School' } // Same starting point for Route 1
  ];

  // Second route (using the same Mount Laverna School as start point)
  const stopsRoute2 = [
    { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School', icon: schoolIcon }, // Starting point for Route 2
    { lat: -1.218972, lng: 36.923028, title: 'Kevis Beauty Salon and Barbershop' },
    { lat: -1.219500, lng: 36.924278, title: 'Jeremy Entertainments' },
    { lat: -1.220944, lng: 36.923417, title: 'Carlcare Service Ltd' },
    { lat: -1.219889, lng: 36.926028, title: 'Riverbank Hotel' },
    { lat: -1.221333, lng: 36.924250, title: 'Gigiri Towers Apartment' },
    { lat: -1.223694, lng: 36.922750, title: 'Wema Flats' },
    { lat: -1.222750, lng: 36.924944, title: 'Dove Apartments' },
    { lat: -1.221111, lng: 36.927861, title: 'Zion Temple Kasarani' },
    { lat: -1.221417, lng: 36.926611, title: 'Kibukahs Apartments' },
    { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School' } // Same starting point for Route 2
  ];

  // Third route (using the same Mount Laverna School as start point)
  const stopsRoute3 = [
    { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School', icon: schoolIcon }, // Starting point for Route 3
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
    { lat: -1.22419, lng: 36.9176, title: 'Mount Laverna School' } // Same starting point for Route 3
  ];

  // Function to render a route and animate the bus
  function renderRouteAndAnimateBus(
    stops: { lat: number; lng: number; title: string; icon?: any }[], // Optional icon for stops
    busIconUrl: string,
    routeColor: string
  ) {
    // Add markers for each stop with labels (hidden initially)
    stops.forEach((stop) => {
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lng },
        map: map,
        icon: stop.icon || { // Use custom icon if provided
          path: google.maps.SymbolPath.CIRCLE,
          scale: 5,
          fillColor: routeColor,
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });

      // Info window to display the title of the stop when clicked
      const infowindow = new google.maps.InfoWindow({
        content: stop.title,
      });

      // Add a click event listener to show the info window when the marker is clicked
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    });

    // Initialize Directions service and renderer
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
      polylineOptions: {
        strokeColor: routeColor,
        strokeWeight: 4,
      },
    });

    // Define waypoints (excluding the start and end locations)
    const waypoints = stops.slice(1, -1).map((stop) => ({
      location: { lat: stop.lat, lng: stop.lng },
      stopover: true,
    }));

    // Request for the route
    directionsService.route(
      {
        origin: { lat: stops[0].lat, lng: stops[0].lng }, // Start point (Mount Laverna School)
        destination: { lat: stops[stops.length - 1].lat, lng: stops[stops.length - 1].lng }, // End point (last stop)
        waypoints: waypoints, // Intermediate stops
        travelMode: google.maps.TravelMode.DRIVING, // Travel by driving
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response); // Render the route on the map
          animateBus(response.routes[0].overview_path, busIconUrl, stops[0].lat, stops[0].lng); // Animate the bus along the route
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }

  // Function to animate the bus along the route
  function animateBus(path: google.maps.LatLng[], busIconUrl: string, startLat: number, startLng: number) {
    const busMarker = new google.maps.Marker({
      map: map,
      icon: {
        url: busIconUrl, // Custom bus icon
        scaledSize: new google.maps.Size(40, 40),
      },
      position: path[0], // Start position
    });

    let index = 0;
    const totalSteps = path.length;
    const interval = 1000; // Time between steps (milliseconds)

    function moveBus() {
      if (index < totalSteps) {
        busMarker.setPosition(path[index]); // Move the bus marker
        index++;
        setTimeout(moveBus, interval); // Continue moving
      } else {
        busMarker.setPosition({ lat: startLat, lng: startLng }); // Set position back to the start
        index = 0; // Reset index
      }
    }

    moveBus(); // Start the bus animation
  }

  // Render and animate the buses on all routes
  renderRouteAndAnimateBus(stopsRoute1, "https://img.icons8.com/color/48/bus.png", "#0000FF"); // Route 1 (blue)
  renderRouteAndAnimateBus(stopsRoute2, "https://img.icons8.com/color/48/bus.png", "#00FF00"); // Route 2 (green)
  renderRouteAndAnimateBus(stopsRoute3, "https://img.icons8.com/ios/50/bus.png", "#FF0000"); // Route 3 (red)
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
