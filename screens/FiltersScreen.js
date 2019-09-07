import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FiltersSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch value={props.state} onValueChange={props.onChange} 
            trackColor={{ true: Colors.primaryColor }} thumbColor={ Platform.OS === 'android' ? Colors.accentColor : ''}/>
        </View>
    );
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setisGlutenFree] = useState(false);
    const [isLactosFree, setisLactosFree] = useState(false);
    const [isVegan, setisVegan] = useState(false);
    const [isVegetarian, setisVegetarian] = useState(false);

    const dispatch = useDispatch();

    // only recreated when its dependency change, it is cached by react (useCallback hook)
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            gluetenFree: isGlutenFree,
            lactosFree: isLactosFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }

        dispatch(setFilters(appliedFilters));
    }, [isVegetarian, isVegan, isGlutenFree, isLactosFree, dispatch])

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Avaiable Filters / Restrictions</Text>
            <FiltersSwitch label="Glueten-free" state={isGlutenFree} onChange={newValue => setisGlutenFree(newValue)} />
            <FiltersSwitch label="Lactos-free" state={isLactosFree} onChange={newValue => setisLactosFree(newValue)} />
            <FiltersSwitch label="Vegan" state={isVegan} onChange={newValue => setisVegan(newValue)} />
            <FiltersSwitch label="Vegetarian" state={isVegetarian} onChange={newValue => setisVegetarian(newValue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Menu" iconName="ios-menu" onPress={() => { navData.navigation.toggleDrawer() }} />
                    </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>)
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
});

export default FiltersScreen;