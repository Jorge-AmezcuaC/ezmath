import { View, Text, StyleSheet, TextInput, Button } from "react-native"
import { useState } from "react"
import Multiplicativo from "./Multiplicativo"
import Aditivo from "./Aditivo"

const Modulo = ({route}) => {

    const [CalcExpres, setCalcExpres] = useState({
        num1: '',
        num2: '',
        result: ''
    })
    const [Inverso, setInverso] = useState({
        numero: '',
        modulo: '',
        resultadoEsperado: 1,
        result: '',
    })


    return(
        <View>
            <View>
                <Text>{route.params.title}</Text>
                <Text>{route.params.desc}</Text>
            </View>
            <View>
                <Text>Calculadora de expresiones</Text>
                <TextInput style={styles.input} value={CalcExpres.num1} onChangeText={e => setCalcExpres({...CalcExpres, num1: e})}/>
                <Text>%</Text>
                <TextInput style={styles.input} value={CalcExpres.num2} onChangeText={e => setCalcExpres({...CalcExpres, num2: e})}/>
                <Text>Resultado: {CalcExpres.result}</Text>
                <Button color={'black'} title="Evaluar" onPress={() => setCalcExpres({...CalcExpres, result: eval(eval(CalcExpres.num1)%CalcExpres.num2)})}/>
            </View>
            <View>
                <Text>Calculadora con Numero esperado</Text>
                <Text>Numero:</Text>
                <TextInput style={styles.input} value={Inverso.numero} onChangeText={e => setInverso({...Inverso, numero: e})}/>
                <Text>Modulo o Aritmetica:</Text>
                <TextInput style={styles.input} value={Inverso.modulo} onChangeText={e => setInverso({...Inverso, modulo: e})}/>
                <Text>Resultado Esperado:</Text>
                <TextInput defaultValue="1" style={styles.input} onChangeText={e => setInverso({...Inverso, resultadoEsperado: e})}/>
                <Text>Resultado: {Inverso.result}</Text>
                <Button color={'black'} title="Multiplicativo" onPress={() => setInverso({...Inverso, result: Multiplicativo(Inverso.numero, Inverso.modulo, Inverso.resultadoEsperado)})}/>
                <Button color={'black'} title="Aditivo" onPress={() => setInverso({...Inverso, result: Aditivo(Inverso.numero, Inverso.modulo, Inverso.resultadoEsperado)})}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 0,
    }
})

export default Modulo