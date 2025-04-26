import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { View,Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

    const[jobs,setJobs] = useState<any[]>([]);
    const[page,setPage] = useState(1);
    const[hasMore,setHasMore] = useState(true);
    const[isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

    const loadJobs =async(pageNumber: number) => {
    try {
      setIsLoading(true);
            const newJobs = await fetchJobs({page : pageNumber});
            if(newJobs.length === 0 ) { 
                setHasMore(false); //if no more jobs preset 
            }else { 
                setJobs(prev => [...prev , ...newJobs]); //continue filling the jobs
                setPage(pageNumber+1);
      }
        }
       catch(e) {
      setError(e.message);
       }
       finally {
      setIsLoading(false);
    }
    }

  useEffect(() => {
    loadJobs(1);
    },[]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const saved = await AsyncStorage.getItem('@Bookmarks');
        if (saved) {
          const parsed = JSON.parse(saved);
          const cleanBookmarks = Object.keys(parsed).reduce((acc, key) => {
            if (key !== 'undefined') acc[key] = parsed[key];
            return acc;
          }, {});
          setBookmarks(cleanBookmarks);
        }
      } catch (e) {
        console.error('Failed loading bookmarks:', e);
      }
    };
    loadBookmarks();
  }, []);

  const toggleBookmark = async (item: any) => {
    if (!item?.id) return;

    setBookmarks(prev => {
      const newBookmarks = {
        ...prev,
        [item.id]: !prev[item.id]
      };

      AsyncStorage.setItem('@Bookmarks', JSON.stringify(newBookmarks));
      if (newBookmarks[item.id]) {
        AsyncStorage.setItem(`@BookmarkedJob_${item.id}`, JSON.stringify(item));
      } else {
        AsyncStorage.removeItem(`@BookmarkedJob_${item.id}`);
      }

      return newBookmarks;
    });
  };

  const handleEndReached = () => {
        if(!isLoading && hasMore) { 
      loadJobs(page);
    }
    }


      //identify the item of the particular card pressed.
      //saving that item to the local storage.
  const handleCardPressed = async (item: any) => {
    try {
      const itemWithBookmark = {
        ...item,
        isBookmarked: bookmarks[item.id] || false
      };
      await AsyncStorage.setItem(
        `@JobCard_${item.id}`,
        JSON.stringify(itemWithBookmark)
      );
      router.push(`/job/${item.id}`);
    } catch (e) {
      console.error("Saving failed:", e);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-purple-800 px-4 py-3 shadow-md rounded-b-xl">
        <Text className="text-3xl font-bold text-center text-white">
          Rozgaar
        </Text>
        <Text className="text-sm text-center text-purple-200 mt-1">
        Your Local Job Buddy!
        </Text>
      </View>
      {error && (
        <View className="bg-red-100 mx-4 p-3 rounded-lg mt-4">
          <Text className="text-red-800 font-semibold text-center">
            Something went wrong: {error}
          </Text>
        </View>
      )}

<FlatList
  data={
    jobs
      ?.filter(item => item?.id !== undefined) // Remove undefined id jobs
      ?.filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      ) //Remove duplicate jobs
  }
  keyExtractor={(item, index) => `${item.id}-${index}`}
  renderItem={({ item }) => (
    <View className="mx-4 my-2">
      <JobCard
        {...item}
        id={item?.id}
        title={item?.title}
        location={item.primary_details?.Place}
        salary={item.primary_details?.Salary}
        phonedata={item.custom_link}
        onPress={() => handleCardPressed(item)}
        isBookmarked={bookmarks[item.id] || false}
        onBookmarkPress={() => toggleBookmark(item)}
      />
    </View>
  )}
  onEndReached={handleEndReached}
  onEndReachedThreshold={0.5}
  ListFooterComponent={
    isLoading ? (
      <ActivityIndicator size="large" className="my-4" color="#4C1D95" />
    ) : null
  }
  ItemSeparatorComponent={() => <View className="h-2" />}
  contentContainerClassName="pb-4"
/>


    </View>
  );
};

export default Index;
