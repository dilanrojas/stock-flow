// Corresponde al MovementDTO.java (Objeto recibido via GET)
export type MovementResponse = {
  quantity: number;
  note: string;
  createdAt: string;
  resourceId: string;
  stockResourceId: string;
};

// Corresponde al MovementRequestDTO.java (Objeto enviado via POST)
export type MovementRequest = {
  stockResourceId: string;
  quantity: number;
  note: string;
};

// Estadísticas de la tabla
export interface MovementStats {
  totalMovements: number;
  totalInflows: number;
  totalOutflows: number;
}
