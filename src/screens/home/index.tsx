import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../Components/Participant";
import React, { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handlePaticipantAdd() {
// return console.log("Entrou na condição de que o participante existe!", '(handleParticipantAdd)');

    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante com esse nome"
      );
    }
    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handlePaticipantRemove(name: string) {

    // return console.log ("Nome do Usuário =>", name);

    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant!== name))
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);


  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.eventDate}>Sexta, 26 de fevereiro de 2023.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        <>
          <TouchableOpacity style={styles.button} onPress={handlePaticipantAdd}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handlePaticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpytText}>
            Ningém chegou ao evento ainda? Adicione participantes a sua lista de
            presença.
          </Text>
        )}
      />
    </View>
  );
}
