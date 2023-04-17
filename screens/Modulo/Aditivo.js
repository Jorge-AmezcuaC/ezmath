const Aditivo = (numero, modulo, resultadoEsperado) => {
    let contador = 0, resultado = Number(numero)
    while (true) {
        contador++
        if((++resultado % modulo) == resultadoEsperado)
            return contador
        if(contador > modulo*3)
            return 'Algo salio mal'
    }
}

export default Aditivo