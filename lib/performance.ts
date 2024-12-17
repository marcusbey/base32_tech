import { useEffect } from 'react'

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
      // Add any non-critical resource loading here
      const script = document.createElement('script')
      script.src = '/scripts/analytics.js'
      script.defer = true
      document.body.appendChild(script)
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
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

// Optimize images
export const optimizeImage = (src: string, width: number, quality = 75) => {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
