export interface ICategory {
  category: string;
  abbreviation: string;
  image: string;
  collections: { selected: boolean; name: string }[];
}

export default [
  {
    category: 'Bedroom',
    abbreviation: 'BR',
    image: 'bedroom/652-br.jpg',
    collections: [
      { selected: false, name: 'Alexandria (722-BR)' },
      { selected: false, name: 'Allyson Park (417-BR)' },
      { selected: false, name: 'Amelia (487-BR)' },
      { selected: false, name: 'Arbor Place (575-BR)' },
      { selected: false, name: 'Artisan Prairie (823-BR)' },
      { selected: false, name: 'Avalon (505-BR)' },
      { selected: false, name: 'Avalon III (705-BR)' },
      { selected: false, name: 'Bayside (249-BR)' },
    ],
  },
  {
    category: 'Dining',
    abbreviation: 'CD',
    image: 'dining/634-dr.jpg',
    collections: [
      { selected: false, name: 'Abbey Park (520-DR)' },
      { selected: false, name: 'Al Fresco (541-CD)' },
      { selected: false, name: 'Al Fresco II (641-CD)' },
      { selected: false, name: 'Al Fresco III (841-CD)' },
      { selected: false, name: 'Allyson Park (417-DR)' },
      { selected: false, name: 'Arlington House (411-DR)' },
      { selected: false, name: 'Armand (242-DR)' },
      { selected: false, name: 'Atwood Creek (248-CD)' },
    ],
  },
  {
    category: 'Entertainment',
    abbreviation: 'ENT',
    image: 'entertainment/498-entw.jpg',
    collections: [
      { selected: false, name: 'Abbey (328-ENTW)' },
      { selected: false, name: 'Alexandria (722-ENT)' },
      { selected: false, name: 'Andalusia (259-ENTW)' },
      { selected: false, name: 'Appalachian Trails (701-TV)' },
      { selected: false, name: 'Aspen Skies (316-TV)' },
      { selected: false, name: 'Aspen Skies (416-TV)' },
      { selected: false, name: 'Aspen Skies (516-TV)' },
      { selected: false, name: 'Avalon (505-ENT)' },
    ],
  },
  {
    category: 'Home Office',
    abbreviation: 'HO',
    image: 'home-office/473-ho.jpg',
    collections: [
      { selected: false, name: 'Amelia (487-HOJ)' },
      { selected: false, name: 'Arlington House (411-HO)' },
      { selected: false, name: 'Brayton Manor (273-HOJ)' },
      { selected: false, name: 'Brookview (378-HO)' },
      { selected: false, name: 'Bungalow II (641-HOJ)' },
      { selected: false, name: 'Bungalow II (541-HOJ)' },
      { selected: false, name: 'Chateau Valley (901-HOJ)' },
      { selected: false, name: 'Hampton Bay -Cherry (718-HO)' },
    ],
  },
  {
    category: 'Occasional',
    abbreviation: 'OT',
    image: 'occasional/422-ot.jpg',
    collections: [
      { selected: false, name: 'Alamosa (108-OT)' },
      { selected: false, name: 'Andalusia (259-OT)' },
      { selected: false, name: 'Arista (37-OT)' },
      { selected: false, name: 'Arlington House (411-OT)' },
      { selected: false, name: 'Aspen Skies (316-OT)' },
      { selected: false, name: 'Aspen Skies (416-OT)' },
      { selected: false, name: 'Avalon (505-OT)' },
      { selected: false, name: 'Avignon (197-OT)' },
    ],
  },
  {
    category: 'Youth',
    abbreviation: 'YBR',
    image: 'youth/652-ybr.jpg',
    collections: [
      { selected: false, name: 'Abbott Ridge (277-YBR)' },
      { selected: false, name: 'Arielle (352-YBR)' },
      { selected: false, name: 'Avalon II (205-YBR)' },
      { selected: false, name: 'Avalon (505-YBR)' },
      { selected: false, name: 'Bayside (249-YBR)' },
      { selected: false, name: 'Carriage Court (709-YBR)' },
      { selected: false, name: 'Chelsea Square (628-YBR)' },
      { selected: false, name: 'Grandpas Cabin (175-YBR)' },
      { selected: false, name: 'Grandpas Cabin (375-YBR)' },
    ],
  },
  {
    category: 'Home Accents',
    abbreviation: 'AC',
    image: 'accents/2011-ac5636.jpg',
    collections: [
      { selected: false, name: 'Abbott Ridge (277-YBR)' },
      { selected: false, name: 'Arielle (352-YBR)' },
      { selected: false, name: 'Avalon II (205-YBR)' },
      { selected: false, name: 'Avalon (505-YBR)' },
      { selected: false, name: 'Bayside (249-YBR)' },
      { selected: false, name: 'Carriage Court (709-YBR)' },
      { selected: false, name: 'Chelsea Square (628-YBR)' },
      { selected: false, name: 'Grandpas Cabin (175-YBR)' },
      { selected: false, name: 'Grandpas Cabin (375-YBR)' },
    ],
  },
];
