import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../features/storage';

const News = () => {
       const [newsArticles, setNewsArticles] = useState([]);
       const [loading, setLoading] = useState(true);

       useEffect(() => {
              const getNews = async () => {
                     const articles = await fetchNews();
                     setNewsArticles(articles);
                     setLoading(false);
              };

              getNews();
       }, []);

       const renderItem = ({ item }) => (
              <View style={styles.articleContainer}>
                     <Text style={styles.title}>{item.title}</Text>
                     <Text>{item.description}</Text>
              </View>
       );

       if (loading) {
              return <ActivityIndicator size="large" color="#0000ff" />;
       }

       return (
              <FlatList
                     data={newsArticles}
                     renderItem={renderItem}
                     keyExtractor={(item) => item.url} // Assuming each article has a unique URL
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
