import * as axios from "axios";


// All of network communication will process using Promise

// callback is called when network communication is ended
// will called  as result and data is passed

// const callback= {
//     success: (data)=>{},
//     fail: (e)=>{}
// }


export default{
    getDiaryList: (callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success)
                callback.success([
                    {title: '내 다이어리1', type: 'private', code: 'qweqd12df3dad769876sdf', owner: 'asdfasfafafsdfff'},
                    {title: '내 다이어리2', type: 'private', code: 'qweqd12df3dad769876sdf', owner: 'asdfasfafafsdfff'},
                    {title: '내 다이어리3', type: 'private', code: 'qweqd12df3dad769876sdf', owner: 'asdfasfafafsdfff'},
                    {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'asdfasfafafsdfff'},
                    {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
                    {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
                    {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
                    {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
                ]);
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    // diary: {
    //     title: '나의 다이어리',
    //     createDate: '2019-01-12',
    //     type: 'private',
    //     owner: '김재선',
    //     dataCnt: 123,
    // },
    getDiaryInfo: (dirCode, callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success)
                callback.success({
                    title: 'My First Diary',
                    createDate: '2019-05-29',
                    type: 'private',
                    owner: '남궁건',
                    ownerId: 'aasgawgggasfweerwsfg',
                    posts: [
                        {title: '역시나테스트', creator: 'test', created: '2019-05-27', postId: 'hwawgagaggg234qwag'},
                        {title: '이것도테스트', creator: 'aa', created: '2019-05-27', postId: 'hwawgagaggasgwwgg'},
                        {title: '텥!슷!틑!', creator: 'aa', created: '2019-05-15', postId: '3asdf23rawrge5yw6t'},
                        {title: '이것은테스트', creator: 'tesdaqwt', created: '2019-05-25', postId: 'hwawga23451375ethgagggg'},
                        {title: '또또또테스트', creator: 't22est', created: '2019-05-26', postId: 'hwawga3245g3a5g534gg37372g'},
                    ],
                    todos: [
                        {content: '밥먹기', creator: 'asdfagasg'},
                        {content: '공부하기', creator: 'asdfagasg'},
                        {content: '운동하기', creator: 'asdfagasg'},
                        {content: '커피먹기', creator: 'asdfagasg'},
                        {content: '화장실가기', creator: 'asdfagasg'},
                    ]
                });
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    makeNewDiary: (title, callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });

    },
    removeDiary: (dirCode, callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    updateDiary: (dirCode, newTitle, callback)=>{

        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    shareDiary: (dirCode, targetId, callback)=>{

        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    unshareDiary: (dirCode, targetId, callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    getPost: (dirCode, postCode, callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            const data= {
                created: '2019-05-21',
                creator: 'ㅇㅇ',
                creatorId: 'dagweas78689as7df698as768df9as',
                title: 'This is test title',
                content: 'This is test content',
            };
            if(callback.success)
                callback.success(data);
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    writePost: (dirCode, title, content, current, callback)=>{

        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    removePost: (dirCode, targetPost, callback)=>{

        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },
    updatePost: (dirCode, targetPost, newTitle, newContent, callback)=>{
        return new Promise((resolve, reject)=>{
            window.setTimeout(()=>{
                resolve();
            }, 1500);
        }).then(response=>{
            if(callback.success) callback.success();
        }).catch(e=>{
            if(callback.fail) callback.fail(e);
        });
    },

};