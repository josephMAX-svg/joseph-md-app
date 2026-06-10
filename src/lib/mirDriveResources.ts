/**
 * mirDriveResources.ts — Resúmenes/apuntes REALES del Google Drive del usuario,
 * mapeados por asignatura ProMIR. Extraídos de las carpetas destacadas:
 *  · "Mir resumener Mrnion" (Notability .note manuscritos) — owner del usuario
 *  · "Resumenes MIR 2022 / pdf" (PDFs legibles) — shared resumenesmir2022@gmail.com
 *  · "APUNTES" / ADENDA MIR 2022
 *
 * tipo: 'pdf' = legible/printable · 'note' = Notability manuscrito (se descarga,
 * no tiene preview en Drive). El flujo (rabi_94): leer el resumen para entender el
 * esquema → ver los vídeos de ProMIR → repasar. Estos links abren el resumen.
 */
export type DriveTipo = 'pdf' | 'note';
export interface DriveRecurso { fuente: string; titulo: string; tipo: DriveTipo; url: string; }
const fileUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;

/** Recursos por nº de asignatura ProMIR (ver MIR_TEMARIO). */
export const MIR_DRIVE: Record<number, DriveRecurso[]> = {
  3: [ // Cardiología
    { fuente: 'MIR 2022', titulo: 'Cardio (resumen completo)', tipo: 'pdf', url: fileUrl('1uK7LvM59Ks4gRMQSCqkF77FLGabbwcb6') },
    { fuente: 'MIR 2022', titulo: 'Cardio · ECG', tipo: 'pdf', url: fileUrl('1OFxLh0vbZm5HG6yn2KrpbNo5yayEOs4D') },
    { fuente: 'MIR 2022', titulo: 'Cardio · Farmacología', tipo: 'pdf', url: fileUrl('1OAUhEREOIx8-ETg_Z1KEVhat_F0a7-4A') },
    { fuente: 'ADENDA 2022', titulo: 'Cardiología (actualización)', tipo: 'pdf', url: fileUrl('14D6dAWfqJw42NZI-lE6gvZArUmL9JJjy') },
  ],
  5: [ // Dermatología
    { fuente: 'Mirnion', titulo: 'Dermatología (manuscrito)', tipo: 'note', url: fileUrl('13VaiwwbJszHtM17FJ_Zm6kr1Aauj4_0Z') },
    { fuente: 'MIR 2022', titulo: 'Derma (resumen)', tipo: 'pdf', url: fileUrl('1OQ7iwPOX7ebsYJF2zlG4g2HSBUvQiQrW') },
  ],
  6: [ // Endocrinología
    { fuente: 'Mirnion', titulo: 'Endocrino (manuscrito)', tipo: 'note', url: fileUrl('1x3PVqihJ1V9zEG0rAFKzXvZcIgFKRv0w') },
    { fuente: 'MIR 2022', titulo: 'Endocrino (resumen)', tipo: 'pdf', url: fileUrl('19fYRYePztpru9NlMYct539PiFXR4w1M6') },
  ],
  7: [ // Infecciosas
    { fuente: 'Mirnion', titulo: 'Infecto (manuscrito)', tipo: 'note', url: fileUrl('1M2dehtYeMyeqeddOvdFCUiyx2882Lt5g') },
    { fuente: 'MIR 2022', titulo: 'Infecciosas (resumen)', tipo: 'pdf', url: fileUrl('1gzv4eUzJ3vYpsFUuMGTCvMMH2GuPzdwt') },
    { fuente: 'MIR 2022', titulo: 'Infecciosas · Microorganismos', tipo: 'pdf', url: fileUrl('1penI19xED6saIb920wpFo7XSZbZBig4c') },
    { fuente: 'ADENDA 2022', titulo: 'Infecciosas (actualización)', tipo: 'pdf', url: fileUrl('1SKwxOC1Et9hpozw0V2eUdKb6e5QZ5-B3') },
  ],
  11: [ // Gastroenterología
    { fuente: 'Mirnion', titulo: 'Gastro + QX (manuscrito)', tipo: 'note', url: fileUrl('1oQV5MR9iFORPgjK3dhO2813xcf9TqN52') },
  ],
  14: [ // Ginecología y Obstetricia
    { fuente: 'Mirnion', titulo: 'Gineco (manuscrito)', tipo: 'note', url: fileUrl('1nSEmsXpNdOVi-YZjfxfuswFtJ8f0SMe1') },
    { fuente: 'Mirnion', titulo: 'Obstetricia (manuscrito)', tipo: 'note', url: fileUrl('1W_AsBQK9Z909jyr02vW7ottfzDF1MK4_') },
  ],
  16: [ // Inmunología
    { fuente: 'MIR 2022', titulo: 'Inmuno · Farmacología', tipo: 'pdf', url: fileUrl('1pmYqkH98cMxspi3_vEbBSMrnDLfCJBgv') },
  ],
  18: [ // Nefrología
    { fuente: 'Mirnion', titulo: 'Nefrología (manuscrito)', tipo: 'note', url: fileUrl('1ak-1WkOKoLqiYeW2i-4_BOUgUe_9-6QW') },
  ],
  19: [ // Neumología
    { fuente: 'MIR 2022', titulo: 'Neumo (resumen)', tipo: 'pdf', url: fileUrl('1n_2C1Z6Tlm1gRWyJQ2YLQ_5zejTZrG94') },
  ],
  20: [ // Neurología
    { fuente: 'Mirnion', titulo: 'Neurología (manuscrito)', tipo: 'note', url: fileUrl('1y-pImx0GoSWRqnt-EP6ouukjufloce-_') },
    { fuente: 'Mirnion', titulo: 'Neuro · Demencias', tipo: 'note', url: fileUrl('1pAZROYsEv_1d6YgtMGtLBf0wqmLOGuWE') },
    { fuente: 'MIR 2022', titulo: 'Neuro (resumen)', tipo: 'pdf', url: fileUrl('1CLN6709kKabN2FF_E9Fq_GgpNGnZ9BpR') },
  ],
  21: [ // Oftalmología
    { fuente: 'Mirnion', titulo: 'Oftalmología (manuscrito)', tipo: 'note', url: fileUrl('181YqP44F6kqnajs6ikUfpOKcqcWxmD_e') },
    { fuente: 'MIR 2022', titulo: 'Oftalmo (resumen)', tipo: 'pdf', url: fileUrl('10Re93PQGeoM3vW5moOd6QOUl21y_Faie') },
  ],
  23: [ // ORL
    { fuente: 'Mirnion', titulo: 'ORL (manuscrito)', tipo: 'note', url: fileUrl('1MNCyD5LDgHUz3G28Yc_OS8WnE04Qmp8Z') },
    { fuente: 'Apuntes', titulo: 'ORL (manuscrito 2)', tipo: 'note', url: fileUrl('1iOZ_YLEydLBWAJgfP4BzQ2v3BIMPaXTp') },
  ],
  24: [ // Pediatría
    { fuente: 'Mirnion', titulo: 'Pediatría (manuscrito)', tipo: 'note', url: fileUrl('1iGtW_nrE_zidD62ZPSEytoH36OTPRWKV') },
    { fuente: 'MIR 2022', titulo: 'Pedia (resumen)', tipo: 'pdf', url: fileUrl('1v8MSDMcB6Lbo8inWYM2utXUAKmEWqrrj') },
  ],
  26: [ // Psiquiatría
    { fuente: 'Mirnion', titulo: 'Psiquiatría (manuscrito)', tipo: 'note', url: fileUrl('1b9VvL6djNziTow8avRkTKyzvxF9iT_e8') },
  ],
  28: [ // Reumatología
    { fuente: 'Mirnion', titulo: 'Reumatología (manuscrito)', tipo: 'note', url: fileUrl('1-EXpZRHyNyWn4u7mS85VTGDTlmFv_lrO') },
  ],
  29: [ // Traumatología
    { fuente: 'Mirnion', titulo: 'Traumatología (manuscrito)', tipo: 'note', url: fileUrl('1ZnecCAvt1p4d9DivTYtmU83wKD0IROb8') },
  ],
  30: [ // Urología
    { fuente: 'Mirnion', titulo: 'Urología (manuscrito)', tipo: 'note', url: fileUrl('1GDPVydmTNr-MTZSiI8OpnO6_Y0BUwvV1') },
  ],
};

/** Recursos transversales (no de una sola asignatura). */
export const MIR_DRIVE_TRANSVERSAL: DriveRecurso[] = [
  { fuente: 'MIR 2022', titulo: 'Bioquímica', tipo: 'pdf', url: fileUrl('1z_ibZDtecTvvQWMaJ1D-HFZ4-IROvN9_') },
  { fuente: 'MIR 2022', titulo: 'Patognomónico (signos clave)', tipo: 'pdf', url: fileUrl('1-PkEbdc5UMqMRpalcu4sWUyFTry-zLxB') },
  { fuente: 'MIR 2022', titulo: 'Miscelánea', tipo: 'pdf', url: fileUrl('1Jcs05T2R6KUuje_VlAfo0l4NgTFZHIy-') },
];

export function recursosDe(num: number): DriveRecurso[] {
  return MIR_DRIVE[num] || [];
}
