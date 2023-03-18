//import {Flex , Heading , Input , Button , Text} from "@chakra-ui/react"
const App = () => {
    return(
        <Content/>
    );
}

export default App;

// import { Button } from "@chakra-ui/button";
// import { useColorModeValue } from "@chakra-ui/color-mode";
// import { Input } from "@chakra-ui/input";
// import { Flex, Heading, Text } from "@chakra-ui/layout";
// import { Checkbox } from "@chakra-ui/form-control";

import { Button,useColorModeValue,Input,Flex,Heading,Text,Checkbox } from "@chakra-ui/react";




const Content = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Sign up</Heading>
        <Input
          placeholder="example@example.ex"
          variant="filled"
          mb={3}
          type="email"
        />
        <Input placeholder="*******" variant="filled" mb={6} type="password" />
        <Flex><Checkbox><Text as="a" href="/policy">利用規約</Text><Text>に同意しますか</Text></Checkbox></Flex>
        <Button colorScheme="teal">Sign up</Button>
      </Flex>
    </Flex>
  );
};

