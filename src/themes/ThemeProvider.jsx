import React, {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {COLOR_DARK, COLOR_DEFAULT} from './Colors';

const INITIAL_STATE = {
  theme: COLOR_DEFAULT,
};

const ThemeContext = createContext(INITIAL_STATE);

const ThemeProvider = ({children}) => {
  const useColor = useColorScheme();
  const [isTheme, setIsTheme] = useState(COLOR_DEFAULT);

  useEffect(() => {
    const subcribe =
      useColor === 'dark' ? setIsTheme(COLOR_DARK) : setIsTheme(COLOR_DEFAULT);
    return () => subcribe;
  }, [useColor]);

  const value = {
    theme: isTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemes = () => useContext(ThemeContext);

export default ThemeProvider;
