import {Text, TouchableHighlight, StyleSheet} from "react-native";

const Options = ({option, navigation}) => {
    return(
        <TouchableHighlight onPress={() => navigation.navigate(option.url, option)}>
            <Text  style={styles.optionText}>{option.title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    optionText: {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#000',
        marginHorizontal: 10,
        marginVertical: 3,
        height: 40,
        textAlignVertical: 'center'
    }
})

export default Options