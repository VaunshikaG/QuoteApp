import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppTheme } from '../../../redux_01/colors'
import ListQuote from './ListQuote'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../features/store'
import { fetchQuote, clearAll } from '../features/quoteSlice'

const Home = () => {

  const dispatch: AppDispatch = useDispatch();

  const addNewQuote = async () => {
    try {
      const result = await dispatch(fetchQuote())

      if (result) {
        console.log('Add new quote: ', result);
      } else {
        console.log('Failed to add new quote');
      }
    } catch (error: any) {
      console.error('add error')
    }
  }

  const clearAllQuotes = () => {
    dispatch(clearAll());
  };

  return (
    <View style={styles.container}>

      {/* buttons */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={addNewQuote}
        >
          <Text style={styles.btnText}>Add random quote</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={clearAllQuotes}
        >
          <Text style={styles.btnText}>Clear all quotes</Text>
        </TouchableOpacity>

      </View>

      <ListQuote />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: AppTheme.white,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttons: {
    padding: 10,
    backgroundColor: AppTheme.blue,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    color: AppTheme.yellow,
    fontWeight: '500'
  },
})

export default Home
