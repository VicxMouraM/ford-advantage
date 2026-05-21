import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeCustomerScreen from "../screens/HomeCustomerScreen";
import HomeFordScreen from "../screens/HomeFordScreen";
import ComparadorScreen from "../screens/ComparadorScreen";
import ResultadoScreen from "../screens/ResultadoScreen";
import BattleCardScreen from "../screens/BattleCardScreen";
import ArgumentosScreen from "../screens/ArgumentosScreen";
import ObjecoesScreen from "../screens/ObjecoesScreen";
import SimuladorScreen from "../screens/SimuladorScreen";
import QuizScreen from "../screens/QuizScreen";
import QuizResultadoScreen from "../screens/QuizResultadoScreen";
import HistoricoScreen from "../screens/HistoricoScreen";
import FreeSearchScreen from "../screens/FreeSearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { screen } = useApp();

  const screenMap: Record<string, React.ComponentType<any>> = {
    splash: SplashScreen,
    login: LoginScreen,
    "home-customer": HomeCustomerScreen,
    "home-ford": HomeFordScreen,
    comparador: ComparadorScreen,
    resultado: ResultadoScreen,
    battlecard: BattleCardScreen,
    argumentos: ArgumentosScreen,
    objecoes: ObjecoesScreen,
    simulador: SimuladorScreen,
    quiz: QuizScreen,
    "quiz-resultado": QuizResultadoScreen,
    historico: HistoricoScreen,
    "free-search": FreeSearchScreen,
    "search-result": SearchResultScreen,
  };

  const CurrentScreen = screenMap[screen] || SplashScreen;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Ford Advantage" component={CurrentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
