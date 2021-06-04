import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({turnos, setTurnos, guardarMostrarForm}) => {
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit'}
        guardarFecha(date.toLocaleDateString('es-ES', opciones))

        hideDatePicker();
    };


    // muestra u oculta el timepicker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        const opciones = { hour: 'numeric', minute: '2-digit'};
        guardarHora(hora.toLocaleString('en-US', opciones))
        hideTimePicker();
    };

    // crear nuevo turno
    const crearNuevoTurno = () => {
        //validar
        if(paciente.trim() === '' || 
            propietario.trim() === '' || 
            telefono.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' ||
            sintomas.trim() === ''){
                //falla validacion
                mostrarAlerta();
                return;
            }
        // crear un nuevo turno si pasa validacion
        const turno = { paciente, propietario, telefono, fecha, hora, sintomas };
        turno.id = shortid.generate();

        // console.log(turno);

        // agregar al state
        const turnoNuevo = [...turnos, turno];
        setTurnos(turnoNuevo);

        // ocultar el formulario
        guardarMostrarForm(false)
        // resetear el formulario
    }

    // muestra alerta si falla validacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //titulo
            'Falta completar alguna opcion, por favor asegurate de revisar todos los campos', //mensaje
            [{
                text:'Entendido' //texto de boton
            }]
        )
    }

    return (
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {'Nombre de la mascota'}
                    onChangeText={ texto => guardarPaciente(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Dueño:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {'Nombre del dueño'}
                    onChangeText={ texto => guardarPropietario(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Telefono de contacto:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={ texto => guardarTelefono(texto)}
                    keyboardType='numeric'
                />
            </View>

            <View>
                <Text style={styles.label}>Fecha:</Text>
                <Button title="Seleccionar fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                />
                <Text>
                    {fecha}
                </Text>
            </View>

            <View>
                <Text style={styles.label}>Hora:</Text>
                <Button title="Seleccionar horario" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                />
                <Text>
                    {hora}
                </Text>
            </View>

            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <TextInput
                    multiline
                    style={styles.inputDescriptivo}
                    onChangeText={ texto => guardarSintomas(texto)}
                />
            </View>

            <View>
                <TouchableHighlight onPress={() => crearNuevoTurno()} style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Guardar </Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
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
        marginTop: 5,
        marginBottom: 10,
    },
    inputDescriptivo: {
        backgroundColor: '#fff',
        borderRadius:  10,
        borderColor: '#ededed',
        borderWidth: 2,
        fontSize: 18
    },
    input: {  
        height: 50,
        backgroundColor: '#fff',
        borderRadius:  10,
        borderColor: '#ededed',
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 18
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#1C8E01',
        marginTop: 10,
        marginBottom: 40,
        borderRadius: 5
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Formulario;