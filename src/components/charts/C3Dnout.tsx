import * as React from "react";
import c3 from "c3";
import ErrorFallbackUI from "@/components/error-boundary/ErrorBoundary";

interface C3DnoutChartProps<T> {
  id: string;
  columns: Array<T>;
  title?: string;
  width?: number;
  labelShow?: boolean;
  color?: Array<string>;
  className?: string;
  style?: object;
  dir?: string;
  // All other props
  [x: string]: any;
}

export default function C3DnoutChart<T>({
  id,
  columns,
  title = "",
  width = 30,
  labelShow = false,
  color,
  className = "",
  style,
  dir = "ltr",
  ...rest
}: C3DnoutChartProps<T>) {
  const generateObj: any = {
    bindto: `#${id}`,
    data: {
      columns,
      type: "donut",
    },
    donut: {
      title,
      width,
      label: {
        show: labelShow,
      },
    },
    ...rest,
  };

  if (color && Array.isArray(color)) {
    generateObj["color"] = {
      pattern: color,
    };
  }

  React.useEffect(() => {
    c3.generate(generateObj);
  }, []);
  return (
    <ErrorFallbackUI>
      <div id={id} className={className} style={style} dir={dir} />
    </ErrorFallbackUI>
  );
}
