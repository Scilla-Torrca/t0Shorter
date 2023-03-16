import { Box, Text , Spacer , Button , Flex , Center , Input , Card , CardHeader , CardBody , CardFooter , Heading , SimpleGrid , Container} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import "@fontsource/armata"

const App = () => {
  return(
    <>
      <Content/>
    </>
  );
}

export default App;

const Content = () => {
  return(
    <>
      <Box bg={"gray.200"}>
        <Flex>
          <Text fontSize={30} fontFamily={"armata"} color={"gray.700"} p={4}>t0.si</Text>
          <Spacer></Spacer>
          <Button colorScheme={"gray"} fontSize={20} size={"lg"} m={4} fontFamily={"armata"} shadow={"lg"}>Signup</Button>
          <Button colorScheme={"gray"} fontSize={20} size={"lg"} m={4} fontFamily={"armata"} shadow={"lg"}>Login</Button>
        </Flex>

        <Center>
          <Card>
            <Flex>
              <Center>
                <Input placeholder="Paste your long URL" htmlSize={50} width={"auto"} m={10} variant={"filled"}/>
                <Button colorScheme={"gray"} fontSize={20} size={"lg"} m={4} fontFamily={"armata"} shadow={"lg"}>send</Button>
              </Center>
            </Flex>
          </Card>
        </Center>

        <Center>
          <Text fontFamily={"armata"} m={30} fontSize={30}>t0.si your link shorter</Text>
        </Center>

        <Flex>          
          <Text fontFamily={"armata"} fontSize={30} m={20}>What is t0.si?</Text>
          <Text fontFamily={"armata"} fontSize={30} m={20}>A modern URL shortening service</Text>
        </Flex>
      </Box>

      <Center bg={"gray.100"}>
        <SimpleGrid spacing={4} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}>
          <Card>
            <CardHeader>
              <Center><Heading>Open Source</Heading></Center>
            </CardHeader>
            <CardBody>
              <Center><Text fontFamily={"armata"} fontSize={20}>安心してお使い頂けるよう、ソースコードを公開しています</Text></Center>
            </CardBody>
            <Center>
              <CardFooter>
              <Button as="a" href="https://github.com/Scilla-Torrca/t0Shorter" size="lg" >GitHub</Button>
              </CardFooter>
            </Center>
          </Card>

          <Card>
            <CardHeader>
              <Center><Heading>All Free</Heading></Center>
            </CardHeader>
            <CardBody>
                <Text fontFamily={"armata"} fontSize={20}>皆さんの生活を少し便利に。</Text>
                <Text fontFamily={"armata"} fontSize={20}>このサービスは完全無料でお使いいただけます<div className=""></div></Text>
            </CardBody>
            <Center>
              <CardFooter>
              <Button as="a" href="/register" size="lg" >使ってみる</Button>
              </CardFooter>
            </Center>
          </Card>
        </SimpleGrid>  
      </Center>

      <Box bg={"gray.300"}>
        <Center p={10}>
          <Flex>
            <Text fontFamily={"armata"}>Made by <Text as={"a"} href="https://mk1.torrca.com/torrca" color={"blue.500"} >Examle</Text><ExternalLinkIcon /></Text>
          </Flex> 
        </Center>
      </Box >
    </>
  );
}
