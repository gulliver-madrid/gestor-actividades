const posiblesStatus = ['Planificada', 'Activa', 'Finalizada'] as const;

const statusDefault = posiblesStatus[0];

type Status = typeof posiblesStatus[number];

export type { Status };
export { posiblesStatus, statusDefault };
