import { normalizeVector, sanitizeVector } from 'leva/plugin'

export const normalize = input => {
  const { value, settings } = normalizeVector(input, {})

  return { value, settings }
}

export const sanitize = (value, settings, prevValue) =>
  sanitizeVector(value, settings, prevValue)
