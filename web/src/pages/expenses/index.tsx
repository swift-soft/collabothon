import {
  Flex,
  Box,
  Tabs,
  IconButton,
  Text,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  Spacer
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ExpensesPage = () => {
  return (
    <Container as="div" maxW="100%" p={0}>
      <Flex as="nav" bg="red.700" flex="1">
        <IconButton
          aria-label="Search database"
          icon={<ArrowBackIcon />}
          bg="red.700"
          borderRadius={40}
          color="white"
          size="md"
          _hover={{
            outline: "none",
            boxShadow: "none",
          }}
          alignContent="left"
        />
        <Spacer />
        <Box>
          <Text
            style={{ fontSize: "15px", color: "white", textAlign: "center" }}
          >
            Saldo
          </Text>
          <Text sx={{ fontSize: "20px", color: "white", fontWeight: "bold" }}>
            2500$
          </Text>
        </Box>
        <Spacer />
      </Flex>
      <Box>
        <Tabs mt="8px">
          <TabList>
            <Tab
              _selected={{
                color: "red.800",
                borderColor: "red.800",
                fontWeight: "bold",
              }}
            >
              Day
            </Tab>
            <Tab
              _selected={{
                color: "red.800",
                borderColor: "red.800",
                fontWeight: "bold",
              }}
            >
              Week
            </Tab>
            <Tab
              _selected={{
                color: "red.800",
                borderColor: "red.800",
                fontWeight: "bold",
              }}
            >
              Month
            </Tab>
            <Tab
              _selected={{
                color: "red.800",
                borderColor: "red.800",
                fontWeight: "bold",
              }}
            >
              Year
            </Tab>
            <Tab
              _selected={{
                color: "red.800",
                borderColor: "red.800",
                fontWeight: "bold",
              }}
            >
              Period
            </Tab>
          </TabList>

          {/* <TabPanels>
            <TabPanel>
              <Text></Text>
            </TabPanel>
            <TabPanel>
              <Text></Text>
            </TabPanel>
          </TabPanels> */}
        </Tabs>
        <Text
          textAlign="center"
          mt="10px"
          fontSize="18px"
          style={{ textDecoration: "underline" }}
        >
          Today, 20 October
        </Text>

        <Flex justify="center" p={0}>
          <PieChart width={800} height={400}>
            <Pie
              data={data}
              cy={150}
              innerRadius={105}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <Label
                value="2500$"
                position="center"
                fill="grey"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              />
            </Pie>
          </PieChart>
        </Flex>
      </Box>
    </Container>
  );
};

export default ExpensesPage;
