import { useEffect } from 'react'

function getScore(value, optimalVal, range = optimalVal) {
  let score = 0

  if (value < optimalVal) {
    const minVal = optimalVal - range

    score = (value - minVal) / (optimalVal - minVal)
  } else {
    score = (value - optimalVal) / range
  }

  if (score < 0) score = 0

  return score
}

function scoreBar(value) {
  const fillLine = new Array(Math.round(value * 38) | 0).join(' ')
  const backLine = new Array(Math.round(38 - value * 38) | 0).join(' ')

  console.log(
    '%c' + fillLine + '%c' + backLine + '\n',
    `background: hsl(${
      value * 100
    }, 100%, 50%); border-radius: 100px 0 0 100px`,
    `background: hsl(${value * 100}, 100%, 25%); border-radius: 0 100px 100px 0`
  )
}

function metric(text, value, score) {
  const percent = Math.round(score * 100)

  console.log('\n' + text, value)
  console.log(
    'Score: %c ' + percent + '% ',
    `color: hsl(${percent}, 100%, 50%); background: hsl(${percent}, 100%, 25%); border-radius: 100px`
  )

  scoreBar(score)
}

function parseObject(object) {
  let sumLength = 0
  let wordCount = 0

  for (const key in object) {
    const objectOrString = object[key]

    if (
      (typeof objectOrString === 'object' && key === 'meta') ||
      key === 'button'
    ) {
      continue
    } else if (typeof objectOrString === 'string') {
      sumLength += objectOrString.length
      wordCount += objectOrString.split(' ').length
    } else {
      const { sumLength: _sumLength, wordCount: _wordCount } =
        parseObject(objectOrString)

      sumLength += _sumLength
      wordCount += _wordCount
    }
  }

  return { sumLength, wordCount }
}

export function useStatsSEO(textObj) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const { sumLength, wordCount } = parseObject(textObj)

      metric('Summary text length:', sumLength, getScore(sumLength, 5000))
      metric('Summary word count:', wordCount, getScore(wordCount, 700))
    }
  }, [textObj])
}
