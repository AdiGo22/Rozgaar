import { Link } from 'expo-router';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef } from 'react';

const JobCard = ({ id, title, location, salary, phonedata, onPress, isBookmarked, onBookmarkPress }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Link href={`/job/${id}`} asChild>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="mx-5 my-3 p-1"
        style={{
          backgroundColor: '#ffffff40',
          borderWidth: 2,
          borderColor: '#4C1D95',
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        <View className="bg-white/40 rounded-[28px] py-6 px-5 backdrop-blur-md">
          {/* Header Section */}
          <View className='flex-row justify-between'>
            <Text className='flex-1'
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: '#4C1D95',
                maxWidth: '90%',
                textShadowColor: 'rgba(255, 255, 255, 0.5)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
                marginTop: 15,
                marginLeft: 10
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          {/* Detail Grid */}
          <View style={{ gap: 10, marginTop: 12 }}>
            {/* Location */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location" size={20} color="#7C3AED" />
              <Text style={{
                marginLeft: 12,
                color: '#5B21B6',
                fontSize: 15,
                fontWeight: '600',
                letterSpacing: -0.3
              }}>
                {location}
              </Text>
            </View>

            {/* Salary */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="cash-fast" size={22} color="#10B981" />
              <Text style={{
                marginLeft: 12,
                color: '#065F46',
                fontSize: 16,
                fontWeight: '700',
                transform: [{ skewX: '-5deg' }]
              }}>
                {salary} <Text style={{ fontSize: 12, fontWeight: '500' }}>/month</Text>
              </Text>
            </View>

            {/* Bookmark (with Text) */}
            <TouchableOpacity 
              onPress={onBookmarkPress}
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
            >
              <MaterialCommunityIcons
                name={isBookmarked ? 'bookmark-check' : 'bookmark-plus-outline'}
                size={24}
                color={isBookmarked ? '#10B981' : '#4C1D95'}
              />
              <Text style={{
                marginLeft: 10,
                color: isBookmarked ? '#10B981' : '#4C1D95',
                fontSize: 15,
                fontWeight: '600'
              }}>
                {isBookmarked ? 'Saved' : 'Save Job'}
              </Text>
            </TouchableOpacity>

            {/* Contact */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              borderRadius: 12,
              padding: 12,
              marginTop: 8
            }}>
              <MaterialCommunityIcons
                name="phone-in-talk"
                size={20}
                color="#7C3AED"
              />
              <Text style={{
                marginLeft: 12,
                color: '#5B21B6',
                fontSize: 15,
                fontWeight: '600'
              }}>
                {phonedata}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default JobCard;
