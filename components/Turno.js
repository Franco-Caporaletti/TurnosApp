import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Turno = ({item, eliminarPaciente }) => {

    const dialogoEliminar = id => {
        console.log('eliminando...', id);
        eliminarPaciente(id)
    }

    return (
       <View style={styles.turno}>
            <View>
                <Text style={styles.label}>Paciente: </Text>  
                <Text style={styles.texto}>{item.paciente}</Text>
            </View>

            <View>
                <Text style={styles.label}>Propietario: </Text>  
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>

            <View>
                <Text style={styles.label}>Sintomas: </Text>  
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>

            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar </Text>
                </TouchableHighlight>
            </View>
       </View>
      );
}

const styles = StyleSheet.create({
    turno: {
        backgroundColor: '#fff',
        borderRadius:  15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: '#CD0A0A',
        marginTop: 10,
        borderRadius: 5
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Turno