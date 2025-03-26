import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { baseURL } from "config/swrConfig";
import {
  Impuesto,
  ImpuestoApiResponse,
  ImpuestoCrear,
  ImpuestoActualizar,
} from "./types";

const headers = {
  accept: "*/*",
  "Content-Type": "application/json",
};

const useImpuestos = () => {
  const {
    data: response,
    isLoading: isLoadingImpuestos,
    error,
    mutate,
  } = useSWR<ImpuestoApiResponse, AxiosError>(`${baseURL}/impuestos`);

  const impuestos = response?.datos || [];

  async function postRequest(url: string, { arg }: { arg: ImpuestoCrear }) {
    if (!arg.mnemonico || !arg.descripcion) {
      throw new Error("Mnemonico y descripción son obligatorios.");
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el impuesto");
    }

    const nuevoImpuesto = await response.json();
    await mutate((currentData) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: [...currentData.datos, nuevoImpuesto],
      };
    }, false);

    return nuevoImpuesto;
  }

  async function putRequest(url: string, { arg }: { arg: ImpuestoActualizar }) {
    if (!arg.id || !arg.mnemonico || !arg.descripcion) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el impuesto");
    }

    const impuestoActualizado = await response.json();
    await mutate((currentData) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: currentData.datos.map((impuesto) =>
          impuesto.id === impuestoActualizado.id ? impuestoActualizado : impuesto
        ),
      };
    }, false);

    return impuestoActualizado;
  }

  async function deleteRequest(url: string, { arg }: { arg: { id: number } }) {
    const { id } = arg;

    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el impuesto");
    }

    await mutate((currentData) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: currentData.datos.filter((impuesto) => impuesto.id !== id),
      };
    }, false);

    return { id };
  }

  const { trigger: agregarImpuesto } = useSWRMutation(
    `${baseURL}/impuestos`,
    postRequest
  );

  const { trigger: actualizarImpuesto, isMutating: isUpdating } = useSWRMutation(
    `${baseURL}/impuestos`,
    putRequest
  );

  const { trigger: eliminarImpuesto, isMutating: isDeleting } = useSWRMutation(
    `${baseURL}/impuestos`,
    deleteRequest
  );

  return {
    impuestos,
    error,
    agregarImpuesto,
    actualizarImpuesto,
    eliminarImpuesto,
    isLoadingImpuestos,
    isUpdating,
    isDeleting,
    mutate,
  };
};

export default useImpuestos;
