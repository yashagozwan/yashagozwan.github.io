import allHiragana from 'kana-svg-data/dist/allHiragana.json'
import allKatakana from 'kana-svg-data/dist/allKatakana.json'

export interface StrokeItem {
  id: string
  value: string
}

export interface MedianItem {
  id: string
  value: [number, number][]
}

export interface ClipPathItem {
  id: string
  value: string
}

export interface KanaStrokeData {
  charCode: number
  character: string
  strokes: StrokeItem[]
  medians: MedianItem[]
  clipPaths: ClipPathItem[]
}

// Build fast lookup Map by charCode
const strokeMap = new Map<number, KanaStrokeData>()

function initMap() {
  const rawHiragana = allHiragana as unknown as Array<{
    charCode: number
    strokes: StrokeItem[]
    medians: MedianItem[]
    clipPaths: ClipPathItem[]
  }>
  const rawKatakana = allKatakana as unknown as Array<{
    charCode: number
    strokes: StrokeItem[]
    medians: MedianItem[]
    clipPaths: ClipPathItem[]
  }>

  for (const item of rawHiragana) {
    if (item.charCode) {
      strokeMap.set(item.charCode, {
        charCode: item.charCode,
        character: String.fromCharCode(item.charCode),
        strokes: item.strokes || [],
        medians: item.medians || [],
        clipPaths: item.clipPaths || [],
      })
    }
  }

  for (const item of rawKatakana) {
    if (item.charCode) {
      strokeMap.set(item.charCode, {
        charCode: item.charCode,
        character: String.fromCharCode(item.charCode),
        strokes: item.strokes || [],
        medians: item.medians || [],
        clipPaths: item.clipPaths || [],
      })
    }
  }
}

initMap()

export function getKanaStrokeData(charOrCode: string | number): KanaStrokeData | null {
  if (!charOrCode) return null
  const code = typeof charOrCode === 'number' ? charOrCode : charOrCode.charCodeAt(0)
  return strokeMap.get(code) || null
}

export interface HanziWriterCharData {
  strokes: string[]
  medians: [number, number][][]
}

function flipSvgPathY(d: string): string {
  return d.replace(/([MCQ])([^MCQZ]+)/g, (_match, cmd, coords) => {
    const nums = coords.trim().split(/[\s,]+/).map(Number)
    const flipped: string[] = []
    for (let i = 0; i < nums.length; i += 2) {
      flipped.push(`${nums[i]},${900 - nums[i + 1]}`)
    }
    return cmd + flipped.join(' ')
  })
}

const hanziCache = new Map<string, HanziWriterCharData>()

export function getHanziWriterKanaData(char: string): HanziWriterCharData | null {
  if (!char) return null
  const targetChar = Array.from(char)[0]
  if (!targetChar) return null

  if (hanziCache.has(targetChar)) {
    return hanziCache.get(targetChar)!
  }

  const raw = strokeMap.get(targetChar.charCodeAt(0))
  if (!raw || !raw.strokes.length) return null

  const data: HanziWriterCharData = {
    strokes: raw.strokes.map((s) => flipSvgPathY(s.value)),
    medians: raw.medians.map((m) => m.value.map(([x, y]) => [x, 900 - y] as [number, number])),
  }

  hanziCache.set(targetChar, data)
  return data
}

