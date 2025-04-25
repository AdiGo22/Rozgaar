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

    const loadJobs =async(pageNumber: number) => {
        try { 
            setIsLoading(true);
            const newJobs = await fetchJobs({page : pageNumber});
            if(newJobs.length == 0 ) { 
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

    const renderFooter = () => {
        if(!isLoading) return null;
        return(<ActivityIndicator style = {{marginVertical: 20}} />);
    }

    const handleEndReached = () => {
        if(!isLoading && hasMore) { 
            loadJobs(page);
        }
    }

    
      //identify the item of the particular card pressed.
      //saving that item to the local storage.
    const handleCardPressed = async (item: any) => {
      try {
        // Save ENTIRE item object with unique key
        await AsyncStorage.setItem(
          `@JobCard_${item.id}`, 
          JSON.stringify(item)
        );
       
        router.push(`/job/${item.id}`);
      } catch (e) {
        console.error("Saving failed:", e);
      }
    };
    return (
        <View style={{ flex: 1 }}>
          <Text>Rozgaar</Text>
          {error && <Text className="text-red-500">Something went wrong!</Text>}
    
          <FlatList
            data={jobs}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => {
           
              return (
                <JobCard
                  {...item}
                  id = {item?.id}
                  title={item?.title}
                  location={item.primary_details?.Place}
                  salary={item.primary_details?.Salary}
                  phonedata={item?.custom_link}
                  onPress = {() => handleCardPressed(item)}
                />
              );
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      );
};

export default Index;