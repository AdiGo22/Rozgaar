import {ScrollView, Text,View} from "react-native";
import JobCard from "@/components/JobCard";
import useFetch from "@/services/useFetch";
import { fetchJobs } from "@/services/api";

const Index = () => {
const{data : jobs,error,refetch} = useFetch( () => fetchJobs({page:1}));

return(
    <View>
        <Text>Rozgaar</Text>
        {error && <Text className="text-red-500">Something went wrong!</Text>}
        <ScrollView>
            {jobs?.map((job:any) => ( 
                <JobCard
                 title = {job?.title}
                 location = {job.primary_details?.Place}
                 salary = {job.primary_details?.Salary}
                 phonedata = {job?.custom_link}
                 />
            ))}
        </ScrollView>
    </View>
)
};
export default Index;