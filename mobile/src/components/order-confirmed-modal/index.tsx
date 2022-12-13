import React from 'react';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/check-circle';
import { Container, OkButton } from './styles';
import { Text } from '../text';
import { StatusBar } from 'expo-status-bar';

type OrderConfirmedModalProps = {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <StatusBar style='light'/>
      <Container>
        <CheckCircle/>
        <Text size={20} color='#fff' weight='600' style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color='#fff' opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onOk}>
          <Text color='#d73035' weight='600'>
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
