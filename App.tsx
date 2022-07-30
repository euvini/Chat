import { StatusBar, NativeBaseProvider } from 'native-base'
import React from 'react';
import { Routes } from './src/routes';


export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  );
}