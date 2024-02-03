import { api } from "@/api/apiHelper";
import { Endpoints } from "@/api/apiConst";
import * as dashboardType from "./type";
/**
 * Get Statics
 * @returns {Statics Response}
 */
export const getStatics = async (): Promise<any> =>
  await api.get(Endpoints.REPORTING + "/tower-stats");

/**
 * Get Power Distribution
 * @returns {Power Distribution Response}
 */
export const getPowerDistribution = async (): Promise<any> =>
  await api.get(Endpoints.REPORTING + "/power-distribution");

/**
 * Get Power Availability
 * @returns {power availability Response}
 */
export const getPowerAvailability = async (): Promise<any> =>
  await api.get(Endpoints.REPORTING + "/power-availability");

/**
 * Get Power Slab
 * @returns {Statics Response}
 */
export const getStateOfCharge = async (): Promise<any> =>
  await api.get(Endpoints.REPORTING + "/soc-distribution");

/**
 * Get PowerSensors
 * @returns {Statics Response}
 */
export const getAlarms = async (): Promise<dashboardType.alarmsType> =>
  await api.get(Endpoints.REPORTING + "/alarms");

/**
 * Get Power Slab
 * @returns {Power Slab Response}
 */
export const getPowerSlab = async (): Promise<any> =>
  await api.get(Endpoints.REPORTING + "/power-consumption-distribution");

/**
 * Get Load Allocations
 * @returns {Load Allocations Response}
 */
export const getLoadAllocations = async (): Promise<any> =>
  await api.get(Endpoints.REPORTING + "/power-allocation-distribution");
