import React from 'react';
import SynapseHub from '../components/study/SynapseHub';

/**
 * SYNAPSE — formación élite en IA (Mind · AI-engineered).
 * Ruta de médico → especialista en IA nivel Anthropic: Python, data science,
 * deep learning, agentes/workflows, ciberseguridad. Materiales SOLO de
 * referentes verificados (Anthropic, Stanford, MIT, Harvard, creadores de
 * herramientas). El motor día-a-día lo construye el chat SYNAPSE
 * (DATA/SYNAPSE/PROMPT_CHAT_SYNAPSE.md).
 */
export default function SynapseScreen({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  return <SynapseHub variant={variant} />;
}
