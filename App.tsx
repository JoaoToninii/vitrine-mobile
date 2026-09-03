import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CardProduto } from "@/components/CardProduto";
import { CORES } from "@/constants/tema";
import { Produto } from "@/types/produto";

const PRODUTOS_INICIAIS: Produto[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "Rímel de grande volume.",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    brand: "Essence",
    category: "beauty",
    thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
    images: [],
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description: "Paleta de sombras com diversas cores.",
    price: 19.99,
    discountPercentage: 15.5,
    rating: 3.8,
    stock: 12,
    brand: "Glamour",
    category: "beauty",
    thumbnail: "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
    images: [],
  },
  {
    id: 3,
    title: "Powder Canister Matte Finish",
    description: "Pó facial de acabamento fosco duradouro.",
    price: 14.99,
    discountPercentage: 10.0,
    rating: 4.2,
    stock: 8,
    brand: "Velvet",
    category: "beauty",
    thumbnail: "https://dummyjson.com/image/i/products/3/thumbnail.jpg",
    images: [],
  },
  {
    id: 4,
    title: "Perfume Oil Elegance",
    description: "Fragrância importada de longa fixação.",
    price: 49.99,
    discountPercentage: 20.0,
    rating: 4.8,
    stock: 3,
    brand: "Dior",
    category: "fragrances",
    thumbnail: "https://dummyjson.com/image/i/products/4/thumbnail.jpg",
    images: [],
  },
  {
    id: 5,
    title: "Batom Matte Vermelho Intenso",
    description: "Batom de alta pigmentação e fixação suave.",
    price: 24.5,
    discountPercentage: 12.0,
    rating: 4.5,
    stock: 15,
    brand: "Essence",
    category: "beauty",
    thumbnail: "https://dummyjson.com/image/i/products/5/thumbnail.jpg",
    images: [],
  },
  {
    id: 6,
    title: "Kit Skincare Hidratação Profunda",
    description: "Sérum e creme hidratante facial intensivo.",
    price: 89.9,
    discountPercentage: 25.0,
    rating: 5.0,
    stock: 7,
    brand: "Dermacare",
    category: "beauty",
    thumbnail: "https://dummyjson.com/image/i/products/6/thumbnail.jpg",
    images: [],
  },
];

export default function App() {
  // Estado da lista de produtos favoritos
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS_INICIAIS);

  // Novo estado para controlar a ordenação (crescente ou decrescente)
  const [ordemCrescente, setOrdemCrescente] = useState<boolean>(true);

  // useWindowDimensions para alternar para 2 cartões por linha quando largura > 600
  const { width } = useWindowDimensions();
  const isDuasColunas = width > 600;

  // Ordena a lista baseado no estado ordemCrescente (utilizando o preço com desconto)
  const produtosOrdenados = useMemo(() => {
    return [...produtos].sort((a, b) => {
      const precoA = a.discountPercentage > 0
        ? a.price * (1 - a.discountPercentage / 100)
        : a.price;
      const precoB = b.discountPercentage > 0
        ? b.price * (1 - b.discountPercentage / 100)
        : b.price;

      return ordemCrescente ? precoA - precoB : precoB - precoA;
    });
  }, [produtos, ordemCrescente]);

  // Função que zera a lista de favoritos
  const handleLimparFavoritos = () => {
    setProdutos([]);
  };

  return (
    <SafeAreaView style={styles.tela}>
      {/* Cabeçalho com título e botão de Limpar Favoritos */}
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.marca}>Vitrine</Text>
          <Text style={styles.contadorTexto}>
            {produtos.length} {produtos.length === 1 ? "produto" : "produtos"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={handleLimparFavoritos}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoLimpar}>Limpar favoritos</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de ações com botão para inverter a ordem de preço */}
      <View style={styles.barraAcoes}>
        <TouchableOpacity
          style={styles.botaoOrdem}
          onPress={() => setOrdemCrescente((prev) => !prev)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoOrdem}>
            Preço: {ordemCrescente ? "Menor → Maior ▲" : "Maior → Menor ▼"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.infoLayout}>
          {isDuasColunas ? "Modo 2 colunas" : "Modo 1 coluna"}
        </Text>
      </View>

      {/* Lista com rolagem e exibição responsiva */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {produtosOrdenados.length === 0 ? (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>A lista de favoritos está vazia.</Text>
            <TouchableOpacity
              style={styles.botaoRestaurar}
              onPress={() => setProdutos(PRODUTOS_INICIAIS)}
              activeOpacity={0.7}
            >
              <Text style={styles.textoBotaoRestaurar}>Restaurar produtos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grid}>
            {produtosOrdenados.map((produto) => (
              <View
                key={produto.id}
                style={[
                  styles.itemGrid,
                  { width: isDuasColunas ? "48.5%" : "100%" },
                ]}
              >
                <CardProduto produto={produto} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
    paddingTop: 48,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  marca: {
    color: CORES.destaque,
    fontSize: 26,
    fontWeight: "bold",
  },
  contadorTexto: {
    color: CORES.textoSuave,
    fontSize: 12,
    marginTop: 2,
  },
  botaoLimpar: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "#EF4444",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoBotaoLimpar: {
    color: "#F87171",
    fontSize: 13,
    fontWeight: "600",
  },
  barraAcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  botaoOrdem: {
    backgroundColor: CORES.superficie,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  textoBotaoOrdem: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: "600",
  },
  infoLayout: {
    color: CORES.textoSuave,
    fontSize: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollConteudo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemGrid: {
    marginBottom: 4,
  },
  vazioContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  vazioTexto: {
    color: CORES.textoSuave,
    fontSize: 16,
    marginBottom: 16,
  },
  botaoRestaurar: {
    backgroundColor: CORES.superficie,
    borderColor: CORES.destaque,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  textoBotaoRestaurar: {
    color: CORES.destaque,
    fontSize: 14,
    fontWeight: "600",
  },
});
