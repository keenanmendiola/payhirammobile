import AsyncStorage from '@react-native-community/async-storage';
import Data from 'services/Data';
import { Helper, Color } from 'common';
import { Routes } from 'common';
import Api from '../services/api';

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  UPDATE_USER: 'UPDATE_USER',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
  SET_MESSAGES: 'SET_MESSAGES',
  SET_LEDGER: 'SET_LEDGER',
  SET_USER_LEDGER: 'SET_USER_LEDGER',
  SET_MESSENGER_GROUP: 'SET_MESSENGER_GROUP',
  UPDATE_MESSENGER_GROUP: 'UPDATE_MESSENGER_GROUP',
  SET_MESSAGES_ON_GROUP: 'SET_MESSAGES_ON_GROUP',
  UPDATE_MESSAGES_ON_GROUP: 'UPDATE_MESSAGES_ON_GROUP',
  UPDATE_MESSAGE_BY_CODE: 'UPDATE_MESSAGE_BY_CODE',
  UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD: 'UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD',
  SET_LOCATION: 'SET_LOCATION',
  SET_SEARCH_PARAMETER: 'SET_SEARCH_PARAMETER',
  SET_REQUESTS: 'SET_REQUESTS',
  UPDATE_REQUESTS: 'UPDATE_REQUESTS',
  SET_PIN_FLAG: 'SET_PIN_FLAG',
  SET_SYSTEM_NOTIFICATION: 'SET_SYSTEM_NOTIFICATION',
  SET_SELECTED_PRODUCT_ID: 'SET_SELECTED_PRODUCT_ID',
  SET_PRODUCT: 'SET_PRODUCT',
  nav: null,
  QRCODE_MODAL: 'QRCODE_MODAL',
  SET_THEME: 'SET_THEME',
  SET_REQUEST_INPUT: 'SET_REQUEST_INPUT',
  SET_VALIDATE_OTP: 'SET_VALIDATE_OTP',
  VIEW_MENU: 'VIEW_MENU'
};

export const actions = {
  login: (user, token) => {
    return { type: types.LOGIN, user, token };
  },
  logout() {
    return { type: types.LOGOUT };
  },
  updateUser: (user) => {
    return { type: types.UPDATE_USER, user };
  },
  setNotifications(unread, notifications) {
    return { type: types.SET_NOTIFICATIONS, unread, notifications };
  },
  setMessenger(unread, messages) {
    return { type: types.SET_MESSAGES, unread, messages };
  },
  setLedger(ledger) {
    return { type: types.SET_LEDGER, ledger };
  },
  setUserLedger(userLedger) {
    return { type: types.SET_USER_LEDGER, userLedger };
  },
  setMessengerGroup(messengerGroup) {
    return { type: types.SET_MESSENGER_GROUP, messengerGroup };
  },
  updateMessengerGroup(messengerGroup) {
    return { type: types.UPDATE_MESSENGER_GROUP, messengerGroup };
  },
  updateMessagesOnGroupByPayload(messages) {
    return { type: types.UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD, messages };
  },
  setMessagesOnGroup(messagesOnGroup) {
    return { type: types.SET_MESSAGES_ON_GROUP, messagesOnGroup };
  },
  updateMessagesOnGroup(message) {
    return { type: types.UPDATE_MESSAGES_ON_GROUP, message };
  },
  updateMessageByCode(message) {
    return { type: types.UPDATE_MESSAGE_BY_CODE, message };
  },
  setLocation(location) {
    return { type: types.SET_LOCATION, location };
  },
  updateNotifications(unread, notification) {
    return { type: types.UPDATE_NOTIFICATIONS, unread, notification };
  },
  setSearchParameter(searchParameter) {
    return { type: types.SET_SEARCH_PARAMETER, searchParameter };
  },
  setRequests(requests) {
    return { type: types.SET_REQUESTS, requests };
  },
  updateRequests(requests) {
    return { type: types.UPDATE_REQUESTS, requests };
  },
  setPinFlag(pinFlag) {
    return { type: types.SET_PIN_FLAG, pinFlag };
  },
  setSystemNotification(systemNotification) {
    return { type: types.SET_SYSTEM_NOTIFICATION, systemNotification };
  },
  setProduct(product) {
    return { type: types.SET_PRODUCT, product };
  },
  setSelectedProductId(productId) {
    return {
      type: types.SET_SELECTED_PRODUCT_ID,
      productId,
    };
  },
  setQRCodeModal(isVisible) {
    return { type: types.QRCODE_MODAL, isVisible };
  },
  setTheme(theme) {
    return { type: types.SET_THEME, theme };
  },
  setRequestInput(requestInput) {
    return { type: types.SET_REQUEST_INPUT, requestInput };
  },
  setIsValidOtp(isValidOtp) {
    return { type: types.SET_VALIDATE_OTP, isValidOtp };
  },
  viewMenu(isViewing){
    return {thype: types.VIEW_MENU, isViewing}
  }
};

const initialState = {
  token: null,
  user: null,
  notifications: null,
  messenger: null,
  ledger: null,
  userLedger: null,
  messengerGroup: null,
  messagesOnGroup: {
    groupId: null,
    messages: null,
  },
  searchParameter: null,
  location: null,
  requests: null,
  nav: null,
  pinFlag: false,
  systemNotification: null,
  product: null,
  productId: null,
  qrCodeModal: false,
  requestInput: null,
  isValidOtp: false,
  isViewing: false
};

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${Helper.APP_NAME}${key}`, value);
  } catch (e) {
    // saving error
  }
};

const reducer = (state = initialState, action) => {
  const { type, user, token } = action;
  const { messages, unread, message } = action;
  const { messengerGroup, messagesOnGroup } = action;
  const { location, notification } = action;
  const { searchParameter, requests } = action;
  const { systemNotification } = action;
  const { product, productId } = action;
  const { isVisible } = action;
  const { theme } = action;
  const { requestInput } = action;
  const { isValidOtp } = action;
  switch (type) {
    case types.LOGOUT:
      AsyncStorage.clear();
      return Object.assign({}, initialState);
    case types.LOGIN:
      storeData('token', token);
      console.log('LOGIN', true);
      Data.setToken(token);
      return { ...state, user, token };
    case types.UPDATE_USER:
      return {
        ...state,
        user,
      };
    case types.SET_NOTIFICATIONS:
      let notifications = {
        unread,
        notifications: action.notifications,
      };
      console.log('notifications', true);
      return {
        ...state,
        notifications,
      };
    case types.UPDATE_NOTIFICATIONS:
      let updatedNotifications = null;
      if (state.notifications == null) {
        let temp = [];
        temp.push(notification);
        updatedNotifications = {
          unread,
          notifications: temp,
        };
      } else {
        let oldNotif = state.notifications;
        if (oldNotif.notifications == null) {
          let temp = [];
          temp.push(notification);
          updatedNotifications = {
            unread,
            notifications: temp,
          };
        } else {
          if (
            parseInt(notification.id) !=
            parseInt(
              oldNotif.notifications[oldNotif.notifications.length - 1].id,
            )
          ) {
            oldNotif.notifications.unshift(notification);
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications,
            };
          } else {
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications,
            };
          }
        }
      }
      return {
        ...state,
        notifications: updatedNotifications,
      };
    case types.SET_MESSAGES:
      let messenger = {
        unread,
        messages,
      };
      console.log('messenger', true);
      return {
        ...state,
        messenger,
      };
    case types.SET_USER_LEDGER:
      let userLedger = {
        currency: 'PHP',
        amount: action.userLedger,
      };
      return {
        ...state,
        userLedger,
      };
    case types.SET_LEDGER:
      return {
        ...state,
        ledger: action.ledger,
      };
    case types.SET_MESSENGER_GROUP:
      return {
        ...state,
        messengerGroup,
      };
    case types.UPDATE_MESSENGER_GROUP:
      return {
        ...state,
        messengerGroup: {
          ...state.messengerGroup,
          created_at_human: messengerGroup.created_at_human,
          rating: messengerGroup.rating,
          status: parseInt(messengerGroup.status),
          validations: messengerGroup.validations,
        },
      };
    case types.SET_MESSAGES_ON_GROUP:
      return {
        ...state,
        messagesOnGroup,
      };
    case types.UPDATE_MESSAGES_ON_GROUP:
      let updatedMessagesOnGroup = null;
      if (state.messagesOnGroup != null) {
        let oldMessages = state.messagesOnGroup.messages;
        if (oldMessages == null) {
          let temp = [];
          temp.push(message);
          updatedMessagesOnGroup = {
            ...state.messagesOnGroup,
            messages: temp,
          };
        } else {
          if (
            parseInt(message.id) !=
            parseInt(oldMessages[oldMessages.length - 1].id)
          ) {
            updatedMessagesOnGroup = {
              ...state.messagesOnGroup,
              messages: oldMessages.push(message),
            };
          } else {
            updatedMessagesOnGroup = {
              ...state.messagesOnGroup,
            };
          }
        }
      } else {
        let temp = [];
        temp.push(message);
        updatedMessagesOnGroup = {
          groupId: parseInt(message.messenger_group_id),
          messages: temp,
        };
      }
      return {
        ...state,
        updatedMessagesOnGroup,
      };
    case types.UPDATE_MESSAGE_BY_CODE:
      let newMessagesOnGroup = state.messagesOnGroup.messages.map(
        (item, index) => {
          if (
            typeof item.code != undefined ||
            typeof item.code != 'undefined'
          ) {
            if (parseInt(item.code) == parseInt(message.code)) {
              return message;
            }
          }
          return item;
        },
      );
      return {
        ...state,
        messagesOnGroup: {
          ...state.messagesOnGroup,
          messages: newMessagesOnGroup,
        },
      };
    case types.UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD:
      let tempMessages = state.messagesOnGroup.messages.map((item, index) => {
        if (
          parseInt(item.id) == parseInt(action.messages[index].id) &&
          item.payload_value != null
        ) {
          return action.messages[index];
        }
        return item;
      });
      return {
        ...state,
        messagesOnGroup: {
          ...state.messagesOnGroup,
          messages: tempMessages,
        },
      };
    case types.SET_LOCATION:
      return {
        ...state,
        location,
      };
    case types.SET_SEARCH_PARAMETER:
      return {
        ...state,
        searchParameter,
      };
    case types.SET_REQUESTS:
      return {
        ...state,
        requests,
      };
    case types.UPDATE_REQUESTS:
      state.requests.push(...requests);
      return {
        ...state,
        requests: state.requests,
      };
    case types.SET_PIN_FLAG:
      return {
        ...state,
        pinFlag: action.pinFlag,
      };
    case types.SET_SYSTEM_NOTIFICATION:
      return {
        ...state,
        systemNotification,
      };
    case types.SET_PRODUCT:
      return {
        ...state,
        product,
      };
    case types.SET_SELECTED_PRODUCT_ID:
      return {
        ...state,
        productId,
      };
    case types.QRCODE_MODAL:
      return {
        ...state,
        qrCodeModal: isVisible.isVisible,
      };
    case types.SET_THEME:
      console.log('theme:', theme);
      storeData('primary', theme.primary);
      storeData('secondary', theme.secondary);
      storeData('tertiary', theme.tertiary);
      Color.setPrimary(theme.primary);
      Color.setSecondary(theme.secondary);
      Color.setTertiary(theme.tertiary);
      return {
        ...state,
        theme,
      };
    case types.SET_REQUEST_INPUT:
      console.log('REQUEST INPUT', requestInput);
      return {
        ...state,
        requestInput,
      };
    case types.SET_VALIDATE_OTP:
      console.log('IS VALID OTP', isValidOtp);
      return {
        ...state,
        isValidOtp,
      };
    case types.VIEW_MENU:
      console.log('VIEWING MENU', isViewing);
      return {
        ...state,
        isViewing,
      };
    default:
      return { ...state, nav: state.nav };
  }
};
export default reducer;
