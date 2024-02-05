import * as React from "react";
import c3 from "c3";
import ErrorFallbackUI from "@/components/error-boundary/ErrorBoundary";

interface C3DnoutChartProps {
  id: string;
  data: object;
  donut: object;
  className?: string;
  style?: object;
  dir?: string;
  // All other props
  [x: string]: any;
}

export default function C3DnoutChart({
  id,
  data,
  donut,
  className = "",
  style,
  dir = "ltr",
  ...rest
}: C3DnoutChartProps) {
  const generateObj: any = {
    bindto: `#${id}`,
    data: data,
    donut: donut,
    ...rest,
  };

  React.useEffect(() => {
    c3.generate(generateObj);
  }, []);

  return (
    <ErrorFallbackUI>
      <div id={id} className={className} style={style} dir={dir} />
    </ErrorFallbackUI>
  );
}
