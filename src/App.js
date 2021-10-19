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

Amplify.configure(awsconfig);


Amplify.configure(aws_exports);


async function getUser() {
  let user = await Auth.currentAuthenticatedUser();
  console.log(user);
  const { username } = user;
  console.log(username);
  return username
}


function checkUser() {
  var checkedUser = { username: "Usuario", timer: "" };
  Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err))
}


async function getData() {
  const apiName = "restApiTest";
  const path = "/restApiTestPath";
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
  };

  return await API.get(apiName, path, myInit);
}


function getDownload() {
  const apiName = "restApiTest";
  const path = "/restApiTestPath";
  const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
      name: 'Test202110181634613220656',
    },
  };

  API.get(apiName, path, myInit).then(response => {
    console.log(response);
  }).catch(error => { console.log(error.response); });
}

function postData(state) {
  const apiName = "restApiTest";
  const path = "/restApiTestPath";
  var today = new Date();
  const myInit = { // OPTIONAL
    body: state,
    //body: { name: username, date: "Test" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + today.getTime(), userId: "LocalHost" }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  };

  return API.post(apiName, path, myInit).then(obj => console.log(obj), err => console.log(err));
}



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {}

    this.newState = {}

  }

  componentDidMount() {
    this.getUserSigned().then(result => this.setState({ username: result }))
  }

  async getUserSigned() {
    let user = await Auth.currentAuthenticatedUser();
    //console.log(user);
    const { username } = user;
    //console.log(username);
    return username
  }


  updateInputValue(field, evt) {
    this.setState({
      [field]: evt.target.value
    });
  }




  uploadText = () => {
    console.log("Click");
    postData(this.state);

  }

  downloadTest = () => {
    getDownload();

  }


  render() {
    //const appUser = getUser();
    //console.log(appUser);
    return (
      <div className="App">
        <AmplifySignOut />
        <header className="App-header">          <a
          className="App-link"
          href="https://github.com/DanielGlezca/create-react-app-auth-amplify.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React now!!
        </a>
          <AmplifyAuthenticator>
            <div class="Welcome">
              <h1> Hello {this.state.username}</h1>

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
              <Input onChange={evt => this.updateInputValue("field1", evt)} />
              <FormHelperText>Se esperan numeros</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Pregunta 2</FormLabel>
              <Input onChange={evt => this.updateInputValue("field2", evt)} />
              <FormHelperText>Decimales</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pregunta 3</FormLabel>
              <Input onChange={evt => this.updateInputValue("field3", evt)} />
              <FormHelperText>Se espera texto</FormHelperText>
              <FormErrorMessage>Error message</FormErrorMessage>
            </FormControl>
            <InputGroup>
              <InputLeftAddon color="gray.500">Telefono</InputLeftAddon>
              <Input onChange={evt => this.updateInputValue("telefono", evt)} />
              <FormHelperText>Telefono</FormHelperText>
            </InputGroup>
            <NumberInput opacity={1} />
            <FormControl>
              <FormLabel>Pregunta 4</FormLabel>
              <Input onChange={evt => this.updateInputValue("field4", evt)} />
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
