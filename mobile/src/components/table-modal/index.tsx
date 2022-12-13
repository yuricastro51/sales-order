import React, { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../button';
import { Close } from '../Icons/close';
import { Text } from '../text';
import { Form, Header, ModalBody, Overlay, Input } from './styles';

type TableModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType='fade'
      transparent
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666'/>
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor={'#666'}
              keyboardType='number-pad'
              onChangeText={setTable}
            />
            <Button
              onPress={handleSave}
              disabled={table.length === 0}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}