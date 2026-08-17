import type { ComponentType } from "react";
import { RouteName } from "./RouteName";
import HomeScreen from "../screens/HomeScreen";
import CollectionsScreen from "../screens/CollectionsScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import OurStoryScreen from "../screens/OurStoryScreen";
import ArtisansScreen from "../screens/ArtisansScreen";
import OrganicLuxuryScreen from "../screens/OrganicLuxuryScreen";
import CustomOrderScreen from "../screens/CustomOrderScreen";
import LearningHubScreen from "../screens/LearningHubScreen";
import MasterclassScreen from "../screens/MasterclassScreen";
import ContactScreen from "../screens/ContactScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import AuthModalScreen from "../screens/AuthModalScreen";
import ProfileDashboardScreen from "../screens/ProfileDashboardScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";

export interface RouteConfig {
  path: string;
  element: ComponentType<any>;
}

export const AppRoute: RouteConfig[] = [
  {
    path: RouteName.HOME,
    element: HomeScreen,
  },
  {
    path: RouteName.COLLECTIONS,
    element: CollectionsScreen,
  },
  {
    path: RouteName.PRODUCT_DETAIL,
    element: ProductDetailScreen,
  },
  {
    path: RouteName.OUR_STORY,
    element: OurStoryScreen,
  },
  {
    path: RouteName.ARTISANS,
    element: ArtisansScreen,
  },
  {
    path: RouteName.ORGANIC_LUXURY,
    element: OrganicLuxuryScreen,
  },
  {
    path: RouteName.CUSTOM_ORDER,
    element: CustomOrderScreen,
  },
  {
    path: RouteName.LEARNING_HUB,
    element: LearningHubScreen,
  },
  {
    path: RouteName.MASTERCLASS,
    element: MasterclassScreen,
  },
  {
    path: RouteName.CONTACT,
    element: ContactScreen,
  },
  {
    path: RouteName.CHECKOUT,
    element: CheckoutScreen,
  },
  {
    path: RouteName.AUTH,
    element: AuthModalScreen,
  },
  {
    path: RouteName.PROFILE,
    element: ProfileDashboardScreen,
  },
  {
    path: RouteName.MY_ORDERS,
    element: MyOrdersScreen,
  },
];
