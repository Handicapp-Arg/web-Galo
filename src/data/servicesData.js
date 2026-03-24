import { Target, MonitorSmartphone, Radio, LineChart, CalendarDays, Laptop } from 'lucide-react';

/**
 * Cada servicio almacena el componente Icon de lucide-react (no el JSX instanciado),
 * para que el componente ServicesSection decida cómo renderizarlo.
 * Esto cumple el principio de SRP: los datos no saben cómo se renderizan.
 */
export const SERVICES_DATA = [
  {
    title: 'Plan de marketing',
    desc: 'Creamos estrategias personalizadas definiendo objetivos claros.',
    Icon: Target,
    iconClassName: 'w-8 h-8 text-black',
    cardColor: 'bg-[#22c55e]',
    textColor: 'text-black',
  },
  {
    title: 'Medios digitales',
    desc: 'Te guiamos en plataformas, redes sociales y campañas.',
    Icon: MonitorSmartphone,
    iconClassName: 'w-8 h-8 text-white',
    cardColor: 'bg-[#111111]',
    textColor: 'text-white',
  },
  {
    title: 'Medios tradicionales',
    desc: 'Presencia en radio, televisión y prensa gráfica.',
    Icon: Radio,
    iconClassName: 'w-8 h-8 text-white',
    cardColor: 'bg-[#1f2937]',
    textColor: 'text-white',
  },
  {
    title: 'Análisis de mercado',
    desc: 'Estudios detallados de tu competencia para identificar oportunidades.',
    Icon: LineChart,
    iconClassName: 'w-8 h-8 text-black',
    cardColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    title: 'Asesoría en eventos',
    desc: 'Planificación y acciones que posicionen tu marca.',
    Icon: CalendarDays,
    iconClassName: 'w-8 h-8 text-black',
    cardColor: 'bg-[#22c55e]',
    textColor: 'text-black',
  },
  {
    title: 'Diseño Web',
    desc: 'Sitios web funcionales y atractivos.',
    Icon: Laptop,
    iconClassName: 'w-8 h-8 text-white',
    cardColor: 'bg-[#0a0a0a]',
    textColor: 'text-white',
  },
];
