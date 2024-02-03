import * as React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { defaultStyle, configMap} from "@/constants/map"

interface IProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  style?: object;
  children?: React.ReactNode;
}

function GoogleMapConfig({
  center,
  zoom = 16,
  children,
  style = defaultStyle,  
}: IProps) {
  const { isLoaded } = useJsApiLoader(configMap);

  const onLoad = React.useCallback((map: any) => map.setZoom(zoom), [zoom]);

  return (
    isLoaded ? (
      <GoogleMap mapContainerStyle={style} options={{disableDefaultUI: true }}  center={center} onLoad={onLoad}>
        {children}
      </GoogleMap>
    ) : null
  );
}

export default React.memo(GoogleMapConfig);
