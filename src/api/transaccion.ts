import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Transaccion, TransaccionActualizar, TransaccionApiResponse, TransaccionCrear } from "./types";
import { baseURL } from "config/swrConfig";

const headers = {
  accept: "*/*",
  "Content-Type": "application/json",
};

const useTransacciones = () => {
  const {
    data: response,
    isLoading: isLoadingTransacciones,
    error,
    mutate,
  } = useSWR<TransaccionApiResponse, AxiosError>(baseURL + "/transacciones");

  const transacciones = response?.datos || [];

  async function postRequest(url: string, { arg }: { arg: TransaccionCrear }) {
    if (!arg.descripcion || !arg.codigoExterno || !arg.tipoOpMonetaria || !arg.impuestosIds) {
      throw new Error("Todos los campos obligatorios deben ser completados");
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Error al crear la transacción");
    }

    const nuevaTransaccion = await response.json();
    await mutate((currentData: TransaccionApiResponse | undefined) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: [...currentData.datos, nuevaTransaccion],
      };
    }, false);

    return nuevaTransaccion;
  }

  async function putRequest(url: string, { arg }: { arg: TransaccionActualizar }) {
    if (!arg.tipoOpMonetaria || !arg.descripcion || !arg.codigoExterno || !arg.impuestosIds) {
      throw new Error("Todos los campos obligatorios deben ser completados");
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la transacción");
    }

    const transaccionActualizada = await response.json();
    await mutate((currentData: TransaccionApiResponse | undefined) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: currentData.datos.map((transaccion: { id: any; }) =>
          transaccion.id === transaccionActualizada.id ? transaccionActualizada : transaccion
        ),
      };
    }, false);

    return transaccionActualizada;
  }

  async function deleteRequest(url: string, { arg }: { arg: { id: number } }) {
    const { id } = arg;

    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la transacción");
    }

    await mutate((currentData: TransaccionApiResponse | undefined) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: currentData.datos.filter((transaccion: { id: number; }) => transaccion.id !== id),
      };
    }, false);

    return { id };
  }

  const { trigger: agregarTransaccion } = useSWRMutation(
    baseURL + "/transacciones",
    postRequest
  );

  const { trigger: actualizarTransaccion, isMutating: isUpdating } = useSWRMutation(
    baseURL + "/transacciones",
    putRequest
  );

  const { trigger: eliminarTransaccion, isMutating: isDeleting } = useSWRMutation(
    baseURL + "/transacciones",
    deleteRequest
  );

  return {
    transacciones,
    error,
    agregarTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    isLoadingTransacciones,
    isUpdating,
    isDeleting,
    mutate,
  };
};

export default useTransacciones;