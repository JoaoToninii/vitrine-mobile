import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { CORES_NAVEGACAO } from '@/constants/tema';

export default function LayoutRaiz() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const cores = CORES_NAVEGACAO[colorScheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    setColorScheme(colorScheme ?? 'light');
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.fundo },
          headerTintColor: cores.destaque,
          headerTitleStyle: { color: cores.texto },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="produto/[id]" options={{ title: 'Detalhe do produto' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
