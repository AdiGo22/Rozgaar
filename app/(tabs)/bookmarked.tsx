import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobCard from '@/components/JobCard';
import { useFocusEffect } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';

const BookmarksPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Memoize the load function
  const loadBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const bookmarkKeys = keys.filter(key => key.startsWith('@BookmarkedJob_'));
      
      const result = await AsyncStorage.multiGet(bookmarkKeys);
      const jobs = result
        .map(([_, value]) => value ? JSON.parse(value) : null)
        .filter(job => job?.id);

      setBookmarkedJobs(jobs);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  // reload bookmarks on page focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const load = async () => {
        if (isActive) {
          await loadBookmarks();
        }
      };
      load();
      return () => {
        isActive = false;
      };
    }, [loadBookmarks])
  );
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading bookmarks...</Text>
      </View>
    );
  }
  // If no bookmarked jobs
  if (!bookmarkedJobs.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-lg">No bookmarked jobs yet</Text>
      </View>
    );
  }

  const handleBookmarkToggle = async (jobId: string) => {
    try {
      // Remove job from AsyncStorage 
      await AsyncStorage.removeItem(`@BookmarkedJob_${jobId}`);
      // Filter out the job from state
      setBookmarkedJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
       <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            router.back();
          }
        }}
        className="mb-4 flex-row items-center space-x-2"
      >
        <Text className="text-blue-600 font-semibold text-lg">← Go Back</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-4 text-purple-900">Bookmarked Jobs</Text>

      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            {...item}
            id={item.id}
            title={item.title}
            location={item.primary_details?.Place}
            salary={item.primary_details?.Salary}
            phonedata={item.custom_link}
            isBookmarked={true} // Pass true to indicate it's bookmarked
            onBookmarkPress={() => handleBookmarkToggle(item.id)} // Remove from bookmarks
          />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default BookmarksPage;
