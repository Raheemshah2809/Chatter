import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import firebase from '../Firebase/firebaseConfig';
import Spinner from 'react-native-loading-spinner-overlay';
import AppHeader from '../Components/AppHeader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { UpdateUserImage } from '../Firebase/Users';
import ImgToBase64 from 'react-native-image-base64';
import Icons from 'react-native-vector-icons/MaterialIcons';


class Dashboard extends Component {
    state = {
        allUsers: [],
        loader: false,
        imageUrl: '',
        loggedInUserName: '',
        university: '',
    }

    async componentDidMount() {
        try {
            this.setState({ loader: true })
            await firebase.database().ref('users')
                .on("value", async (datasnapshot) => {
                    const uuid = await AsyncStorage.getItem('UID');
                    new Promise((resolve, reject) => {
                        let users = [];
                        let lastMessage = '';
                        let lastDate = '';
                        let lastTime = '';
                        let properDate = '';
                        datasnapshot.forEach((child) => {
                            if (child.val().uuid === uuid) {
                                console.log('ff', child.val().image);
                                this.setState({ loggedInUserName: child.val().name, imageUrl: child.val().image, university: child.val().university })
                                
                            }
                            else {
                                let newUser = {
                                    userId: '',
                                    userName: '',
                                    userProPic: '',
                                    lastMessage: '',
                                    university: '',
                                    lastDate: '',
                                    lastTime: '',
                                    properDate: ''
                                }
                                new Promise((resolve, reject) => {
                                    firebase.database().ref('messages').
                                        child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on('value', (dataSnapshots) => {
                                            if (dataSnapshots.val()) {
                                                dataSnapshots.forEach((child) => {
                                                    lastMessage = child.val().messege.image !== '' ? 'Photo' : child.val().messege.msg;
                                                    lastDate = child.val().messege.date;
                                                    lastTime = child.val().messege.time;
                                                    properDate = child.val().messege.date + " " + child.val().messege.time;
                                                    newUser.university = child.val().university;
                                                });
                                            }
                                            else {
                                                lastMessage = '';
                                                lastDate = '';
                                                lastTime = '';
                                                properDate = '';
                                            }
                                            newUser.userId = child.val().uuid;
                                            newUser.userName = child.val().name;
                                            newUser.userProPic = child.val().image;
                                            newUser.lastMessage = lastMessage;
                                            newUser.university = child.val().university;
                                            newUser.lastTime = lastTime;
                                            newUser.lastDate = lastDate;
                                            newUser.properDate = properDate;
                                            return resolve(newUser);
                                        });
                                }).then((newUser) => {
                                    users.push({
                                        userName: newUser.userName,
                                        university: newUser.university,
                                        uuid: newUser.userId,
                                        imageUrl: newUser.userProPic,
                                        lastMessage: newUser.lastMessage,
                                        lastTime: newUser.lastTime,
                                        lastDate: newUser.lastDate,
                                        properDate: newUser.lastDate ? new Date(newUser.properDate) : null
                                    });

                                    console.log('users', users);
                                    this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                                });
                                return resolve(users);
                            }
                        });
                    }).then((users) => {
                        this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                    })
                    this.setState({ loader: false })
                })
        } catch (error) {
            alert(error);
            this.setState({ loader: false })
        }
    }

    logOut = async () => {
        await firebase.auth().signOut().then(async () => {
            await AsyncStorage.removeItem('UID');
            this.props.navigation.navigate('Login');
        }).catch((err) => {
            alert(err);
        })
    }

    openGallery() {
        launchImageLibrary('photo', (response) => {
            this.setState({ loader: true });
            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    const uid = await AsyncStorage.getItem('UID');
                    let source = "data:image/jpeg;base64," + base64String;
                    UpdateUserImage(source, uid).
                        then(() => {
                            this.setState({ imageUrl: response.uri, loader: false });
                        })
                })
                .catch(err => this.setState({ loader: false }));
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <AppHeader title="Messages" navigation={this.props.navigation} onPress={() => this.logOut()} />
                <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.allUsers}
                    style={{ padding: 5 }}
                    keyExtractor={(_, index) => index.toString()}
                    
                    ListHeaderComponent={
                        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 90, width: 90, borderRadius: 45, right: 125}} onPress={() => { this.openGallery() }}>
                                <Image source={{ uri: this.state.imageUrl === '' ? 'data:image/jpeg;base64,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' : this.state.imageUrl }} style={{ height: 90, width: 90, borderRadius: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 15, marginTop: 10, fontWeight: 'bold', left: 40, bottom: 70 }}>Welcome: {this.state.loggedInUserName}
                            {"\n"}
                            University: {this.state.university}

                            {"\n"}
                            Select A Chat To Get Started
                            </Text> 
                        </View>
                        
                    }
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, marginTop: 20 }} onPress={() => this.props.navigation.navigate('Chat', { UserName: item.userName, guestUid: item.uuid, university: item.university })}>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={{ uri: item.imageUrl === '' ? 'data:image/jpeg;base64,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' : item.imageUrl }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                                </View>
                                <View style={{ width: '65%', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10 }}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>{item.userName} {"\n"}
                                    <View style={{justifyContent: 'center', marginBottom: 100, flexDirection: "column", flexWrap: 'wrap'}}
                                    >
                                        <Text style={{ display: 'flex', color: '#fff', fontSize: 12, fontWeight: 'bold', }}>
                                        University: {item.university}</Text>
                                    </View>
                                    </Text>
                                    
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '100' }}>Last Message: {item.lastMessage}</Text>
                                </View> 
                                <View style={{ width: '20%', alignItems: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: '400' }}>{item.lastTime}</Text>
                                </View>
                                
                            </TouchableOpacity>
                            <View style={{ borderWidth: 0.5, borderColor: '#fff' }} />
                        </View>
                    )}
                />
                <Spinner
                    visible={this.state.loader}
                />
            </View>
        )
    }
}




export default Dashboard;