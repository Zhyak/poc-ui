import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  CondicionesFiscalesAplicativoResponse,
  CondicionesFiscalesResponse,
  CondicionFiscalAplicativo,
} from "./types";
import { baseURL } from "config/swrConfig";

const useCondicionFiscal = () => {
  const {
    data: condicionesFiscales,
    isLoading: isLoadingCondicionesFiscales,
    error,
  } = useSWR<CondicionesFiscalesResponse, AxiosError>(
    baseURL + "/condiciones-fiscales"
  );

  const { data: condicionesFiscalesAplicativos, mutate } = useSWR<
    CondicionesFiscalesAplicativoResponse,
    AxiosError
  >(baseURL + "/condiciones-fiscales-aplicativo");

  async function postRequest(
    url: string,
    { arg }: { arg: CondicionFiscalAplicativo }
  ) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al realizar la solicitud POST");
      }

      await mutate();
      return await response.json();
    } catch (error) {
      console.error("Error en POST:", error);
      throw error;
    }
  }

  async function putRequest(
    url: string,
    { arg }: { arg: CondicionFiscalAplicativo }
  ) {
    try {
      const response = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al realizar la solicitud PUT");
      }

      const updatedData = await response.json();
      await mutate((currentData: any) => {
        if (!currentData) return currentData;
        return currentData.map((item: CondicionFiscalAplicativo) =>
          item.id === updatedData.id ? updatedData : item
        );
      }, false);

      return updatedData;
    } catch (error) {
      console.error("Error en PUT:", error);
      throw error;
    }
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

    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al realizar la solicitud DELETE");
      }

      if (response.status !== 204) {
        try {
          const data = await response.json();
          return data;
        } catch (error) {
          console.warn("Error al parsear respuesta DELETE:", error);
        }
      }

      await mutate();
    } catch (error) {
      console.error("Error durante la eliminación:", error);
      throw error;
    }
  }

  const { trigger: agregarCondicionFiscal } = useSWRMutation(
    baseURL + "/condiciones-fiscales-aplicativo",
    postRequest
  );

  const { trigger: updateCondicionFiscal } = useSWRMutation(
    baseURL + "/condiciones-fiscales-aplicativo",
    putRequest
  );

  const { trigger: deleteCondicionFiscal } = useSWRMutation(
    baseURL + "/condiciones-fiscales-aplicativo",
    deleteRequest
  );

  return {
    condicionesFiscales: condicionesFiscales || [],
    condicionesFiscalesAplicativos: condicionesFiscalesAplicativos || [],
    error,
    agregarCondicionFiscal,
    updateCondicionFiscal,
    deleteCondicionFiscal,
    isLoadingCondicionesFiscales,
  };
};

export default useCondicionFiscal;
