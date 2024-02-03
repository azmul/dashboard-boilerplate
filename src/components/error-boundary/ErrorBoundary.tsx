"use client";

import React from "react";
import { Alert } from "antd";
import { ErrorBoundary } from "react-error-boundary";

interface IProps {
  children: React.ReactNode;
}

const Fallback = ({ error }: any) => {
  return (
    <Alert
      message="Error Info:"
      description={error.message}
      type="error"
      closable
    />
  );
};

const ErrorFallbackUI = ({ children }: IProps) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
};

export default ErrorFallbackUI;
