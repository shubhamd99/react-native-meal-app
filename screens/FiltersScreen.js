import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

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
    const [isGlutenFree, setisGlutenFree] = useState(false);
    const [isLactosFree, setisLactosFree] = useState(false);
    const [isVegan, setisVegan] = useState(false);
    const [isVegetarian, setisVegetarian] = useState(false);

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