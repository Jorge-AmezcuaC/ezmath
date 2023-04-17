import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Options from "./Options";
import options from './optionsObject'

const Home = ({navigation}) => {
    return(
        <SafeAreaView>
            <Text style={styles.title}>Programas</Text>
            <FlatList 
                data={options} 
                renderItem={({item}) => <Options option={item} navigation={navigation}/>} 
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        padding: 10
    },
})

export default Home