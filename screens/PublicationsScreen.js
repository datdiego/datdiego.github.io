import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';

export default function PublicationsScreen() {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch updated publications JSON
    const loadPublications = async () => {
      try {
        const response = await fetch("/publications.json");
        const data = await response.json();
        setPublications(data);
      } catch (error) {
        console.error("Failed to load publications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPublications();
  }, []);

  const openGoogleScholar = () => {
    Linking.openURL("https://scholar.google.com/citations?user=Rli2mWsAAAAJ");
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Publications</Text>
      <TouchableOpacity onPress={openGoogleScholar}>
        <Text style={styles.profileLink}>View My Google Scholar Profile</Text>
      </TouchableOpacity>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.titleColumn]}>Title</Text>
        <Text style={[styles.headerCell, styles.journalColumn]}>Journal</Text>
        <Text style={[styles.headerCell, styles.yearColumn]}>Year</Text>
        <Text style={[styles.headerCell, styles.citationsColumn]}>Citations</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={publications}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.titleColumn]} onPress={() => item.link && Linking.openURL(item.link)}>
              {item.title}
            </Text>
            <Text style={[styles.cell, styles.journalColumn]}>{item.journal || "N/A"}</Text>
            <Text style={[styles.cell, styles.yearColumn]}>{item.year || "N/A"}</Text>
            <Text style={[styles.cell, styles.citationsColumn]}>{item.citations || "0"}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  profileLink: { color: '#6200ee', fontSize: 16, textAlign: 'center', marginBottom: 20, textDecorationLine: 'underline' },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  titleColumn: { flex: 2, paddingRight: 10 },
  journalColumn: { flex: 1.5 },
  yearColumn: { flex: 0.5, textAlign: 'center' },
  citationsColumn: { flex: 0.5, textAlign: 'center' },
});
