import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      //setAuthorizationHeader(res.data.token);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/profile');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/profile');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({type: LOADING_USER});
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const surveySubmit = (userDetails) => (dispatch) => {
  dispatch({type: LOADING_USER});
  axios.post('/user/survey', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const getUsers = () => (dispatch) => {
  axios.get('/user/search')
    .then((res) => {
      dispatch(res);
    })
    .catch(err => console.log(err));
}

export const sendMessage = (otherUser) => (dispatch) => {
  axios.post('/user/chat', otherUser)
    .then((res) => {
      dispatch(res);
    })
    .catch(err => console.log(err));
}

export const getMessages = (otherUser) => (dispatch) => {
  axios.post('/user/getMessages', otherUser)
    .then((res) => {
      dispatch(res);
    })
    .catch(err => console.log(err));
}

export const removeMatch = (user) => (dispatch) => {
  axios.post('/user/unmatch', {user: user})
    .then((res) => {
      dispatch(res);
    })
    .catch(err => console.log(err));
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};