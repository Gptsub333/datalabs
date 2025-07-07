"use client";
import { createContext, useContext } from "react";

export const SubdomainContext = createContext(null);

export function useSubdomain() {
  return useContext(SubdomainContext);
}
export function SubdomainProvider({ children, subdomain }) {
  return (
    <SubdomainContext.Provider value={subdomain}>
      {children}
    </SubdomainContext.Provider>
  );
}
