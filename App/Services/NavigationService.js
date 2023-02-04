// import { NavigationActions } from 'react-navigation'
import * as React from 'react';
import { StackActions } from '@react-navigation/routers';
import { CommonActions } from '@react-navigation/native';
// import * as Sentry from '@sentry/react-native';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();
const actionQueue = [];
let _state;

/**
 * Make sure the navigator is ready before performing any action.
 * If it's not ready, add the action to the queue which will be dispatched later after the navigator ready.
 *
 * @param {() => void} action navigation action
 */
const checkNavigatorReady = action => {
  if (isReadyRef.current && navigationRef.current) action();
  else actionQueue.push(action);
};

/**
 * Dispatch all queued actions.
 */
export const dispatchQueuedActions = () => {
  while (actionQueue.length > 0) actionQueue.shift()();
};

export const SetState = state => {
  const routes = state?.routes || [];
  const index = routes.length;
  // Sentry.addBreadcrumb({
  //   type: 'navigation',
  //   category: 'navigation',
  //   data: {
  //     from: routes[index]?.name ?? '',
  //     to: routes[index - 1]?.name ?? '',
  //     params: JSON.stringify(routes[index - 1]?.params ?? {}),
  //   },
  // });
  // Sentry.addBreadcrumb({
  //   type: "navigation",
  //   category: "navigation",
  //   data: state||{},
  //   message: '',
  //   level: Sentry.Severity.Info,
  // });
  _state = state;
};

export const Navigate = (routeName, params = {}) => {
  checkNavigatorReady(() =>
    navigationRef.current.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    ),
  );
};

export const Push = (routeName, params = {}, key = null) => {
  checkNavigatorReady(() =>
    navigationRef.current.dispatch(
      StackActions.push(routeName, { ...params, key }),
    ),
  );
};

export const Listener = (listen, callback) => {
  checkNavigatorReady(() =>
    navigationRef.current.dispatch(
      CommonActions.addListener(listen, () => callback()),
    ),
  );
};

export const Replace = (routeName, params = {}) => {
  checkNavigatorReady(() =>
    navigationRef.current.dispatch(
      StackActions.replace(routeName, { ...params }),
    ),
  );
  // _navigator.dispatch(
  //   StackActions.replace({
  //     routeName,
  //     params
  //   })
  // )
};

export const GetNavStack = () =>
  navigationRef.current && navigationRef.current?.state;

export const GetState = () => _state;

export const Navigator = () => navigationRef.current;

export const GetNavParam = (name, defaultValue = {}) => {
  checkNavigatorReady(() =>
    navigationRef.current.dispatch(
      StackActions.getParam({
        name,
        defaultValue,
      }),
    ),
  );
};

// add other navigation functions that you need and export them

export default {
  Navigate,
  GetNavParam,
  GetNavStack,
};
