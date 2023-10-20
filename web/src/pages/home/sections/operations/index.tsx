import { Box, Text, Image } from "@chakra-ui/react";

const operations = [
  {
    date: "27 February",
    description: "Transfer for your goals",
    amount: "-4,01 PLN",
  },
  // Add more operations as needed
];

const Operations = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="semibold" mb="10px">
        Previous operations:
      </Text>
      <Box>
        <Text marginBottom="0">27 February</Text>
        <Box
          marginTop="1px"
          marginBottom="20px"
          borderBottom="2px"
          borderColor="blackAlpha.500"
        />
        <Box display="inline-flex" width="100%">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/876/876784.png"
            alt="aaaa"
            width="20px"
            height="20px"
            marginRight="10px"
          />
          <Text>Transfer for your goals</Text>
          <Text marginLeft="auto">-4,01 PLN</Text>
        </Box>
        <Box display="inline-flex" width="100%">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/876/876784.png"
            alt="aaaa"
            width="20px"
            height="20px"
            marginRight="10px"
          />
          <Text>Transfer for your goals</Text>
          <Text marginLeft="auto">-4,01 PLN</Text>
        </Box>
        <Box display="inline-flex" width="100%">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/876/876784.png"
            alt="aaaa"
            width="20px"
            height="20px"
            marginRight="10px"
          />
          <Text>Transfer for your goals</Text>
          <Text marginLeft="auto">-4,01 PLN</Text>
        </Box>
        <Box display="inline-flex" width="100%">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/876/876784.png"
            alt="aaaa"
            width="20px"
            height="20px"
            marginRight="10px"
          />
          <Text>Transfer for your goals</Text>
          <Text marginLeft="auto">-4,01 PLN</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Operations;
