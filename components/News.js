import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../features/storage';
import { useNavigation } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';

const News = () => {
       const [newsArticles, setNewsArticles] = useState([]);
       const [loading, setLoading] = useState(true);
       const [loadingMore, setLoadingMore] = useState(false);
       const [refreshing, setRefreshing] = useState(false);
       const [page, setPage] = useState(1);
       const limit = 20;
       const navigation = useNavigation();

       useEffect(() => {
              const getNews = async () => {
                     setLoading(true);
                     const articles = await fetchNews(page, limit);
                     setNewsArticles(articles);
                     setLoading(false);
              };
              getNews();
       }, [page]);

       const loadMoreArticles = async () => {
              if (loadingMore) return;
              if (page == 5) {
                     Alert.alert('You have reached the Limit');
                     return;
              }
              setLoadingMore(true);
              const nextPage = page + 1;
              const articles = await fetchNews(nextPage, limit);
              setNewsArticles(prevArticles => [...prevArticles, ...articles]);
              setPage(nextPage);
              setLoadingMore(false);
       };

       const handleDeleteArticle = (itemUrl) => {
              setNewsArticles(prevArticles => prevArticles.filter(item => item.url !== itemUrl));
       };

       const onRefresh = async () => {
              setRefreshing(true);
              setPage(1); // Reset page to 1
              const articles = await fetchNews(1, limit); // Fetch the first page
              setNewsArticles(articles);
              setRefreshing(false);
       };

       const renderItem = ({ item }) => {
              const renderRightActions = () => {
                     return (
                            <View style={styles.deleteContainer}>
                                   <Text style={styles.deleteText}>Delete</Text>
                            </View>
                     );
              };

              return (
                     <Swipeable
                            renderRightActions={renderRightActions}
                            onSwipeableOpen={() => handleDeleteArticle(item.url)}
                     >
                            <View style={styles.articleContainer}>
                                   <Image style={styles.image} source={{ uri: item.urlToImage }} />
                                   <TouchableOpacity onPress={() => navigation.navigate("NewsDetails", { newsItem: item })}>
                                          <View style={styles.content}>
                                                 <Text style={styles.author}>{item.author}</Text>
                                                 <Text style={styles.title}>{item.title}</Text>
                                                 <Text style={{ width: 300 }}>{item.description}</Text>
                                                 <Text style={styles.date}>{item.publishedAt}</Text>
                                          </View>
                                   </TouchableOpacity>
                            </View>
                     </Swipeable>
              );
       };

       const handleLoadMore = () => {
              loadMoreArticles();
       };

       return (
              <View>
                     <FlatList
                            
                            showsVerticalScrollIndicator={false}
                            data={newsArticles}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.url}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.1}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                     />
                     {loading && <ActivityIndicator size="large" color="#0000ff" />}
              </View>
       );
};

export default News;

const styles = StyleSheet.create({
       articleContainer: {
              flexDirection: 'row',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              alignItems: 'flex-start',
              paddingRight: 20,
       },
       image: {
              width: 100,
              height: 150,
              borderRadius: 8,
       },
       content: {
              marginLeft: 10,
              flex: 1,
              justifyContent: 'flex-start',
       },
       author: {
              fontSize: 14,
              fontStyle: 'italic',
              marginBottom: 4,
       },
       title: {
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 4,
              width: 300,
       },
       date: {
              fontSize: 12,
              color: '#666',
              marginTop: 4,
       },
       deleteContainer: {
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
              backgroundColor: 'red',
              height: '100%',
       },
       deleteText: {
              color: 'white',
              fontWeight: 'bold',
       },
});
