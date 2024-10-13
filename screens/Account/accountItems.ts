/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ROUTES from "../../navigations/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../core/store/auth/utils";
export const accountItems = [
    {
        label: 'Profile',
        icon: 'account',
        onClick: (navigation: any) => {
            navigation.navigate(ROUTES.PROFILE);
        }
    },
    {
        label: 'Shop Profile',
        icon: 'store',
        onClick: (navigation: any) => {
            navigation.navigate(ROUTES.SHOP_PROFILE);
        }
    },
    {
        label: 'Log out',
        icon: 'home-export-outline',
        onClick: async (navigation: any) => {
            await AsyncStorage.removeItem(USER_KEY);
            navigation.navigate(ROUTES.INTRO_SCREEN)
        }
    }
]