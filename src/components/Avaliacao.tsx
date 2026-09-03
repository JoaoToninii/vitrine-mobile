import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CORES } from "@/constants/tema";

interface AvaliacaoProps {
  rating: number;
}

export function Avaliacao({ rating }: AvaliacaoProps) {
  // Arredonda para definir a quantidade de estrelas cheias (1 a 5)
  const estrelasPreenchidas = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <View style={styles.container} accessibilityLabel={`Avaliação: ${rating.toFixed(1)} de 5 estrelas`}>
      <View style={styles.estrelasContainer}>
        {[1, 2, 3, 4, 5].map((estrela) => (
          <Text
            key={estrela}
            style={[
              styles.estrela,
              estrela <= estrelasPreenchidas ? styles.estrelaCheia : styles.estrelaVazia,
            ]}
          >
            ★
          </Text>
        ))}
      </View>
      <Text style={styles.notaTexto}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  estrelasContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  estrela: {
    fontSize: 16,
    marginRight: 1,
  },
  estrelaCheia: {
    color: "#FBBF24", // Amarelo/dourado vibrante
  },
  estrelaVazia: {
    color: "#475569", // Cinza suave para estrelas vazias
  },
  notaTexto: {
    color: CORES.textoSuave,
    fontSize: 13,
    fontWeight: "600",
  },
});
