/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ROUTES from "../navigations/routes";
export const APPS = [
    {
        label: 'Shopping',
        icon: 'account',
        onClick: (navigation: any) => {
            navigation.navigate(ROUTES.PRODUCT_LIST);
        }
    },
    {
        label: 'Shop Profile',
        icon: 'store',
        onClick: (navigation: any) => {
            navigation.navigate(ROUTES.SHOP_PROFILE);
        }
    }
]