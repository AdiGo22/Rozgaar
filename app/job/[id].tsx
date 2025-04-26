import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useNavigation } from "expo-router";

interface JobData {
  id: string;
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Experience: string;
    Qualification: string;
  };
  custom_link: string;
  company_name: string;
  job_role: string;
  job_hours: string;
  creatives: {
    file: string;
  }[];
  contentV3: {
    V3: {
      field_value: string;
    }[];
  };
  contact_preference: {
    whatsapp_link: string;
  };
  job_tags: {
    value: string;
  }[];
}

const JobScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
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
      <View className="flex-1 justify-center items-center bg-[#F9FAFB]">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9FAFB]">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#F9FAFB] p-4">
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


      <View className="bg-white rounded-2xl shadow-md p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">{jobData?.title}</Text>

      {jobData?.creatives[0]?.file && (
        <Image
          source={{ uri: jobData.creatives[0].file }}
          className="w-full h-48 rounded-xl mb-4"
          resizeMode="cover"
          />
        )}

        <View className="space-y-3">
        <DetailRow label="Company Name" value={jobData?.company_name || 'N/A'} />
          <DetailRow label="Location" value={jobData?.primary_details?.Place || 'N/A'} />
          <DetailRow label="Salary" value={jobData?.primary_details?.Salary || 'N/A'} />
          <DetailRow label="Experience" value={jobData?.primary_details?.Experience || 'N/A'} />
          <DetailRow label="Qualification" value={jobData?.primary_details?.Qualification || 'N/A'} />
          <DetailRow label="Vacancy" value={jobData?.job_tags[0]?.value || 'N/A'} />
          <DetailRow label="Gender" value={jobData?.contentV3.V3[1]?.field_value || 'N/A'} />
          <DetailRow label="Shift Timing" value={jobData?.contentV3.V3[2]?.field_value || 'N/A'} />
          <DetailRow label="Job Role" value={jobData?.job_role || 'N/A'} />
          <DetailRow label="Job Hours" value={jobData?.job_hours || 'N/A'} />
        </View>

        <TouchableOpacity
          className="mt-6 bg-green-500 py-3 rounded-xl items-center"
          onPress={() => {
            if (jobData?.contact_preference.whatsapp_link) {
              Linking.openURL(jobData.contact_preference.whatsapp_link);
            }
          }}
        >
          <Text className="text-white font-semibold text-lg">Apply via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const DetailRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-600 font-medium">{label}</Text>
      <Text className="text-gray-800">{value}</Text>
    </View>
  );
};

export default JobScreen;
