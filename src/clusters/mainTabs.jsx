import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from "react-native-animatable";


import Home from "../screens/MainScreens/Home";
import Charts from "../screens/MainScreens/Charts";
import Activity from "../screens/MainScreens/Activity";
import Account from "../screens/MainScreens/Account";
import { black } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const Tab = createBottomTabNavigator();

const TabArr = [
  {name: 'Home', component: Home, Icon: Feather, icon: 'home'},
  {name: 'Charts', component: Charts, Icon: Feather, icon: 'pie-chart'},
  {name: 'Activity', component: Activity, Icon: Feather, icon: 'activity'},
  {name: 'Account', component: Account, Icon: MI, icon: 'account-box-outline'},
]

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 } });
      textViewRef.current.animate({0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 } });
    } else {
      // viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
      // textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused])

  return(
    <TouchableOpacity activeOpacity={1} style={[{flexDirection: 'row',justifyContent: "center", alignItems: "center"}, {flex: focused ? 1 : 0.7}]} onPress={onPress}>
        <View>
            <Animatable.View ref={viewRef} style={[StyleSheet, { backgroundColor: 'white', borderRadius: 16 }]}>
                <View style={[{flexDirection: 'row',alignItems: 'center',padding: 8, borderRadius: 16,}, { backgroundColor: focused ? null : 'white' }]}>
                    <item.Icon name={props.item.icon} color={focused ? '#03a37e' :  "#5A5A5A"} size={30} />
                    <Animatable.View ref={textViewRef}>{focused && <Text  className='text-black text-[13px] font-[Poppins-Medium] px-2'>{item.name}</Text>}</Animatable.View>
                </View>
            </Animatable.View>
        </View>
    </TouchableOpacity>
  )
}

export default function Main() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {display: `flex`}
    }}>
      {/* {TabArr.map((item, index)=>{
        return(
          <Tab.Screen key={index} name={item.name} component={item.component} options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />
          }} />
        )
      })} */}





      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon:({focused})=>{
          return(
              <View>
                  <Feather name="home" color={focused ? '#03a37e' :  "#5A5A5A"} size={30} />
              </View>
          )
        }
        }} />
      <Tab.Screen name="Charts" component={Charts} options={{
        headerShown: false,
        tabBarIcon:({focused})=>{
          return(
            <View>
              <Feather name="pie-chart"  color={focused ? '#03a37e' :  "#5A5A5A"}  size={30} />
            </View>
          )
        }
        }} />
      <Tab.Screen name="Activity" component={Activity} options={{
        headerShown: false,
        tabBarIcon:({focused})=>{
          return(
            <View>
              <Feather name="activity"  color={focused ? '#03a37e' :  "#5A5A5A"}  size={30} />
            </View>
          )
        }
        }} />
      <Tab.Screen name="Account" component={Account} options={{
        headerShown: false,
        tabBarIcon:({focused})=>{
          return(
            <View>
              <MI name="account-box-outline"  color={focused ? '#03a37e' :  "#5A5A5A"}  size={30} />
            </View>
          )
        }
        }} />
    </Tab.Navigator>
  );
}
