import React, {useCallback, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorView, LoadingView} from '../../components';
import CardItem from '../../components/molecules/CardItem';
import Header from '../../components/molecules/Header';
import {
  fetchPokemon,
  selectAllPokemon,
  selectError,
  selectStatus,
} from '../../libs/redux/pokemon';
import {useThemes} from '../../themes/ThemeProvider';

const HomePage = () => {
  const {theme} = useThemes();
  const dispatch = useDispatch();
  const pokemonList = useSelector(selectAllPokemon);
  const totalData = useSelector(state => state.pokemon.totalData);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      dispatch(fetchPokemon({limit: 25, offset: 0}));
    }
  }, [dispatch, pokemonList]);

  const handleEndReached = useCallback(
    e => {
      if (
        e.distanceFromEnd === 0 &&
        status !== 'loading' &&
        pokemonList.length <= totalData
      ) {
        dispatch(fetchPokemon({limit: 25, offset: pokemonList.length}));
      }
    },
    [dispatch, pokemonList.length, status, totalData],
  );

  const handleRetry = () => {
    dispatch(fetchPokemon({limit: 25, offset: 0}));
  };

  if (status === 'failed') {
    return <ErrorView error={error} handleRetry={handleRetry} />;
  }

  return (
    <SafeAreaView style={styles.container(theme)}>
      <Header title={`PokeApp`} name={`Indrawan`} />
      {pokemonList.length < 25 ? (
        <LoadingView />
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CardItem item={item} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0}
          initialNumToRender={25}
          maxToRenderPerBatch={50}
          windowSize={75}
          updateCellsBatchingPeriod={100}
          scrollEventThrottle={16}
          decelerationRate="fast"
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          ListFooterComponent={status === 'loading' ? <LoadingView /> : null}
        />
      )}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.COLOR_GRAY_NAVY,
  }),
});
