import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { spaceSearchResult } from '../actions';
import * as firebase from 'firebase';


function GrayLine ({ margin }) {
    return (
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />
    )
}

class Inbox extends React.Component {

    _renderItem = ({item}) => (
        <View key={item.id} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch', margin: 5 }}>
            <Ionicons style={{ marginHorizontal: 5 }} name='ios-image' size={50} color='blue' />
            <View style={{flex: 1}}>
                <Text style={{ height: 50, fontSize: 16, fontWeight: 'bold', textAlignVertical: 'center' }}>{`${item.code}: ${item.name}`}</Text>
                
                <GrayLine />

                {Object.values(item.channels).map(channel => (
                    <View key={channel.id}>
                        <View style={{ backgroundColor: '#f5f5f5', paddingVertical: 5 }}>
                            <Text style={{fontWeight: 'bold'}}>{channel.name}</Text>
                            <Text style={{ color: 'gray' }}>{channel.lastMessage}</Text>
                        </View>
                        
                        <GrayLine />
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <MaterialIcons style={{ marginRight: 5 }} name='library-books' size={30} color='lightgray' />
                            <Text style={{ height: 30, textAlignVertical: 'center' }}>Media, Links and Docs</Text>
                        </View>

                        <GrayLine />

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <MaterialIcons style={{ marginRight: 5 }} name='people-outline' size={30} color='lightgray' />
                            <Text style={{ height: 30, textAlignVertical: 'center' }}>Members</Text>
                        </View>

                        <GrayLine />

                    </View>
                ))}

            </View>
        </View>
    )

    componentDidMount() {
        const { spaceSearchResultProp } = this.props;

        firebase.database().ref('spaces').on('value', (snapshot) => {

            const spaces = snapshot.val();

            spaceSearchResultProp(spaces);

            console.log("Users:", spaces);
        });
    }

    render() {
        console.log("props", this.props);

        const spaces = Object.values(this.props.spaces);

        console.log("spaces", spaces);

        return (
        <View style={styles.container}>
            <FlatList data={spaces} renderItem={this._renderItem} keyExtractor={(item) => item.id} />
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

function mapStateToProps(miniaReducer) {
    const { spaces } = miniaReducer;

    return {
        spaces
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spaceSearchResultProp: (spaces) => dispatch(spaceSearchResult(spaces))
    }
}
  
  


export default connect(mapStateToProps, mapDispatchToProps)(Inbox);