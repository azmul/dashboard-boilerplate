import { useLocation } from "react-router-dom";
import qs from "query-string";

/**
 * Hook for filtering table columns
 * @dynamic
 * @hook {function}
 */
export default function useFilterColumn(defaultColumns: string[]) {
  const location = useLocation();
  const locationSearch: any = qs.parse(location.search);

  const columns: string[] = locationSearch?.tableColumns
    ? locationSearch?.tableColumns.split(",")
    : defaultColumns;
    
  return columns;
}
