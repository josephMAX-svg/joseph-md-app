/**
 * dermaSourcesData.ts — Biblioteca REAL de fuentes Derma (10-jun-2026, verificada en vivo).
 * GENERADO desde DATA/DERMATOLOGIA/_scrape/ (accessderma_estetica_tocs.json + videos_full
 * + qbankly_derm_step2.json). Los 62 links de AccessDerma del plan devolvieron 200 con el
 * título exacto al verificarlos con la sesión UF. NO editar a mano los ids: regenerar.
 */
const MH = 'https://dermatology.mhmedical.com';
export const srcBook = (id: number) => `${MH}/book.aspx?bookid=${id}`;
export const srcCap = (bookid: number, sid: number) => `${MH}/content.aspx?bookid=${bookid}&sectionid=${sid}`;
export const srcMm = (hash: number) => `${MH}/multimedia.aspx#${hash}`;
export const srcQa = (id: number) => `${MH}/qa.aspx?resourceid=${id}`;
export const srcCases = (gid: number) => `${MH}/cases.aspx?groupid=${gid}`;

export interface DermaLibroCap { sid: number; t: string }
export interface DermaLibro { id: number; t: string; caps: number; star: DermaLibroCap[] }
/** 16 libros estéticos/quirúrgicos con TOC extraído (740 caps) — capítulos ⭐ = estética. */
export const DERMA_LIBROS_ESTETICA: DermaLibro[] = [
  { id: 3200, t: 'Baumann\'s Cosmetic Dermatology, 3e', caps: 46, star: [
    { sid: 266614442, t: 'Fat and the Subcutaneous Layer' },
    { sid: 266614593, t: 'Intrinsic Aging' },
    { sid: 266614778, t: 'Extrinsic Aging' },
    { sid: 266614877, t: 'Facial Anatomy and Aging' },
    { sid: 266614928, t: 'Immunology of Skin Aging' },
    { sid: 266616395, t: 'Non-Surgical Body Contouring' },
  ] },
  { id: 2811, t: 'Dermatologic Surgery', caps: 81, star: [
    { sid: 245216992, t: 'Surgical Anatomy, Surface Anatomy, and Cosmetic Subunits' },
    { sid: 245222451, t: 'Managing Surgical Complications' },
    { sid: 245227386, t: 'Neuromodulators' },
    { sid: 245227491, t: 'Fillers and Injectable Implants' },
    { sid: 245227608, t: 'Ethnic and Gender Considerations in the Use of Facial Filler' },
    { sid: 245227840, t: 'Fat Transfer' },
  ] },
  { id: 2819, t: 'Procedural Dermatology', caps: 58, star: [
    { sid: 242374389, t: 'Superficial Head and Neck Anatomy' },
    { sid: 242374872, t: 'Digital Imaging in Dermatologic Surgery' },
    { sid: 242376761, t: 'Surgical Complications and Their Management' },
    { sid: 242377305, t: 'Chemical Peels' },
    { sid: 242377494, t: 'Noninvasive Skin Tightening Technology' },
    { sid: 242377676, t: 'Fillers' },
  ] },
  { id: 2813, t: 'Color Atlas of Cosmetic Dermatology, 2e', caps: 64, star: [
    { sid: 242379752, t: 'Analysis of the Aging Face and Non-Facial Regions' },
    { sid: 242379836, t: 'Soft Tissue Augmentation' },
    { sid: 242379889, t: 'Botulinum Toxin' },
    { sid: 242379991, t: 'Chemical Peels' },
    { sid: 242380044, t: 'Nonablative Laser Resurfacing' },
    { sid: 242380081, t: 'Ablative Laser Resurfacing' },
  ] },
  { id: 2812, t: 'Cosmeceuticals and Cosmetic Ingredients', caps: 83, star: [
    { sid: 244978644, t: 'Hyaluronic Acid' },
    { sid: 244981294, t: 'Overview of Aging' },
  ] },
  { id: 2956, t: 'Cosmetic Dermatology for Skin of Color', caps: 30, star: [
    { sid: 248484903, t: 'Epidermal and Color Improvement in Ethnic Skin: Microdermabr' },
    { sid: 248484961, t: 'Epidermal and Dermal Color Improvement in Ethnic Skin: Pigme' },
    { sid: 248485017, t: 'Dermal Color Improvement in Ethnic Skin: Vascular Lasers and' },
    { sid: 248485068, t: 'Nonablative Dermal Resurfacing in Ethnic Skin: Laser and Int' },
    { sid: 248485136, t: 'Ablative Dermal Resurfacing in Ethnic Skin: Laser, Deep Peel' },
    { sid: 248485250, t: 'Hair Removal in Ethnic Skin: Laser, Lights, and Medical and ' },
  ] },
  { id: 2820, t: 'Cosmetic Surgery', caps: 25, star: [
    { sid: 244382585, t: 'Patient Safety & Preparation' },
    { sid: 244382785, t: 'Injectable Fillers' },
    { sid: 244382954, t: 'Aesthetic Laser Surgery' },
    { sid: 244383745, t: 'Abdominoplasty & Abdominal Contouring Procedures' },
  ] },
  { id: 2818, t: 'Lasers and Related Technologies in Dermatology', caps: 17, star: [
    { sid: 240357100, t: 'Fundamentals of Lasers and Related Technology' },
    { sid: 240357136, t: 'Laser Treatment of Cutaneous Vascular Lesions' },
    { sid: 240357344, t: 'Lasers and Light Devices for Hair Removal' },
    { sid: 240357478, t: 'Laser and Radiofrequency Treatments for Cutaneous Resurfacin' },
    { sid: 240357542, t: 'Devices for the Improvement of Body Contour' },
    { sid: 240357589, t: 'Laser and Light Therapies for the Treatment of Acne Vulgaris' },
  ] },
  { id: 2822, t: 'Sclerotherapy and Vein Treatment, 2e', caps: 36, star: [
    { sid: 245991981, t: 'Venous Anatomy' },
    { sid: 245992470, t: 'Venous Imaging/Duplex Ultrasound' },
    { sid: 245992607, t: 'Sclerotherapy of Large Varicose Veins' },
    { sid: 245992679, t: 'Sclerotherapy of Small Veins' },
    { sid: 245993314, t: 'Foam Sclerotherapy' },
    { sid: 245993346, t: 'Lasers and High-Intensity Pulsed Light' },
  ] },
  { id: 3138, t: 'Atlas of Suturing Techniques: Approaches to Surgical Wound, Laceration, ', caps: 101, star: [
  ] },
  { id: 2829, t: 'Facial Flap Surgery', caps: 23, star: [
    { sid: 245995249, t: 'Complications and Revisions' },
  ] },
  { id: 2953, t: 'Dermatologic Surgery and Cosmetic Procedures in Primary Care Practice', caps: 35, star: [
    { sid: 248410244, t: 'Surgical Anatomy, Surface Anatomy, and Cosmetic Subunits' },
    { sid: 248412341, t: 'Managing Surgical Complications' },
    { sid: 248412579, t: 'Botulinum Toxin' },
    { sid: 248412685, t: 'Fillers' },
    { sid: 248412820, t: 'Chemical Peels' },
    { sid: 248412921, t: 'Lasers for Pigmented Lesions and Tattoos' },
  ] },
  { id: 2993, t: 'Treatment of Scars From Burns and Trauma', caps: 23, star: [
    { sid: 251034000, t: 'Laser-Assisted Drug Delivery for Scars' },
    { sid: 251034524, t: 'Autologous Fat Grafting in the Reconstruction and Rejuvenati' },
    { sid: 251035885, t: 'Vascular Lasers and Lights for the Treatment of Scars' },
  ] },
  { id: 2967, t: 'Venous Insufficiency', caps: 28, star: [
    { sid: 249323128, t: 'Complications' },
  ] },
  { id: 3319, t: 'Margin Control Surgery of the Skin: Concepts, Histopathology, and Applic', caps: 19, star: [
  ] },
  { id: 3257, t: 'Skin Cancer: A Comprehensive Guide', caps: 71, star: [
    { sid: 271453373, t: 'Aging Skin' },
    { sid: 271457422, t: 'Laser in Skin Cancer Diagnosis: Highlight of Reflectance Con' },
  ] },
];

export interface DermaVideoCat { nombre: string; hash: number; n: number }
/** Categorías de vídeo de AccessDerma con conteo REAL (títulos completos en DATA/). */
export const DERMA_VIDEOS: DermaVideoCat[] = [
  { nombre: 'Suturing Techniques (Kantor)', hash: 1420, n: 91 },
  { nombre: 'Animations', hash: 1457, n: 21 },
  { nombre: 'Vein Treatment', hash: 1421, n: 13 },
  { nombre: 'Clinical Dermatology — Videos', hash: 46399, n: 13 },
  { nombre: 'Clinical Dermatology (padre)', hash: 1440, n: 11 },
  { nombre: 'Clinical Dermatology — Lectures', hash: 46398, n: 11 },
  { nombre: 'Pediatric Dermatology', hash: 1581, n: 9 },
  { nombre: 'General Dermatology — Fitzpatrick\'s Dermatology', hash: 46002, n: 7 },
  { nombre: 'Essentials of Skin of Color', hash: 1661, n: 5 },
  { nombre: 'General Dermatology', hash: 1419, n: 4 },
  { nombre: 'General Dermatology — Case-Based Review', hash: 47857, n: 4 },
  { nombre: 'Biopsies', hash: 1417, n: 2 },
];

/** Q-banks de AccessDerma (preguntas REALES contadas en vivo). */
export const DERMA_QBANKS_ACCESS = [
  { nombre: "Barnhill's Dermatopathology Challenge", resourceid: 2865, preguntas: 403 },
  { nombre: 'Specialty Board Review Pictorial 4e', resourceid: 3626, preguntas: 381 },
  { nombre: 'Specialty Board Review Pictorial 3e', resourceid: 2948, preguntas: 363 },
  { nombre: 'CORE Exam Question Bank', resourceid: 3479, preguntas: 104 },
  { nombre: 'Question of the Week (archivo)', resourceid: 3562, preguntas: 50 },
];
export const DERMA_CASES_ACCESS = [
  { nombre: 'Dermatology Cases for Board Review (200: Med 110 · Path 30 · Peds 30 · Surg 30)', groupid: 1546 },
  { nombre: 'Differential Diagnosis Challenge (100 sets de pares)', groupid: 1616 },
];
/** Derma en Qbankly por step (API real · SOLO Edge). */
export const DERMA_QBANKLY_RESUMEN = [
  { step: 'Step 1', detalle: 'uWorld 99 · Amboss 88 · Mehlman 248 · USMLERx 53', q: 488 },
  { step: 'Step 2 CK', detalle: 'uWorld 119 · Amboss 172 · Mehlman 132 · USMLERx 111', q: 534 },
  { step: 'Step 3', detalle: 'uWorld 102 · Amboss 104 · Mehlman 57', q: 263 },
  { step: 'Flashcards', detalle: 'uWorld S1 deck 75 · S2 deck 61 cards', q: 136 },
];
