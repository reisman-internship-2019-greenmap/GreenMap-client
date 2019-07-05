import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions, PixelRatio, FlatList } from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {ListItem, Avatar} from 'react-native-elements';
import {PropTypes} from 'prop-types';
import {headerTitle} from '../../utils/CustomNavBar'



var topThree = [
    {
      id: "randomstring1",
      product: "Toshiba AbC 123",
      avTitle: "Ts",
      manufacturer: "Toshiba",
      esg: 9.87
    },
    {
      id: "randomstring2",
      product: "Acer D45 Pro",
      avTitle: "Ac",
      manufacturer: "Acer",
      esg: 6.54
    },
    {
      id: "randomstring3",
      product: "Macbook",
      avTitle: "Ap",
      manufacturer: "Apple",
      esg: 3.21
    }
  ]

class ResultHandler extends Component {
    static propTypes = {
        result: PropTypes.object.isRequired
    }

    render() {
        return (
        <View style={styles.container}>
            {this.props.result.name == "undefined" ? <ResultFailure /> :
          <ResultSuccess result={this.props.result} /> }
        </View>
    )}
}

class ResultSuccess extends Component {
    static propTypes = {
        result: PropTypes.object.isRequired
    }

    renderTopThree = ({item}) => {
        return (
            <ListItem
              id={item.id}
              leftAvatar={<Avatar size={"medium"} title={item.avTitle} activeOpacity={0.7}/>}
              title={item.product}
              subtitle={ `${item.manufacturer}` }
              />
          )
    }

    /**
     * @helper
     * _keyExtractor tells the FlatList component which field
     * of the result should serve as a unique identifier */
    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={styles.subView}>
                <Text style={styles.mainRes}>1.75</Text>
                <Text style={styles.usrProduct}>{this.props.result.name}</Text>
                <Text style={[styles.mainRes, styles.listHeading]}>
                    Top 3 in this category
                </Text>
                <FlatList
                style={styles.topThreeList} 
                data={topThree}
                renderItem={this.renderTopThree}
                keyExtractor={this._keyExtractor}
                />
            </View>
        )}
}

class ResultFailure extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No results returned</Text>
            </View>
        )
    }
}

export default class ResultsView extends Component {

    render() {
        return (
            <View style={{flex:1}}>
                {this.props.resultDoc ? <ResultHandler result={this.props.resultDoc}/> :
            <Text style={styles.text}>Loading Results</Text>}
            </View>
        )}
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#EFEFEF',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
    },

    subView: {
        borderColor: "black",
        borderWidth: 1,
        position: "relative",
        padding: 20,
    },

    mainRes: {
        fontSize: responsiveFontSize(10),
        fontFamily: "Raleway-Extra-Bold",
        color: "#58B34D",
        paddingBottom: 10,
    },
    
    usrProduct: {
        fontSize: responsiveFontSize(3),
        color: "gray",
        fontStyle: "italic",
    },

    listHeading: {
        fontSize: responsiveFontSize(4),
        marginTop: 50,
      },
})