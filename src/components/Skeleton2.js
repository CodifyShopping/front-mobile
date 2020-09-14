import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const Skeleton2 = () => {
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <View style={styles.item}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",

                }}
                >

                    <View style={{ right: "2%", width: "35%", height: "70%", borderRadius: 14, backgroundColor: "#dcdcdc" }} />
                    <View style={{ width: "48%", height: "76%", flexDirection: "column" }}>
                        <View style={{ top: "7%", left: "6%", width: "85%", height: "18%", backgroundColor: "#dcdcdc", borderRadius: 14 }}></View>
                        <View style={{ top: "17%", left: "6%", width: "85%", height: "18%", backgroundColor: "#dcdcdc", borderRadius: 14 }}></View>
                        <View style={{ top: "22%", left: "6%", width: "85%", height: "18%", backgroundColor: "#dcdcdc", borderRadius: 14 }}></View>
                    </View>

                </View>
            </View>
            <View style={styles.item}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",

                }}
                >

                    <View style={{ right: "2%", width: "35%", height: "70%", borderRadius: 14, backgroundColor: "#dcdcdc" }} />
                    <View style={{ width: "48%", height: "76%", flexDirection: "column" }}>
                        <View style={{ top: "7%", left: "6%", width: "85%", height: "18%", backgroundColor: "#dcdcdc", borderRadius: 14 }}></View>
                        <View style={{ top: "17%", left: "6%", width: "85%", height: "18%", backgroundColor: "#dcdcdc", borderRadius: 14 }}></View>
                        <View style={{ top: "22%", left: "6%", width: "85%", height: "18%", backgroundColor: "#dcdcdc", borderRadius: 14 }}></View>
                    </View>

                </View>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        height: 200,
        margin: 5,
        marginBottom: 5,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: "97%",


    },
    txt1: {
        fontSize: 20,
        bottom: "10%",
        fontWeight: "600",
        width: "200%", height: "10%", borderRadius: 14, backgroundColor: "#dcdcdc"
    },
    txt2: {
        fontSize: 20,
        bottom: "2%",
        width: "200%", height: "10%", borderRadius: 14, backgroundColor: "#dcdcdc"
    },
    txt3: {
        fontSize: 20,
        width: "200%", height: "10%", borderRadius: 14, backgroundColor: "#dcdcdc"
    },

});
