import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
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
              }
              getNews();
       },[]);
       // console.log(newsArticles);

       const renderItem = ({item}) => {
              return(
                     <View style={styles.articleContainer}>
                            <View style={styles.image}>
                                   {/* <Image source={{
                                          uri: item.urlToImage,
                                   }}/> */}
                                   <Image  width={100} height={100} source={{
                                          uri: item.urlToImage,
                                   }}/>
                            </View>
                            <View style={styles.content}>
                                   <Text style={styles.author}>{item.author}</Text>
                                   <Text style={styles.title}>{item.title}</Text>
                                   <Text >{item.description}</Text>
                                   <Text style={styles.date}>{item.publishedAt}</Text>
                            </View>
                     </View>
              )
       }

       if(loading){
              return <ActivityIndicator size="large" color="#0000ff" />;
       }

       return (
              <FlatList
                     showsVerticalScrollIndicator={false}
                     data={newsArticles}
                     renderItem={renderItem}
                     keyExtractor={(item) => item.url}
              />

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
       imageContainer: {
         marginRight: 10, 
       },
       image: {
         width: 100, 
         height: 150, 
         borderRadius: 8, 
         alignItems:'center', 
         justifyContent: 'center'
       },
       content: {
              marginLeft:10,
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
