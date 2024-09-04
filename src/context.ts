import { createContext, useContext } from 'react';

export const initialTheme = {
  colorPrimary: '#292b3f',
  borderColor: '#e8e8e8',
};

export const Context = createContext<{
  theme: {
    colorPrimary: string;
    borderColor: string;
  };
}>({
  theme: initialTheme,
});

export const useTheme = () => {
  return useContext(Context).theme;
};
