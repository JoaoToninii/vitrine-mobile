import { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CardProduto } from '@/components/CardProduto';
import { FiltroCategorias } from '@/components/FiltroCategorias';
import { Carregando, Vazio } from '@/components/EstadosDeLista';
import { Produto } from '@/types/produto';
import { PRODUTOS_TESTE } from '@/utils/gerarProdutos';

const CATEGORIAS = ['todas', 'beauty', 'fragrances', 'furniture'];

function Separador() {
  return <View className="h-3" />;
}

export default function CatalogoScreen() {
  const router = useRouter();
  const [categoria, setCategoria] = useState('todas');
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const visiveis = useMemo(
    () =>
      categoria === 'todas'
        ? PRODUTOS_TESTE
        : PRODUTOS_TESTE.filter((p: Produto) => p.category === categoria),
    [categoria]
  );

  const alternarFavorito = useCallback((id: number) => {
    setFavoritos((atuais) =>
      atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id]
    );
  }, []);

  const abrir = useCallback((id: number) => router.push(`/produto/${id}`), [router]);

  const atualizar = useCallback(async () => {
    setAtualizando(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } finally {
      setAtualizando(false);
    }
  }, []);

  const renderizarItem = useCallback(
    ({ item }: { item: Produto }) => (
      <CardProduto
        produto={item}
        favorito={favoritos.includes(item.id)}
        aoAlternarFavorito={alternarFavorito}
        aoAbrir={abrir}
      />
    ),
    [favoritos, alternarFavorito, abrir]
  );

  if (carregando) return <Carregando texto="Buscando produtos..." />;

  return (
    <FlatList
      className="flex-1 bg-white dark:bg-fundo"
      contentContainerClassName="p-4"
      data={visiveis}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderizarItem}
      ListHeaderComponent={
        <View className="mb-4">
          <FiltroCategorias
            categorias={CATEGORIAS}
            selecionada={categoria}
            aoSelecionar={setCategoria}
          />
        </View>
      }
      ListEmptyComponent={<Vazio texto="Nenhum produto nesta categoria." />}
      ItemSeparatorComponent={Separador}
      refreshing={atualizando}
      onRefresh={atualizar}
      showsVerticalScrollIndicator={false}
      initialNumToRender={8}
      windowSize={10}
    />
  );
}
