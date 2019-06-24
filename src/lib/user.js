import dayday from "../networks/dayday";
import Cookies from 'universal-cookie';


const cookies= new Cookies();

export const user= {
    token: cookies.get('token')? cookies.get('token'): '',
    uid: cookies.get('uid')? cookies.get('uid'): '',
};


export const login= (id, pw, result)=> {
    dayday.getToken(id, pw, {
        success: (token)=>{
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

