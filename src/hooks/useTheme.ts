import { useState, useEffect } from 'react'

export type Theme = 'dark' | 'light' | 'system'

const CYCLE: Theme[] = ['dark', 'light', 'system']

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const cycleTheme = () => {
    setTheme(t => CYCLE[(CYCLE.indexOf(t) + 1) % CYCLE.length])
  }

  return { theme, cycleTheme }
}
