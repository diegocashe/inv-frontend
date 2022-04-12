import { useContext } from "react";
import { LoadAppContext } from "../context/LoadAppContext";

export const useLoadApp = () => useContext(LoadAppContext)