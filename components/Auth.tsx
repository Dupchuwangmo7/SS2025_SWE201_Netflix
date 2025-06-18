import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, ScrollView } from 'react-native'
import { supabase } from '../lib/supabase'
import { Input, Button } from '@rneui/themed'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Netflix</Text>

      <Input
        label="Email"
        labelStyle={styles.label}
        inputStyle={styles.input}
        leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
        placeholder="email@address.com"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Input
        label="Password"
        labelStyle={styles.label}
        inputStyle={styles.input}
        leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button
        title="Sign in"
        disabled={loading}
        onPress={signInWithEmail}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Sign up"
        disabled={loading}
        onPress={signUpWithEmail}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 60, 
  },
  label: {
    color: 'white',
  },
  input: {
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 6,
  },
  buttonContainer: {
    marginVertical: 10,
  },
})
