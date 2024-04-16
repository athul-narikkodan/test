import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { Products } from '../Services/Products';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [count,setCount]=useState('0')

  useEffect(() => {
    Products.getProductsList()
      .then((response) => {
        const initialSelectedSizes = {};
        response.data.data.forEach((product) => {
          initialSelectedSizes[product.id] = product.size; 
        });
        setProducts(response.data.data);
        setSelectedSizes(initialSelectedSizes);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSizePress = (productId, size) => {
    setSelectedSizes({
      ...selectedSizes,
      [productId]: size, 
    });
  };
  const decrement=()=>{
    setCount(parseInt(count) - 1);
  }
  const increment=()=>{
    setCount(parseInt(count)+ 1);
  }
  
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productSubContainer}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={styles.productName}>{item.pname}</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.productName}>{count} x</Text>
      <Text style={styles.productName}>{item.prize}</Text>
      </View>
     
      </View>
        <Text style={{ color: '#a7b1af' }}>Size</Text>
        <View style={{ flexDirection: 'row' }}>
          {['200ml', '500ml'].map((sizeOption) => (
            <Pressable
              key={sizeOption}
              style={[
                styles.productSizeButton,
                selectedSizes[item.id] === sizeOption && styles.selectedProductSizeButton,
              ]}
              onPress={() => handleSizePress(item.id, sizeOption)}
            >
              <Text style={styles.productSize}>{sizeOption}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Pressable onPress={()=>decrement()} style={styles.button}> 
        <Text style={{color:'black'}}>-</Text>
        </Pressable>
        <View style={styles.button}>
        <Text style={{color:'black'}}>{count}</Text>
        </View>
        <Pressable onPress={()=>increment()} style={styles.button}> 
        <Text style={{color:'black'}}>+</Text>
        </Pressable>
        <Pressable style={styles.cart}> 
        <Text style={{color:'white'}}>Add To Cart</Text>
        </Pressable>
      </View>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3e1de',
    alignItems: 'center',
    paddingTop: 20,
    height: '100%',
  },
  productContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderRadius:8
  },
  productSubContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight:18
  },
  button:{
    borderWidth:2,
    borderColor:'black',
    paddingHorizontal:10
  },
  productSizeButton: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
  },
  selectedProductSizeButton: {
    borderColor: 'red',
    color:'red'
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cart:{
    paddingHorizontal:10,
    borderRadius:8,
    paddingVertical:5,
    margin:4,
    backgroundColor:'red',
    borderColor:null
  },
  productName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  productSize: {
    fontSize: 16,
    color: '#4a4a4a',
    textAlign: 'center',
  },
});

export default HomeScreen;
