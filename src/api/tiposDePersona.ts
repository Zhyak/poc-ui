import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { TiposDePersonaResponse, TipoDePersona } from "./types";
import { baseURL } from "config/swrConfig";

const useTiposDePersona = () => {
  const {
    data: response,
    isLoading: isLoadingTiposDePersona,
    error,
    mutate,
  } = useSWR<TiposDePersonaResponse, AxiosError>(baseURL + "/tipo-persona");

  const tiposDePersona = response?.datos || [];

  async function postRequest(url: string, { arg }: { arg: TipoDePersona }) {
    return fetch(url, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    })
      .then((res) => res.json())
      .then(() => mutate());
  }

  async function putRequest(url: string, { arg }: { arg: TipoDePersona }) {
    return fetch(`${url}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    })
      .then((res) => res.json())
      .then(() => mutate());
  }

  async function deleteRequest(
    url: string,
    {
      arg,
    }: {
      arg: {
        id: number;
      };
    }
  ) {
    const { id } = arg;

    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error al eliminar el tipo de persona");
      }
      mutate();
    });
  }

  const { trigger: agregarTipoDePersona } = useSWRMutation(
    baseURL + "/tipo-persona",
    postRequest
  );

  const { trigger: updateTipoDePersona } = useSWRMutation(
    baseURL + "/tipo-persona",
    putRequest
  );

  const { trigger: deleteTipoDePersona } = useSWRMutation(
    baseURL + "/tipo-persona",
    deleteRequest
  );

  return {
    tiposDePersona,
    error,
    agregarTipoDePersona,
    updateTipoDePersona,
    deleteTipoDePersona,
    isLoadingTiposDePersona,
  };
};

export default useTiposDePersona;
