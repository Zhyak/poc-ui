import { useContext } from "react";
import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { ProvinciasAplicativos, ProvinciasResponse } from "./types";
import { baseURL } from "config/swrConfig";

import {
  ModalContext,
  ModalContextType,
} from "components/Modals/Providers/ModalProvider";

import { ADD_EDIT_SUCCESS } from "components/Modals/types";

const useProvincias = () => {
  const {
    data: provincias,
    isLoading,
    error,
    mutate,
  } = useSWR<ProvinciasResponse, AxiosError>(baseURL + "/provincias");

  const { openModal } = useContext<ModalContextType>(ModalContext);
  const {
    data: provinciasAplicativos,
    isLoading: isLoadingProvinciasAplicativos,
  } = useSWR<ProvinciasAplicativos[], AxiosError>(
    baseURL + "/provincia-aplicativo"
  );

  async function postRequest(
    url: string,
    { arg }: { arg: ProvinciasAplicativos }
  ) {
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

  async function putRequest(
    url: string,
    { arg }: { arg: ProvinciasAplicativos }
  ) {
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
        idProvincia: number;
        idAplicativo: number;
      };
    }
  ) {
    return fetch(`${url}/${arg.idProvincia}/${arg.idAplicativo}`, {
      method: "DELETE",
      body: JSON.stringify(arg),
    }).then(() => mutate());
  }

  const { trigger: createProvincia } = useSWRMutation(
    baseURL + "/provincia-aplicativo",
    postRequest,
    {
      onSuccess() {
        openModal(ADD_EDIT_SUCCESS, {
          message: "Provincia creada existosamente",
          subMessage:
            "La nueva provincia ya se encuentra disponible en el catálogo de Provincias.",
        });
      },
    }
  );

  const { trigger: updateProvincia } = useSWRMutation(
    baseURL + "/provincia-aplicativo",
    putRequest,
    {
      onSuccess() {
        openModal(ADD_EDIT_SUCCESS, {
          message: "La provincia fue modificada existosamente",
          subMessage: "",
        });
      },
    }
  );
  const { trigger: deleteProvincia } = useSWRMutation(
    baseURL + "/provincia-aplicativo",
    deleteRequest
  );

  return {
    provincias: provincias || [],
    provinciasAplicativos: provinciasAplicativos || [],
    error,
    createProvincia,
    updateProvincia,
    deleteProvincia,
    isLoading,
    isLoadingProvinciasAplicativos,
  };
};

export default useProvincias;
