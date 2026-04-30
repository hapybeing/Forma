import { create } from 'zustand'

interface CursorStore {
  x: number
  y: number
  isHovering: boolean
  label: string
  setPosition: (x: number, y: number) => void
  setHovering: (state: boolean, label?: string) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  x: 0,
  y: 0,
  isHovering: false,
  label: '',
  setPosition: (x, y) => set({ x, y }),
  setHovering: (state, label = '') => set({ isHovering: state, label }),
}))
