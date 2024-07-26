import type { ComponentType, PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

export const useToggledComponent = <P extends {}>(ToggledComponent: ComponentType<P>, toggle: boolean) =>
  useMemo(() => {
    return (props: PropsWithChildren<P>) =>
      toggle ? <ToggledComponent {...props} /> : props.children ? <>{props.children}</> : null
  }, [ToggledComponent, toggle])

export const useToggledControl = <P extends {}>(ToggledComponent: ComponentType<P>, keycode: string) => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === keycode) setToggle(!toggle)
    }
    document.addEventListener('keyup', listener)
    return () => document.removeEventListener('keyup', listener)
  })

  return useToggledComponent(ToggledComponent, toggle)
}