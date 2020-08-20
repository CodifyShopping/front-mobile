import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const Skeleton =() =>{
    return(
        <View>
        <View style={styles.item}>
        <View style={{flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",}}
>
    
            <View style={{right:"2%", width:"38%", height:"76%",borderRadius:14, backgroundColor:"#dcdcdc"}}/>
            <View style={{ width:"48%", height:"76%", flexDirection:"column"}}>
                  <View style={{ top:"7%", left:"6%", width:"85%", height:"18%",backgroundColor:"#dcdcdc", borderRadius:14}}></View>
                  <View style={{ top:"17%",left:"6%",width:"85%", height:"18%",backgroundColor:"#dcdcdc", borderRadius:14}}></View>
                  <View style={{ top:"22%",left:"6%",width:"85%", height:"18%",backgroundColor:"#dcdcdc", borderRadius:14}}></View>
            </View>
    
        </View>
        </View>
        <View style={styles.item}>
        <View style={{flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",}}
>
    
            <View style={{right:"2%", width:"38%", height:"76%",borderRadius:14, backgroundColor:"#dcdcdc"}}/>
            <View style={{ width:"48%", height:"76%", flexDirection:"column"}}>
                  <View style={{ top:"7%", left:"6%", width:"85%", height:"18%",backgroundColor:"#dcdcdc", borderRadius:14}}></View>
                  <View style={{ top:"17%",left:"6%",width:"85%", height:"18%",backgroundColor:"#dcdcdc", borderRadius:14}}></View>
                  <View style={{ top:"22%",left:"6%",width:"85%", height:"18%",backgroundColor:"#dcdcdc", borderRadius:14}}></View>
            </View>
    
        </View>
        </View>
        </View>
    )
   

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        //borderColor: "grey",
        //borderWidth: 3,
        marginVertical: 10,
        width: WINDOW_WIDTH*0.9,
        height: WINDOW_WIDTH/2,
        borderRadius: 18,
        
    },
    txt1: {
        fontSize: 20,
        bottom:"10%",
        fontWeight:"600",
        width:"200%", height:"10%",borderRadius:14, backgroundColor:"#dcdcdc"
    },
    txt2: {
        fontSize: 20,
        bottom:"2%",
        width:"200%", height:"10%",borderRadius:14, backgroundColor:"#dcdcdc"
    },
    txt3: {
        fontSize: 20,
        width:"200%", height:"10%",borderRadius:14, backgroundColor:"#dcdcdc"
    },
    
    });
    