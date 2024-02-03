import { isArray, kebabCase, capitalize } from "lodash";

export class UtilHelper {
  static removeUndefined(values: any | undefined) {
    if (!values) {
      return values;
    }
    if (values.q !== undefined) {
      if (isArray(values.q)) {
        values.q = values.q.join("");
      }
      if (values.q.replace(/\s/g, "") === "") {
        values.q = null;
      }
    }
    Object.keys(values).forEach(
      (key) =>
        (values[key] == null || values[key].length === 0) && delete values[key]
    );
    return values;
  }
  static objectToArray(values: any) {
    const objectToArray: any[] = [];
    Object.keys(values).forEach((key) =>
      objectToArray.push([key, values[key]])
    );
    return objectToArray;
  }

  static formatString(crumb: string | undefined) {
    return crumb && kebabCase(crumb)
      .split("-")
      .map((name: string) => capitalize(name))
      .join(" ");
  }

  static getPercentage(item: number, total: number) {
    if (!Boolean(item)) return "0%";
    return `${(item / total) * 100}%`;
  }

  static handleTheme() {
    const theme = localStorage.getItem("theme");
    const body: any = document.querySelector("#main-body");
    body["dataset"]["layoutMode"] = theme;
    body["dataset"]["topbar"] = theme;
  }
}
