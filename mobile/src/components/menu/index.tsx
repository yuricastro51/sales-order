import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/format-currency';
import { PlusCircle } from '../Icons/plus-circle';
import { ProductModal } from '../product-modal';
import { Text } from '../text';
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles';

type MenuProps = {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        renderItem={({ item }) => (
          <ProductContainer onPress={() => handleOpenModal(item)}>
            <ProductImage source={{
              uri: `http://192.168.1.118:3001/uploads/${item.imagePath}`
            }}/>
            <ProductDetails>
              <Text weight='600'>{item.name}</Text>
              <Text size={14} color='#666' style={{ marginVertical: 18 }}>
                {item.description}
              </Text>
              <Text size={14} weight='600'>{formatCurrency(item.price)}</Text>
            </ProductDetails>
            <AddToCartButton onPress={() => onAddToCart(item)}>
              <PlusCircle/>
            </AddToCartButton>
          </ProductContainer>
        )}
      >
      </FlatList>
    </>
  );
}
