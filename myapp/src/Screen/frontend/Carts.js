import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import {
  ScrollView,
  Box,
  HStack,
  Button,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
} from 'native-base';
import {useCartContext} from '../../context/CartContext';
export default function Account() {
  const {
    state: {cart },
    dispatch
  } = useCartContext();
  const [total, settotal] = useState();
  useEffect(() => {
    settotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
  }, [cart]);
  return (
    <ScrollView>
      <HStack
        bg="white"
        px="1"
        py="2"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack alignItems="center">
          <Box>
            <Text>Items ({cart.length}) </Text>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <Text style={{color:'#f57224'}}>Total Price ${total}</Text>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <Button>Checkout</Button>
          </Box>
        </HStack>
      </HStack>

      <FlatList
        style={styles.container}
        data={cart}
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.container}>
                <View
                  style={{
                    backgroundColor: 'white',
                    margin: 6,
                    borderRadius: 15,
                    borderColor: 'black solid ',
                  }}>
                  <Box
                    style={{
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={{uri: `${item.image}`}}
                      style={{height: 100, width: 100}}
                    />
                    <Text>{item.category}</Text>
                    <Button size="sm" style={{backgroundColor: '#bb2124'}} onPress={()=>{dispatch({type:"REMOVE_TO_CART",payload:item})}}>
                      Remove To Cart
                    </Button>
                  </Box>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
});
