import { useState, createContext, useEffect, type Context } from 'react'

type MODE = "LIGHT" | "DARK"
type ModeContextType = {
  theme: MODE,
  toggleTheme: () => void,
}

// Fixed: Default context is now DARK
const ModeContext: Context<ModeContextType> = createContext<ModeContextType>({ theme: "DARK", toggleTheme: () => {}})

// get MODE from localStorage
const getModeFromStorage = (): MODE => {
  // Check if we are in the browser
  if (typeof window === 'undefined') return "DARK"; 

  if (localStorage.getItem("MODE") !== null) {
    return localStorage.getItem("MODE") as MODE
  } else {
    // Fixed: If no setting exists, Default to DARK
    localStorage.setItem("MODE", "DARK")
    return "DARK"
  }
}

const setModeInStorage = (mode: MODE) => {
  if (localStorage.getItem("MODE") !== null) {
    localStorage.setItem("MODE", mode)
  } else {
    localStorage.setItem("MODE", mode)
  }
}

export { ModeContext }

export const useThemeMode = (): [ MODE, () => void ] => {

  // Fixed: Initial state is DARK to prevent "White Flash" on load
  const [themeMode, changeThemeMode] = useState<MODE>("DARK")

  const changeMode = () => {
    // store the value in localstorage
    const newMode = themeMode === "LIGHT" ? "DARK" : "LIGHT"
    setModeInStorage(newMode)
    changeThemeMode(newMode)
  }

  useEffect(() => {
    // Sync with local storage on mount
    changeThemeMode(getModeFromStorage())
  }, [])

  // change the class of the root
  useEffect(() => {
    const root = document.querySelector(":root")
    if (!root) return

    if (themeMode === "LIGHT") {
      // remove the dark class from the root
      root.classList.remove("dark")
      // add the light class
      root.classList.add("light")
      // Set actual body background color for smooth transition
      document.body.style.backgroundColor = "white"
    }
    else {
      // remove the light class from the root
      root.classList.remove("light")
      // add the dark class
      root.classList.add("dark")
      // Set actual body background color for smooth transition
      document.body.style.backgroundColor = "#1a1a1a" // Matches the header color
    }

  }, [themeMode])

  return [themeMode, changeMode]
}
