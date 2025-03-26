import { AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Producto, ProductoApiResponse, ProductoCrear } from "./types";
import { baseURL } from "config/swrConfig";

const headers = {
  accept: "*/*",
  "Content-Type": "application/json",
};

const useProductos = () => {
  const {
    data: response,
    isLoading: isLoadingProductos,
    error,
    mutate,
  } = useSWR<ProductoApiResponse, AxiosError>(baseURL + "/productos");

  const productos = response?.datos || [];


  async function postRequest(url: string, { arg }: { arg: ProductoCrear }) {
    if (!arg.descripcion || !arg.codigoExterno || !arg.idAplicativo) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el producto");
    }

    const nuevoProducto = await response.json();
    await mutate((currentData) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: [...currentData.datos, nuevoProducto],
      };
    }, false);

    return nuevoProducto;
  }

  async function putRequest(url: string, { arg }: { arg: Producto }) {
    if (!arg.descripcion || !arg.codigoExterno || !arg.idAplicativo) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    const productoActualizado = await response.json();
    await mutate((currentData) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: currentData.datos.map((producto) =>
          producto.id === productoActualizado.id ? productoActualizado : producto
        ),
      };
    }, false);

    return productoActualizado;
  }

  async function deleteRequest(url: string, { arg }: { arg: { id: number } }) {
    const { id } = arg;

    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    await mutate((currentData) => {
      if (!currentData) return;

      return {
        ...currentData,
        datos: currentData.datos.filter((producto) => producto.id !== id),
      };
    }, false);

    return { id };
  }

  const { trigger: agregarProducto } = useSWRMutation(
    baseURL + "/productos",
    postRequest
  );

  const { trigger: updateProducto, isMutating: isUpdating } = useSWRMutation(
    baseURL + "/productos",
    putRequest
  );

  const { trigger: deleteProducto, isMutating: isDeleting } = useSWRMutation(
    baseURL + "/productos",
    deleteRequest
  );

  return {
    productos,
    error,
    agregarProducto,
    updateProducto,
    deleteProducto,
    isLoadingProductos,
    isUpdating,
    isDeleting,
    mutate,
  };
};

export default useProductos;
