import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/MaterialIcons';


class AppHeader extends Component {

    render() {
        const { title, onPress, navigation } = this.props;
        return (
            <View style={{ height: 60 }}>
                <View style={[styles.gradient, { paddingTop: 5, backgroundColor: '#052E88' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Webview')}>
                            <Icons name="web" size={30} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                        <TouchableOpacity onPress={onPress}>
                            <Icons name="logout" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
//                     <View style={styles.headerView}>
//                         {title === "Messages" ? 
//                             <View style={{ width: '10%',  }}>
                                
//                             </View>
//                             :
//                             <View style={{ alignItems: 'flex-start' }}>
//                                 <TouchableOpacity style={styles.iconView} onPress={() => { navigation.goBack(null) }}>
//                                     <Icons name="arrow-back" size={25} color="#FFF" />
//                                 </TouchableOpacity>
//                             </View>
//                         }
//                         <View style={{ width: '80%', alignItems: 'center' }}>
//                             <Text style={[styles.textView, { fontSize: 25, fontWeight: 'bold' }]}>{title}</Text>
//                         </View>
//                         {title === "Messages" ? <View style={{ width: '10%', alignItems: 'flex-end', marginLeft: 10 }}>
//                             <TouchableOpacity style={styles.iconView} onPress={() => { onPress() }}>
//                                 <Icons name="logout" size={20} color="#FFF" />
//                             </TouchableOpacity>
//                         </View> : null}
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }

//                         </View> : null}
                        
                        

//                     </View>
                    
//                 </View>
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    gradient: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 12,
        justifyContent: 'center'
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        width: '100%',
    },
    iconView: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    textView: {
        fontSize: 20,
        lineHeight: 28,
        color: '#FFF',
       
    }
});


export default AppHeader;









