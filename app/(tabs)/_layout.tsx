import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image,View } from "react-native";

const TabIcon = ({ focused, icon }: any) => {
    return (
      <View className={`justify-center items-center p-3 rounded-full ${
        focused ? 'bg-white shadow-lg' : ''
      }`}
      style={{
        width: focused ? 50 : 40,
        height: focused ? 50 : 40,
      }}>
        <Image
          source={icon}
          style={{ 
            tintColor: focused ? '#5E4E9B' : '#A8B5DB',
            width: focused ? 24 : 20,
            height: focused ? 24 : 20,
          }}
        />
      </View>
    );
  };
const _layout = () => {
    return(
        <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5E4E9B',
        tabBarInactiveTintColor: '#A8B5DB',
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#F5F2FF', // softer lavender
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          position: 'absolute',
          shadowColor: '#5E4E9B',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 12,
          elevation: 10,
          borderWidth: 0.5,
          borderColor: '#D9D3F2',
          paddingHorizontal: 10,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
            />    
          )
        }}
      />

      <Tabs.Screen
        name="bookmarked"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.bookmark}
            />    
          )
        }}
      />
    </Tabs>
    )
}
export default _layout;