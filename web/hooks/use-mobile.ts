import * as React from 'react'

// Enhanced breakpoints following 2024 best practices
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1280,
  xlarge: 1440
} as const

const MOBILE_BREAKPOINT = BREAKPOINTS.tablet

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`)
    const onChange = () => {
      const width = window.innerWidth
      setIsTablet(width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop)
    }
    mql.addEventListener('change', onChange)
    const width = window.innerWidth
    setIsTablet(width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isTablet
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<keyof typeof BREAKPOINTS | 'xs'>('xs')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint('xs')
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('mobile')
      } else if (width < BREAKPOINTS.desktop) {
        setBreakpoint('tablet')
      } else if (width < BREAKPOINTS.large) {
        setBreakpoint('desktop')
      } else if (width < BREAKPOINTS.xlarge) {
        setBreakpoint('large')
      } else {
        setBreakpoint('xlarge')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}
