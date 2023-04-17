import { View, Text, FlatList, StyleSheet } from "react-native";

const ShowMatriz = (props) => {
    const matriz = props.matriz
    return(
        <View>
            <FlatList
                data={matriz.map(row => {
                    return {
                        key: row.toString()+Math.random(),
                        data: row,
                    };
                })}
                renderItem={({ item }) => {
                    const values = item.data.map((value, index) => (
                        <Text key={index.toString()} style={styles.cell}>
                        {value}
                        </Text>
                    ));
                    return <View style={styles.row}>{values}</View>;
                }}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    cell: {
        paddingHorizontal: 5,
        textAlign: 'center',
        borderWidth: 1,
        width: 40
    },
})

export default ShowMatriz