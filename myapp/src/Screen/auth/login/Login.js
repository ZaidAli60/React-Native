import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Text,
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
import {useAuthContext} from '../../../context/AuthContext';

export default function Login({navigation}) {
  const {dispatch} = useAuthContext();
  const toast = useToast();
  const [state, setState] = useState({
    emailid: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    console.log(state);
    setState({
      emailid: '',
      password: '',
    });

    auth()
      .signInWithEmailAndPassword(state.emailid, state.password)
      .then((userCredential) => {
        toast.show({
          placement: 'top',
          description: `${state.emailid} User has been sucessfuly signed in!`,
        });
        dispatch({type: 'LOGIN', payload: userCredential.user});
      })
      .catch(error => {
        toast.show({
          placement: 'top',
          description: `${error} `,
        });
        navigation.navigate('Register');

        console.log(error);
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
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                placeholder="Enter Your Email"
                keyboardType="email-address"
                onChangeText={value => handleChange('emailid', value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                placeholder="Enter Your Paasword"
                type="password"
                onChangeText={value => handleChange('password', value)}
                keyboardType="numeric"
              />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" onPress={handleSubmit} style={Styles.buttonColor}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>
              <Link
                _text={{
                  color: '#f75606',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigation.navigate('Register')}>
                Sign Up
              </Link>
            </HStack>
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
