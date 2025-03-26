import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Aplicativo, AplicativosResponse } from "./types";
import { baseURL } from "../config/swrConfig";

const useAplicativos = () => {
  const { data, isLoading, error, mutate } = useSWR<
    AplicativosResponse,
    AxiosError
  >(baseURL + "/aplicativos", {});

  async function postRequest(url: string, { arg }: { arg: Aplicativo }) {
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

  async function putRequest(url: string, { arg }: { arg: Aplicativo }) {
    const { idAplicativo, ...rest } = arg;
    return fetch(`${url}/${idAplicativo}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
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
        idAplicativo: Number;
      };
    }
  ) {
    const response = await fetch(`${url}/${arg.idAplicativo}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || "Error al eliminar el aplicativo");
    }

    await mutate();
  }


  const { trigger: createAplicativo } = useSWRMutation(
    baseURL + "/aplicativos",
    postRequest
  );

  const { trigger: updateAplicativo } = useSWRMutation(
    baseURL + "/aplicativos",
    putRequest
  );

  const { trigger: deleteAplicativo } = useSWRMutation(
    baseURL + "/aplicativos",
    deleteRequest
  );

  return {
    data: data || [],
    error,
    createAplicativo,
    updateAplicativo,
    deleteAplicativo,
    isLoading,
  };
};

export default useAplicativos;
