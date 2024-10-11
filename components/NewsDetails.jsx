import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

export default function NewsDetails() {
  const route = useRoute();
  const { newsItem } = route.params; 

  return (
    <ScrollView style={styles.container}>
      {newsItem ? (
        <View style={styles.content}>
          {newsItem.urlToImage ? (
            <Image
              style={styles.cardImage}
              source={{ uri: newsItem.urlToImage || 'https://picsum.photos/200' }}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.imagePlaceholder}>Image not available</Text>
          )}
          <Text style={styles.title}>{newsItem.title}</Text>
          <Text style={styles.dateText}>
            {new Date(newsItem.publishedAt).toLocaleDateString() || 'No Date'}
          </Text>
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>{newsItem.author || 'Unknown Author'}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {newsItem.description || 'No Description Available'}
            </Text>
          </View>
          <Text style={styles.content}>
            {newsItem.content || 'No Content Available'}
          </Text>
          <TouchableOpacity onPress={() =>  Linking.openURL(newsItem.url).catch(err => console.error("Couldn't load page", err))}>
            <View style={styles.readMoreText}>
                <Text style={{color: "#fff"}} >Read More</Text>
            </View>
          </TouchableOpacity>
            <Text style={styles.sourceText}>Source: {newsItem.source.name}</Text>
            <Text style={styles.linkText}>Visit the original article: {newsItem.url}</Text>
        </View>
      ) : (
        <Text style={styles.error}>News not found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9', 
  },
  content: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  authorContainer: {
    marginBottom: 15,
  },
  authorText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ff0000',
    marginTop: 20,
  },
  readMoreText:{
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '25%',
    marginTop: 10,
  },
});
