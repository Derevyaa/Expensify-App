import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import ReportScreenWrapper from '@libs/Navigation/AppNavigator/ReportScreenWrapper';
import getCurrentUrl from '@libs/Navigation/currentUrl';
import type {CentralPaneNavigatorParamList} from '@navigation/types';
import SCREENS from '@src/SCREENS';

const Stack = createStackNavigator<CentralPaneNavigatorParamList>();

const url = getCurrentUrl();
const openOnAdminRoom = url ? new URL(url).searchParams.get('openOnAdminRoom') : undefined;

type Screens = Partial<Record<keyof CentralPaneNavigatorParamList, () => React.ComponentType>>;

const workspaceSettingsScreens = {
    [SCREENS.SETTINGS.WORKSPACES]: () => require('../../../../../pages/workspace/WorkspacesListPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.OVERVIEW]: () => require('../../../../../pages/workspace/WorkspaceOverviewPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CARD]: () => require('../../../../../pages/workspace/card/WorkspaceCardPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.REIMBURSE]: () => require('../../../../../pages/workspace/reimburse/WorkspaceReimbursePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.BILLS]: () => require('../../../../../pages/workspace/bills/WorkspaceBillsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INVOICES]: () => require('../../../../../pages/workspace/invoices/WorkspaceInvoicesPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TRAVEL]: () => require('../../../../../pages/workspace/travel/WorkspaceTravelPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.MEMBERS]: () => require('../../../../../pages/workspace/WorkspaceMembersPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING]: () => require('../../../../../pages/workspace/WorkspaceAccountingPage').default as React.ComponentType,
} satisfies Screens;

function BaseCentralPaneNavigator() {
    const styles = useThemeStyles();
    const options = {
        headerShown: false,
        title: 'New Expensify',

        // Prevent unnecessary scrolling
        cardStyle: styles.cardStyleNavigator,
    };
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen
                name={SCREENS.REPORT}
                // We do it this way to avoid adding the url params to url
                initialParams={{openOnAdminRoom: openOnAdminRoom === 'true' || undefined}}
                component={ReportScreenWrapper}
            />

            {Object.entries(workspaceSettingsScreens).map(([screenName, componentGetter]) => (
                <Stack.Screen
                    key={screenName}
                    name={screenName as keyof Screens}
                    getComponent={componentGetter}
                />
            ))}
        </Stack.Navigator>
    );
}

export default BaseCentralPaneNavigator;
