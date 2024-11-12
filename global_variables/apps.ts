/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ROUTES from "../navigations/routes";
export const APPS = [
    {
        label: 'Meal Plan',
        imageSource: require('../assets/images/Group9.png'),
        icon: 'account',
        onClick: (navigation: any) => {
            navigation.navigate(ROUTES.PRODUCT_LIST);
        }
    },
    {
        label: 'PTO',
        imageSource: require('../assets/images/Group.png'),
        icon: 'store',
        onClick: (navigation: any) => {
            navigation.navigate(ROUTES.SHOP_PROFILE);
        }
    }
]