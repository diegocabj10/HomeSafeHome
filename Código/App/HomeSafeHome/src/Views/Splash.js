import React,{ Component }  from "react";
import { View } from "react-native";
import { Actions } from 'react-native-router-flux';
import {isSignedIn} from '../Functions/PersistenciaLocal';

import { AsyncStorage, Image, StatusBar } from "react-native";
const image = require('../assets/logoHomeSafeHome.png');
var myStyles = require('./Styles');


class Splash extends Component{
    
constructor(){

    super();

    this.state={

      isVisible : true,

    }

  }

  Hide_Splash_Screen=()=>{

    this.setState({ 
      isVisible : false 

    });

  }

 


  componentWillMount(){
      isSignedIn().then(bool =>{
        setTimeout( () => {
        if (bool)
        Actions['inicio'].call();
        else
        Actions['login'].call();
        }    
        , 3000);
    }
    );
  };


    render (){

        return (
        <View style={ myStyles.container}>
            <StatusBar
                backgroundColor={myStyles.container.backgroundColor}
                barStyle="light-content"
                />

            <View style={myStyles.loginLogoContainer}>
            <Image
                    source={image}
                    style={{ width: 200, height: 200 }}
                />
            </View>     
        </View>    


    )
}
}

export default Splash;