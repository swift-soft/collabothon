import {Button} from '@chakra-ui/react'

import {useAppDispatch, useAppSelector} from '@/store'

import {selectSplitting, setConfirmRequestOpen} from './state'

const RequestTransferButton = () => {
  const dispatch = useAppDispatch()

  const splitting = useAppSelector(selectSplitting)

  return !splitting ? null : (
    <Button  colorScheme="red" onClick={() => dispatch(setConfirmRequestOpen(true))}>
      Request Transfer
    </Button>
  )
}

export default RequestTransferButton
