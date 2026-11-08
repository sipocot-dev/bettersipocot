export type WorshipPlace = {
  name: string;
  kind: 'Parish' | 'Mission house' | 'Chapel' | 'Christian church' | 'Congregation';
  denomination: string;
  barangay: string;
  address: string;
  clergyRole?: string;
  clergyName?: string;
  assistantClergy?: string;
  patronOrFeast?: string;
  established?: string;
  phone?: string;
  leadershipSource?: string;
  locationSource: string;
  mapQuery: string;
  notes?: string;
};

export const sipocotWorshipPlaces: WorshipPlace[] = [
  { name: 'St. John the Baptist Parish', kind: 'Parish', denomination: 'Roman Catholic · Diocese of Libmanan', barangay: 'South Centro', address: 'South Centro, Sipocot, Camarines Sur 4408', clergyRole: 'Parish Priest', clergyName: 'Rev. Fr. Marco Asoro', assistantClergy: 'Rev. Fr. Antonio Toledano Jr. · Assistant Parish Priest', established: '3 July 1801', patronOrFeast: 'St. John the Baptist · 24 June', phone: '(054) 256-6507', leadershipSource: 'Diocese of Libmanan – Parishes & Mission Stations', locationSource: 'Diocese of Libmanan; The Old Churches', mapQuery: 'St John the Baptist Parish Church South Centro Sipocot Camarines Sur' },
  { name: 'St. Pius X Parish', kind: 'Parish', denomination: 'Roman Catholic · Diocese of Libmanan', barangay: 'North Villazar', address: 'Villazar, Sipocot, Camarines Sur 4408', clergyRole: 'Parish Priest', clergyName: 'Rev. Fr. Francis Francisco', established: '1956', patronOrFeast: 'St. Pius X · 21 August', leadershipSource: 'Diocese of Libmanan – Parishes & Mission Stations', locationSource: 'Diocese of Libmanan; The Old Churches', mapQuery: 'St Pius X Parish Church North Villazar Sipocot Camarines Sur' },
  { name: 'St. Anthony of Padua Parish', kind: 'Parish', denomination: 'Roman Catholic · Diocese of Libmanan', barangay: 'Binahian', address: 'Binahian, Sipocot, Camarines Sur 4408', clergyRole: 'Parish Priest', clergyName: 'Rev. Fr. Jeric Felizardo', established: '2002', patronOrFeast: 'St. Anthony of Padua · 13 June', leadershipSource: 'Diocese of Libmanan – Parishes & Mission Stations', locationSource: 'Diocese of Libmanan; The Old Churches', mapQuery: 'St Anthony of Padua Parish Church Binahian Sipocot Camarines Sur' },
  { name: 'St. Therese of the Child Jesus Parish', kind: 'Parish', denomination: 'Roman Catholic · Diocese of Libmanan', barangay: 'Tara', address: 'Zone 3, Tara, Sipocot, Camarines Sur 4408', clergyRole: 'Parish Priest', clergyName: 'Rev. Fr. Aldrin Adolfo', established: '2003', patronOrFeast: 'St. Therese of the Child Jesus · 1 October', leadershipSource: 'Diocese of Libmanan – Parishes & Mission Stations', locationSource: 'Diocese of Libmanan; The Old Churches', mapQuery: 'St Therese of the Child Jesus Parish Church Tara Sipocot Camarines Sur' },
  { name: 'Sto. Niño de Praga Parish', kind: 'Parish', denomination: 'Roman Catholic · Diocese of Libmanan', barangay: 'Calagbangan', address: 'Calagbangan, Sipocot, Camarines Sur', clergyRole: 'Parish Administrator', clergyName: 'Rev. Fr. Noel Despabiladeras', established: '2015', patronOrFeast: 'Sto. Niño de Praga · 25 September', leadershipSource: 'Diocese of Libmanan – Parishes & Mission Stations', locationSource: 'Diocese of Libmanan; The Old Churches', mapQuery: 'Sto Nino de Praga Parish Church Calagbangan Sipocot Camarines Sur' },
  { name: 'Casa Miani', kind: 'Mission house', denomination: 'Roman Catholic · Congregation of the Somascan Fathers (CRS)', barangay: 'Bolo Norte', address: 'Bolo Norte, Sipocot, Camarines Sur', clergyRole: 'Administrator', clergyName: 'Fr. Menandro Rivera, CRS', assistantClergy: 'Fr. Fransiskus Jehaut, CRS · Assistant', established: '2014', patronOrFeast: 'St. Jerome Emiliani · 8 February', leadershipSource: 'Diocese of Libmanan – Parishes & Mission Stations', locationSource: 'Diocese of Libmanan', mapQuery: 'Casa Miani Bolo Norte Sipocot Camarines Sur' },
  { name: 'CBSUA – Sipocot Chapel', kind: 'Chapel', denomination: 'Christian chapel · Campus', barangay: 'Impig', address: 'CBSUA Sipocot Campus, Impig, Sipocot, Camarines Sur', locationSource: 'Local map listing', mapQuery: 'CBSUA Sipocot Chapel Impig Camarines Sur', notes: 'On-campus chapel; access may be subject to campus rules.' },
  { name: 'Calagbangan Chapel', kind: 'Chapel', denomination: 'Roman Catholic', barangay: 'Calagbangan', address: 'Calagbangan, Sipocot, Camarines Sur', locationSource: 'Local map listing', mapQuery: 'Calagbangan Chapel Sipocot Camarines Sur' },
  { name: 'Iglesia Ni Cristo – Sipocot Locale', kind: 'Congregation', denomination: 'Iglesia Ni Cristo', barangay: 'Tara', address: 'Barangay Tara, Sipocot, Camarines Sur', phone: '(054) 256-6836', locationSource: 'Official INC Directory', mapQuery: 'Iglesia Ni Cristo Sipocot Locale Tara Camarines Sur', notes: 'Official directory publishes the chapel contact and worship schedule. Confirm schedule before attending.' },
  { name: 'The Church of Jesus Christ of Latter-day Saints – Sipocot', kind: 'Congregation', denomination: 'Latter-day Saints', barangay: 'South Centro', address: 'National Road, South Centro, Sipocot, Camarines Sur 4408', phone: '0951 275 0888', locationSource: 'Official Church location directory', mapQuery: 'The Church of Jesus Christ of Latter-day Saints National Road South Centro Sipocot' },
  { name: 'The Church of Jesus Christ of Latter-day Saints – Sipocot Ward', kind: 'Congregation', denomination: 'Latter-day Saints', barangay: 'Santa Cruz', address: 'Santa Cruz, Sipocot, Camarines Sur', phone: '(054) 256-6429', locationSource: 'Local map listing', mapQuery: 'LDS Sipocot Ward Santa Cruz Sipocot Camarines Sur' },
  { name: 'Maharlika Bible Baptist Church', kind: 'Christian church', denomination: 'Baptist', barangay: 'South Centro', address: 'San Juan Street, Sipocot, Camarines Sur', locationSource: 'Local church directory', mapQuery: 'Maharlika Bible Baptist Church San Juan Street Sipocot' },
  { name: 'MCGI Sipocot', kind: 'Congregation', denomination: 'Members Church of God International', barangay: 'Sipocot', address: 'Sipocot, Camarines Sur · Plus Code QX3C+M5H', locationSource: 'Local map listing', mapQuery: 'MCGI Sipocot Camarines Sur' },
  { name: 'Assembly of God Sipocot', kind: 'Christian church', denomination: 'Assemblies of God', barangay: 'Sipocot', address: 'Sipocot, Camarines Sur · Plus Code QX8G+94H', locationSource: 'Local map listing', mapQuery: 'Assembly of God Sipocot Camarines Sur' },
  { name: 'PLWM Sipocot Church', kind: 'Christian church', denomination: 'Philippine Life Word Mission (PLWM)', barangay: 'Sipocot', address: 'Sipocot, Camarines Sur · Plus Code QX8H+WG', locationSource: 'Local map listing', mapQuery: 'PLWM Sipocot Church Camarines Sur' },
  { name: 'Church of Christ – Bolo Norte', kind: 'Christian church', denomination: 'Church of Christ', barangay: 'Bolo Norte', address: 'Zone 4, Bolo Norte, Sipocot, Camarines Sur', locationSource: 'Local map listing', mapQuery: 'Church of Christ Zone 4 Bolo Norte Sipocot' },
  { name: 'Villazar Seventh-day Adventist Church', kind: 'Christian church', denomination: 'Seventh-day Adventist', barangay: 'Villazar', address: 'Villazar, Sipocot, Camarines Sur', locationSource: 'Local church directory', mapQuery: 'Villazar Seventh Day Adventist Church Sipocot' },
  { name: 'IAM Redeemer and Master Evangelical Church – IRM Ministries', kind: 'Christian church', denomination: 'Evangelical · IRM Ministries', barangay: 'Calagbangan', address: 'Zone 8, Calagbangan, Sipocot, Camarines Sur', clergyRole: 'Pastor', clergyName: 'Rev. Eliezer “Ely” Perez', assistantClergy: 'Deac. Jeannete Perez · Deaconess', leadershipSource: 'IRM Ministries Directory', locationSource: 'IRM Ministries Directory', mapQuery: 'IRM Ministries IAM Redeemer Master Evangelical Church Calagbangan Sipocot', notes: 'Published schedule: Sunday 9:00–11:00 AM; Friday prayer meeting 6:00–7:30 PM. Confirm before attending.' },
  { name: 'OFW & Family Christian Ministry', kind: 'Christian church', denomination: 'Christian ministry', barangay: 'Sipocot', address: 'Near Philippine National Railways compound, Sipocot, Camarines Sur', locationSource: 'Local map listing', mapQuery: 'OFW Family Christian Ministry Sipocot Camarines Sur' },
];

export const churchQuickLinks = [
  { title: 'Catholic Parishes', description: 'Parish locations, clergy assignments and patron feasts.', href: '#worship-directory' },
  { title: 'Chapels & Mission Stations', description: 'Campus chapels and community worship places.', href: '#worship-directory' },
  { title: 'Christian Churches', description: 'Find congregations across denominations in Sipocot.', href: '#worship-directory' },
  { title: 'Diocese & Parish Contacts', description: 'Verify current parish leadership and service details.', href: 'https://libmanandiocese.org/?p=353', external: true },
];
