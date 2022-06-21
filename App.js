import React, { useEffect, useState} from 'react';
import { FlatList, SafeAreaView, View, Image, Text, StyleSheet } from 'react-native';

export default function App (){

  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon', {
      method:'GET',
      headers: {
        'Content-type' : 'application/json',       
      },     
    })
    .then(response => response.json())
    .then(data => {
      setPokemons(data.results)
    })
  }, [])

  return(
  <SafeAreaView>
    <FlatList
      data={pokemons}
      keyExtractor={(pokemon) => pokemon.name}
      contentContainerStyle={{flexGrow: 1 }}
      renderItem={PokemonShow}
    />
  </SafeAreaView>
  )
}

function PokemonShow(item){

  const { name, url } = item.item

  const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')

  const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonNumber+'.png'

  return(
    <View style={{ flexDirection: 'row' }}>
      <Image style={{width: 100, height: 100}} source={{ uri: imageUrl}}/>
      <Text fontWeight='bold'>{name}</Text>
    </View>
  )
}
