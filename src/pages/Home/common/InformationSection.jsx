import {StyleSheet, View} from 'react-native';
import {InfoCard} from '../../../components';
import {Colors} from '../../../themes/Colors';

const InformationSection = ({data}) => {
  return (
    <View style={styles.conatiner}>
      <InfoCard title="Name" desc={data.name} />
      <InfoCard title="Height" desc={data.information?.height} />
      <InfoCard title="Weight" desc={data.information?.weight} />
      <InfoCard title="Types" desc={data.type} />
    </View>
  );
};

export default InformationSection;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
});
