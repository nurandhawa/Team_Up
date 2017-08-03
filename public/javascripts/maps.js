// Uses Google maps callback api, no need to wait for DOM to load
let markers = [];
let map, infoWindow, service, currentUserLocation;

function loadMap() {
  let locations = [
    // Soccer
    ['Terry Fox Field', 'Burnaby, BC V5A 1S6', 49.278657, -122.922332, 1],
    ['Field 2', 'Burnaby, BC V5A 1S6', 49.278478, -122.924905, 1],
    ['Residence Field', 'Burnaby, BC, Canada', 49.279378, -122.927717, 1],
    ['Forest Grove Park', 'Burnaby, BC, Canada', 49.265672, -122.921870, 1],
    ['Empire Fields', 'E Hastings St, Vancouver, BC', 49.2823652, -123.032886, 1],
    ['Jericho West Field', '1515 Discovery St, Vancouver, BC V6R 4K5', 49.2728625, -123.2009626, 1],
    ['Carnarvon Park', '2995 W 19th Ave, Vancouver, BC V6L 3C3', 49.2564811, -123.1714225, 1],
    ['Prince of Wales Park', '4780 Haggart St, Vancouver, BC V6L 2H7', 49.2440376, -123.1570958, 1],
    ['Quilchena Park', '4590 Magnolia St, Vancouver, BC V6J 4B5', 49.2437806, -123.1496046, 1],
    ['Trafalgar Park', '2610 W 23rd Ave, Vancouver, BC V6L 1N7', 49.251888, -123.1652523, 1],
    ['Andy Livingstone Park', '89 Expo Blvd, Vancouver, BC V6B 6N5', 49.2788226, -123.1059865, 1],
    ['David Lam Park', '1300 Pacific Blvd, Vancouver, BC V6Z 0A9', 49.2721506, -123.1251803, 1],
    ['Chaldecott Park', '4175 Wallace St, Vancouver, BC V6S 2J3', 49.2489526, -123.1913026, 1],
    ['Memorial West Park', '4701 Dunbar St, Vancouver, BC V6S 2G8', 49.2433206, -123.1884335, 1],
    ['Musqueam Park', '4000 SW Marine Dr, Vancouver, BC V6N 2B8', 49.2301998, -123.1942955, 1],
    ['Charleson Park', '999 Charleson Street, Vancouver, BC V5Z 4A2', 49.2666129, -123.1261372, 1],
    ['Garden Park', '1851 Garden Dr, Vancouver, BC V5N 4W6', 49.2681669, -123.0592162, 1],
    ['McSpadden Park', '2125 Victoria Dr, Vancouver, BC V5N 5Y4', 49.2661038, -123.066721, 1],
    ['Templeton Park', '700 Templeton Dr, Vancouver, BC V5L 4N8', 49.278319, -123.0593521, 1],
    ['Woodland Park', '705 Woodland Dr, Vancouver, BC V5L 3R2', 49.2785105, -123.0736486, 1],
    ['Adanac Park', '1025 Boundary Rd, Vancouver, BC V5K 4T2', 49.276231, -123.0256928, 1],
    ['Clinton Park', '2690 Grant St, Vancouver, BC V5K 3G9', 49.2705402, -123.0512006, 1],
    ['New Brighton Park', '93 New Brighton Rd, Vancouver, BC V5K', 49.2894798, -123.0352333, 1],
    ['Rupert Park', '3402 Charles St, Vancouver, BC V5K 5H9', 49.2716035, -123.0301886, 1],
    ['Sunrise Park', '1950 Windermere St, Vancouver, BC V5M 3R2', 49.2666929, -123.0353739, 1],
    ['Brewers Park', '4175 Victoria Dr, Vancouver, BC V5N 4M9', 49.2476715, -123.0665292, 1],
    ['Clark Park', '1500 E 14th Ave, Vancouver, BC V5N 3R3', 49.2577806, -123.0738836, 1],
    ['John Hendry (Trout Lake) Park', '3300 Victoria Dr, Vancouver, BC V5N 4M4', 49.2561531, -123.0615412, 1],
    ['Jones Park', '5350 Commercial St, Vancouver, BC V5P 3N3', 49.2360017, -123.0673179, 1],
    ['Kensington Park', '5175 Dumfries St, Vancouver, BC V5P 3A2', 49.2360319, -123.082639, 1],
    ['Arbutus Park', '7601 Arbutus St, Vancouver, BC V6P 5T3', 49.2165627, -123.1553898, 1],
    ['Elm Park', '5800 Elm St, Vancouver, BC V6N 1A7', 49.2341332, -123.1643392, 1],
    ['Maple Grove Park', '6875 Yew St, Vancouver, BC V6P 5W2', 49.2231604, -123.1596789, 1],
    ['Champlain Heights Park', '3351 Maquinna Dr, Vancouver, BC V5S 4C6', 49.2164947, -123.0328489, 1],
    ['Killarney Park', '6205 Kerr St, Vancouver, BC V5S 2X7', 49.2277832, -123.0440232, 1],
    ['Sparwood Park', '6998 Arlington St, Vancouver, BC', 49.2202709, -123.0292308, 1],
    ['Connaught Park', '2390 W 10th Ave, Vancouver, BC V6K 4K9', 49.2620525, -123.1603826, 1],
    ['McBride Park', '3350 W 4th Ave, Vancouver, BC V6R 1N6', 49.2680861, -123.1788592, 1],
    ['Oak Park', '900 W 59th Ave, Vancouver, BC V6P 1X7', 49.2162901, -123.1285316, 1],
    ['Shannon Park', '1575 W 62nd Ave, Vancouver, BC V6P 2E8', 49.2154527, -123.1427259, 1],
    ['China Creek North Park', '1001 E 7th Ave, Vancouver, BC V5T 1E5', 49.2649366, -123.0835164, 1],
    ['Jonathan Rogers Park', '110 W 7th Ave, Vancouver, BC V5Y 1L7', 49.2642752, -123.1081549, 1],
    ['Robson Park', '599 Kingsway, Vancouver, BC V5T', 49.2577382, -123.091778, 1],
    ['Montgomery Park', '1040 W 43rd Ave, Vancouver, BC V6M 2B9', 49.2308287, -123.1306467, 1],
    ['Beaconsfield Park', '3215 Slocan St, Vancouver, BC V5M 3E4', 49.2555281, -123.0514968, 1],
    ['Collingwood Park', '5275 McKinnon St, Vancouver, BC V5R 4C7', 49.2369918, -123.0365213, 1],
    ['Earles Park', '2801 E 41st Ave, Vancouver, BC V5R 2X4', 49.2334967, -123.0478693, 1],
    ['Falaise Park', '3434 Falaise Ave, Vancouver, BC V5M', 49.2563851, -123.0318242, 1],
    ['Gaston Park', '3470 Crowley Dr, Vancouver, BC', 49.2359883, -123.0311193, 1],
    ['Norquay Park', '5050 Wales St, Vancouver, BC V5R 3M6', 49.2380613, -123.0516944, 1],
    ['Slocan Park', '2750 E 29th Ave, Vancouver, BC V5R 1V5', 49.2439987, -123.047602, 1],
    ['Hillcrest Park', '4501 Clancy Loranger Way, Vancouver, BC V5Y 2M4', 49.2448555, -123.1088858, 1],
    ['Prince Edward Park', '3773 Prince Edward St, Vancouver, BC V5V 3Y3', 49.2519406, -123.0970045, 1],
    ['Riley Park', '50 E 30th Ave, Vancouver, BC', 49.243342, -123.1046403, 1],
    ['Kerrisdale Park', '5670 East Blvd, Vancouver, BC V6G 1Z4', 49.2364631, -123.15339483, 1],
    ['Douglas Park', '801 W 22nd Ave, Vancouver, BC V5Z 1Z8', 49.2520826, -123.1226562, 1],
    ['Oak Meadows Park', '899 W 37th Ave, Vancouver, BC V5Z 3S1', 49.2386812, -123.1258234, 1],
    ['Strathcona Park', '857 Malkin Ave, Vancouver, BC V6A 2K5', 49.2739394, -123.0835737, 1],
    ['Trillium Park', '600 National Ave, Vancouver, BC V6A 2E5', 49.2743798, -123.093932, 1],
    ['Memorial South Park', '5955 Ross St, Vancouver, BC V5W 1T7', 49.2309378, -123.0851956, 1],
    ['Moberly Park', '7646 Prince Albert St, Vancouver, BC V5X 3Z4', 49.2155928, -123.0846203, 1],
    ['Ross Park', '7402 Ross St, Vancouver, BC V5X 4B7', 49.2173449, -123.0825546, 1],
    ['Sunset Park', '404 E 51st Ave, Vancouver, BC V5X 1C7', 49.222765, -123.0968487, 1],
    ['Bobolink Park', '2510 Hoylake Ave, Vancouver, BC V5S 2E2', 49.2153405, -123.0575778, 1],
    ['Fraserview Park', '7595 Victoria Dr, Vancouver, BC', 49.2153684, -123.0677957, 1],
    ['Gordon Park', '6675 Commercial St, Vancouver, BC V5P 3P5', 49.2236945, -123.0709778, 1],
    ['Jericho Beach Park', '3941 Point Grey Rd, Vancouver, BC V6R 1B5', 49.2722411, -123.1987128, 1],
    ['West Point Grey Park', '2250 Trimble St, Vancouver, BC V6R 4G9', 49.2664721, -123.2044366, 1],

    // Basketball
    ['SFU Fitness Centre', '8888 Gaglardi Way, Burnaby, BC V5A 1S6', 49.2794424, -122.9225066, 2],
    ['Forest Grove Park', 'Burnaby, BC, Canada', 49.265949, -122.923910, 2],
    ['Trafalgar Park', '2610 W 23rd Ave, Vancouver, BC V6L 1N7', 49.251888, -123.1652523, 2],
    ['Andy Livingstone Park', '89 Expo Blvd, Vancouver, BC V6B 6N5', 49.2788226, -123.1059865, 2],
    ['Coopers Park', '1020 Marinaside Crescent, Vancouver, BC', 49.2732252, -123.112361, 2],
    ['David Lam Park', '1300 Pacific Blvd, Vancouver, BC V6Z 0A9', 49.2721506, -123.1251803, 2],
    ['Memorial West Park', '4701 Dunbar St, Vancouver, BC V6S 2G8', 49.2433241, -123.1884335, 2],
    ['Sutcliffe Park', '1318 Cartwright St, Vancouver, BC V6H 3R9', 49.2689717, -123.1350122, 2],
    ['Charleson Park', '999 Charleson Street, Vancouver, BC V5Z 4A2', 49.2666129, -123.1261372, 2],
    ['Garden Park', '1851 Garden Dr, Vancouver, BC V5N 4W6', 49.2681669, -123.0592162, 2],
    ['Pandora Park', '2325 Franklin St, Vancouver, BC V5L 1S2', 49.2825435, -123.0583693, 2],
    ['Hastings Community Park', '3000 E Pender St, Vancouver, BC V5K 4G4', 49.2806643, -123.0414712, 2],
    ['Hastings Park', '2901 E Hastings St, Vancouver, BC V5K 5J1', 49.2829767, -123.0425748, 2],
    ['Clinton Park', '2690 Grant St, Vancouver, BC V5K 3G9', 49.2705402, -123.0512006, 2],
    ['Brewers Park', '4175 Victoria Dr, Vancouver, BC V5N 4M9', 49.2476715, -123.0665292, 2],
    ['Cedar Cottage Park', '2650 Clark Drive & E 11th Avenue, Vancouver, BC V6G 1Z4', 49.2885746, -123.1428697, 2],
    ['Clark Park', '1500 E 14th Ave, Vancouver, BC V5N 3R3', 49.2577806, -123.0738836, 2],
    ['Glen Park', '3999 Glen Dr, Vancouver, BC V5V 4T2', 49.2495728, -123.0830856, 2],
    ['Grays Park', '4850 St Catherines St, Vancouver, BC V5V 4M7', 49.2411334, -123.0851752, 2],
    ['John Hendry (Trout Lake) Park', '3300 Victoria Dr, Vancouver, BC V5N 4M4', 49.2561531, -123.0615412, 2],
    ['Kingcrest Park', '4150 Knight St, Vancouver, BC V5N 3M2', 49.2473796, -123.0746038, 2],
    ['Riverfront Park', '2750 East Kent Ave S, Vancouver, BC V5S 4V7', 49.2054906, -123.0518835, 2],
    ['Kitsilano Beach Park', '1499 Arbutus St, Vancouver, BC V6J 5N2', 49.2739806, -123.1547692, 2],
    ['Oak Park', '900 W 59th Ave, Vancouver, BC V6P 1X7', 49.2162901, -123.1285316, 2],
    ['William Mackie Park', '1592 W 71st Ave, Vancouver, BC V6P 6N8', 49.2067435, -123.1430279, 2],
    ['Arbutus Park', '7601 Arbutus St, Vancouver, BC V6P 5T3', 49.2165627, -123.1553898, 2],
    ['Sparwood Park', '6998 Arlington St, Vancouver, BC', 49.2202709, -123.0292308, 2],
    ['Robson Park', '599 Kingsway, Vancouver, BC V5T', 49.2577382, -123.091778, 2],
    ['Montgomery Park', '1040 W 43rd Ave, Vancouver, BC V6M 2B9', 49.2308287, -123.1306467, 2],
    ['Collingwood Park', '5275 McKinnon St, Vancouver, BC V5R 4C7', 49.2369918, -123.0365213, 2],
    ['Gaston Park', '3470 Crowley Dr, Vancouver, BC', 49.2359883, -123.0311193, 2],
    ['Norquay Park', '5050 Wales St, Vancouver, BC V5R 3M6', 49.2380613, -123.0516944, 2],
    ['Melbourne Park', '3530 Vanness Ave, Vancouver, BC', 49.2362347, -123.0294121, 2],
    ['Queen Elizabeth Park', '4600 Cambie St, Vancouver, BC V5Y 2M9', 49.2414465, -123.1136681, 2],
    ['Riley Park', '50 E 30th Ave, Vancouver, BC', 49.243342, -123.1046403, 2],
    ['Douglas Park', '801 W 22nd Ave, Vancouver, BC V5Z 1Z8', 49.2520826, -123.1226562, 2],
    ['Strathcona Park', '857 Malkin Ave, Vancouver, BC V6A 2K5', 49.2739394, -123.0835737, 2],
    ['Humm Park', '7250 Humm St, Vancouver, BC V5P 4B7', 49.2187699, -123.0633993, 2],
    ['West Point Grey Park', '2250 Trimble St, Vancouver, BC V6R 4G9', 49.2664721, -123.2044366, 2],
    ['Bobolink Park', '2510 Hoylake Ave, Vancouver, BC V5S 2E2', 49.2153405, -123.0575778, 2],
    ['Plateau Park Basketball Courts', '3200 E Hastings St, Vancouver, BC V5K 5J3', 49.2823652, -123.032886, 2],

    // Volleyball
    ['SFU Fitness Centre', '8888 Gaglardi Way, Burnaby, BC V5A 1S6', 49.2794424, -122.9225066, 3],
    ['English Bay Beach', 'M, Vancouver, BC V6C 3C1', 49.2863149, -123.1436752, 3],
    ['Plateau Park', '3200 E Hastings St, Vancouver, BC V5K 5J3', 49.2823652, -123.032886, 3],
    ['Jericho Beach', 'Vancouver, BC V6R 1B5', 49.2722648, -123.193064, 3],
    ['Kitsilano Beach', 'Vancouver, BC', 49.2749388, -123.1558465, 3],
    ['Locarno Beach', 'Vancouver, BC', 49.2757684, -123.2071231, 3],
    ['Park Site on Shaughnessy Street', 'Vancouver, BC', 49.2021312, -123.1235258, 3],
    ['Spanish Banks East', '4707 NW Marine Dr, Vancouver, BC V6T 1A1', 49.2762188, -123.2150773, 3],
    ['Spanish Banks West', '4875 NW Marine Dr, Vancouver, BC V6T 1A1', 49.2774214, -123.2229616, 3],
    ['Sunset Beach', '1204 Beach Ave, Vancouver, BC V6E 1V3', 49.2799515, -123.1388828, 3],

    // Baseball
    ['Field', 'Burnaby, BC, Canada', 49.279000, -122.926365, 4],
    ['Carnarvon Park', '2995 W 19th Ave, Vancouver, BC V6L 3C3', 49.2564811, -123.1714225, 4],
    ['Quilchena Park', '4590 Magnolia St, Vancouver, BC V6J 4B5', 49.2437806, -123.1496046, 4],
    ['Trafalgar Park', '2610 W 23rd Ave, Vancouver, BC V6L 1N7', 49.251888, -123.1652523, 4],
    ['Andy Livingstone Park', '89 Expo Blvd, Vancouver, BC V6B 6N5', 49.2788226, -123.1059865, 4],
    ['Balaclava Park', '4594 Balaclava St, Vancouver, BC V6L 2T2', 49.2447459, -123.175245, 4],
    ['Chaldecott Park', '4175 Wallace St, Vancouver, BC V6S 2J3', 49.2489526, -123.1913026, 4],
    ['Memorial West Park', '4701 Dunbar St, Vancouver, BC V6S 2G8', 49.2433206, -123.1884335, 4],
    ['Templeton Park', '700 Templeton Dr, Vancouver, BC V5L 4N8', 49.278319, -123.0593521, 4],
    ['Woodland Park', '705 Woodland Dr, Vancouver, BC V5L 3R2', 49.2785105, -123.0736486, 4],
    ['Clinton Park', '2690 Grant St, Vancouver, BC V5K 3G9', 49.2705402, -123.0512006, 4],
    ['Hastings Community Park', '3000 E Pender St, Vancouver, BC V5K 4G4', 49.2806643, -123.0414712, 4],
    ['Rupert Park', '3402 Charles St, Vancouver, BC V5K 5H9', 49.2716035, -123.0301886, 4],
    ['Clark Park', '1500 E 14th Ave, Vancouver, BC V5N 3R3', 49.2577806, -123.0738836, 4],
    ['Sunrise Park', '1950 Windermere St, Vancouver, BC V5M 3R2', 49.2666929,-123.0353739, 4],
    ['John Hendry (Trout Lake) Park', '3300 Victoria Dr, Vancouver, BC V5N 4M4', 49.2561531, -123.0615412, 4],
    ['Kensington Park', '5175 Dumfries St, Vancouver, BC V5P 3A2', 49.2360319, -123.082639, 4],
    ['Elm Park', '5800 Elm St, Vancouver, BC V6N 1A7', 49.2341332, -123.1643392, 4],
    ['Maple Grove Park', '6875 Yew St, Vancouver, BC V6P 5W2', 49.2231604, -123.1596789, 4],
    ['Champlain Heights Park', '3351 Maquinna Dr, Vancouver, BC V5S 4C6', 49.2164947, -123.0328489, 4],
    ['Killarney Park', '6205 Kerr St, Vancouver, BC V5S 2X7', 49.2277832, -123.0440232, 4],
    ['Connaught Park', '2390 W 10th Ave, Vancouver, BC V6K 4K9', 49.2620525, -123.1603826, 4],
    ['McBride Park', '3350 W 4th Ave, Vancouver, BC V6R 1N6', 49.2680861, -123.1788592, 4],
    ['Oak Park', '900 W 59th Ave, Vancouver, BC V6P 1X7', 49.2162901, -123.1285316, 4],
    ['Shannon Park', '1575 W 62nd Ave, Vancouver, BC V6P 2E8', 49.2154527, -123.1427259, 4],
    ['Winona Park', '7525 Columbia St, Vancouver, BC V6G 1Z4', 49.2154937, -123.1140423, 4],
    ['China Creek North Park', '1001 E 7th Ave, Vancouver, BC V5T 1E5', 49.2649366, -123.0835164, 4],
    ['Jonathan Rogers Park', '110 W 7th Ave, Vancouver, BC V5Y 1L7', 49.2642752, -123.1081549, 4],
    ['Columbia Park', '5908 Alberta St, Vancouver, BC V5Y 3M9', 49.2315601, -123.1126682, 4],
    ['Montgomery Park', '1040 W 43rd Ave, Vancouver, BC V6M 2B9', 49.2308287, -123.1306467, 4],
    ['Tisdall Park', '6210 Tisdall St, Vancouver, BC V5Z 3N4', 49.2273423, -123.1194894, 4],
    ['Beaconsfield Park', '3215 Slocan St, Vancouver, BC V5M 3E4', 49.2555281, -123.0514968, 4],
    ['Collingwood Park', '5275 McKinnon St, Vancouver, BC V5R 4C7', 49.2369918, -123.0365213, 4],
    ['Earles Park', '2801 E 41st Ave, Vancouver, BC V5R 2X4', 49.2334967, -123.0478693, 4],
    ['Falaise Park', '3434 Falaise Ave, Vancouver, BC V5M', 49.2563851, -123.0318242, 4],
    ['Gaston Park', '3470 Crowley Dr, Vancouver, BC', 49.2359883, -123.0311193, 4],
    ['Norquay Park', '5050 Wales St, Vancouver, BC V5R 3M6', 49.2380613, -123.0516944, 4],
    ['Renfrew Community Park', '2929 E 22nd Ave, Vancouver, BC V5M 2Y3', 49.2511295, -123.0429128, 4],
    ['Braemar Park', '895 W 27th Ave, Vancouver, BC V5Z 2G8', 49.247628, -123.1237685, 4],
    ['Hillcrest Park', '4501 Clancy Loranger Way, Vancouver, BC V5Y 2M4', 49.2448555, -123.1088858, 4],
    ['Nat Bailey Stadium', '4601 Ontario St, Vancouver, BC V5V 3H4', 49.2432524, -123.1062652, 4],
    ['Riley Park', '50 E 30th Ave, Vancouver, BC', 49.243342, -123.1046403, 4],
    ['Kerrisdale Park', '5670 East Blvd, Vancouver, BC V6G 1Z4', 49.2364631, -123.15339483, 4],
    ['Douglas Park', '801 W 22nd Ave, Vancouver, BC V5Z 1Z8', 49.2520826, -123.1226562, 4],
    ['MacLean Park', '710 Keefer St, Vancouver, BC V6A 1Y6', 49.2788192, -123.0886341, 4],
    ['Strathcona Park', '857 Malkin Ave, Vancouver, BC V6A 2K5', 49.2739394, -123.0835737, 4],
    ['Memorial South Park', '5955 Ross St, Vancouver, BC V5W 1T7', 49.2309378, -123.0851956, 4],
    ['Ross Park', '7402 Ross St, Vancouver, BC V5X 4B7', 49.2173449, -123.0825546, 4],
    ['Bobolink Park', '2510 Hoylake Ave, Vancouver, BC V5S 2E2', 49.2153405, -123.0575778, 4],
    ['Gordon Park', '6675 Commercial St, Vancouver, BC V5P 3P5', 49.2236945, -123.0709778, 4],
    ['Nanaimo Park', '2390 E 46th Ave, Vancouver, BC V5S 1A2', 49.2277285, -123.0578191, 4],
    ['Stanley Park', '2000 W Georgia St, Vancouver, BC V6G', 49.2944312, -123.1367945, 4],
    ['Jericho Beach Park', '3941 Point Grey Rd, Vancouver, BC V6R 1B5', 49.2722411, -123.1987128, 4],
    ['West Point Grey Park', '2250 Trimble St, Vancouver, BC V6R 4G9', 49.2664721, -123.2044366, 4]
  ];

  // Create the map with a default center.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278628, lng: -122.920355},
    zoom: 12,
    scaleControl: true,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  // Locate user's location if location is turned on
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      currentLocation = pos;
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Create a marker with its category for each location
  let i;
  let newMarker;
  for (i = 0; i < locations.length; i++) {
    let locationName = locations[i][0];
    let locationAddress = locations[i][1];
    let lat = locations[i][2];
    let long = locations[i][3];
    let category = locations[i][4];
    let content = locationName + "<br>" + locationAddress + "<br><a class='directions' target='_blank' href=https://www.google.com/maps/dir//" + lat + "," + long + ">Get Directions</a>";
    newMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      map: map,
      title: locationName
    });
    newMarker.category = category;
    newMarker.setVisible(false);
    (function (newMarker, locationName, locationAddress, content, infoWindow) {
      google.maps.event.addListener(newMarker, 'click', function () {
        infoWindow.setContent(content);
        infoWindow.open(map, newMarker);
        let locationNameElement = $("#locationName");
        let locationAddrElement = $("#locationAddress");
        locationNameElement.val(locationName);
        locationAddrElement.val(locationAddress);

        let eventLocation = [];
        eventLocation[0] = newMarker.getPosition().lng();
        eventLocation[1] = newMarker.getPosition().lat(); 
        let jsonGeo = JSON.stringify(eventLocation);
        $('#map-input').attr('value', jsonGeo);
      });
    })
    (newMarker, locationName, locationAddress, content, infoWindow);
    markers.push(newMarker);
  }

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // For each place, get the location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

//  Display the markers dynamically depending on request type
function displayMarkersGeo(category) {
  let request = {
    // map.getCenter()
    // location is retrieved from geolocation
    location: currentLocation,
    radius: 8047,
    types: ['park'],
  }

  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
      for (let i =0; i < results.length; i++){
        let location = results[i].geometry.location;
        let marker = new google.maps.Marker({
          map:map,
          position: results[i].geometry.location
        });
      }

    }
  });

}

// For create.js
// Display the markers when the button are clicked
function displayMarkers(category) {
  let i;
  for (i = 0; i < markers.length; i++) {
    if (markers[i].category === category) {
      markers[i].setVisible(true);
    }
    else {
      markers[i].setVisible(false);
    }
  }

  let sportElement = $("#sport");
  let locationNameElement = $("#locationName");
  let locationAddrElement = $("#locationAddress");
  locationNameElement.val('');
  locationAddrElement.val('');

  if (category == 1) {
    sportElement.val("Soccer");
  } else if (category == 2) {
    sportElement.val("Basketball");
  } else if (category == 3) {
    sportElement.val("Volleyball");
  } else if (category == 4) {
    sportElement.val("Baseball");
  }

}

// Handle the error for user's location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
