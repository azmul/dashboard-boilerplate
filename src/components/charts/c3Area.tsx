import * as React from "react";
import c3 from "c3";
import ErrorFallbackUI from "@/components/error-boundary/ErrorBoundary";

interface C3AreaChartProps {
  id: string;
  data: object;
  axis?: object;
  className?: string;
  style?: object;
  dir?: string;
  // All other props
  [x: string]: any;
}

export default function C3AreaChart({
  id,
  data,
  axis,
  className = "",
  style,
  dir = "ltr",
  ...rest
}: C3AreaChartProps) {
  const generateObj: any = {
    bindto: `#${id}`,
    data,
    axis,
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
