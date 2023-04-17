const Multiplicativo = (numero, modulo, resultadoEsperado) => {
    let resultado = Number(numero), contador = 0
    if((modulo % numero) == 0)
        return 'Aguas que eso no se puede (numero%modulo)=0'
    while(true){
        contador++
        if((resultado % modulo) == resultadoEsperado)
            return contador
        resultado += Number(numero)
        if(contador > 20000)
            return 'El contador paso de 20000 iteraciones casi se muere el cel bro xd (NO LE ENCONTRE EL INVERSO GLU GLU GLU)'
    }
}

export default Multiplicativo