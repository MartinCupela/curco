
export type ButtonTheme = {
  text: string;
  background: string
}


export const buttonThemes: { [name: string]: ButtonTheme } = {
  main: {
    background: "#0070f3",
    text: "#fff"
  }
}

export const DEFAULT_BUTTON_THEME = buttonThemes.main;
