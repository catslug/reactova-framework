import React from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MultiNavigator from './MultiNavigator'
import buildRouteConfig from '../../library/navigation/buildRouteConfig'
import buildNavigationConfig from '../../library/navigation/buildNavigationConfig'
import getModalRoutes from '../../library/navigation/getModalRoutes'


const BaseNavigator = (navigationSchema,LoadingScreen,theme) => {

	const bootRouteConfig = buildRouteConfig(navigationSchema,theme);
	const bootNavigationConfig = buildNavigationConfig(navigationSchema,theme)
	const modalRoutes = getModalRoutes(navigationSchema,theme)

	const ModalNavigator = StackNavigator(
		{
			RootAppNavigator: {
				path: 'init',
				screen: MultiNavigator("RootAppNavigator",bootRouteConfig,bootNavigationConfig),
			},
			...modalRoutes
		},
		{
			mode: 'modal',
		}
	)


	const routerRouteConfig = {
		ModalRoutes: {
			path: 'modals',
			screen: ModalNavigator
		}
	}
	const routerNavigationConfig = {
		initialRouteName: 'ModalRoutes',
		navigationOptions:{
			tabBarVisible: false
		}
	}

	return TabNavigator(routerRouteConfig,routerNavigationConfig);
};

export default BaseNavigator;



