import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPokemon,
  selectAllPokemon,
  selectStatus,
} from '../../libs/redux/pokemon';
import {SvgCssUri} from 'react-native-svg/css';
import {useThemes} from '../../themes/ThemeProvider';
import {LoadingView} from '../../components';
import {Colors} from '../../themes/Colors';
import {generatePercenWidth} from '../../themes/Sizes';

const ComparePokemon = () => {
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  const openDialog = identifier => {
    if (identifier === 'modal1') {
      toggleModal1();
    } else if (identifier === 'modal2') {
      toggleModal2();
    } else if (identifier === 'modal3') {
      toggleModal3();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedPokemonSection}>
        <SelectedPokemonComponent
          selectedPokemon={selectedPokemon1}
          setSelectedPokemon={setSelectedPokemon1}
          isModalVisible={isModalVisible1}
          toggleModal={toggleModal1}
          openDialog={() => openDialog('modal1')}
          identifier="modal1"
        />

        <SelectedPokemonComponent
          selectedPokemon={selectedPokemon2}
          setSelectedPokemon={setSelectedPokemon2}
          isModalVisible={isModalVisible2}
          toggleModal={toggleModal2}
          openDialog={() => openDialog('modal2')}
          identifier="modal2"
        />
      </View>

      <ChartComparisonComponent
        selectedPokemon1={selectedPokemon1}
        selectedPokemon2={selectedPokemon2}
      />

      <DialogPokemonComponent
        selectedPokemon1={selectedPokemon1}
        selectedPokemon2={selectedPokemon2}
        setSelectedPokemon1={setSelectedPokemon1}
        setSelectedPokemon2={setSelectedPokemon2}
        isModalVisible={isModalVisible3}
        toggleModal={toggleModal3}
        openDialog={() => openDialog('modal3')}
        identifier="modal3"
      />
    </View>
  );
};

export default ComparePokemon;

const SelectedPokemonComponent = ({
  selectedPokemon,
  setSelectedPokemon,
  isModalVisible,
  toggleModal,
  openDialog,
  identifier,
}) => {
  return (
    <TouchableOpacity
      style={styles.selectedPokemonContainer}
      onPress={() => openDialog(identifier)}>
      <ModalSelectedComponent
        visible={isModalVisible}
        toggleModal={toggleModal}
        setSelected={setSelectedPokemon}
        identifier={identifier}
      />

      {selectedPokemon ? (
        <>
          <Text style={styles.selectedPokemonName}>{selectedPokemon.name}</Text>
          <SvgCssUri width="80" height="80" uri={`${selectedPokemon.image}`} />
        </>
      ) : (
        <Text>Select Pokemon</Text>
      )}
    </TouchableOpacity>
  );
};

const ModalSelectedComponent = ({visible, toggleModal, setSelected}) => {
  const pokemonList = useSelector(selectAllPokemon);

  const handleSelect = pokemon => {
    setSelected(pokemon);
    toggleModal();
  };

  return (
    <Modal isVisible={visible} useNativeDriver={true}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {pokemonList?.map(list => {
          return (
            <TouchableOpacity
              onPress={() => handleSelect(list)}
              key={list.name}
              style={{padding: 20}}>
              <Text style={{color: 'black'}}>{list.name}</Text>
            </TouchableOpacity>
          );
        })}

        <Button title="Hide modal" onPress={() => toggleModal()} />
      </ScrollView>
    </Modal>
  );
};

const ChartComparisonComponent = ({selectedPokemon1, selectedPokemon2}) => {
  if (selectedPokemon1 && selectedPokemon2) {
    return (
      <View style={styles.chartContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Chart</Text>
        </View>
        <ChartComponent
          pokemon1={selectedPokemon1.stats.hp}
          title="HP"
          pokemon2={selectedPokemon2.stats.hp}
        />
        <ChartComponent
          pokemon1={selectedPokemon1.stats.attack}
          title="ATTACK"
          pokemon2={selectedPokemon2.stats.attack}
        />
        <ChartComponent
          pokemon1={selectedPokemon1.stats.defense}
          title="DEFENSE"
          pokemon2={selectedPokemon2.stats.defense}
        />
        <ChartComponent
          pokemon1={selectedPokemon1.stats.specialAttack}
          title="SPECIAL ATTACK"
          pokemon2={selectedPokemon2.stats.specialDefense}
        />
        <ChartComponent
          pokemon1={selectedPokemon1.stats.speed}
          title="SPEED"
          pokemon2={selectedPokemon2.stats.speed}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.chartContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text>Select two Pokemon to compare</Text>
      </View>
    );
  }
};

const DialogPokemonComponent = ({
  selectedPokemon1,
  selectedPokemon2,
  setSelectedPokemon1,
  setSelectedPokemon2,
  isModalVisible,
  toggleModal,
  openDialog,
  identifier,
}) => {
  console.log('dialog', identifier);
  return (
    <TouchableOpacity
      style={styles.showListButton}
      onPress={() => openDialog(identifier)}>
      <Text>Show Pokemon List</Text>
      <ModalDialogComponent
        selectedPokemon1={selectedPokemon1}
        selectedPokemon2={selectedPokemon2}
        setSelectedPokemon1={setSelectedPokemon1}
        setSelectedPokemon2={setSelectedPokemon2}
        visible={isModalVisible}
        toggleModal={toggleModal}
      />
    </TouchableOpacity>
  );
};

const ModalDialogComponent = ({
  selectedPokemon1,
  selectedPokemon2,
  setSelectedPokemon1,
  setSelectedPokemon2,
  visible,
  toggleModal,
}) => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(selectAllPokemon);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(fetchPokemon({limit: 25, offset: 0}));
    }
  }, [dispatch, pokemonList]);

  const handleEndReached = useCallback(
    e => {
      if (e.distanceFromEnd === 0 && status !== 'loading') {
        dispatch(fetchPokemon({limit: 25, offset: pokemonList.length}));
      }
    },
    [dispatch, pokemonList.length, status],
  );

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={true}
      style={{backgroundColor: 'white', paddingBottom: 20}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Choose Pokemon
        </Text>
      </View>

      <FlatList
        data={pokemonList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <CardComponen
            item={item}
            selectedPokemon1={selectedPokemon1}
            selectedPokemon2={selectedPokemon2}
            setSelectedPokemon1={setSelectedPokemon1}
            setSelectedPokemon2={setSelectedPokemon2}
            toggleModal={toggleModal}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0}
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        windowSize={25}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        ListFooterComponent={status === 'loading' ? <LoadingView /> : null}
      />
    </Modal>
  );
};

const CardComponen = React.memo(
  ({
    item,
    selectedPokemon1,
    selectedPokemon2,
    setSelectedPokemon1,
    setSelectedPokemon2,
    toggleModal,
  }) => {
    const {theme} = useThemes();

    const handleSelected = pokemon => {
      if (!selectedPokemon1) {
        setSelectedPokemon1(pokemon);
      }

      if (!selectedPokemon2) {
        setSelectedPokemon2(pokemon);
      }

      if (selectedPokemon1 && selectedPokemon2) {
        setSelectedPokemon1(pokemon);
        setSelectedPokemon2(null);
      }

      toggleModal();
    };

    return (
      <TouchableOpacity
        onPress={() => handleSelected(item)}
        activeOpacity={0.7}
        style={styles.containerCard(theme, item.type)}>
        <View>
          <Text style={styles.text}>{item.name.toUpperCase()}</Text>
        </View>
        <SvgCssUri width="100" height="100" uri={`${item.image}`} />
        <Image
          source={require('../../assets/images/Pokeball.png')}
          style={[
            styles.pokeballImage,
            {tintColor: 'rgba(192, 192, 192, 0.5)', zIndex: -1},
          ]}
        />
      </TouchableOpacity>
    );
  },
);

const ChartComponent = ({pokemon1, title, pokemon2}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <View
        style={{
          width: generatePercenWidth(20),
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text>{pokemon1}</Text>
      </View>
      <View
        style={{
          width: generatePercenWidth(40),
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text>{title}</Text>
      </View>
      <View
        style={{
          width: generatePercenWidth(20),
          backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text>{pokemon2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerCard: (theme, color) => ({
    backgroundColor: Colors[color],
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 4,
    borderWidth: 0.5,
    shadowColor: 'black',
    borderColor: 'rgba(0,0,0,0.200)',
  }),
  selectedPokemonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  selectedPokemonContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 16,
    alignItems: 'center',
  },
  selectedPokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedPokemonImage: {
    width: 80,
    height: 80,
  },
  chartContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
  },
  showListButton: {
    padding: 16,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 8,
  },
  pokeballImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    resizeMode: 'contain',
  },
});
