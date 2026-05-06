// ENCAPS — 5 bloques oficiales del temario MINSA (94 subtemas)
// Single source of truth para la pantalla Estudio · pestaña PE Perú v2.3.2
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { fetchLocal, useDataSource } from './dataSource';

export interface EncapsSubtema {
  id: string;
  apex: number;
  label?: string;  // v2.4 PLUS: versión legible "02. Epidemiologia"
}

export interface EncapsBlock {
  id: 'salud_publica' | 'cuidado_integral' | 'etica_interculturalidad' | 'investigacion' | 'gestion_salud';
  nombre: string;
  peso: string;
  preguntas_target: number;
  subtemas_total: number;
  subtemas_cubiertos: number;
  apex_count: number;
  color: 'blue' | 'green' | 'gray' | 'orange';
  rentable?: boolean;
  ultimo_apex_fecha?: string | null;
  subtemas_detalle: EncapsSubtema[];
}

// Metadata estática (idéntica a la del backend api_server.py ENCAPS_BLOCKS_META)
export const ENCAPS_BLOCKS_STATIC: EncapsBlock[] = [
  {
    id: 'salud_publica',
    nombre: 'Salud Pública',
    peso: '23-28%',
    preguntas_target: 25,
    subtemas_total: 31,
    subtemas_cubiertos: 0,
    apex_count: 0,
    color: 'blue',
    subtemas_detalle: [
      '01_conceptos_basicos_salud_publica', '02_epidemiologia',
      '03_causalidad_y_riesgo', '04_demografia_en_salud',
      '05_historia_natural_proceso_salud_enfermedad',
      '06_etapas_y_niveles_de_prevencion', '07_pruebas_diagnosticas',
      '08_brotes_epidemias_epizootias_pandemias_endemias',
      '09_vigilancia_salud_publica_y_epidemiologica',
      '10_sistema_vigilancia_epidemiologica_pais',
      '11_prevencion_y_control_de_infecciones',
      '12_uso_racional_medicamentos_salud_publica',
      '13_analisis_situacional_salud_sala_situacional',
      '14_determinantes_sociales_de_la_salud',
      '15_determinantes_ambientales_de_salud',
      '16_participacion_social_y_comunitaria',
      '17_sectorizacion_y_ficha_familiar',
      '18_intervenciones_comunitarias_en_salud',
      '19_trabajo_intersectorial_en_salud', '20_plan_de_salud_local',
      '21_sistemas_informacion_y_tics_en_salud',
      '22_alimentacion_nutricion_inocuidad_alimentaria',
      '23_control_de_vectores_y_plagas',
      '24_gestion_y_manejo_residuos_solidos', '25_salud_ocupacional',
      '26_modelo_salud_mental_comunitaria',
      '27_accesibilidad_a_servicios_de_salud',
      '28_promocion_de_la_salud',
      '29_informacion_educacion_comunicacion_salud',
      '30_bioseguridad',
      '31_gestion_riesgo_emergencias_desastres_salud',
    ].map(id => ({ id, apex: 0 })),
  },
  {
    id: 'cuidado_integral',
    nombre: 'Cuidado Integral de Salud',
    peso: '32-38%',
    preguntas_target: 35,
    subtemas_total: 30,
    subtemas_cubiertos: 0,
    apex_count: 0,
    color: 'blue',
    subtemas_detalle: [
      '01_atencion_integral_curso_vida_familia_comunidad',
      '02_atencion_centrada_persona_evaluacion_clinica',
      '03_atencion_medica_urgencias_emergencias_referencia',
      '04_emergencias_obstetricas_y_neonatales',
      '05_riesgo_obstetrico',
      '06_examenes_auxiliares_diagnostico_tratamiento',
      '07_aspectos_legales_y_forenses_en_medicina',
      '08_atencion_primaria_salud_conceptos_principios',
      '09_cuidado_integral_curso_vida_persona_familia_comunidad',
      '10_paquete_cuidado_integral_nino',
      '11_paquete_cuidado_integral_adolescente',
      '12_paquete_cuidado_integral_joven',
      '13_paquete_cuidado_integral_adulto',
      '14_paquete_cuidado_integral_adulto_mayor',
      '15_cuidado_salud_mental_personas',
      '16_prevencion_y_control_del_cancer',
      '17_deteccion_temprana_cancer_infantil',
      '18_prevencion_y_control_tuberculosis',
      '19_esquema_vacunacion_peru_esavi_cadena_frio',
      '20_prevencion_control_anemia_malnutricion',
      '21_its_vih_hepatitis_b_y_c',
      '22_transmision_materno_infantil_vih_sifilis_hepatitis_b',
      '23_prevencion_control_enfermedades_no_transmisibles',
      '24_prevencion_control_enfermedades_raras_huerfanas',
      '25_exposicion_metales_pesados_sustancias_quimicas',
      '26_infecciones_asociadas_atencion_salud',
      '27_medidas_preventivas_salud_bucal',
      '28_prevencion_control_enfermedades_metaxenicas_zoonoticas',
      '29_climaterio_y_menopausia',
      '30_embarazo_parto_puerperio_normal',
    ].map(id => ({ id, apex: 0 })),
  },
  {
    id: 'etica_interculturalidad',
    nombre: 'Ética e Interculturalidad',
    peso: '12-16%',
    preguntas_target: 14,
    subtemas_total: 9,
    subtemas_cubiertos: 0,
    apex_count: 0,
    color: 'green',
    rentable: true,
    subtemas_detalle: [
      '01_etica_funcion_publica_trato_digno_confidencialidad',
      '02_codigo_etica_y_deontologia_profesional',
      '03_derechos_y_deberes_usuarios_servicios_salud',
      '04_comunicacion_y_dialogo_intercultural_salud',
      '05_diversidad_cultural_inclusion_y_equidad',
      '06_atencion_salud_enfoque_intercultural_pertinencia',
      '07_promocion_del_parto_vertical',
      '08_medicina_tradicional_complementaria_alternativa',
      '09_prevencion_estigma_discriminacion_etnica_cultural',
    ].map(id => ({ id, apex: 0 })),
  },
  {
    id: 'investigacion',
    nombre: 'Investigación',
    peso: '3-7%',
    preguntas_target: 5,
    subtemas_total: 7,
    subtemas_cubiertos: 0,
    apex_count: 0,
    color: 'gray',
    subtemas_detalle: [
      '01_conceptos_basicos_investigacion',
      '02_enfoques_cualitativo_cuantitativo_mixto',
      '03_tipos_investigacion_descriptivo_analitico_experimental',
      '04_instrumentos_recoleccion_datos_validacion',
      '05_procesamiento_y_analisis_datos',
      '06_elaboracion_publicacion_resultados_investigacion',
      '07_aspectos_eticos_investigacion_salud',
    ].map(id => ({ id, apex: 0 })),
  },
  {
    id: 'gestion_salud',
    nombre: 'Gestión en Salud',
    peso: '18-24%',
    preguntas_target: 21,
    subtemas_total: 17,
    subtemas_cubiertos: 0,
    apex_count: 0,
    color: 'orange',
    subtemas_detalle: [
      '01_planeamiento_estrategico_salud_concepto_marco_legal',
      '02_analisis_estrategico_institucional_mision_vision_foda',
      '03_planeamiento_institucional_pei_poi_seguimiento_evaluacion',
      '04_documentos_tecnicos_normativos_gestion_rof_mof',
      '05_clasificacion_establecimientos_salud_categorias',
      '06_upss_y_cartera_servicios_salud',
      '07_sistema_referencia_y_contrarreferencia',
      '08_gestion_de_la_historia_clinica',
      '09_redes_integradas_de_salud_ris', '10_telesalud',
      '11_gestion_recursos_humanos_asistencia_permanencia',
      '12_control_inventario_y_stock_medicamentos',
      '13_coordinacion_intersectorial_y_alianzas_estrategicas',
      '14_liderazgo_servicios_de_salud',
      '15_trabajo_colaborativo_eficaz_servicios_salud',
      '16_garantia_y_mejora_calidad_servicios_seguridad_paciente',
      '17_clima_organizacional_y_cultura_organizacional',
    ].map(id => ({ id, apex: 0 })),
  },
];

/**
 * Hook: carga los 5 bloques ENCAPS con counts.
 * Estrategia: 1) intenta endpoint local /reports/apex/encaps/by_block.
 *             2) si falla, queries directas a Supabase apex_reports.
 */
export function useEncapsBlocks(): {
  blocks: EncapsBlock[];
  loading: boolean;
  refetch: () => void;
} {
  const { source } = useDataSource();
  const [blocks, setBlocks] = useState<EncapsBlock[]>(ENCAPS_BLOCKS_STATIC);
  const [loading, setLoading] = useState(true);

  const fetchBlocks = async () => {
    setLoading(true);
    try {
      // 1) Intentar endpoint local v2.4 PLUS (con label legible)
      if (source === 'local') {
        const data = await fetchLocal<Record<string, any>>(
          '/reports/apex/encaps/by_block_and_subtopic',
          5000,
        );
        if (data) {
          const merged: EncapsBlock[] = ENCAPS_BLOCKS_STATIC.map(b => {
            const r = data[b.id];
            if (!r) return b;
            return {
              ...b,
              apex_count: r.apex_total ?? r.apex_count ?? 0,
              subtemas_cubiertos: r.subtemas_cubiertos ?? 0,
              ultimo_apex_fecha: r.ultimo_apex_fecha ?? null,
              subtemas_detalle: r.subtemas_detalle ?? b.subtemas_detalle,
            };
          });
          setBlocks(merged);
          setLoading(false);
          return;
        }
      }

      // 2) Fallback Supabase
      const { data: rows } = await supabase
        .from('apex_reports')
        .select('especialidad,subtema,count,fecha')
        .eq('examen', 'ENCAPS');
      if (rows) {
        const countsBySub: Record<string, Record<string, number>> = {};
        const lastByBlock: Record<string, string> = {};
        for (const r of rows as any[]) {
          const esp = r.especialidad as string;
          const sub = r.subtema as string;
          if (!esp || !sub) continue;
          countsBySub[esp] ??= {};
          countsBySub[esp][sub] = (countsBySub[esp][sub] ?? 0) + (r.count ?? 1);
          if (!lastByBlock[esp] || (r.fecha && r.fecha > lastByBlock[esp])) {
            lastByBlock[esp] = r.fecha;
          }
        }
        const merged: EncapsBlock[] = ENCAPS_BLOCKS_STATIC.map(b => {
          const sub = countsBySub[b.id] ?? {};
          const detalle = b.subtemas_detalle.map(s => ({
            id: s.id, apex: sub[s.id] ?? 0,
          }));
          const cubiertos = detalle.filter(d => d.apex > 0).length;
          const apex_count = detalle.reduce((a, c) => a + c.apex, 0);
          return {
            ...b,
            apex_count,
            subtemas_cubiertos: cubiertos,
            ultimo_apex_fecha: lastByBlock[b.id],
            subtemas_detalle: detalle,
          };
        });
        setBlocks(merged);
      }
    } catch (e) {
      // mantener static fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
    const interval = setInterval(fetchBlocks, 60_000);
    return () => clearInterval(interval);
  }, [source]);

  return { blocks, loading, refetch: fetchBlocks };
}
