import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { CopyIcon } from '@chakra-ui/icons';
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Icon,
  NumberInput,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  AccordionIcon,
  Image,
  Button
} from '@chakra-ui/react';

import {
  Auth,
  API
} from 'aws-amplify';

import awsconfig from './aws-exports';
import { random, result } from 'lodash';

Amplify.configure(awsconfig);


Amplify.configure(aws_exports);


async function getUser() {
  let user = await Auth.currentAuthenticatedUser();

  const { username } = user;
  return username
}


function checkUser() {
  var checkedUser = { username: "Usuario", timer: "" };
  Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err))
}


function getData() {
  const apiName = "restApiTest";
  const path = "/restApiTestPath";
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
  };

  return API.get(apiName, path, myInit);
}

async function postData() {
  const apiName = "restApiTest";
  const path = "/restApiTestPath";
  const myInit = { // OPTIONAL
    body: { id: "11121321321656464" + random().toString, name: "Test" }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  return await API.post(apiName, path, myInit).then(obj => console.log(obj), err => console.log(err));
}



class App extends Component {

  uploadText = () => {
    console.log("Click");
    postData();

  }

  downloadTest = () => {
    API.get("restApiTest", "/restApiTestPath", {}).then(obj => {console.log(result)}, err => {console.log(err)});
  };



  render() {
    const appUser = (getUser().then(value => { return value.toString(); })).toString();
    console.log(appUser);
    return (
      <div className="App">
        <AmplifySignOut />
        <header className="App-header">
          <img src={"https://i.imgur.com/JDGexVo.jpeg"} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://github.com/DanielGlezca/create-react-app-auth-amplify.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React now!!
          </a>
          <AmplifyAuthenticator>
            <div class="Welcome">
              <h1> Hello {appUser}</h1>

            </div>
          </AmplifyAuthenticator>
        </header>
        <ChakraProvider resetCSS>
          <header className="App-header">
            <Image
              height={500}
              width={500}
              opacity={1}
              src="https://i.imgur.com/JDGexVo.jpeg"
              overflow="visible"
              minWidth={150}
              minHeight={150}
              maxWidth={700}
              maxHeight={700}
            />
            <FormControl>
              <FormLabel>Pregunta 1</FormLabel>
              <Input />
              <FormHelperText>Se esperan numeros</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Pregunta 2</FormLabel>
              <Input />
              <FormHelperText>Decimales</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Pregunta 3</FormLabel>
              <Input />
              <FormHelperText>Se espera texto</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <InputGroup>
              <InputLeftAddon color="gray.500">Telefono</InputLeftAddon>
              <Input />
              <FormHelperText>Telefono</FormHelperText>
            </InputGroup>
            <NumberInput opacity={1} />
            <FormControl>
              <FormLabel>Pregunta 4</FormLabel>
              <Input />
              <FormHelperText>Se esperan nombre</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Pregunta 5</FormLabel>
              <NumberInput
                value={50}
                isFullWidth
                width={50}
                height={50}
                fontSize="lg"
                textAlign="center"
                fontWeight="bold"
                color="blackAlpha.500"
              />
              <FormHelperText>Numeros</FormHelperText>
            </FormControl>
            <FormErrorMessage>Error message</FormErrorMessage>
            <Textarea />
            <Accordion>
              <AccordionItem>
                <AccordionButton>
                  <Text>Lista despegable</Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Text>evento 1</Text>
                </AccordionPanel>
                <AccordionPanel>
                  <Text>evento 2</Text>
                </AccordionPanel>
                <AccordionPanel>
                  <Text>evento 3</Text>
                </AccordionPanel>
                <AccordionPanel>
                  <Text>evento 4</Text>
                </AccordionPanel>
                <AccordionPanel>
                  <Text>evento 5</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

          </header>
          <Button variant="solid" size="lg" onClick={this.uploadText}>
            Enviar informacion
          </Button>
          <Button variant="solid" size="lg" onClick={this.downloadTest}>
            Traer Datos
          </Button>
        </ChakraProvider>

      </div>

    );
  }
}




export default withAuthenticator(App);
