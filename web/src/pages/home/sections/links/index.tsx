import {Box, Image, Link, Text} from '@chakra-ui/react'

import blik from '@/pages/home/images/blik.png'
import form from '@/pages/home/images/form.png'
import transfer from '@/pages/home/images/transfer.png'

const Links = () => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" marginTop="15px" mb="20px" gap={6}>
      <Link href="#" display="flex" flexDirection="column" alignItems="center" marginX="10px">
        <Image src={transfer} alt="logo" height={'40px'} />
        <Text fontSize="sm" textAlign="center">
          New transfer
        </Text>
      </Link>
      <Link href="#" display="flex" flexDirection="column" alignItems="center" marginX="10px">
        <Image src={blik} alt="logo" height={'40px'} />
        <Text fontSize="sm" textAlign="center">
          Blik
        </Text>
      </Link>
      <Link href="#" display="flex" flexDirection="column" alignItems="center" marginX="10px">
        <Image src={form} alt="logo" height={'40px'} />
        <Text fontSize="sm" textAlign="center">
          Your assets
        </Text>
      </Link>
    </Box>
  )
}

export default Links
