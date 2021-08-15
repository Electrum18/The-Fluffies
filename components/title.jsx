function WithLineBrake({ header }) {
  const [start, end] = header.match(/[a-zA-Zа-яёА-ЯЁ ]+/g)

  return (
    <h1>
      {start}
      <br />
      {end}
    </h1>
  )
}

export default function Title({ header }) {
  return header.match(/\|/) ? (
    <WithLineBrake header={header} />
  ) : (
    <h1>{header}</h1>
  )
}
