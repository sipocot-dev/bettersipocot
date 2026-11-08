export type SchoolRecord = {
  name: string;
  schoolId?: string;
  sector: 'Public' | 'Private' | 'SUC/LUC';
  level: 'Elementary' | 'Secondary' | 'Integrated' | 'Higher education' | 'Basic education';
  barangay?: string;
  learners?: number;
  teachers?: number;
  classrooms?: number;
  latitude?: number;
  longitude?: number;
  sourceUrl?: string;
};

export const sipocotSchools: SchoolRecord[] = [
  { name: 'Aldezar ES', sector: 'Public', level: 'Elementary', barangay: 'Aldezar', learners: 159, teachers: 6, classrooms: 6 },
  { name: 'Aldezar Sipocot Integrated School', sector: 'Public', level: 'Integrated', barangay: 'Aldezar', learners: 205, teachers: 9, classrooms: 13 },
  { name: 'Alteza Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Alteza', learners: 179, teachers: 7, classrooms: 8 },
  { name: 'Anib Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Anib', learners: 304, teachers: 11, classrooms: 8 },
  { name: 'Anib National High School', sector: 'Public', level: 'Secondary', barangay: 'Anib', learners: 539, teachers: 26, classrooms: 16, latitude: 13.8025582, longitude: 123.0470735 },
  { name: 'Awayan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Awayan', learners: 93, teachers: 7, classrooms: 6 },
  { name: 'Azucena Community School', sector: 'Public', level: 'Elementary', barangay: 'Azucena', learners: 76, teachers: 6, classrooms: 3 },
  { name: 'Bagong Sirang Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Bagong Sirang', learners: 252, teachers: 9, classrooms: 9 },
  { name: 'Binahian Sipocot Integrated School', sector: 'Public', level: 'Integrated', barangay: 'Binahian', learners: 455, teachers: 17, classrooms: 13 },
  { name: 'Bocol Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Bocol', learners: 133, teachers: 6, classrooms: 5 },
  { name: 'Bolo Norte High School', sector: 'Public', level: 'Secondary', barangay: 'Bolo Norte', learners: 605, teachers: 36, classrooms: 18, latitude: 13.823, longitude: 122.959 },
  { name: 'Bolo Sur Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Bolo Sur', learners: 179, teachers: 6, classrooms: 7, latitude: 13.7996, longitude: 122.9588 },
  { name: 'Bulan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Bulan', learners: 64, teachers: 4, classrooms: 4 },
  { name: 'Bulawan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Bulawan', learners: 177, teachers: 9, classrooms: 5 },
  { name: 'Cabuyao Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Cabuyao', learners: 59, teachers: 4, classrooms: 5 },
  { name: 'Caima Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Caima', learners: 235, teachers: 11, classrooms: 5 },
  { name: 'Calagbangan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Calagbangan', learners: 485, teachers: 18, classrooms: 14, latitude: 13.838, longitude: 122.97 },
  { name: 'Calampinay Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Calampinay', learners: 151, teachers: 7, classrooms: 7 },
  { name: 'Camarines Sur International School (CSIS), Inc.', sector: 'Private', level: 'Basic education', barangay: 'South Centro', learners: 522 },
  { name: 'Carayrayan Primary School', sector: 'Public', level: 'Elementary', barangay: 'Carayrayan', learners: 135, teachers: 7, classrooms: 6 },
  { name: 'Central Bicol State University of Agriculture - Sipocot', sector: 'SUC/LUC', level: 'Higher education', barangay: 'Impig', learners: 186, latitude: 13.784888, longitude: 122.979759, sourceUrl: 'https://cbsua.edu.ph/sipocot-campus/' },
  { name: 'Christian Mission Service Philippines Inc.', sector: 'Private', level: 'Elementary', barangay: 'South Centro', learners: 103 },
  { name: 'Cotmo Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Cotmo', learners: 214, teachers: 9, classrooms: 6 },
  { name: 'Ezer Christian School of Sipocot Inc.', sector: 'Private', level: 'Basic education', barangay: 'South Centro', learners: 29 },
  { name: 'Felix O. Alfelor Sr. Foundation College - Sipocot', sector: 'Private', level: 'Higher education', barangay: 'South Centro', learners: 667, latitude: 13.76558, longitude: 122.97652, sourceUrl: 'https://www.teacherph.com/schools/camarines-sur/sipocot/felix-o-alfelor-sr-foundation-college-sipocot-403748/' },
  { name: 'Gabi Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Gabi', learners: 65, teachers: 5, classrooms: 5 },
  { name: 'Gaongan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Gaongan', learners: 383, teachers: 14, classrooms: 11 },
  { name: 'Jaime Macatangay Sr. National High School', sector: 'Public', level: 'Secondary', barangay: 'Caima', learners: 506, teachers: 30, classrooms: 19 },
  { name: 'King Thomas Learning Academy Inc.', sector: 'Private', level: 'Basic education', barangay: 'Malubago', learners: 1503, sourceUrl: 'https://www.teacherph.com/schools/camarines-sur/sipocot/king-thomas-learning-academy-inc-433545/' },
  { name: 'LRV Preppi School Foundation, Inc.', sector: 'Private', level: 'Basic education', learners: 21 },
  { name: 'Lipilip Primary School', sector: 'Public', level: 'Elementary', barangay: 'Lipilip', learners: 106, teachers: 7, classrooms: 7 },
  { name: 'Lubigan Jr. Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Lubigan Jr.', learners: 256, teachers: 9, classrooms: 7 },
  { name: 'Lubigan Sr. Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Lubigan Sr.', learners: 222, teachers: 8, classrooms: 8 },
  { name: 'Lubigan Sr. High School', sector: 'Public', level: 'Secondary', barangay: 'Lubigan Sr.', learners: 301, teachers: 16, classrooms: 7 },
  { name: 'Malaguico Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Malaguico', learners: 132, teachers: 8, classrooms: 4 },
  { name: 'Manangle Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Manangle', learners: 289, teachers: 14, classrooms: 9 },
  { name: 'Manangle High School', sector: 'Public', level: 'Secondary', barangay: 'Manangle', learners: 243, teachers: 20, classrooms: 14 },
  { name: 'Mangapo Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Mangapo', learners: 72, teachers: 5, classrooms: 3 },
  { name: 'Mangga Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Mangga', learners: 204, teachers: 8, classrooms: 6, latitude: 13.778, longitude: 123.045 },
  { name: 'Manlubang Primary School', sector: 'Public', level: 'Elementary', barangay: 'Manlubang', learners: 72, teachers: 6, classrooms: 2 },
  { name: 'Mantila Community School', sector: 'Public', level: 'Elementary', barangay: 'Mantila', learners: 107, teachers: 7, classrooms: 4 },
  { name: 'Nazareth Institute of Learning and Formation, Inc.', sector: 'Private', level: 'Basic education', learners: 42 },
  { name: 'North Villazar Elementary School', sector: 'Public', level: 'Elementary', barangay: 'North Villazar', learners: 473, teachers: 17, classrooms: 18, latitude: 13.865472, longitude: 122.9492405 },
  { name: 'Sacred Heart High School', sector: 'Public', level: 'Secondary', barangay: 'Calagbangan', learners: 704, teachers: 31, classrooms: 20 },
  { name: 'Sagrada Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Sagrada Familia', learners: 90, teachers: 6, classrooms: 5 },
  { name: 'Salvacion Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Salvacion', learners: 189, teachers: 8, classrooms: 8 },
  { name: 'Salvacion High School', sector: 'Public', level: 'Secondary', barangay: 'Salvacion', learners: 185, teachers: 6, classrooms: 5, latitude: 13.8265533, longitude: 123.0157617 },
  { name: 'San Isidro Elementary School', sector: 'Public', level: 'Elementary', barangay: 'San Isidro', learners: 111, teachers: 7, classrooms: 5 },
  { name: 'San Vicente Elementary School', sector: 'Public', level: 'Elementary', barangay: 'San Vicente', learners: 188, teachers: 8, classrooms: 5 },
  { name: 'San Vicente High School', sector: 'Public', level: 'Secondary', barangay: 'San Vicente', learners: 188, teachers: 13, classrooms: 7, latitude: 13.76725, longitude: 122.98422 },
  { name: 'Serranz Learning Center Inc.', sector: 'Private', level: 'Basic education', barangay: 'North Centro', learners: 233 },
  { name: 'Serranzana Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Serranzana', learners: 156, teachers: 7, classrooms: 3 },
  { name: 'Sipocot National High School', sector: 'Public', level: 'Secondary', barangay: 'Tara', learners: 2279, teachers: 124, classrooms: 80, latitude: 13.74701, longitude: 122.9709 },
  { name: 'Sipocot North Central School', sector: 'Public', level: 'Elementary', barangay: 'Impig', learners: 953, teachers: 40, classrooms: 44, latitude: 13.77604, longitude: 122.97727 },
  { name: 'Sipocot South Central School', sector: 'Public', level: 'Elementary', barangay: 'South Centro', learners: 1212, teachers: 44, classrooms: 36 },
  { name: 'Soledad R. Villafuerte Elementary School', sector: 'Public', level: 'Elementary', barangay: 'South Centro', learners: 366, teachers: 15, classrooms: 11 },
  { name: 'South Villazar Elementary School', sector: 'Public', level: 'Elementary', barangay: 'South Villazar', learners: 269, teachers: 10, classrooms: 5 },
  { name: 'Sta. Cruz Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Sta. Cruz', learners: 170, teachers: 7, classrooms: 5, latitude: 13.8465387, longitude: 123.0102471 },
  { name: 'Taisan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Taisan', learners: 110, teachers: 7, classrooms: 7 },
  { name: 'Tara Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Tara', learners: 271, teachers: 12, classrooms: 7 },
  { name: 'Tigman Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Tigman', learners: 197, teachers: 8, classrooms: 7 },
  { name: 'Tula-Tula Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Tula-Tula', learners: 99, teachers: 7, classrooms: 5 },
  { name: 'Vigaan Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Vigaan', learners: 103, teachers: 7, classrooms: 4, latitude: 13.7666716, longitude: 122.9807549 },
  { name: 'Villazar National High School', sector: 'Public', level: 'Secondary', barangay: 'North Villazar', learners: 1173, teachers: 49, classrooms: 38 },
  { name: 'Yabo - Salanda Elementary School', sector: 'Public', level: 'Elementary', barangay: 'Salanda', learners: 113, teachers: 8, classrooms: 4, latitude: 13.8004, longitude: 122.9447 },
];

export const educationStats = {
  schoolYear: 'SY 2024–2025',
  totalSchools: 64,
  publicSchools: 55,
  privateSchools: 8,
  sucs: 1,
  learnersInSchools: 20403,
  learnersIncludingALS: 20769,
  teachers: 807,
  classrooms: 593,
  alsCenters: 6,
};
