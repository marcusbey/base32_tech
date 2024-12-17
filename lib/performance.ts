import { useEffect, useCallback } from 'react'

// Preload critical resources
export const preloadResources = () => {
  const resources = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  ]

  resources.forEach(({ rel, href, as, type, crossOrigin }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (as) link.setAttribute('as', as)
    if (type) link.setAttribute('type', type)
    if (crossOrigin) link.setAttribute('crossorigin', crossOrigin)
    document.head.appendChild(link)
  })
}

// Defer non-critical resources
export const useDeferNonCritical = () => {
  useEffect(() => {
    const loadNonCritical = () => {
      // Add non-critical resource loading here
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        window.requestIdleCallback(() => {
          const script = document.createElement('script')
          script.src = '/scripts/analytics.js'
          script.defer = true
          document.body.appendChild(script)
        })
      } else {
        setTimeout(() => {
          const script = document.createElement('script')
          script.src = '/scripts/analytics.js'
          script.defer = true
          document.body.appendChild(script)
        }, 1000)
      }
    }

    if (document.readyState === 'complete') {
      loadNonCritical()
    } else {
      window.addEventListener('load', loadNonCritical)
      return () => window.removeEventListener('load', loadNonCritical)
    }
  }, [])
}

// Optimize animations
export const useOptimizeAnimations = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// Optimize images with modern formats
export const optimizeImage = (src: string, width: number, quality = 75) => {
  return {
    src,
    width,
    quality,
    loading: 'lazy',
    decoding: 'async',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }
}

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Lazy load components
export const useLazyLoad = (callback: () => void, options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
        observer.disconnect()
      }
    }, options)

    const target = document.querySelector('[data-lazy]')
    if (target) observer.observe(target)

    return () => observer.disconnect()
  }, [callback])
}

// Optimize React re-renders
export const useThrottledCallback = (callback: () => void, delay: number) => {
  return useCallback(
    throttle(() => {
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          callback()
        })
      }
    }, delay),
    [callback, delay]
  )
}
