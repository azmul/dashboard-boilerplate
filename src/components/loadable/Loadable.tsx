import { Suspense } from "react";
import FullScreenLoader from "@/components/spinner/Spinner";

export const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );
