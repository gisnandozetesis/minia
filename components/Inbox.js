import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


class Inbox extends React.Component {

    _renderItem = ({item}) => (
        <View key={item.id} style={{ backgroundColor: '#00ff00', flex: 1, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'flex-start', margin: 5 }}>
            <Ionicons style={{ marginHorizontal: 5 }} name='ios-image' size={50} color='blue' />
            <View style={{backgroundColor: '#FF0000'}}>
                <Text style={{ backgroundColor: '#0000FF', height: 50, fontSize: 16, fontWeight: 'bold', textAlignVertical: 'center' }}>{`${item.code}: ${item.name}`}</Text>


            </View>
        </View>
    )

  render() {
    console.log("props", this.props);

    const spaces = Object.values(this.props.spaces);

    console.log("spaces", spaces);

    return (
      <View style={styles.container}>
        <FlatList data={spaces} renderItem={this._renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps (state) {
    return {
      ...state
    };
  }

export default connect(mapStateToProps)(Inbox);