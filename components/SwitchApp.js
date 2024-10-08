import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Task from './Task';
import Translation from './Translation';
import { useDispatch, useSelector } from "react-redux";


export default function SwitchApp() {
    const [selectedTab , setSelectedTab] = useState(0);

  return (
    <View>
        <View style={{ flexDirection: "row", shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,marginBottom: 5,}}>
        <TouchableOpacity
            style= {{ width: '50%'
                , height: 50
                , backgroundColor: selectedTab==0 ? '#dd2c00' : '#fff' 
                , justifyContent: 'center'
                , alignItems: 'center'
                , justifyContent: 'center'
                , alignItems: 'center'
            }}
            onPress={() => {
                setSelectedTab(0)
            }}
        >
            <Text style={{color:selectedTab == 0 ?'#fff' : '#dd2c00', fontSize: 18, fontWeight: 700}}>Your Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style= {{ width: '50%'
                , height: 50
                , backgroundColor: selectedTab == 1 ? '#dd2c00' : '#fff' 
                , justifyContent: 'center'
                , alignItems: 'center'
                , justifyContent: 'center'
                , alignItems: 'center'
            }}
            onPress={() => {
                setSelectedTab(1)
            }}
        >
            <Text style={{color:selectedTab == 1 ?'#fff' : '#dd2c00', fontSize: 18, fontWeight: 700}}>Translation</Text>
        </TouchableOpacity>
        </View>

        {
            selectedTab == 0 ? (
                <View>
                    <Task />
                </View> 
            ) : (
                <View>
                    <Translation />
                </View>
            )
        }

        
        

    </View>
  )
}

const styles = StyleSheet.create({})