export const GA_MEASUREMENT_ID = 'G-R06ZC07TJE'

export function initFirebaseAnalytics(): void {
  if (typeof window === 'undefined') return

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  }

  // Skip initialization if environment variables are not configured
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    return
  }

  const runInit = () => {
    const dynamicImport = new Function('url', 'return import(url)') as (url: string) => Promise<Record<string, any>>
    Promise.all([
      dynamicImport('https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js'),
      dynamicImport('https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js'),
    ])
      .then(([appModule, analyticsModule]) => {
        if (typeof appModule?.initializeApp === 'function' && typeof analyticsModule?.getAnalytics === 'function') {
          const app = appModule.initializeApp(firebaseConfig)
          analyticsModule.getAnalytics(app)
        }
      })
      .catch(() => {
        // Ignore analytics blocked in local/adblock environments
      })
  }

  if (document.readyState === 'complete') {
    runInit()
  } else {
    window.addEventListener('load', runInit, { once: true })
  }
}

export function trackSelectContent(contentType: string, itemId: string): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'select_content', {
      send_to: GA_MEASUREMENT_ID,
      content_type: contentType,
      item_id: itemId,
    })
  }
}

export function initScrollDepthTracking(): () => void {
  if (typeof window === 'undefined') return () => {}

  const scrollMilestones: Record<number, boolean> = {
    25: false,
    50: false,
    75: false,
    90: false,
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    if (!scrollHeight) return

    const scrollPercent = Math.round(((window.scrollY + window.innerHeight) / scrollHeight) * 100)
    for (const key of Object.keys(scrollMilestones)) {
      const milestone = Number(key)
      if (scrollPercent >= milestone && !scrollMilestones[milestone]) {
        scrollMilestones[milestone] = true
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'scroll', {
            send_to: GA_MEASUREMENT_ID,
            percent_scrolled: milestone,
            event_label: `Scroll Milestone: ${milestone}%`,
          })
        }
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}
