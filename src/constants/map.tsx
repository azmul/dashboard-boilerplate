import { ENV } from "@/api/config";

/**
 * Google Map Configuration
 * @readonly
 * @object {string}
 */
export const configMap = {
  id: "Dashboard-google-map",
  googleMapsApiKey: ENV.GOOGLE_MAP_KEY,
};

/**
 * Google Map Initial Style
 * @readonly
 * @object {string}
 */
export const defaultStyle = {
  width: "100%",
  height: "400px",
  disableDefaultUI: true,
};
