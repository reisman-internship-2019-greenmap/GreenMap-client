import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {ListItem, Avatar} from 'react-native-elements';




class ResultsView extends Component {
  render() {
      console.log(`In results and result is ${this.props.resultDoc}`)
      return (
          <View style={{flex:1, justifyContent: "center"}}>
              { !isNaN(this.props.resultDoc) ? 
              <ResultFailure statusCode={this.props.resultDoc}/> :
              this.props.resultDoc === "The connection timed out" ?
              <View><Text>The connection timed out</Text></View> :
              this.props.resultDoc === "none recieved yet" ?
              <View><Text style={styles.text}>Loading results</Text></View> :
              <ResultSuccess result={this.props.resultDoc} /> 
              }
            </View>
      )}
}

const ResultFailure = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Oops!</Text>
            <Text>The server returned a status code of {props.statusCode}</Text>
        </View>
    )
}

const ResultSuccess = (props) => {
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
        }
    ]
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
            {props.result.doc.ESG !== null ? 
             <Text style={styles.mainRes}>{props.result.doc.ESG}</Text> :
             <Text style={styles.notFound}>ESG not found</Text>}
            <Text style={styles.usrProduct}>{props.result.doc.name}</Text>
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

    notFound: {
        fontSize: responsiveFontSize(5),
        fontFamily: "Raleway-Extra-Bold",
        color: "#E24747",
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