import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CORES } from "@/constants/tema";
import { Produto } from "@/types/produto";
import { Avaliacao } from "./Avaliacao";

interface CardProdutoProps {
  produto: Produto;
  destaque?: boolean;
}

export function CardProduto({ produto, destaque = false }: CardProdutoProps) {
  const temDesconto = typeof produto.discountPercentage === "number" && produto.discountPercentage > 0;
  const precoComDesconto = temDesconto
    ? produto.price * (1 - produto.discountPercentage / 100)
    : produto.price;

  return (
    <View style={[styles.card, destaque && styles.cardDestaque]}>
      <Text style={styles.titulo} numberOfLines={2}>{produto.title}</Text>
      <Text style={styles.categoria}>{produto.category}</Text>

      {/* Componente de avaliação com 1 a 5 estrelas */}
      <Avaliacao rating={produto.rating} />

      {/* Preço com desconto aplicado e preço original riscado */}
      <View style={styles.blocoPreco}>
        {temDesconto && (
          <View style={styles.linhaDesconto}>
            <Text style={styles.precoOriginal}>
              R$ {produto.price.toFixed(2)}
            </Text>
            <View style={styles.tagDesconto}>
              <Text style={styles.textoTag}>
                -{produto.discountPercentage.toFixed(0)}%
              </Text>
            </View>
          </View>
        )}
        <Text style={styles.precoFinal}>
          R$ {precoComDesconto.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CORES.superficie,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flex: 1,
  },
  cardDestaque: {
    borderWidth: 2,
    borderColor: CORES.destaque,
  },
  titulo: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: "600",
  },
  categoria: {
    color: CORES.textoSuave,
    fontSize: 12,
    marginTop: 2,
    textTransform: "capitalize",
  },
  blocoPreco: {
    marginTop: 10,
  },
  linhaDesconto: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  precoOriginal: {
    color: CORES.textoSuave,
    fontSize: 13,
    textDecorationLine: "line-through",
  },
  tagDesconto: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  textoTag: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  precoFinal: {
    color: CORES.destaque,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
  },
});
