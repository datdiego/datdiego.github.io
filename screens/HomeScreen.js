import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/head-shot.jpg')} // Replace with the path to your profile picture
        style={styles.profileImage}
      />
      <Text style={styles.name}>Your Name</Text>
      <Text style={styles.bio}>Welcome to my profile! Here you can learn more about my work, publications, and projects.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 240,
    height: 240,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6200ee',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 15,
  },
});
