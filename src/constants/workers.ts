import chatBruno from 'assets/images/worker/chat/chat-bruno.png';
import selectBruno from 'assets/images/worker/select-bruno.png';
import chatAlba from 'assets/images/worker/chat/chat-alba.png';
import selectAlba from 'assets/images/worker/select-alba.png';
import chatLucas from 'assets/images/worker/chat/chat-lucas.png';
import selectLucas from 'assets/images/worker/select-lucas.png';
import chatSophia from 'assets/images/worker/chat/chat-sophia.png';
import selectSophia from 'assets/images/worker/select-sophia.png';
import chatEva from 'assets/images/worker/chat/chat-eva.png';
import selectEva from 'assets/images/worker/select-eva.png';
import scheduleLucas from "assets/images/schedule/schedule-lucas.png";
import scheduleBruno from "assets/images/schedule/schedule-bruno.png";
import scheduleAlba from "assets/images/schedule/schedule-alba.png";
import scheduleEva from "assets/images/schedule/schedule-eva.png";
import scheduleSophia from "assets/images/schedule/schedule-sophia.png";
import lucasMetric1 from "assets/icons/schedule/lucas-metric-1.svg";
import lucasMetric2 from "assets/icons/schedule/lucas-metric-2.svg";
import lucasMetric3 from "assets/icons/schedule/lucas-metric-3.svg";
import brunoMetric1 from "assets/icons/schedule/bruno-metric-1.svg";
import brunoMetric2 from "assets/icons/schedule/bruno-metric-2.svg";
import brunoMetric3 from "assets/icons/schedule/bruno-metric-3.svg";
import albaMetric1 from "assets/icons/schedule/alba-metric-1.svg";
import albaMetric2 from "assets/icons/schedule/alba-metric-2.svg";
import albaMetric3 from "assets/icons/schedule/alba-metric-3.svg";
import evaMetric1 from "assets/icons/schedule/eva-metric-1.svg";
import evaMetric2 from "assets/icons/schedule/eva-metric-2.svg";
import evaMetric3 from "assets/icons/schedule/eva-metric-3.svg";
import sophiaMetric1 from "assets/icons/schedule/sophia-metric-1.svg";
import sophiaMetric2 from "assets/icons/schedule/sophia-metric-2.svg";
import sophiaMetric3 from "assets/icons/schedule/sophia-metric-3.svg";
import contactBrunoVideo from 'assets/videos/bruno.mp4';
import contactAlbaVideo from 'assets/videos/alba.mp4';
import contactEvaVideo from 'assets/videos/eva.mp4';
import contactSophiaVideo from 'assets/videos/sophia.mp4';
import contactLucasVideo from 'assets/videos/lucas.mp4';

export type Worker = {
  key: string;
  name: string;
  roleKey: string;
  imageChat: string;
  imageCard: string;
  imageSchedule: string;
  videoLandscape: string;
  gender: string;
  quote: string;
  abilities: string[];
  integrations: string[];
  metrics: WorkerMetric[];
}

export type WorkerMetric = {
  value: string;
  description: string;
  icon: string;
}

export enum WorkerRoleKey {
  LEADS_REACTIVATION = "leadsReactivation",
  LEADS_QUALIFICATION = "leadsQualification",
  COLLECTIONS = "collections",
  POST_SALES = "postSales",
  CUSTOMER_EXPERIENCE = "customerExperience"
}

export const aiWorkers: Worker[] = [
    {
      key: 'bruno',
      name: 'Bruno',
      roleKey: WorkerRoleKey.LEADS_REACTIVATION,
      imageChat: chatBruno,
      imageCard: selectBruno,
      imageSchedule: scheduleBruno,
      videoLandscape: contactBrunoVideo,
      gender: 'M',
      quote: "Revivo leads inactivos, reconecto clientes y genero nuevas oportunidades.",
      abilities: [
        'Despierto interés donde otros se rindieron',
        'Descubro oportunidades ocultas',
        'No dejo que ningún seguimiento se pierda',
        'Mantengo tu CRM impecable',
        'Mantengo a tus clientes informados'
      ],
      integrations: ['whatsapp', 'instagram', 'imessage', 'phone'],
      metrics: [
        {
          value: "3x",
          description: "Más leads reactivados",
          icon: brunoMetric1
        },
        {
          value: "+70%",
          description: "Mayor tasa de respuesta de leads anteriores",
          icon: brunoMetric2
        },
        {
          value: "+50%",
          description: "Leads reactivados con seguimientos personalizados",
          icon: brunoMetric3
        }
      ]
    },
    {
      key: 'alba',
      name: 'Alba',
      roleKey: WorkerRoleKey.LEADS_QUALIFICATION,
      imageChat: chatAlba,
      imageCard: selectAlba,
      imageSchedule: scheduleAlba,
      videoLandscape: contactAlbaVideo,
      gender: 'F',
      quote: "Interactúo con tus clientes, los califico según tu criterio y derivo los casos que necesiten de un humano",
      abilities: [
        'Califico tus leads',
        'Respondo preguntas sobre tu catálogo',
        'Gestiono tus agendas',
        'Mantengo tu CRM impecable',
        'Mantengo a tus clientes informados'
      ],
      integrations: ['whatsapp', 'instagram'],
      metrics: [
        {
          value: "5x",
          description: "Más leads calificados",
          icon: albaMetric1
        },
        {
          value: "+75%",
          description: "De tus conversaciones con clientes resueltas.",
          icon: albaMetric2
        },
        {
          value: "<7 seg",
          description: "En responder los mensajes de tus clientes.",
          icon: albaMetric3
        }
      ]
    },
    {
      key: 'eva',
      name: 'Eva',
      roleKey: WorkerRoleKey.CUSTOMER_EXPERIENCE,
      imageChat: chatEva,
      imageCard: selectEva,
      imageSchedule: scheduleEva,
      videoLandscape: contactEvaVideo,
      gender: 'F',
      quote: "Hago las preguntas correctas para medir la satisfacción de tus clientes y fomentar reseñas positivas.",
      abilities: [
        'Mido la satisfacción sin esfuerzo',
        'Transformo clientes felices en promotores de la marca',
        'Resuelvo problemas antes de que crezcan',
        'Mantengo tu CRM actualizado con insights',
        'Me conecto en los canales adecuados'
      ],
      integrations: ['whatsapp', 'instagram', 'phone'],
      metrics: [
        {
          value: "70%",
          description: "Tasa de respuesta de los clientes",
          icon: evaMetric1
        },
        {
          value: "+50%",
          description: "Más feedback de clientes en comparación con métodos estándar",
          icon: evaMetric2
        },
        {
          value: "<1 min",
          description: "Para comunicar problemas escalados a tu equipo",
          icon: evaMetric3
        }
      ]
    },
    {
      key: 'sophia',
      name: 'Sophia',
      roleKey: WorkerRoleKey.POST_SALES,
      imageChat: chatSophia,
      imageCard: selectSophia,
      imageSchedule: scheduleSophia,
      videoLandscape: contactSophiaVideo,
      gender: 'F',
      quote: "Te ayudo a reconectar con tus clientes existentes, ofreciéndoles productos y fidelizándolos.",
      abilities: [
        'Identifico nuevas oportunidades con clientes existentes',
        'Simplifico el proceso de compra',
        'Programo seguimientos sin esfuerzo',
        'Mantengo tu CRM organizado',
        'Me conecto a través de sus canales favoritos'
      ],
      integrations: ['whatsapp', 'instagram', 'imessage', 'phone'],
      metrics: [
        {
          value: "4x",
          description: "Más ventas adicionales a clientes existentes",
          icon: sophiaMetric1
        },
        {
          value: "+60%",
          description: "Tasa de reengagement de clientes",
          icon: sophiaMetric2
        },
        {
          value: "+50%",
          description: "Crecimiento en ingresos por ventas adicionales por cliente",
          icon: sophiaMetric3
        }
      ]
    },
    {
      key: 'lucas',
      name: 'Lucas',
      roleKey: WorkerRoleKey.COLLECTIONS,
      imageChat: chatLucas,
      imageCard: selectLucas,
      imageSchedule: scheduleLucas,
      videoLandscape: contactLucasVideo,
      gender: 'M',
      quote: "Hablo con tus clientes para recordarles sobre pagos pendientes, y los ayudo con cualquier problema",
      abilities: [
        'Recuerdo a los clientes sobre pagos atrasados',
        'Proporciono opciones de pago flexibles',
        'Resuelvo preguntas relacionadas con los pagos',
        'Mantengo tu CRM impecable',
        'Me conecto con los clientes donde están'
      ],
      integrations: ['whatsapp', 'instagram', 'phone'],
      metrics: [
        {
          value: "70%",
          description: "De éxito en la recuperación de pagos atrasados",
          icon: lucasMetric1
        },
        {
          value: "+50%",
          description: "De re engagement de clientes morosos",
          icon: lucasMetric2
        },
        {
          value: "+30%",
          description: "De pagos en tiempo y forma",
          icon: lucasMetric3
        }
      ]
    },
  ];