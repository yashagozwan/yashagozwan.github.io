export const GA_MEASUREMENT_ID = 'G-R06ZC07TJE'

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

