import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Box, Heading, ScrollView} from 'native-base';
import {useReadDataContext} from '../../context/ReadContext';
import {useCartContext} from '../../context/CartContext';
export default function Contact({product}) {
  const {documents} = useReadDataContext();
  const {dispatch} = useCartContext();
  console.log(documents);
  const cardGap = 15;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
  return (
    <ScrollView>
      <View style={Styles.flexContainer}>
        <Box py="3">
          <Heading>New Features</Heading>
          <Box
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {documents.map((item, index) => {
              return (
                <View
                  key={item.id}
                  style={{
                    marginTop: cardGap,
                    marginLeft: index % 2 !== 0 ? cardGap : 0,
                    width: cardWidth,
                    height: 230,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    shadowOpacity: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={Styles.productImage}
                    source={{
                      uri: `${item.image}`,
                    }}
                    alt="Alternate Text"
                    size="xl"
                  />
                  <Text style={{paddingTop: 5, paddingBottom: 5}}>
                    {item.category}
                  </Text>
                  <Text style={{color: '#f75606', paddingBottom: 3}}>
                    Rs .{item.price}
                  </Text>
                  <View style={{paddingBottom: 5}}>
                    <TouchableOpacity
                      style={{backgroundColor: '#f75606', padding: 7}}
                      onPress={() => {
                        dispatch({type: 'ADD_TO_CART', payload: item});
                      }}>
                      <Text style={{color: 'white'}}>Add To Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </Box>
        </Box>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  flexContainer: {
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  productImage: {
    width: 100,
    height: '50%',
  },
});
