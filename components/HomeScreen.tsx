import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button } from '@rneui/themed';
import WebView from 'react-native-webview';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoHtml, setVideoHtml] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredContent = {
    title: 'Drawing Closer',
    image: 'https://m.media-amazon.com/images/M/MV5BMjJiNzNlMDQtMjhmZS00NjU1LTgwMDMtMmJhNTRhYjEwMmQ3XkEyXkFqcGc@._V1_QL75_UX327_.jpg',
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

  const renderMediaItem = ({ item }: { item: { id: string; image: string } }) => (
    <TouchableOpacity style={styles.mediaItem}>
      <ImageBackground source={{ uri: item.image }} style={styles.mediaImage}>
        {/* You can optionally add a title overlay here */}
      </ImageBackground>
    </TouchableOpacity>
  );

  const drawingCloserHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/@mux/mux-player"></script>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; }
        mux-player { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <mux-player
        playback-id="P00FF6pv2AK00bn9c6LrbG4SAhvj5LcdXs38onGEuZL100"
        metadata-viewer-user-id="Placeholder (optional)"
        metadata-video-title="Drawing Closer"
      ></mux-player>
    </body>
    </html>
  `;

  const queenOfTearsHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/@mux/mux-player"></script>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; }
        mux-player { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <mux-player
        playback-id="ecg76hrif7dF02eagGyERQ3a4PJeUqAqLMDcQkSuZUdI"
        metadata-viewer-user-id="Placeholder (optional)"
        metadata-video-title="Queen of Tears"
      ></mux-player>
    </body>
    </html>
  `;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePlayQueenOfTears = () => {
    setVideoHtml(queenOfTearsHtml);
    setShowVideo(true);
  };

  const handlePlayDrawingCloser = () => {
    setVideoHtml(drawingCloserHtml);
    setShowVideo(true);
  };

  // Improved search logic to match partial queries
  const searchResults = searchQuery.trim().length > 0
    ? [
        {
          id: 'queen-of-tears-ep1',
          title: 'Queen of Tears Episode 1',
          image: 'https://images.ctfassets.net/4cd45et68cgf/Rb6wz7UfbWMR26SsqxxJL/82ba4eb884c1b2ca426a2b250d8afa86/ENUS_QueenofTears-Hae-In_CharacterKA_Vertical_RGB_PRE.jpg_ENUS_QueenofTears-Hae-In_CharacterKA_Vertical_RGB_PRE.jpg?w=1200',
        },
      ].filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes('queen') ||
        searchQuery.toLowerCase().includes('tears') ||
        searchQuery.toLowerCase().includes('ep 1')
      )
    : [];

  const renderSearchResult = ({ item }: { item: { id: string; title: string; image: string } }) => (
    <TouchableOpacity style={styles.searchResultItem} onPress={handlePlayQueenOfTears}>
      <ImageBackground source={{ uri: item.image }} style={styles.searchResultImage}>
        <View style={styles.searchResultOverlay}>
          <Text style={styles.searchResultTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Netflix</Text>
        <Button title="Sign Out" onPress={signOut} buttonStyle={styles.signOutButton} titleStyle={styles.signOutButtonText} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {showVideo ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{ html: videoHtml }}
            style={styles.webView}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
          />
          <Button
            title="Close"
            onPress={() => setShowVideo(false)}
            buttonStyle={styles.closeButton}
            titleStyle={styles.closeButtonText}
          />
        </View>
      ) : (
        <ScrollView>
          {searchQuery.trim().length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              {searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  renderItem={renderSearchResult}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.mediaList}
                />
              ) : (
                <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
              )}
            </View>
          )}
          <ImageBackground source={{ uri: featuredContent.image }} style={styles.featuredImage}>
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>{featuredContent.title}</Text>
              <TouchableOpacity style={styles.playButton} onPress={handlePlayDrawingCloser}>
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
      )}
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
    paddingTop: 40,
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
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  signOutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#141414',
  },
  searchInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#E50914',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 16,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  searchResultItem: {
    marginRight: 8,
  },
  searchResultImage: {
    width: 120,
    height: 180,
    justifyContent: 'flex-end',
  },
  searchResultOverlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  searchResultTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 8,
  },
});