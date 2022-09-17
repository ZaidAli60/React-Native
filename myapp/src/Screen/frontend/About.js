import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {
  Heading,
  Input,
  Stack,
  FormControl,
  Image,
  Box,
  Button,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
export default function About() {
  const [selectImage, setselectImage] = useState('');
  const [url, setUrl] = useState('');
  const [productTitle, setproductTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  console.log(productTitle);
  const submitHandler = async () => {
    await storage()
      .ref(`images/${selectImage.fileName}`)
      .putFile(selectImage.uri)
      .then(async () => {
        const url = await storage()
          .ref(`images/${selectImage.fileName}`)
          .getDownloadURL();
        console.log(url);
        setUrl(url);
      })
      .catch(err => {
        console.error(err);
      });
    const obj = {
      productTitle,
      category,
      price,
      description,
      image: url,
    };

    console.log(obj);
    firestore()
      .collection('Users')
      .add(obj)
      .then(() => {
        console.log('User added!');
      });
    setproductTitle('');
    setCategory('');
    setPrice('');
    setDescription('');
  };

  let options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const selectIamge = async () => {
    const result = await launchImageLibrary(options, res => {
      console.log(res);
      setselectImage(res.assets[0]);
    });
  };

  return (
    <View style={Styles.flexContainer}>
      <Heading>Add New Products</Heading>

      <FormControl>
        <Stack
          p="2"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Input
            placeholder="Product Title"
            w="45%"
            value={productTitle}
            onChangeText={e => setproductTitle(e)}
          />

          <Input
            mx="2"
            placeholder="Category"
            w="45%"
            value={category}
            onChangeText={e => setCategory(e)}
          />
        </Stack>

        <Stack
          p="2"
          space={5}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Input
            type="file"
            placeholder="Price"
            w="45%"
            value={price}
            keyboardType={'numeric'}
            onChangeText={e => setPrice(e)}
          />
          <Input
            mx="2"
            placeholder="Description"
            w="45%"
            value={description}
            onChangeText={e => setDescription(e)}
          />
        </Stack>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button onPress={selectIamge}>
            <Text style={{color: 'white'}}>Select Image</Text>
          </Button>
        </Box>

        <Box alignItems="center" py="3">
          <Image
            source={{uri: selectImage.uri}}
            alt="Alternate Text"
            size="xl"
          />
        </Box>
        <Box>
          <Button onPress={submitHandler}>
            <Text style={{color: 'white'}}>Add Product </Text>
          </Button>
        </Box>
      </FormControl>
    </View>
  );
}

const Styles = StyleSheet.create({
  flexContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
