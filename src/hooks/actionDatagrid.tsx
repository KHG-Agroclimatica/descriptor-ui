import { sendRequest } from '../utils/request'

// const URL = 'http://localhost:3000/field'

export const FETCH_PENDING = 'FETCH_PENDING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
export const SAVING_PENDING = 'SAVING_PENDING'
export const SAVING_SUCCESS = 'SAVING_SUCCESS'
export const SAVING_ERROR = 'SAVING_ERROR'
export const SAVING_CANCEL = 'SAVING_CANCEL'
export const SET_CHANGES = 'SET_CHANGES'
export const SET_EDIT_ROW_KEY = 'SET_EDIT_ROW_KEY'

export default class actions {
  constructor(readonly URL: string) {
  }

  loadOrders = async (dispatch: any) => {
    dispatch({ type: FETCH_PENDING })

    try {
      const data = await sendRequest(`${this.URL}`)

      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data,
        },
      })
    } catch (err) {
      dispatch({ type: FETCH_ERROR })
      throw err
    }
  }

  saveChange = async (dispatch: any, change: any) => {
    if (change && change.type) {
      let data

      dispatch({ type: SAVING_PENDING })

      try {
        data = await this.sendChange(this.URL, change)

        change.data = data
        dispatch({
          type: SAVING_SUCCESS,
          payload: {
            change,
          },
        })

        return data
      } catch (err) {
        dispatch({ type: SAVING_ERROR })
        throw err
      }
    } else {
      dispatch({ type: SAVING_CANCEL })
      return null
    }
  }

  sendChange = async (url: string, change: any) => {
    switch (change.type) {
      case 'insert':
        return sendRequest(`${url}/create`, 'POST', {
          values: JSON.stringify(change.data),
        })
      case 'update':
        return sendRequest(`${url}/${change.key}`, 'PUT', {
          key: change.key,
          values: JSON.stringify(change.data),
        })
      case 'remove':
        return sendRequest(`${url}/${change.key}`, 'DELETE')
      default:
        return null
    }
  }

  setChanges(dispatch: any, changes: any) {
    dispatch({
      type: SET_CHANGES,
      payload: changes,
    })
  }

  setEditRowKey(dispatch: any, editRowKey: any) {
    dispatch({
      type: SET_EDIT_ROW_KEY,
      payload: editRowKey,
    })
  }
}