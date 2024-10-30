/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../../ui_packages/components/AppHeader/AppHeader';
import AppTextInput from '../../ui_packages/components/TextInput/TextInput';
import AppButton from '../../ui_packages/components/Button/AppButton';
import { userUpdateRequestSchema,type userUpdateRequestModel } from '../../core/models/user/user-models';
import { authInforSchema } from '../../core/models/auth/auth-model';
import { useGetUserByIdQuery,useUpdateUserInforMutation } from '../../core/redux-store/hooks/profile/api';
import { useGetAllQuery } from '../../core/redux-store/hooks/activity-rate/api';
import { useAppSelector,useAppDispatch } from '../../core/redux-store/hooks/base';
import { selectUser,updateToken } from '../../core/redux-store/slices/auth/authSlice';
import { Dropdown } from 'react-native-paper-dropdown';
export default function TdeeForm(props: {
    navigation: { goBack: () => void; navigate: (arg0: string) => void };
}) {
    const authState = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const {data: activities, isSuccess : getActivitiesSuccessed} = useGetAllQuery();
    const {data: profile, isSuccess:getProfileSuccessed} = useGetUserByIdQuery(authState.value.id);
    const [updateUser,result] = useUpdateUserInforMutation();
    const [userInfor, setUserInfor] = React.useState<userUpdateRequestModel>({ id:0,height: 0, weight: 0, age: 0, gender: 1, activityRateId: 1,tdee:0 });
    const genderOptions = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' }
    ];
    const [activityRatesOptions, setActivityRateOptions] = React.useState<any[]>([]);
    async function getActivityRates() {
        if(activities){
            setActivityRateOptions(activities.map((c: any) => { return { label: c.description, value: String(c.id) } }));
        }
    }
    async function tdeeCalculate() {
        try{
            const input = userUpdateRequestSchema.parse(userInfor);
            updateUser(input);
        }
        catch{

        }
    }
    React.useEffect(() => {
        getActivityRates();
    }, [getActivitiesSuccessed])
    React.useEffect(()=>{
        if(profile){
            const formattedProfile = userUpdateRequestSchema.safeParse(profile);
            console.log({profile,formattedProfile})
            if(formattedProfile.data){
                setUserInfor({...formattedProfile.data});
            }
        }
    },[getProfileSuccessed])
    React.useEffect(()=>{
        if(result.isSuccess){
            const token = authInforSchema.safeParse(result.data);
            if(token.success &&token.data){
                dispatch(updateToken(token.data));
            }
        }
    },[result])
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
