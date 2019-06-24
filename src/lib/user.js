import dayday from "../networks/dayday";
import Cookies from 'universal-cookie';


const cookies= new Cookies();

//When login status is changed, called this function
export const userObserver= {
    action: (type)=>{
        //initialized by App.js
    }
};

export const user= {
    token: cookies.get('token')? cookies.get('token'): '',
    uid: cookies.get('uid')? cookies.get('uid'): '',
};


export const login= (id, pw, result)=> {
    dayday.getToken(id, pw, {
        success: (token)=>{
            user.token= token;
            user.uid= id;
            cookies.set('token', token);
            cookies.set('uid', id);
            result.success(token);
        },
        fail: (e)=>{
            result.fail(e);
        }
    });
};

export const logout= ()=>{
    user.token= '';
    user.uid= '';
    cookies.set('token', '');
    cookies.set('uid', '');
    userObserver.action('logout');
}

export const isLogin= ()=>{
    if(user.token==='' && user.uid=== ''
        || user.token === 'temp' && user.uid === 'temp') {
            return false;
    }

    return true;
};

export const joinState= ()=>{
    return user.token=== 'temp' && user.uid=== 'temp';
}

