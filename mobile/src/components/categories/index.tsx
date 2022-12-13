import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Text } from '../text';
import { CategoryContainer, Icon } from './styles';
import { Category } from '../../types/category';

type CategoriesProps = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      data={categories}
      horizontal
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={category => category._id}
      renderItem={({ item }) => {
        const isSelected = selectedCategory === item._id;
        return (
          <CategoryContainer onPress={() => handleSelectCategory(item._id)} key={item._id}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {item.icon}
              </Text>
            </Icon>
            <Text opacity={isSelected ? 1 : 0.5} size={14} weight="600">
              {item.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
