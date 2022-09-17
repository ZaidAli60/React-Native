import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Image, ScrollView} from 'native-base';
import {useCartContext} from '../../../context/CartContext';
export default function Products({product, index}) {
  const {dispatch} = useCartContext();
  const cardGap = 15;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  return (
    <ScrollView>
      <View alignItems="center">
        <View
          key={index}
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
              uri: `${product.image}`,
            }}
            alt="Alternate Text"
            size="xl"
          />
          <Text style={{paddingTop: 5, paddingBottom: 5}}>
            {product.category}
          </Text>
          <Text style={{color: '#f75606', paddingBottom: 3}}>
            Rs .{product.price}
          </Text>
          <View style={{paddingBottom: 5}}>
            <TouchableOpacity
              style={{backgroundColor: '#f75606', padding: 7}}
              onPress={() => {
                dispatch({type: 'ADD_TO_CART', payload: product});
              }}>
              <Text style={{color: 'white'}}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  productImage: {
    width: 100,
  },
});
