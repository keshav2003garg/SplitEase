import React from 'react';
import { View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';

export default function Charts() {
  const series = [123, 32, 123, 789, 1000]
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
  return (
    <View className='flex-1 justify-center items-center'>
      <PieChart widthAndHeight={250} series={series} sliceColor={sliceColor} doughnut={true} coverRadius={0.45} coverFill={'#FFFFFF'} />
    </View>
  )
}