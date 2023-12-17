import { createContext, useContext } from "react";

export const ThemeContext = createContext({

    mode : "light",
    darkTheme : ()=>{},
    lightTheme : ()=>{},
    toggleTheme : ()=>{}
})

export const ThemeContextProvider = ThemeContext.Provider;

export const useThemeContext = ()=> useContext(ThemeContext);
