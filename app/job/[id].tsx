import { useLocalSearchParams } from "expo-router";
import {Text,View} from "react-native";
const JobScreen = () => {
    const {id} = useLocalSearchParams();
 return(
    <View>
        <Text>
            Welcome to your specified {id} jobs
        </Text>
    </View>
 )
};
export default JobScreen;