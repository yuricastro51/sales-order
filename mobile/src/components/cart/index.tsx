import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/cart-item';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../button';
import { MinusCircle } from '../Icons/minus-circle';
import { PlusCircle } from '../Icons/plus-circle';
import { Text } from '../text';
import { OrderConfirmedModal } from '../order-confirmed-modal';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  QuantityContainer,
  ProductDatails,
  Summary,
  TotalContainer
} from './styles';
import { api } from '../../utils/api';

type CartProps = {
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  cartItems: CartItem[];
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };
    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.1.118:3001/uploads/${item.product.imagePath}`
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color='#666'>{item.quantity}x</Text>
                </QuantityContainer>
                <ProductDatails>
                  <Text size={14} weight='600'>{item.product.name}</Text>
                  <Text size={14} color='#666' style={{marginTop: 4}}>
                    {formatCurrency(item.product.price)}
                  </Text>
                </ProductDatails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  onPress={() => onAdd(item.product)}
                  style={{ marginRight: 24 }}
                >
                  <PlusCircle/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(item.product)}>
                  <MinusCircle/>
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight='600'>{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color='#999'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
