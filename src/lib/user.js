

export const user= {
    token: 'asdfas',
    uid: 'asdfasdf',
    defaultDiaryCode: 'asfffff',
};


// let token= '';
// let uid= 'asdfasfafafsdfff';

export const login= (id, pw, result)=> {
    window.setTimeout(()=>{
        user.token= '14241512555';
        user.uid= 'sdasg234asgasss';
        if(result.success) result.success();
    }, 2000);
};

export const logout= ()=>{
    user.token= '';
    user.uid= '';
    user.defaultDiaryCode= '';
}

export const isLogin= ()=>{
    if(user.token==='' || user.uid=== '')
        return false;

    return true;
};
