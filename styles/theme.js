import colors from "./colors";

export default {
  colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  font: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    bold: "700",
    regular: "400",
    title: {
      size: 18,
      weight: "500", // softer than bold
    },
    cardTitle: {
      size: 16,
      weight: "600",
    },
  },
  shadow: {
    card: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};