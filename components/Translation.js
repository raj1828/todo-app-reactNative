import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { fetchTranslations } from '../features/storage';
import Loader from "../features/Loader";

export default function Translation() {
       const [newsData, setNewsData] = useState([]);
       const [isLoading, setIsLoading] = useState(false);
       const [isFetchingMore, setIsFetchingMore] = useState(false);
       const [page, setPage] = useState(1); // Current page number for pagination

       // Fetch initial data on component mount
       useEffect(() => {
              loadNews();
       }, []);

       const loadNews = async (pageNumber = 1) => {
              try {
                     // Show loading spinner for the initial load, else show bottom loading
                     pageNumber === 1 ? setIsLoading(true) : setIsFetchingMore(true);

                     const articles = await fetchTranslations('bitcoin', pageNumber);

                     if (articles.length > 0) {
                            // If page number is 1, set the news data to response; otherwise, append the new articles
                            setNewsData(prevData => pageNumber === 1 ? articles : [...prevData, ...articles]);
                            setPage(pageNumber + 1); // Increment page number
                     } else {
                            Alert.alert('No more articles found');
                     }
              } catch (error) {
                     console.log('Error in loading news:', error);
              } finally {
                     setIsLoading(false);
                     setIsFetchingMore(false);
              }
       };

       const loadMoreNews = () => {
              if (!isFetchingMore) {
                     loadNews(page);
              }
       };

       const renderItem = ({ item }) => (
              <View style={styles.newsItem}>
                     <Text style={styles.newsTitle}>{item.title}</Text>
                     <Text style={styles.newsDescription}>{item.description}</Text>
              </View>
       );

       const renderFooter = () => {
              return isFetchingMore ? (
                     <View style={styles.footer}>
                            <ActivityIndicator size="small" color="#0000ff" />
                     </View>
              ) : null;
       };

       return (
              <View style={styles.container}>
                     <Text style={styles.title}>News Feed</Text>
                     {isLoading ? (
                            <Loader />
                     ) : (
                            <FlatList
                                   data={newsData}
                                   renderItem={renderItem}
                                   keyExtractor={(item, index) => index.toString()}
                                   onEndReached={loadMoreNews}
                                   onEndReachedThreshold={0.5} // Fetch more when the user is halfway through the list
                                   ListFooterComponent={renderFooter}
                            />
                     )}
              </View>
       );
}

const styles = StyleSheet.create({
       container: {
              flex: 1,
              padding: 16,
              backgroundColor: '#f5f5f5'
       },
       title: {
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
       },
       newsItem: {
              padding: 16,
              backgroundColor: '#fff',
              marginBottom: 8,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 8,
              elevation: 2,
       },
       newsTitle: {
              fontSize: 18,
              fontWeight: 'bold',
       },
       newsDescription: {
              marginTop: 8,
              fontSize: 14,
              color: '#666',
       },
       footer: {
              paddingVertical: 20,
       },
});
