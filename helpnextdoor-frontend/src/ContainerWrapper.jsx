import React from "react";

export default function ContainerWrapper({ children }) {
  return <div className="container px-4">{children}</div>;
}