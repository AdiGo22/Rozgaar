import { Link } from 'expo-router';
import {Text, TouchableOpacity} from 'react-native';

const JobCard = ({title,location,salary,phonedata}:any) => { 
return(
    <Link href={`/job/[id]`} asChild>
    <TouchableOpacity
    className={`w-full rounded-3xl p-6 mb-4 shadow-xl transition-transform transform hover:scale-105 `}
    style={{
      backgroundColor: 'red',
      borderRadius: 20,
      shadowColor: 'black',
      elevation: 5,
      padding: 16, 
    }}
  >
    <Text className="text-4xl mb-2">{title}</Text>
    <Text className="text-xl font-bold text-white">{location}</Text>
    <Text className="text-xl font-bold text-white">{salary}</Text>
    <Text className="text-xl font-bold text-white">{phonedata}</Text>
  </TouchableOpacity>
  </Link>
)
};

export default JobCard;