import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorageKeys from './AsyncStorageKeys'
const TOKEN_KEY = AsyncStorageKeys.tokenUser
const LOGIN_KEY = AsyncStorageKeys.isLogged
const ADMIN_KEY = AsyncStorageKeys.isAdmin

async function putToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token)
  } catch (e) {
    __DEV__ && console.log(e)
  }
}

async function getToken() {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY)
  } catch (e) {
    __DEV__ && console.log(e)
  }
}

async function putLogin(data) {
  try {
    await AsyncStorage.setItem(LOGIN_KEY, data)
  } catch (e) {
    __DEV__ && console.log(e)
  }
}

async function getLogin() {
  try {
    return await AsyncStorage.getItem(LOGIN_KEY)
  } catch (e) {
    __DEV__ && console.log(e)
  }
}
async function putAdmin(data) {
  try {
    await AsyncStorage.setItem(ADMIN_KEY, data)
  } catch (e) {
    __DEV__ && console.log(e)
  }
}

async function getAdmin() {
  try {
    return await AsyncStorage.getItem(ADMIN_KEY)
  } catch (e) {
    __DEV__ && console.log(e)
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
async function saveString(key, value) {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
async function load(key) {
  try {
    const almostThere = await AsyncStorage.getItem(key)
    return typeof almostThere === 'string' ? JSON.parse(almostThere) : null
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
async function remove(key) {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
async function clear() {
  try {
    await AsyncStorage.clear()
  } catch {
    return null
  }
}

export default {
  getLogin,
  clear,
  getToken,
  putToken,
  storeData,
  remove,
  load,
  putLogin,
  saveString,
  getAdmin,
  putAdmin,
}
