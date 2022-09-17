import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Image,
  ScrollView,
} from 'native-base';
import {useToast} from 'native-base';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../../context/AuthContext';
export default function Register() {
  const {dispatch}= useAuthContext()
  const toast = useToast();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    setState({
      email: '',
      password: '',
      //   comfirePassword: '',
    });
    auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(() => {
        toast.show({
          placement: 'top',
          description: `${state.email} User has been sucessfuly signed in!`,
        });
        dispatch({type:"LOGOUT",payload:{user}})
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          toast.show({
            placement: 'top',
            description: ` That email address is already in use!`,
          });
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          toast.show({
            placement: 'top',
            description: `That email address is invalid!`,
          });
          console.log('That email address is invalid!');
        }
      });
  };
  return (
    <ScrollView>
      <Center w="100%">
        <Image
          source={{
            uri: 'https://icms-image.slatic.net/images/ims-web/3ae67ef5-e5f6-42c3-9a40-993ef9a7bfae.png',
          }}
          alt="Alternate Text"
          size="xs"
          style={{width: 100, marginTop: 20}}
        />
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold">
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs">
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Your Email"
                keyboardType="email-address"
                onChangeText={value => handleChange('email', value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                placeholder="Enter Your Paasword"
                onChangeText={value => handleChange('password', value)}
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                placeholder="Enter Your Comfirm Paasword"
                onChangeText={value => handleChange('comfirePassword', value)}
                keyboardType="numeric"
              />
            </FormControl>
            <Button mt="2" style={Styles.buttonColor} onPress={handleSubmit}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  buttonColor: {
    backgroundColor: '#f75606',
  },
});
