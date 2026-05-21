import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0d1929',
    borderWidth: 1,
    borderColor: 'rgba(0,163,224,0.2)',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  blueCard: {
    borderColor: 'rgba(0,163,224,0.3)',
  },
  highlightCard: {
    backgroundColor: 'rgba(0,163,224,0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#00a3e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    gap: 10,
  },
  highlightIcon: {
    fontSize: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 10,
    color: '#00a3e0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  blueText: {
    color: 'white',
  },
  blueSubtitle: {
    color: '#00a3e0',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  text: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
});