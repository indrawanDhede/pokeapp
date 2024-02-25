import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import InformationSection from './InformationSection';
import StatSection from './StatSection';
import AbilitiesSection from './AbilitiesSection';
import {Colors} from '../../../themes/Colors';

const renderScene = SceneMap({
  Information: props => (
    <InformationSection {...props} data={props.route.data} />
  ),
  Stats: props => <StatSection {...props} data={props.route.data} />,
  Abilities: props => <AbilitiesSection {...props} data={props.route.data} />,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.renderTab}
    tabStyle={styles.widthTab}
    renderLabel={({route, focused}) => (
      <Text style={styles.color(focused)}>{route.title}</Text>
    )}
  />
);

const DetailTab = ({data}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {key: 'Information', title: 'Information', data},
    {key: 'Stats', title: 'Stats', data},
    {key: 'Abilities', title: 'Abilities', data},
  ]);

  React.useEffect(() => {
    setRoutes([
      {key: 'Information', title: 'Information', data},
      {key: 'Stats', title: 'Stats', data},
      {key: 'Abilities', title: 'Abilities', data},
    ]);
  }, [data]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default DetailTab;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Colors.gray5,
  },
  renderTab: {
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  widthTab: {width: 'auto'},
  color: focused => ({
    color: focused ? Colors.gray5 : Colors.gray1,
    paddingHorizontal: 20,
  }),
  renderRoute: {paddingTop: 8},
  tabView: {backgroundColor: Colors.white},
});
