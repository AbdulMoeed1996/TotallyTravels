export interface Destination {
  id: string;
  name: string;
  coverImage: string;
  cardImage: string;
  shortDescription: string;
  fullDescription: string;
  famousLocations: {
    name: string;
    description: string;
  }[];
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
}

export const destinationsData: Destination[] = [
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows',
    coverImage:
      '/images/destinations/fairy-meadows-cover.jpg',
    cardImage:
      '/images/destinations/fairy-meadows-card.jpg',
    shortDescription:
      'Escape to Fairy Meadows. The perfect escape for you under...ence pristine alpine meadows and breathtaking mountain vistas.',
    fullDescription:
      'Fairy Meadows is a grassland near one of the base camp sites of the Nanga Parbat, located in the Diamer District of Gilgit-Baltistan. It offers breathtaking views of the mountain and is a popular destination for trekkers and nature enthusiasts. The area is known for its lush green meadows, serene environment, and clear night skies perfect for stargazing.',
    famousLocations: [
      {
        name: 'Nanga Parbat Base Camp',
        description:
          'Trek to the base camp of the killer mountain, offering unparalleled views and adventure.',
      },
      {
        name: 'Beyal Camp',
        description:
          'A serene camping site located between Fairy Meadows and Nanga Parbat Base Camp.',
      },
      {
        name: 'Raikot Glacier',
        description: 'Witness the massive glacier that flows down from Nanga Parbat.',
      },
      {
        name: 'Fairy Meadows Village',
        description: 'Experience local culture and hospitality in the nearby village.',
      },
    ],
    weather: {
      temperature: 12,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 15,
    },
  },

  {
    id: 'hunza-valley',
    name: 'Hunza Valley',
    coverImage:
      '/images/destinations/hunza-valley-cover.jpg',
    cardImage:
      '/images/destinations/hunza-valley-card.png',
    shortDescription:
      'Cultural Hunza. Experience the culture and heritage of th...iscover ancient forts, apricot blossoms, and warm hospitality.',
    fullDescription:
      'Hunza Valley is a mountainous valley in the northern part of the Gilgit-Baltistan region of Pakistan. It is known for its breathtaking scenery, vibrant culture, and historical landmarks. The valley is home to the Hunza people, known for their hospitality, unique culture, and healthy lifestyle. Key attractions include Baltit Fort, Altit Fort, and Attabad Lake.',
    famousLocations: [
      {
        name: 'Baltit Fort',
        description:
          'A 700-year-old fort offering panoramic views of the valley and insight into Hunza history.',
      },
      {
        name: 'Altit Fort',
        description:
          'An ancient fort that predates Baltit Fort, showcasing traditional Hunza architecture.',
      },
      {
        name: 'Attabad Lake',
        description:
          'A stunning turquoise lake formed in 2010, perfect for boating and photography.',
      },
      {
        name: 'Karimabad',
        description:
          'The main town of Hunza, offering spectacular views and local markets.',
      },
    ],
    weather: {
      temperature: 18,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: 10,
    },
  },

  {
    id: 'skardu-valley',
    name: 'Skardu Valley',
    coverImage:
      '/images/destinations/skardu-valley-cover.jpg',
    cardImage:
      '/images/destinations/skardu-valley-card.jpg',
    shortDescription:
      'Majestic Skardu. Explore serene lakes and stunning mounta... is a gateway to the world’s highest peaks and serene beauty.',
    fullDescription:
      'Skardu Valley is a beautiful region in Gilgit-Baltistan, Pakistan, known for its dramatic landscapes, serene lakes, and as a gateway to some of the world’s highest peaks, including K2. The valley offers a perfect blend of natural beauty and adventure, with attractions like Shangrila Resort, Satpara Lake, and Deosai National Park.',
    famousLocations: [
      {
        name: 'Shangrila Resort',
        description:
          'A famous resort featuring a beautiful lake and picturesque surroundings.',
      },
      {
        name: 'Satpara Lake',
        description:
          'A serene lake near Skardu, ideal for boating and relaxing in nature.',
      },
      {
        name: 'Deosai National Park',
        description:
          'Known as the second highest plateau in the world, famous for its wildflowers and wildlife.',
      },
      {
        name: 'Kharpocho Fort',
        description:
          'A historic fort offering panoramic views of Skardu and the Indus River.',
      },
    ],
    weather: {
      temperature: 15,
      condition: 'Cool',
      humidity: 55,
      windSpeed: 12,
    },
  },

  {
    id: 'swat-valley',
    name: 'Swat Valley',
    coverImage:
      '/images/destinations/swat-valley-cover.jpg',
    cardImage:
      '/images/destinations/swat-valley-card.jpg',
    shortDescription:
      'Swat Valley. Known as the Switzerland of Pakistan, with ...ountains, rivers, and a rich cultural heritage to explore.',
    fullDescription:
      'Swat Valley is a stunning region in Khyber Pakhtunkhwa, Pakistan, known for its lush green landscapes, crystal-clear rivers, and snow-capped mountains. Often referred to as the Switzerland of Pakistan, Swat offers a blend of natural beauty and rich history. Popular attractions include Malam Jabba, Kalam Valley, and Mingora.',
    famousLocations: [
      {
        name: 'Malam Jabba',
        description: 'A popular ski resort offering winter sports and scenic chairlift rides.',
      },
      {
        name: 'Kalam Valley',
        description:
          'A beautiful valley with rivers, forests, and access to trekking trails.',
      },
      {
        name: 'Mingora',
        description:
          'The largest city in Swat, known for its bazaars and historical significance.',
      },
      {
        name: 'Mahodand Lake',
        description: 'A tranquil lake near Kalam, surrounded by mountains and forests.',
      },
    ],
    weather: {
      temperature: 20,
      condition: 'Mild',
      humidity: 50,
      windSpeed: 8,
    },
  },

  {
    id: 'neelum-valley',
    name: 'Neelum Valley',
    coverImage:
      '/images/destinations/neelum-valley-cover.jpg',
    cardImage:
      '/images/destinations/neelum-valley-card.jpg',
    shortDescription:
      'Neelum Valley. Known for lush forests, rivers, and scenic...p in lush green mountains, sparkling rivers, and serene beauty.',
    fullDescription:
      'Neelum Valley is a picturesque valley in Azad Kashmir, Pakistan, known for its lush forests, winding rivers, and stunning mountains. The valley offers a serene escape with attractions like Keran, Sharda, and Arang Kel. It’s a great destination for nature lovers and adventure seekers alike.',
    famousLocations: [
      {
        name: 'Keran',
        description:
          'A scenic village along the Neelum River, offering beautiful views and relaxation.',
      },
      {
        name: 'Sharda',
        description:
          'Known for ancient ruins of Sharda University and scenic surroundings.',
      },
      {
        name: 'Arang Kel',
        description:
          'A stunning hilltop village accessible via chairlift and hiking, famous for panoramic views.',
      },
      {
        name: 'Ratti Gali Lake',
        description:
          'An alpine glacial lake known for its vibrant colors and surrounding wildflowers.',
      },
    ],
    weather: {
      temperature: 16,
      condition: 'Pleasant',
      humidity: 60,
      windSpeed: 9,
    },
  },

  {
    id: 'khewra-salt-mines',
    name: 'Khewra Salt Mines',
    coverImage:
      '/images/destinations/khewra-salt-mines-cover.jpeg',
    cardImage:
      '/images/destinations/khewra-salt-mines-card.jpg',
    shortDescription:
      'Khewra Salt Mines. Explore the world’s second-largest salt...eautifully illuminated chambers and unique salt formations.',
    fullDescription:
      'Khewra Salt Mines, located in Punjab, Pakistan, are the world’s second-largest salt mines and a major tourist attraction. Visitors can explore beautifully illuminated chambers, unique salt formations, and even a salt mosque. The mines also offer therapeutic benefits due to the salt-rich environment.',
    famousLocations: [
      {
        name: 'Salt Mosque',
        description:
          'A mosque built entirely of salt bricks, a unique architectural wonder inside the mines.',
      },
      {
        name: 'Crystal Valley',
        description:
          'A chamber filled with sparkling salt crystals, illuminated for a magical effect.',
      },
      {
        name: 'Badshahi Mosque Replica',
        description: 'A miniature replica of Lahore’s Badshahi Mosque made of salt.',
      },
      {
        name: 'Underground Lake',
        description: 'A serene underground saltwater lake inside the mines.',
      },
    ],
    weather: {
      temperature: 28,
      condition: 'Warm',
      humidity: 40,
      windSpeed: 7,
    },
  },

  {
    id: 'kalash-valley',
    name: 'Kalash Valley',
    coverImage:
      '/images/destinations/kalash-valley-cover.jpg',
    cardImage:
      '/images/destinations/kalash-valley-card.jpg',
    shortDescription:
      'Kalash Valley. Discover the unique culture of the Kalash ...lls, and vibrant festivals in the heart of Chitral.',
    fullDescription:
      'Kalash Valley is located in the Chitral District of Khyber Pakhtunkhwa, Pakistan. It is home to the Kalash people, known for their distinct culture, traditional festivals, and colorful attire. Visitors can experience unique traditions, stunning landscapes, and warm hospitality.',
    famousLocations: [
      {
        name: 'Bumburet Valley',
        description:
          'The largest and most famous of the Kalash valleys, known for festivals and cultural experiences.',
      },
      {
        name: 'Rumbur Valley',
        description:
          'A smaller, tranquil valley offering scenic views and a closer look at Kalash traditions.',
      },
      {
        name: 'Birir Valley',
        description:
          'A remote valley ideal for those seeking an off-the-beaten-path cultural experience.',
      },
      {
        name: 'Kalash Museum',
        description: 'A museum showcasing artifacts, clothing, and history of the Kalash people.',
      },
    ],
    weather: {
      temperature: 19,
      condition: 'Cool',
      humidity: 55,
      windSpeed: 6,
    },
  },

  {
    id: 'banjusa-lake',
    name: 'Banjusa Lake',
    coverImage:
      '/images/destinations/banjusa-lake-cover.jpeg',
    cardImage:
      '/images/destinations/banjusa-lake-card.jpeg',
    shortDescription:
      'Banjusa Lake. A serene alpine lake surrounded by pine for...ing, ideal for picnics, boating, and enjoying nature.',
    fullDescription:
      'Banjusa Lake is a beautiful artificial lake located near Rawalakot in Azad Kashmir, Pakistan. Surrounded by pine forests and rolling hills, it’s an ideal spot for picnics, boating, and enjoying tranquil natural scenery.',
    famousLocations: [
      {
        name: 'Lakeside Picnic Area',
        description: 'A perfect spot for picnics with stunning lake views.',
      },
      {
        name: 'Boating Point',
        description: 'Enjoy paddle boating on the calm waters of Banjusa Lake.',
      },
      {
        name: 'Surrounding Pine Forests',
        description: 'Walk through the pine forests for fresh air and scenic views.',
      },
      {
        name: 'Viewpoint Hill',
        description: 'A nearby hill offering panoramic views of the lake and surrounding valleys.',
      },
    ],
    weather: {
      temperature: 17,
      condition: 'Pleasant',
      humidity: 60,
      windSpeed: 8,
    },
  },

  {
    id: 'katas-raj-temple',
    name: 'Katas Raj Temple',
    coverImage:
      '/images/destinations/katas-raj-temple-cover.jpg',
    cardImage:
      '/images/destinations/katas-raj-temple-card.jpg',
    shortDescription:
      'Katas Raj Temple. A historic Hindu temple complex with sa...sit this sacred site known for its legendary pond and history.',
    fullDescription:
      'Katas Raj Temple is a historic Hindu temple complex located near Chakwal in Punjab, Pakistan. The site includes several temples and a sacred pond believed to be formed from the tears of Lord Shiva. It is a significant religious and historical landmark.',
    famousLocations: [
      {
        name: 'Sacred Pond',
        description:
          'A legendary pond believed to have formed from Lord Shiva’s tears, central to the temple complex.',
      },
      {
        name: 'Main Temple',
        description:
          'The primary temple structure showcasing traditional Hindu architecture and carvings.',
      },
      {
        name: 'Old Ruins',
        description:
          'Ancient ruins surrounding the complex, reflecting the site’s long history.',
      },
      {
        name: 'Adjacent Temples',
        description: 'Several smaller temples located around the main complex.',
      },
    ],
    weather: {
      temperature: 26,
      condition: 'Sunny',
      humidity: 42,
      windSpeed: 10,
    },
  },

  {
    id: 'galiyat',
    name: 'Galiyat',
    coverImage:
      '/images/destinations/galiyat-cover.jpg',
    cardImage:
      '/images/destinations/galiyat-card.jpeg',
    shortDescription:
      'Galiyat. A hill resort region famous for pine forests, ...Enjoy cool weather, scenic chairlifts, and cozy mountain towns.',
    fullDescription:
      'Galiyat is a hill resort region in the Abbottabad District of Khyber Pakhtunkhwa, Pakistan. Known for its pine forests, cool climate, and picturesque towns like Nathia Gali and Ayubia, it’s a popular destination for families and nature lovers.',
    famousLocations: [
      {
        name: 'Nathia Gali',
        description:
          'A popular hill station known for its scenic trails and cool weather.',
      },
      {
        name: 'Ayubia National Park',
        description:
          'A protected area with hiking trails, wildlife, and stunning natural scenery.',
      },
      {
        name: 'Patriata (New Murree)',
        description: 'Famous for its chairlift and cable car rides with panoramic mountain views.',
      },
      {
        name: 'Dunga Gali',
        description: 'Known for the Pipeline Track and peaceful surroundings.',
      },
    ],
    weather: {
      temperature: 14,
      condition: 'Cool',
      humidity: 70,
      windSpeed: 9,
    },
  },

  {
    id: 'kaghan-naran',
    name: 'Kaghan & Naran',
    coverImage:
      '/images/destinations/kaghan-naran-cover.jpg',
    cardImage:
      '/images/destinations/kaghan-naran-card.jpg',
    shortDescription:
      'Kaghan & Naran. Discover alpine lakes, scenic valleys, ...Enjoy thrilling road trips, fresh air, and breathtaking nature.',
    fullDescription:
      'Kaghan and Naran Valleys are among the most popular tourist destinations in Khyber Pakhtunkhwa, Pakistan. Known for Saif-ul-Malook Lake, Lulusar Lake, and Babusar Top, the region offers stunning landscapes, waterfalls, and lush meadows.',
    famousLocations: [
      {
        name: 'Saif-ul-Malook Lake',
        description:
          'A famous alpine lake near Naran, surrounded by snow-capped peaks and legends.',
      },
      {
        name: 'Lulusar Lake',
        description: 'A serene lake with crystal-clear waters and scenic surroundings.',
      },
      {
        name: 'Babusar Top',
        description: 'A mountain pass offering panoramic views and a thrilling road trip.',
      },
      {
        name: 'Shogran',
        description: 'A hill station known for lush meadows and access to Siri Paye.',
      },
    ],
    weather: {
      temperature: 13,
      condition: 'Chilly',
      humidity: 65,
      windSpeed: 11,
    },
  },

  {
    id: 'shogran-siri-paye',
    name: 'Shogran & Siri Paye',
    coverImage:
      '/images/destinations/shogran-siri-paye-cover.jpg',
    cardImage:
      '/images/destinations/shogran-siri-paye-card.jpg',
    shortDescription:
      'Shogran & Siri Paye. Lush meadows, pine forests, and ...Experience jeep tracks, fresh air, and a postcard-perfect escape.',
    fullDescription:
      'Shogran is a beautiful hill station in the Kaghan Valley, while Siri Paye is a nearby meadow accessible via jeep rides. Known for lush landscapes, cool weather, and stunning views, it’s a perfect summer escape.',
    famousLocations: [
      {
        name: 'Siri Paye Meadows',
        description: 'A vast meadow offering breathtaking views and a peaceful atmosphere.',
      },
      {
        name: 'Shogran Viewpoint',
        description: 'A viewpoint in Shogran offering panoramic views of the valley.',
      },
      {
        name: 'Makra Peak',
        description: 'A popular hiking peak near Siri Paye for adventurous visitors.',
      },
      {
        name: 'Pine Forest Trails',
        description: 'Walk through pine forests for fresh air and scenic beauty.',
      },
    ],
    weather: {
      temperature: 12,
      condition: 'Cool',
      humidity: 70,
      windSpeed: 10,
    },
  },

  {
    id: 'kumrat-valley',
    name: 'Kumrat Valley',
    coverImage:
      '/images/destinations/kumrat-valley-cover.jpg',
    cardImage:
      '/images/destinations/kumrat-valley-card.jpg',
    shortDescription:
      'Kumrat Valley. Explore forests, rivers, and waterfalls ...A hidden gem for camping, trekking, and scenic river views.',
    fullDescription:
      'Kumrat Valley is a stunning valley in Upper Dir, Khyber Pakhtunkhwa, Pakistan. Known for its dense forests, crystal-clear rivers, and mesmerizing waterfalls, it’s a hidden gem perfect for camping and trekking.',
    famousLocations: [
      {
        name: 'Kumrat River',
        description:
          'A crystal-clear river flowing through the valley, ideal for picnics and scenic photography.',
      },
      {
        name: 'Jahaz Banda',
        description: 'A beautiful meadow accessible by trekking, known for stunning landscapes.',
      },
      {
        name: 'Kala Chashma',
        description: 'A famous waterfall spot in the valley, perfect for nature lovers.',
      },
      {
        name: 'Dense Pine Forests',
        description: 'Explore the valley’s pine forests for a peaceful natural experience.',
      },
    ],
    weather: {
      temperature: 14,
      condition: 'Mild',
      humidity: 60,
      windSpeed: 8,
    },
  },

  {
    id: 'shandur-gupis',
    name: 'Shandur & Gupis',
    coverImage:
      '/images/destinations/shandur-gupis-cover.jpg',
    cardImage:
      '/images/destinations/shandur-gupis-card.jpg',
    shortDescription:
      'Shandur & Gupis. Visit the world’s highest polo ground ...Experience alpine beauty, polo festivals, and breathtaking passes.',
    fullDescription:
      'Shandur Pass, located between Chitral and Gilgit-Baltistan, is famous for hosting the Shandur Polo Festival on the world’s highest polo ground. Gupis is a scenic region nearby, known for lakes and mountain landscapes.',
    famousLocations: [
      {
        name: 'Shandur Polo Ground',
        description:
          'The world’s highest polo ground, famous for the annual Shandur Polo Festival.',
      },
      {
        name: 'Shandur Pass',
        description: 'A mountain pass offering spectacular views and an adventurous journey.',
      },
      {
        name: 'Phandar Lake',
        description: 'A serene lake near Gupis, known for its crystal-clear waters.',
      },
      {
        name: 'Gupis Valley',
        description: 'A scenic valley with lakes, rivers, and peaceful mountain views.',
      },
    ],
    weather: {
      temperature: 8,
      condition: 'Cold',
      humidity: 50,
      windSpeed: 14,
    },
  },

  {
    id: 'astore-valley',
    name: 'Astore Valley',
    coverImage:
      '/images/destinations/astore-valley-cover.jpg',
    cardImage:
      '/images/destinations/astore-valley-card.jpg',
    shortDescription:
      'Astore Valley. Known for Rama Meadows, rivers, and ...A tranquil destination with scenic meadows and majestic peaks.',
    fullDescription:
      'Astore Valley is located in Gilgit-Baltistan, Pakistan, and is known for its lush green meadows, rivers, and scenic landscapes. It serves as a gateway to Deosai Plains and features beautiful spots like Rama Meadows and Rama Lake.',
    famousLocations: [
      {
        name: 'Rama Meadows',
        description:
          'A lush green meadow surrounded by forests and mountains, perfect for camping.',
      },
      {
        name: 'Rama Lake',
        description:
          'A serene alpine lake near Rama Meadows, offering beautiful reflections of surrounding peaks.',
      },
      {
        name: 'Deosai Plains',
        description: 'The second highest plateau in the world, accessible from Astore Valley.',
      },
      {
        name: 'Astore River',
        description: 'A scenic river flowing through the valley, perfect for relaxing by the water.',
      },
    ],
    weather: {
      temperature: 10,
      condition: 'Cool',
      humidity: 55,
      windSpeed: 12,
    },
  },

  {
    id: 'khanpur-lake',
    name: 'Khanpur Lake',
    coverImage:
      '/images/destinations/khanpur-lake-cover.jpg',
    cardImage:
      '/images/destinations/khanpur-lake-card.jpg',
    shortDescription:
      'Khanpur Lake. Enjoy boating, jet skiing, and water ...A popular weekend getaway for water sports and lakeside relaxation.',
    fullDescription:
      'Khanpur Lake (Khanpur Dam) is located near Haripur, Pakistan, and is famous for its turquoise waters and water sports activities like boating, jet skiing, and snorkeling. It’s a popular weekend destination for families and adventure seekers.',
    famousLocations: [
      {
        name: 'Boating Point',
        description: 'Enjoy boating on the lake’s calm turquoise waters.',
      },
      {
        name: 'Water Sports Area',
        description: 'A designated area for jet skiing, snorkeling, and other water adventures.',
      },
      {
        name: 'Cliff Diving Spot',
        description: 'A thrilling cliff diving location for adrenaline seekers.',
      },
      {
        name: 'Lakeside Picnic Area',
        description: 'Relax by the lake with family and friends for a scenic picnic.',
      },
    ],
    weather: {
      temperature: 30,
      condition: 'Warm',
      humidity: 35,
      windSpeed: 9,
    },
  },

  {
    id: 'taxila',
    name: 'Taxila',
    coverImage:
      '/images/destinations/taxila-cover.jpg',
    cardImage:
      '/images/destinations/taxila-card.jpg',
    shortDescription:
      'Taxila. Explore ancient Buddhist ruins and museums...A UNESCO-listed archaeological site with rich history and artifacts.',
    fullDescription:
      'Taxila is an ancient city near Islamabad, Pakistan, and a UNESCO World Heritage Site. It is known for its archaeological ruins, Buddhist monasteries, and the Taxila Museum, showcasing artifacts from the Gandhara civilization.',
    famousLocations: [
      {
        name: 'Taxila Museum',
        description:
          'A museum housing a large collection of Gandhara art, sculptures, and archaeological finds.',
      },
      {
        name: 'Dharmarajika Stupa',
        description:
          'An ancient Buddhist stupa and monastery complex dating back to the Mauryan period.',
      },
      {
        name: 'Jaulian Monastery',
        description: 'A well-preserved Buddhist monastery with stunning stupas and relics.',
      },
      {
        name: 'Sirkap Ruins',
        description: 'Ruins of an ancient city showcasing Greek-influenced architecture and history.',
      },
    ],
    weather: {
      temperature: 27,
      condition: 'Sunny',
      humidity: 40,
      windSpeed: 8,
    },
  },

  {
    id: 'haramosh-valley',
    name: 'Haramosh Valley',
    coverImage:
      '/images/destinations/haramosh-valley-cover.jpg',
    cardImage:
      '/images/destinations/haramosh-valley-card.jpg',
    shortDescription:
      'Haramosh Valley. A quiet valley with towering peaks, ...A hidden gem for trekkers and nature lovers seeking solitude.',
    fullDescription:
      'Haramosh Valley is located near Gilgit, Pakistan, and is known for its towering peaks, glaciers, and serene landscapes. It’s a hidden gem for trekkers and adventurers looking for an off-the-beaten-path experience.',
    famousLocations: [
      {
        name: 'Haramosh Peak',
        description: 'A towering peak popular among experienced climbers and trekkers.',
      },
      {
        name: 'Kutwal Lake (Nearby)',
        description:
          'A beautiful alpine lake nearby (often associated with the Haramosh region).',
      },
      {
        name: 'Glacier Viewpoints',
        description: 'Scenic spots offering views of glaciers and surrounding peaks.',
      },
      {
        name: 'Local Villages',
        description: 'Experience local culture and hospitality in the villages of the valley.',
      },
    ],
    weather: {
      temperature: 11,
      condition: 'Cool',
      humidity: 55,
      windSpeed: 10,
    },
  },

  // These three remain unchanged (no matching images in your ZIP)
  {
    id: 'lahore-heritage',
    name: 'Lahore Heritage',
    coverImage:
      '/images/destinations/lahore-heritage.jpg',
    cardImage:
      '/images/destinations/lahore-heritage.jpg',
    shortDescription:
      'Lahore Heritage. Discover the cultural heart of Pakistan ...Explore iconic forts, Wvibrant bazaars, and rich Mughal history.',
    fullDescription:
      'Lahore is Pakistan’s cultural capital, renowned for its Mughal-era architecture, bustling bazaars, and rich culinary traditions. From the Lahore Fort and Badshahi Mosque to the vibrant streets of the Walled City, Lahore offers an immersive journey through history and culture.',
    famousLocations: [
      { name: 'Lahore Fort', description: 'A UNESCO World Heritage site showcasing Mughal grandeur.' },
      { name: 'Badshahi Mosque', description: 'One of the largest mosques in the world, built by Aurangzeb.' },
      { name: 'Walled City', description: 'Historic alleys, food streets, and hidden architectural gems.' },
      { name: 'Shalimar Gardens', description: 'Mughal gardens built in the 17th century with flowing fountains.' },
    ],
    weather: {
      temperature: 29,
      condition: 'Warm',
      humidity: 45,
      windSpeed: 9,
    },
  },

  {
    id: 'mughal-garden-wah',
    name: 'Mughal Garden (Wah)',
    coverImage: '/images/destinations/mughal-gardens-wah-cover.jpg',
    cardImage: '/images/destinations/mughal-garden-wah.jpg',
    shortDescription:
      'Mughal Garden (Wah). A serene historical garden near Wah...A peaceful spot with Mughal-era charm, ideal for a relaxing visit.',
    fullDescription:
      'The Mughal Garden in Wah is a historic garden built during the Mughal era, offering a peaceful escape with lush greenery and fountains. It’s an ideal destination for those interested in history and tranquil scenic spots.',
    famousLocations: [
      { name: 'Main Garden Walkways', description: 'Tree-lined pathways perfect for a relaxing stroll.' },
      { name: 'Fountain Area', description: 'Historic water features reflecting Mughal garden design.' },
      { name: 'Old Structures', description: 'Remnants of Mughal-era architecture in the garden.' },
      { name: 'Nearby Viewpoints', description: 'Scenic spots around Wah offering a calm atmosphere.' },
    ],
    weather: {
      temperature: 28,
      condition: 'Sunny',
      humidity: 40,
      windSpeed: 8,
    },
  },

  {
    id: 'kutwal-lake',
    name: 'Kutwal Lake',
    coverImage: '/images/destinations/kutwal-lake-cover.jpg',
    cardImage: '/images/destinations/kutwal-lake-card.jpg',
    shortDescription:
      'Kutwal Lake. A stunning alpine lake near Haramosh, ...A remote trek destination with pristine waters and dramatic peaks.',
    fullDescription:
      'Kutwal Lake is a remote alpine lake often associated with the Haramosh region in Gilgit-Baltistan. It’s a high-altitude trek destination known for pristine waters, dramatic peaks, and a true wilderness experience.',
    famousLocations: [
      { name: 'Kutwal Lake Shore', description: 'The main lake area with incredible reflections and serenity.' },
      { name: 'Trek Route', description: 'Scenic trek paths through valleys and rugged terrain.' },
      { name: 'Surrounding Peaks', description: 'Dramatic mountain views around the lake.' },
      { name: 'Camping Spots', description: 'Remote camping locations for adventurers.' },
    ],
    weather: {
      temperature: 9,
      condition: 'Cold',
      humidity: 55,
      windSpeed: 12,
    },
  },
];
