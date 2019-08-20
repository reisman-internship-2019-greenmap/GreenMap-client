import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {ListItem, Avatar} from 'react-native-elements';
import {PropTypes} from 'prop-types';



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
    },
    {
        id: "randomstring4",
        product: "Toshiba AbC 123",
        avTitle: "Ts",
        manufacturer: "Toshiba",
        esg: 9.87
      },
      {
        id: "randomstring5",
        product: "Acer D45 Pro",
        avTitle: "Ac",
        manufacturer: "Acer",
        esg: 6.54
      },
      {
        id: "randomstring6",
        product: "Macbook",
        avTitle: "Ap",
        manufacturer: "Apple",
        esg: 3.21
      }
  ]

// If the server hasn't responded yet, resultDoc is undefined
// If the server has responded with an error, resultDoc contains
//      a single field called "name" which is set to "undefined"
// If the server has responded with a success, resultDoc contains
//      the response data
// I know this is confusing garbage, this component and its reducer
// will be re-factored at some point
class ResultsView extends Component {
  render() {
      return (
          <View style={{flex:1, justifyContent: "center"}}>
              {this.props.resultDoc ? <ResultHandler result={this.props.resultDoc}/> :
          <Text style={styles.text}>Loading Results</Text>}
          </View>
      )}
}

const ResultSuccess = ({props}) => {
    const renderTopThree = ({item}) => {
        return (
            <ListItem
              containerStyle={{backgroundColor: "#EFEFEF"}}
              id={item.id}
              leftAvatar={<Avatar size={"medium"} title={item.avTitle} activeOpacity={0.7}/>}
              title={item.product}
              subtitle={ `${item.manufacturer}` }
              />
          )
    } //end renderTopThree

    const renderItemSeparator = () => (
        <View
            style={{
                backgroundColor: "white",
                height: 1
            }}
        />
    ) //end renderItemSeperator

    const _keyExtractor = (item, index) => item.id;

    return (
        <View style={styles.subView}>
            <Text style={styles.mainRes}>1.75</Text>
            <Text style={styles.usrProduct}>{props.result.name}</Text>
            <Text style={[styles.mainRes, styles.listHeading]}>
                Top in this category
            </Text>
            <FlatList
            style={styles.topThreeList} 
            data={topThree}
            renderItem={renderTopThree}
            keyExtractor={_keyExtractor}
            ItemSeparatorComponent={renderItemSeparator}
            />
        </View>
    )
} //end ResultSuccess


const ResultFailure = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No results returned</Text>
        </View>
    )
} 


export default ResultsView 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: "center"
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
    },

    subView: {
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
        marginTop: 30,
      },
    
    topThreeList: {
        width: responsiveWidth(90)
    },

    listItem: {
        backgroundColor: '#EFEFEF'
    }
})