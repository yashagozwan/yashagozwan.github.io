/**
 * Web Speech API helper for Japanese pronunciation
 */
export function speakJapanese(text: string, rate = 0.85): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(false)
      return
    }

    try {
      window.speechSynthesis.cancel()

      // Clean text from symbols like ～ or parentheses
      const cleanText = text
        .replace(/～/g, '')
        .replace(/\(.*?\)/g, '')
        .replace(/\[.*?\]/g, '')
        .trim()

      if (!cleanText) {
        resolve(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'ja-JP'
      utterance.rate = rate // slightly slower for beginner clarity

      // Find Japanese voice if available
      const voices = window.speechSynthesis.getVoices()
      const jaVoice = voices.find(
        (v) => v.lang.startsWith('ja') || v.lang.replace('_', '-').startsWith('ja-JP')
      )
      if (jaVoice) {
        utterance.voice = jaVoice
      }

      utterance.onend = () => resolve(true)
      utterance.onerror = () => resolve(false)

      window.speechSynthesis.speak(utterance)
    } catch {
      resolve(false)
    }
  })
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
