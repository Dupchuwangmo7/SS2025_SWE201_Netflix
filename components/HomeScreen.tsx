import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  const featuredContent = {
    title: 'Featured Movie',
    description: 'An epic adventure awaits you in this thrilling blockbuster!',
    image: 'https://m.media-amazon.com/images/M/MV5BZjljNjI3NzMtYjYwNi00YmE5LWI0OWQtZTkzNGEwY2RmODcyXkEyXkFqcGc@._V1_.jpg',
  };

  const movieList = [
    { id: '1', image: 'https://creativereview.imgix.net/content/uploads/2024/12/AlienRomulus-scaled.jpg?auto=compress,format&q=60&w=729&h=1080' },
    { id: '2', image: 'https://i.pinimg.com/736x/6e/d8/86/6ed8865d6712fb9f41c14f11e553bdf3.jpg' },
    { id: '3', image: 'https://compote.slate.com/images/77440fdf-a599-4fd1-90fc-cc619aa7419d.jpg?crop=590%2C885%2Cx0%2Cy0' },
    { id: '4', image: 'https://artofthemovies.co.uk/cdn/shop/files/IMG_4154_1-780453_de0cc110-550d-4448-a7ec-d3ff945c0739.jpg?v=1696169470' },
  ];

  const seriesList = [
    { id: '1', image: 'https://www.closeup-shop.com/media/oart_0/oart_s/oart_72494/1279575_G870120.JPG' },
    { id: '2', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQdttJvszpXZZDRBx6bLQprJt918HrS1MGOej3W88GrkfOeL-kUJn66TfXKYxd1B7r3ZDxo2Wlo-FjgzFUvSNrR9FRSrUq-aW0Jzip6mBrJvjEm7pVt72u_XErbyxZZ5RJNJpnOdy_3z2VabskP99G_ie.jpg?r=93e' },
    { id: '3', image: 'https://i.redd.it/yjyxmkace0xe1.jpeg' },
    { id: '4', image: 'https://i.pinimg.com/736x/0a/fa/84/0afa84b6393d82d8c7ee6f9f1a08173f.jpg' },
    { id: '5', image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2023/07/celebrity-netflix-tv-poster.jpg' },
    { id: '6', image: 'https://i.redd.it/tvn-our-unwritten-seoul-teaser-poster-premieres-may-24-v0-436dyjwd7dve1.jpg?width=3779&format=pjpg&auto=webp&s=d7f804c7aad9269141b9c08876ef8cc9e24d871d' },
  ];

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } else {
      console.error('Sign out error:', error.message);
    }
  };

  const renderMediaItem = ({ item }) => (
    <TouchableOpacity style={styles.mediaItem}>
      <ImageBackground source={{ uri: item.image }} style={styles.mediaImage}>
        {/* You can optionally add a title overlay here */}
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Netflix</Text>
        <Button title="Sign Out" onPress={signOut} buttonStyle={styles.signOutButton} />
      </View>
      <ScrollView>
        <ImageBackground source={{ uri: featuredContent.image }} style={styles.featuredImage}>
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>{featuredContent.title}</Text>
            <Text style={styles.featuredDescription}>{featuredContent.description}</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Movies</Text>
          <FlatList
            data={movieList}
            renderItem={renderMediaItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mediaList}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Series</Text>
          <FlatList
            data={seriesList}
            renderItem={renderMediaItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mediaList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40, // pushed the top bar down
    backgroundColor: '#000',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914',
  },
  signOutButton: {
    backgroundColor: '#E50914',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  featuredImage: {
    height: 300,
    justifyContent: 'flex-end',
  },
  featuredOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuredDescription: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 8,
  },
  playButton: {
    backgroundColor: '#E50914',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  mediaList: {
    paddingRight: 16,
  },
  mediaItem: {
    marginRight: 8,
  },
  mediaImage: {
    width: 120,
    height: 180,
    justifyContent: 'flex-end',
  },
  mediaTitle: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 4,
    textAlign: 'center',
  },
});
