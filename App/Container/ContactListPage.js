import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar, FlatList, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import FloatingActionContainer from '../Component/FloatingActionButtonKLK'
import Header from '../Component/Header'
import Colors from '../Constants/Colors'
import Fonts from '../Constants/Fonts'
import ActionHelpers from '../Helpers/ActionHelpers'
import isEmpty from 'lodash/isEmpty'
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContactListPage = (props) => {

    const [contactList, setContactList] = useState([])
    const [tempContactList, setTempContactList] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [erroMsg, setErrorMsg] = useState('')

    const compare = (a, b) => {
        if (a.displayName < b.displayName) {
            return -1;
        }
        if (a.displayName > b.displayName) {
            return 1;
        }
        return 0;
    }
    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.',
                    'buttonPositive': 'Please accept bare mortal'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Contacts.getAll()
                    .then((contacts) => {
                        if (contacts) {
                            const contactFilter = contacts.filter(x => !isEmpty(x.phoneNumbers) && x.phoneNumbers?.[0]?.number.length > 9 && x.displayName[0] !== '+' && x.displayName[0] !== '0')
                            const filterContact = contactFilter.sort(compare)
                            setContactList(filterContact)
                            setTempContactList(filterContact)
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } else {
                setErrorMsg('Aplikasi tidak memiliki aksess kontak')
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        requestPermission()
    }, [])

    const getInitials = (fullName) => {
        const allNames = fullName.trim().split(' ');
        const initials = allNames.reduce((acc, curr, index) => {
            if (index === 0 || index === allNames.length - 1) {
                acc = `${acc}${curr.charAt(0).toUpperCase()}`;
            }
            return acc;
        }, '');
        return initials;
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE_COLOR }}>
            <Header title='Nomor Kontak' />
            <StatusBar backgroundColor={Colors.WHITE_COLOR} />
            <View style={{ borderBottomColor: Colors.GRAY_COLOR, borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 }}>
                <Icon name='address-book' style={{ fontSize: 20 }} />
                <TextInput
                    allowFontScaling={false}
                    onChange={() => {
                        if (inputSearch !== '') {
                            setTempContactList(contactList.filter(x => {
                                return x?.displayName?.toLowerCase()?.match(inputSearch?.toLowerCase()) || x.phoneNumbers[0]?.number?.match(inputSearch);
                            }))
                        } else {
                            setTempContactList([...contactList])
                        }
                    }}
                    value={inputSearch}
                    onChangeText={(e) => setInputSearch(e)}
                    style={{ fontSize: Fonts.FontSize.md, color: Colors.GRAY_COLOR, fontFamily: Fonts.FontsFamily.fontRegular, width: '90%' }}
                    placeholder='Masukkan nama atau nomor handphone' />
            </View>
            {erroMsg !== '' && <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.fontRegular, fontSize: Fonts.FontSize.sm, paddingHorizontal: 25, marginTop: 5, color: Colors.RED_COLOR }}>{erroMsg || ''}</Text>}
            <View style={{ paddingHorizontal: 25 }}>
                <View>

                    <FlatList
                        data={tempContactList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `contactList-${index}`}
                        ListHeaderComponent={() => <View style={{ height: 30 }} />}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { props.route.params.setContactPerson(`${item?.displayName} - (${item?.phoneNumbers[0]?.number})`); props.navigation.pop(); }}
                                    style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: Colors.GRAY_COLOR, flexDirection: "row", alignItems: 'center' }}>
                                    <View style={{ backgroundColor: Colors.BLUE_COLOR, height: 50, width: 50, borderRadius: 25, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: Colors.WHITE_COLOR, fontFamily: Fonts.FontsFamily.fontSemiBold }}>{getInitials(item?.displayName || '')}</Text>
                                    </View>
                                    <View>
                                        <Text allowFontScaling={false} style={{ fontFamily: Fonts.FontsFamily.sm, color: Colors.BLACK_COLOR }}>{item?.displayName}</Text>
                                        <Text>{item?.phoneNumbers[0]?.number}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}

                    />
                </View>

            </View>

        </View>
    )
}


export default ContactListPage