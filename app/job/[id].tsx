// app/jobs/[id].tsx
import { Link, useLocalSearchParams } from "expo-router";
import { Image,Text, View, ActivityIndicator, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface JobData {
  id: string;
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Experience  : string;
    Qualification : string;
  };
  custom_link: string;

  company_name : string;
  job_role : string;
  job_hours : string;
  creatives :{ 
    file : string;
  }[];
  contentV3: {
    V3: {
      field_value: string;
    }[];
  };
  contact_preference : {
    whatsapp_link : string;
  }
  job_tags :{ 
    value : string,
  }[];
  
}

const JobScreen = () => {
  const { id } = useLocalSearchParams();
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobData = async () => {
      try {
        if (typeof id !== 'string') {
          throw new Error('Invalid job ID');
        }

        const storageKey = `@JobCard_${id}`;
        const data = await AsyncStorage.getItem(storageKey);
        
        if (!data) {
          throw new Error('Job data not found');
        }

        const parsedData: JobData = JSON.parse(data);
        setJobData(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job data');
      } finally {
        setLoading(false);
      }
    };

    loadJobData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }
     return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">{jobData?.title}</Text>
      <View className="space-y-2">
        <Text className="text-lg">Location: {jobData?.primary_details?.Place}</Text>
        <Text className="text-lg">Salary: {jobData?.primary_details?.Salary}</Text>
        <Text className="text-lg">Contact: {jobData?.custom_link}</Text>
        <Text className="text-lg">Experience {jobData?.primary_details?.Experience}</Text>
        <Text className="text-lg">Qualification {jobData?.primary_details?.Qualification}</Text>
        <Text className = "text-lg">Vacancy {jobData?.job_tags[0].value }</Text>
        
        <Text className = "text-lg">Company Name {jobData?.company_name}</Text>

        <Text className="text-lg">Gender {jobData?.contentV3.V3[1]?.field_value}</Text>
        <Text className="text-lg">Shift Timing {jobData?.contentV3.V3[2]?.field_value}</Text>
        <Text className="text-lg">Job Role {jobData?.job_role}</Text>
        <Text className="text-lg">Job Hours {jobData?.job_hours}</Text>
        <Image
          source={{ uri: jobData?.creatives[0]?.file }}
          style={{ width: 200, height: 200 }}
            />
       

       <TouchableOpacity onPress={() => Linking.openURL(jobData?.contact_preference.whatsapp_link)}>
  <Text style={{ color: 'green', textDecorationLine: 'underline' }}>
    WhatsApp Contact Number
  </Text>
</TouchableOpacity>

        {/* Add more fields as needed */}
      </View>
    </View>
  );
};

export default JobScreen;