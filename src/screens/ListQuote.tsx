import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../features/store'
import Icon from '@react-native-vector-icons/fontawesome6';
import { deleteQuote } from '../features/quoteSlice'
import { AppTheme } from '../colors';

const ListQuote = () => {
  const dispatch: AppDispatch = useDispatch();
  const quotesList = useSelector((state: RootState) => state.quotes.quotes_list);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>List of Quotes</Text>

      <FlatList
        scrollEnabled={true}
        data={quotesList}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={styles.listText}>{item.quote}</Text>
            <TouchableOpacity
              onPress={() => dispatch(deleteQuote(item.id))}
            >
              <Icon name='trash' size={18} style={styles.iconStyle} iconStyle='solid' />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No quotes found</Text>}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    color: AppTheme.blue,
    fontWeight: '600',
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  listText: {
    width: '80%',
    fontSize: 14,
    paddingVertical: 5,
  },
  iconStyle: {
    color: AppTheme.red,
  }
})

export default ListQuote
