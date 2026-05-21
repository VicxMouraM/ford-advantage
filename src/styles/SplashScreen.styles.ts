import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oval: {
    width: 120,
    height: 54,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  ovalText: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 3,
  },
  title: {
    fontFamily: 'System',
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#00a3e0',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  bar: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 24,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#00a3e0',
    borderRadius: 2,
  },
});