import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Colors} from '../../themes/Colors';

const TextInfoContent = ({title, desc}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View style={{width: 100}}>
        <Text>{title}</Text>
      </View>

      <View style={{flex: 1}}>
        <Text>{desc}</Text>
      </View>
    </View>
  );
};

const InformationView = ({data}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TextInfoContent title="Name" desc={data.name} />
      <TextInfoContent title="Height" desc={data.information.height} />
      <TextInfoContent title="Weight" desc={data.information.weight} />
      <TextInfoContent title="Types" desc={data.type} />
    </View>
  );
};

const StatLine = ({number, color}) => {
  return (
    <View
      style={{
        width: number,
        height: 5,
        marginVertical: 6,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: Colors[color],
      }}
    />
  );
};

const TextStatsContent = ({title, number, color}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View style={{width: 100}}>
        <Text>{title}</Text>
      </View>

      <View style={{width: 50}}>
        <Text>{number}</Text>
      </View>

      <View style={{flex: 1}}>
        <StatLine number={number} color={color} />
      </View>
    </View>
  );
};

const StatsView = ({data}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          marginVertical: 12,
        }}>
        <TextStatsContent title="Hp" number={data.stats.hp} color={data.type} />

        <TextStatsContent
          title="Attack"
          number={data.stats.attack}
          color={data.type}
        />
        <TextStatsContent
          title="Defense"
          number={data.stats.defense}
          color={data.type}
        />
        <TextStatsContent
          title="Sp.Atk"
          number={data.stats.specialAttack}
          color={data.type}
        />
        <TextStatsContent
          title="Sp.Def"
          number={data.stats.specialDefense}
          color={data.type}
        />
        <TextStatsContent
          title="Speed"
          number={data.stats.speed}
          color={data.type}
        />
      </View>
    </View>
  );
};

const AbilitiesView = ({data}) => {
  const [abilityDetails, setAbilityDetails] = React.useState([]);

  React.useEffect(() => {
    const fetchAbilityDetails = async () => {
      const details = await Promise.all(
        data.abilities.map(async abilityData => {
          const abilityResponse = await fetch(abilityData.ability.url);
          const abilityInfo = await abilityResponse.json();
          return abilityInfo;
        }),
      );
      setAbilityDetails(details);
    };

    fetchAbilityDetails();
  }, [data]);

  return (
    <ScrollView>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Ability List
      </Text>
      {abilityDetails.map((ability, index) => (
        <View key={index} style={{marginBottom: 20}}>
          <Text style={{fontWeight: 'bold'}}>Name: {ability.name}</Text>
          <Text>Description: {ability.effect_entries[0].short_effect}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  Information: props => <InformationView {...props} data={props.route.data} />,
  Stats: props => <StatsView {...props} data={props.route.data} />,
  Abilities: props => <AbilitiesView {...props} data={props.route.data} />,
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

export default function DetailTab({data}) {
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
      style={{backgroundColor: 'white'}}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#020202',
  },
  renderTab: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  widthTab: {width: 'auto'},
  color: focused => ({
    color: focused ? '#020202' : '#8D92A3',
    paddingHorizontal: 20,
  }),
  renderRoute: {paddingTop: 8},
  tabView: {backgroundColor: 'white'},
});
