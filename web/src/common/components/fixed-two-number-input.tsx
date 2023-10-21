import React from 'react'

import {InputGroup, InputRightAddon, NumberInput, NumberInputField} from '@chakra-ui/react'

type Props = {
  value: number // in cents
  onChange: (v: number) => void
  max?: number
  rightAddon?: string
}

const FixedTwoNumberInput = ({value, onChange, max, rightAddon}: Props) => {
  const [stringValue, setStringValue] = React.useState('')
  React.useEffect(() => {
    // only set string value once
    value && setStringValue((p) => p || (value / 100).toFixed(2))
  }, [value])
  const handlePriceChange = React.useCallback(
    (s: string) => {
      const iOfDot = s.indexOf('.')
      const v = isNaN(+s)
        ? ''
        : +s < 0
        ? '0'
        : max && +s * 100 > max
        ? (max / 100).toFixed(2)
        : s.slice(0, iOfDot > 0 ? iOfDot + 3 : undefined)
      setStringValue(v)
      onChange(+v * 100)
    },
    [onChange, max]
  )

  return (
    <InputGroup>
      <NumberInput w="100%" min={0} max={max} precision={2} onChange={handlePriceChange} value={stringValue}>
        <NumberInputField borderRightRadius={0} />
      </NumberInput>
      {rightAddon && <InputRightAddon children={rightAddon} />}
    </InputGroup>
  )
}

export default FixedTwoNumberInput
