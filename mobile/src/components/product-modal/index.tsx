import React, { useState } from 'react';
import { FlatList, Modal, Platform, TouchableOpacity } from 'react-native';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../button';
import { Close } from '../Icons/close';
import { Text } from '../text';
import { Image, CloseButton, Header, ModalBody, IngredientsContainer, Ingredient, FooterContainer, Footer, PriceContainer } from './styles';

type ProductModalProps = {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart(product: Product) {
    onAddToCart(product);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.1.118:3001/uploads/${product.imagePath}`
        }}
      >
        <CloseButton onPress={onClose}>
          <Close/>
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text color='$666' style={{marginTop: 8}}>{product.description}</Text>
        </Header>
        {product.ingredients.length > 0 &&
        <IngredientsContainer>
          <Text weight='600' color='#666'>Ingredientes</Text>
          <FlatList
            data={product.ingredients}
            keyExtractor={ingredient => ingredient._id}
            style={{ marginTop: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Ingredient>
                <Text>{item.icon}</Text>
                <Text
                  size={14}
                  color='#666'
                  style={{ marginLeft: 20 }}
                >
                  {item.name}
                </Text>
              </Ingredient>
            )}
          />
        </IngredientsContainer>
        }
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
          </PriceContainer>
          <Button onPress={() => handleAddToCart(product)}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
