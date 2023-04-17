import { View, Text, TextInput, StyleSheet, Button, Alert, SectionList, ScrollView } from "react-native"
import { useState } from "react"
import ShowMatriz from "./ShowMatriz"

const GaussJordanFinitos = () => {

    const [matriz, setMatriz] = useState()
    const [matrizObj, setMatrizObj] = useState()
    const [campo, setCampo] = useState()
    const [showResult, setShowResult] = useState(false)
    const [det, setDet] = useState()
    const [adjunta, setAdj] = useState()
    const [inversa, setInversa] = useState()

    const sliceMatriz = (text) => {
        if(text){
            //hace un array de un texto quitando los espacios
            text = text.trim()
            let textObj = text.split(' ')

            //separar el array por filas buscando el salto de linea
            let whitoutlinejump = []
            let MatrizObj = []
            textObj.map(element => { // iteramos todos los elementos
                if(element.includes('\n')){ // buscamos el salto de linea
                    let firstNumber = [...element[0]] // si se encuentra hacemos el texto un array y usamos el primer elemento
                    whitoutlinejump.push(Number(firstNumber)) // lo metemos a una variable temporal
                    MatrizObj.push(whitoutlinejump.flat()) // lo aplanamos [1, 2 ,[3]] -> [1, 2, 3]
                    whitoutlinejump = [Number(...element[2])] // sacamos el otro numero despues del salto de linea y lo ponemos como el siguiente inicio 
                }else{
                    whitoutlinejump.push(Number(element)) // por si no lo encontramos el salto de linea 
                }   
            })
            MatrizObj.push(whitoutlinejump)
            setMatrizObj(MatrizObj)
            return MatrizObj
        }else{
            Alert.alert('Matriz Requerida', 'Inotroduce la matriz o lloro')
        }
    }
    
    function detGFp(matrix, p) {
        const n = matrix.length;
        if (n === 1)
            return mod(matrix[0][0], p);
        if(n === 2)
            return mod((mod(matrix[0][0]*matrix[1][1],p)-mod(matrix[0][1]*matrix[1][0],p)),p)
        let det = 0;
        for (let j = 0; j < n; j++) {
            const sign = ((j % 2) === 0) ? 1 : -1;
            const cofactor = sign * detGFp(minorGFp(matrix, 0, j), p);
            const term = mod(cofactor * matrix[0][j], p);
            det = mod(det + term, p);
        }
        return det;
      }
      

    function adjGFp(matrix, p) {
        const n = matrix.length;
        const adj = [];
        for (let i = 0; i < n; i++) {
            adj[i] = [];
            for (let j = 0; j < n; j++) {
                const sign = ((i + j) % 2 === 0) ? 1 : -1;
                const cofactor = sign * detGFp(minorGFp(matrix, i, j), p);
                adj[i][j] = mod(cofactor, p);
            }
        }
        const adjT = [];
        for (let i = 0; i < n; i++) {
            adjT[i] = [];
            for (let j = 0; j < n; j++) {
                adjT[i][j] = adj[j][i];
            }
        }
        return adjT;
      }
       
      
      //funciona saca la matriz mas pequena
    function minorGFp(matrix, row, col) {
        const n = matrix.length;
        const minor = [];
        for (let i = 0; i < n - 1; i++) {
            minor[i] = [];
            for (let j = 0; j < n - 1; j++) {
                const r = i < row ? i : i + 1;
                const c = j < col ? j : j + 1;
                minor[i][j] = parseInt(matrix[r][c]);
            }
        }
        return minor;
      }
    
    //Si funciona esta 
    function mod(numero, campo) {
        const resultado = numero % campo;
        return resultado >= 0 ? resultado : resultado + campo;
    }

    function extend_euclid(det, mod) {
        if (det === 0) {
          return [mod, 0, 1];
        } else {
          const [gcd, x, y] = extend_euclid(mod % det, det);
          return [gcd, y - Math.floor(mod / det) * x, x];
        }
      }  

    function inv(matrix, p) {
        const det = detGFp(matrix, p);
        const gcdResult = extend_euclid(det, p);
        const gcd = gcdResult[0];
        const x = gcdResult[1];
        if (gcd !== 1) {
            Alert.alert('ERROR', `Funcion Inversa(Matriz, campo): Algo fallo en encontrar el inverso multiplicativo del: ${gcd}`)
            return [];
        }
        const inv_det = mod(x, p);
        const adj = adjGFp(matrix, p);
        const inv_key = adj.map(row => row.map(cell => mod(cell * inv_det, p)));
        return inv_key;
      }
      
    
    const MatrizInv = () => {
        setShowResult(false)
        try {
            setDet(detGFp(sliceMatriz(matriz), campo))
            setAdj(adjGFp(sliceMatriz(matriz), campo))
            setInversa(inv(sliceMatriz(matriz), campo))
            if(det && adjunta && inversa && matrizObj)
                setShowResult(true)
        } catch (error) {
            Alert.alert('Algo salio mal', 'Asegurate de haber llenado todos los campos con el formato correcto, si todo esta bien, reza y vuelve a intentarlo xd')
            Alert.alert('El error por si le entiendes', String(error))
        }
    }

    return(
        <ScrollView>
            <TextInput multiline={true} numberOfLines={10} onChangeText={e => setMatriz(e)} style={styles.inputArea} value={matriz} placeholder="Matriz" keyboardType="numeric" returnKeyType="none"/>
            <TextInput placeholder="Campo" onChangeText={e => setCampo(Number(e))} value={campo} style={styles.campoInput} keyboardType="numeric"/>
            <Button title="Calcular" color={'black'} onPress={() => MatrizInv()}/>
            <View>
                {showResult &&
                <ScrollView horizontal={true}>
                    <View style={styles.result}>
                        <Text>det(M) = {det == 0 ? 'Es 0 Compa aguas que no hay inversa' : det}</Text>
                        <View style={styles.showMatriz}>
                            <Text>M = </Text>
                            <ShowMatriz matriz={matrizObj}/>
                        </View>
                        <View style={styles.showMatriz}>
                            <Text>adj(M) = </Text>
                            <ShowMatriz matriz={adjunta}/>
                        </View>
                        <View style={styles.showMatriz}>
                            <Text>inv(M) = </Text>
                            <ShowMatriz matriz={inversa}/>
                        </View>
                    </View>
                </ScrollView>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputArea: {
        borderColor: '#000',
        borderWidth: 1,
        textAlignVertical: "top",
        padding: 5
    },
    showMatriz: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    campoInput: {
        borderColor: '#000',
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 5 
    },
    result: {
        padding: 5,
        paddingTop: 10,
    }
})

export default GaussJordanFinitos