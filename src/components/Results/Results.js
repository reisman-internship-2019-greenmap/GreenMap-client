import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import {ListItem, Avatar} from 'react-native-elements';
import Snail from '../../Images/Snail.png'
import EmptyResult from '../../Images/EmptyResult.png'




class ResultsView extends Component {
  render() {
      // first checks if result is a number, indicating a server error
      // then checks for connection timeout message
      // third, checks if server has even responded yet
      // finally, if all checks pass, renders results
      console.log(`In results and result is ${this.props.result}`)
      return (
          <View style={{flex:1}}>
              { !isNaN(this.props.result) ? 
              <ResultFailure 
                statusCode={this.props.result}
                errMessage={"We couldn't find enough information for that product."}
                errIcon={EmptyResult}
                /> :
              this.props.result === "The connection timed out" ?
              <ResultFailure 
                statusCode={501} 
                errMessage="It looks like the connection timed out. Please check back later."
                errIcon={Snail} 
                /> :
              this.props.result === "none recieved yet" ?
              <View><Text style={styles.text}>Loading results</Text></View> :
              <ResultSuccess result={this.props.result} /> 
              }
            </View>
      )}
}

const ResultFailure = (props) => {
    console.log()
    return (
        <View style={
            {flex: 1, 
            alignItems: "center", 
            backgroundColor: "#EFEFEF"}}>
            <Image source={props.errIcon} style={
                {width: 150, 
                height: 150, 
                alignSelf: "center",
                marginTop: 50}} />
            <Text style={styles.oops}>Oops!</Text>
            <Text style={styles.text}>{props.errMessage}</Text>
        </View>
    )
}

const ResultSuccess = (props) => {
    console.log(`the props to resultSuccess is ${JSON.stringify(props)}`)
    
    const renderTopManus = ({item}) => {
        return (
            <ListItem
              containerStyle={{backgroundColor: "#EFEFEF"}}
              id={item.Company}
              title={`Company: ${item.Company}`}
              subtitle={
                  <View style={{flexDirection: "row"}}>
                      <Text style={styles.subtitle}>Greenscore: </Text>
                      <Text style={styles.greenscore}>{item.greenscore}</Text>
                  </View>
              }
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

    const _keyExtractor = (item, index) => item.Company

    return (
        <View style={styles.subView}>
            {props.result.ESG !== null ? 
             <Text style={styles.mainRes}>{props.result.ESG}</Text> :
             <Text style={styles.notFound}>ESG not found</Text>}
            <Text style={styles.usrProduct}>{props.result.name}</Text>
            <Text style={[styles.mainRes, styles.listHeading]}>
                Top in category: {props.result.category}
            </Text>
            <FlatList
            style={styles.topManuList} 
            data={props.result.topFive}
            renderItem={renderTopManus}
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

    subtitle: {
        fontSize: 18
    },


    oops: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20
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

    greenscore: {
        fontSize: 20,
        color: "#58B34D",
        fontFamily: "Raleway-Extra-Bold"
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
    
    topManuList: {
        width: responsiveWidth(90)
    },

    listItem: {
        backgroundColor: '#EFEFEF'
    }
})