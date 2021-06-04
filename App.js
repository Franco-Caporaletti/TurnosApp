import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Platform } from 'react-native';
import Formulario from './components/Formulario';
import Turno from './components/Turno';

const App = () => {
  const [mostrarform, guardarMostrarForm] = useState(false);


  //definir el state de turnos

  const [turnos, setTurnos] = useState([
    // { id: "1", paciente: "Chorizo", propietario: "Franco", sintomas: "No quiere caminar"},
    // { id: "2", paciente: "Riley", propietario: "Logan", sintomas: "No quiere comer"},
    // { id: "3", paciente: "Chop", propietario: "Franklin", sintomas: "Llora"},
  ]);

  //elimina los pacientes del state
  const eliminarPaciente = id => {
    setTurnos( (turnosActuales) => {
      return turnosActuales.filter( turno => turno.id !== id )
    })
  }


  //muestra o oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  }

  
  return (

      <View style={styles.contenedorTitulo}>
        

        <Text style={styles.titulo}>Administrador de turnos</Text>

        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarform ? 'Cancelar' : 'Crear nuevo turno'} </Text>
          </TouchableHighlight>      
        </View>

        <View style={styles.contenido}>
          {mostrarform ? (
            <>
            <Text style={styles.subTitulo}>Crear nuevo turno</Text>
            <Formulario 
              turnos={turnos}
              setTurnos={setTurnos}
              guardarMostrarForm={guardarMostrarForm}
            />
            </>
          ) : (
            <>
              <Text style={styles.subTitulo}>{turnos.length > 0 ? 'Gestiona tus turnos' : 'No hay turnos, asigne uno nuevo'}</Text>
              <FlatList 
                style={styles.listado}
                data={turnos}
                renderItem={ ({item}) => <Turno item={item} eliminarPaciente={eliminarPaciente} /> }
                keyExtractor={turno => turno.id}
              />
            </>
          )}
          
          
        </View>


      </View>

      
  );
};

const styles = StyleSheet.create({
  contenedorTitulo: {
    backgroundColor: '#FCF8FE',
    flex: 1,
  },
  titulo: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  subTitulo: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  contenido: {
    flex: 1,
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
    margin: 10,
    padding: 10,
    backgroundColor: '#12AFB4',
    borderRadius: 5
  },
  textoMostrarForm: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18
  }
});

export default App;
