import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/order';
import { api } from '../../utils/api';
import { OrderModal } from '../order-modal';
import { Board, OrdersContainer } from './styles';

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) {
      return;
    }
    setIsLoading(true);
    const newStatus = selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
    await api.patch(`/orders/${selectedOrder._id}`, { status: newStatus });
    toast.success(`O pedido da mesa ${selectedOrder.table} teve os status alterado.`);
    onChangeOrderStatus(selectedOrder._id, newStatus);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) {
      return;
    }
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder._id}`);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado.`);
    onCancelOrder(selectedOrder._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.map((order) => (
        <OrdersContainer key={order._id}>
          <button  type='button' onClick={() => handleOpenModal(order)}>
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        </OrdersContainer>
      ))}
    </Board>
  );
}
