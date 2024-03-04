import { SourceContext } from "@/contexts/source-context-provider";
import { useContext } from "react";

export function useSourceContext() {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetContextProvider');
  }
  return context;
}
