import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../features/storage';

const News = () => {
       const [newsArticles, setNewsArticles] = useState([]);
       const [loading, setLoading] = useState(true);
       const [page, setPage] = useState(1);
       const [isFetchingMore, setIsFetchingMore] = useState(false);

       useEffect(() => {
              const getNews = async () => {
                     const articles = await fetchNews(page);
                     if (page === 1) {
                            setNewsArticles(articles);
                     } else {
                            setNewsArticles((prevArticles) => {
                                   // Create a Set to filter out duplicates based on URL
                                   const existingUrls = new Set(prevArticles.map(article => article.url));
                                   const newArticles = articles.filter(article => !existingUrls.has(article.url));
                                   return [...prevArticles, ...newArticles];
                            });
                     }
                     setLoading(false);
                     setIsFetchingMore(false);
              };

              getNews();
       }, [page]);

       const renderItem = ({ item, index }) => (
              <View style={styles.articleContainer}>
                     <Text style={styles.title}>{item.title}</Text>
                     <Text>{item.description}</Text>
              </View>
       );

       const loadMoreArticles = () => {
              if (!isFetchingMore) {
                     setIsFetchingMore(true);
                     setPage((prevPage) => prevPage + 1);
              }
       };
       if (loading) {
              return <ActivityIndicator size="large" color="#0000ff" />;
       }

       return (
              <FlatList
                     data={newsArticles}
                     renderItem={renderItem}
                     keyExtractor={(item, index) => `${item.url}-${page}-${index}`} // Combine URL with page and index for uniqueness
                     onEndReached={loadMoreArticles}
                     onEndReachedThreshold={0.5}
                     ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
              />

       );
};

export default News;

const styles = StyleSheet.create({
       articleContainer: {
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
       },
       title: {
              fontWeight: 'bold',
              fontSize: 16,
       },
});
