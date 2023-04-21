import { NavigationContainer } from '@react-navigation/native';
import useRoute from '../router';

const Main = () => {
  const routing = useRoute(true);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
