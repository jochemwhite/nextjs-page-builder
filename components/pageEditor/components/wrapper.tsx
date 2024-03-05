import React from 'react'

interface Props {
  Component: React.FC
}

export default function Wrapper({ Component}: Props) {
  return (
      <Component />
  )
}
