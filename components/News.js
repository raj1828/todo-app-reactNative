import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../features/storage';

const News = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 20; // Number of articles to fetch at once

    useEffect(() => {
        const getNews = async () => {
            setLoading(true);
            const articles = await fetchNews(page, limit);
            setNewsArticles(articles);
            setLoading(false);
        }
        getNews();
    }, [page]);

    const loadMoreArticles = async () => {
        if (loadingMore) return;
        if(page==5){
              Alert.alert('You have reached the Limit')
              return [...articles]
        }
        setLoadingMore(true);
        const nextPage = page + 1 || [];
        const articles = await fetchNews(nextPage, limit);
        
        
        setNewsArticles(prevArticles => [...prevArticles, ...articles]);
        
        
        setPage(nextPage);
        setLoadingMore(false);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.articleContainer}>
                <View style={styles.image}>
                    <Image
                        width={100}
                        height={100}
                        source={{ uri: item.urlToImage }}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.author}>{item.author}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text style={styles.date}>{item.publishedAt}</Text>
                </View>
            </View>
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
            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
        {
              loading && <ActivityIndicator size="large" color="#0000ff" />
 
        }
        
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
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
});
