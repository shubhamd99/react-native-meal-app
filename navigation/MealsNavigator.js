import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMeal';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor
    },
    headerTitleStyle: { fontFamily: 'open-sans' },
    headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white'
};

const defaultFavNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? '' : Colors.accentColor
    },
    headerTitleStyle: { fontFamily: 'open-sans' },
    headerTintColor: Platform.OS === 'ios' ? Colors.accentColor : 'white'
};

const MealsNavigator = createStackNavigator({
        Categories: { 
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories'
            }
        },
        CategoryMeals: { 
            screen: CategoryMealScreen,
        },
        MealDetail: { 
            screen: MealDetailScreen
        },
    },
    {
    // mode: 'modal', // modal transition effect
    // initialRouteName: 'Categories', // Change First Screen
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDetailScreen,
}, {
    defaultNavigationOptions: defaultFavNavOptions
})

const tabScreenConfig = {
    Meals: { 
        screen: MealsNavigator, navigationOptions: { 
            tabBarIcon: (tabInfo) =>  { return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} /> },
            tabBarColor: Colors.primaryColor
        },
    },
    Favourites: { 
        screen: FavNavigator, navigationOptions: {
            tabBarLabel: 'Favourites!', tabBarIcon: (tabInfo) => { return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} /> },
            tabBarColor: Colors.accentColor
        }
    }
}

// combined multiple navigator
const MealsFavTabNavigator = Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabScreenConfig, { activeTintColor: 'white', shifting: true,
    // barStyle: { backgroundColor: Colors.primaryColor } // if shifting (ripple effect) is false 
}) 
: createBottomTabNavigator({ tabScreenConfig }, { tabBarOptions: { activeTintColor: Colors.accentColor, labelStyle: { fontFamily: 'open-sans' } } })


const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},{
    // navigationOptions: { drawerLabel: 'Filters' },
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealFav: { screen: MealsFavTabNavigator, navigationOptions: { drawerLabel: 'Meals' } },
    Filters: FiltersNavigator
}, {
    contentOptions: { activeTintColor: Colors.accentColor, labelStyle: { fontFamily: 'open-sans' } }
});

export default createAppContainer(MainNavigator);
