import { AxiosError } from "axios";

// Respuesta genérica de SWR
export interface SWRResponse<Data, Error = AxiosError> {
  data?: Data;
  error?: Error;
  isLoading: boolean;
}

// Modelo base de un impuesto (según la UI)
export interface Impuesto {
  id: number;
  mnemonico: string;
  descripcion: string;
  tipoImpuesto?: string; // Ejemplo: Ganancias, IVA, etc.
  alicuota?: number; // Opcional, según la UI
  montoFijo?: number; // Opcional
  montoMinimoImponible?: number;
  montoMaximoImponible?: number;
  baseMinimaNoImponible?: number;
  tipoFormula?: string;
  baseCalculo?: string;
  montoTransaccion?: number;
  montoDesembolsado?: number;
  saldoInsoluto?: number;
  usuario?: string; // Para auditoría
  fechaActualizacion?: string; // Para auditoría
  provincia?: string; // Según la UI
  tipoOperacionMonetaria?: string; // Según la UI
}

// Respuesta de la API para listar impuestos
export interface ImpuestoApiResponse {
  datos: Impuesto[];
  elementos: number;
  paginas: number;
}

// Modelo para crear un impuesto
export interface ImpuestoCrear {
  mnemonico: string;
  descripcion: string;
  tipoImpuesto?: string; // Opcional
  alicuota?: number; // Opcional
  montoFijo?: number; // Opcional
  provincia?: string; // Opcional, según la UI
  tipoOperacionMonetaria?: string; // Opcional
  usuario?: string; // Para auditoría, si el frontend lo gestiona
}

// Modelo para actualizar un impuesto
export interface ImpuestoActualizar extends Partial<ImpuestoCrear> {
  id: number; // ID obligatorio para actualizar
}

// Otros tipos existentes (manteniendo los originales, con ajustes menores)
export type Aplicativo = {
  id: string;
  mnemonico: string;
  descripcion: string;
  usuario: string;
  estado: string;
  idAplicativo: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
};

export type ProvinciasType = {
  id: number;
  nombreProvincia: string;
  usuario: string;
};

export type ProvinciasAplicativos = {
  idProvinciaInterna: number;
  nombreProvincia: string;
  mnemonico: string;
  idAplicativo: number;
  codigoExternoProvincia: string;
  estado: string;
  usuario: string;
  fechaActualizacion?: string;
};

export type CondicionesFiscales = {
  id: string;
  descripcion: string;
  usuarioCreacion: string;
  usuarioModificacion: string;
};

export type CondicionFiscalAplicativo = {
  id: number;
  descripcionCondicionFiscal: string;
  idCondicionesFiscales: number;
  idAplicativo: number;
  codigoExternoProvincia: string;
  usuarioCreacion: string;
  usuarioModificacion: string;
  estado: string;
  fechaActualizacion?: string;
};

export type TipoDePersona = {
  id: number;
  tipoPersona: string;
  idAplicativo: number;
  estado: string | null;
  codigoExternoProvincia: string;
  usuarioCreacion: string;
  usuarioModificacion: string;
  fechaCreacion?: string | null;
  fechaActualizacion?: string | null;
};

export interface Transaccion {
  id: number;
  idProducto: number;
  descripcion: string;
  tipoOpMonetaria: string;
  codigoExterno: string;
  impuestos: Impuesto[] | number[];
}

export interface Producto {
  id: number;
  descripcion: string;
  codigoExterno: string;
  idAplicativo: number;
  transacciones?: Transaccion[];
}

export type ProductoCrear = Omit<Producto, "id">;

export interface TransaccionCrear {
  idProducto: number;
  impuestosIds: number[];
  descripcion: string;
  codigoExterno: string;
  tipoOpMonetaria: string;
}

export interface TransaccionActualizar {
  id: number;
  idProducto: number;
  descripcion: string;
  codigoExterno: string;
  tipoOpMonetaria: string;
  impuestosIds: number[];
}

export interface ProductoApiResponse {
  datos: Producto[];
  elementos: number;
  paginas: number;
}

export interface TransaccionApiResponse {
  datos: Transaccion[];
  elementos: number;
  paginas: number;
}

export type AplicativosResponse = Aplicativo[];

export type ProvinciasResponse = ProvinciasType[];

export type CondicionesFiscalesResponse = CondicionesFiscales[];

export type CondicionesFiscalesAplicativoResponse = CondicionFiscalAplicativo[];

export type TiposDePersonaResponse = {
  datos: TipoDePersona[];
  paginas: number;
  elementos: number;
};

export interface IModal {
  onClose: (arg?: any) => void;
  options?: any;
  actions?: { onConfirm: (props?: any) => void; onCancel: () => void };
}