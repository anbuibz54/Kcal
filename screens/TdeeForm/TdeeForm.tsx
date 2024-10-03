/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import { HttpContext } from '../../context/HttpContext';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import AppButton from '../../ui_packages/components/Button/AppButton';
import { useTheme, TextInput } from 'react-native-paper';
import { useAuth,updateToken } from '../../store/auth/authSlice';
import ROUTES from '../../navigations/routes';
import { Dropdown } from 'react-native-paper-dropdown';
export default function TdeeForm(props: {
    navigation: { goBack: () => void; navigate: (arg0: string) => void };
}) {
    const authStore = useAuth();
    const httpContext = React.useContext(HttpContext);
    const [showPass, setShowPass] = React.useState<boolean>(false);
    const [userInfor, setUserInfor] = React.useState<{
        height: number;
        weight: number;
        age: number;
        gender: number;
        activityRateId: number;
        tdee?:number;
        id?:number;
    }>({ height: 0, weight: 0, age: 0, gender: 1, activityRateId: 1,tdee:0 });
    const genderOptions = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' }
    ];
    const [activityRatesOptions, setActivityRateOptions] = React.useState<any[]>([]);
    const validateInput = () => {
        // if (
        //    inputRules.isValidEmail(credentials.email as string)  &&
        //   inputRules.isValidPassword(credentials.password as string)
        // )
        //   return true;
        // else return false;
    };
    async function getActivityRates() {
        const res = await httpContext.get('ActivityRate/all');
        setActivityRateOptions(res.data.map((c: any) => { return { label: c.description, value: String(c.id) } }));
    }
    async function tdeeCalculate() {
        const input ={...userInfor};
        input.id = authStore.user?.id as number;
        console.log({input})
        const res = await httpContext.post('User/update-user-infor',input);
        console.log({res:res.data});
        updateToken({...authStore.user,...res.data});
    }
    React.useEffect(() => {
        console.log({user:authStore.user})
        getActivityRates();
    }, [])
    return (
        <View>
            <AppHeader
                onBack={() => {
                    props.navigation.goBack();
                }}
                key={''}
                title="Create new account"></AppHeader>
            <View style={{ width: '100%', height: '100%', padding: 16 }}>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Height in cm</Text>
                    <AppTextInput
                        label={'Height'}
                        placeholder={'Height'}
                        value={String(userInfor.height)}
                        onChangeText={value => {
                            setUserInfor({ ...userInfor, height: Number(value) })
                        }}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Weight in kg</Text>
                    <AppTextInput
                        label={'Weight'}
                        placeholder={'Weight'}
                        value={String(userInfor.weight)}
                        onChangeText={value => {
                            setUserInfor({ ...userInfor, weight: Number(value) })
                        }}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Age</Text>
                    <AppTextInput
                        label={'Age'}
                        placeholder={'Age'}
                        value={String(userInfor.age)}
                        onChangeText={value => {
                            setUserInfor({ ...userInfor, age: Number(value) })
                        }}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Activity Rate</Text>
                    <Dropdown options={genderOptions} value={String(userInfor.gender)} onSelect={(value) => { setUserInfor({ ...userInfor, gender: Number(value as string) }) }} />
                </View>
                {
                    activityRatesOptions.length > 0 && (
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{ marginBottom: 8 }}>Gender</Text>
                            <Dropdown options={activityRatesOptions} value={String(userInfor.activityRateId)} onSelect={(value) => { setUserInfor({ ...userInfor, activityRateId: Number(value as string) }) }} />
                        </View>
                    )
                }
                <View
                    style={{
                        marginTop: 16,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={{ height: 60, width: '90%', marginBottom: 8 }}>
                        <AppButton
                            onPress={() => {
                                tdeeCalculate();
                            }}>
                            Calculate Tdee
                        </AppButton>
                    </View>
                </View>
            </View>
        </View>
    );
}
