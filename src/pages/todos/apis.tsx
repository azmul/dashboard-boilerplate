import { api } from "@/api/apiHelper";
import { Endpoints, DEFAULT_API_PARAMS } from "@/api/apiConst";
import * as todoType from "./type";

/**
 * Get Todos List
 * @returns {Todos List Response}
 */
export const getTodos = async (params: any): Promise<any> =>
  await api.get(Endpoints.TODOS, {
    params: { ...DEFAULT_API_PARAMS, ...params },
  });

/**
 * Get All Todos List
 * @returns {Todos List Response}
 */
export const getAllTodos = async (params: any): Promise<any> =>
  await api.get(Endpoints.TODOS, {
    params: { ...params },
  });
/**
 * Get Todo By ID
 * @returns {Todo Response}
 */
export const getTodoById = async (
  id: string | number | undefined
): Promise<any> => await api.get(Endpoints.TODOS + "/" + id);

/**
 * Create Todo
 * @returns {Todo Response}
 */
export const createTodo = async (
  params: todoType.TodoType
): Promise<any> => await api.post(Endpoints.TODOS, { ...params });

/**
 * Create Todo
 * @returns {Todo Response}
 */
export const editTodo = async (
  params: todoType.TodoType
): Promise<any> =>
  await api.patch(Endpoints.TODOS + "/" + params.id, {
    ...params,
  });

/**
 * Delete Todo
 * @returns {Todo Response}
 */
export const deleteTodo = async (id: string | number): Promise<any> =>
  await api.delete(Endpoints.TODOS + "/" + id);
