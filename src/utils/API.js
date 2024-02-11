const URL_PREFIX="https://brilla-back-fb4c71e750bd.herokuapp.com"
// const URL_PREFIX = "http://localhost:3001"

const API = {
    login:userObj=>{
        return fetch(`${URL_PREFIX}/api/students/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("invalid login")
            }
            return res.json()
          })
    },
    signup:userObj=>{
        return fetch(`${URL_PREFIX}/api/students/`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("invalid signup")
            }
            return res.json()
          })
    },
    getIdByUserName: (token)=>{
        return fetch(`${URL_PREFIX}/api/students/findId/:studentusername`, {
            method: "get",
            headers: {
                "Authorization":`Bearer ${token}`
            }.then(res=>{
                if(!res.ok){
                    throw new Error("invalid name")
                }
                return res.json();
            })

        })
    },
    teacherlogin:userObj=>{
        return fetch(`${URL_PREFIX}/api/teachers/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("invalid login")
            }
            return res.json()
          })
    },
    teachersignup:userObj=>{
        return fetch(`${URL_PREFIX}/api/teachers/`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("invalid signup")
            }
            return res.json()
          })
    },
    getDataFromToken:token=>{
        return fetch(`${URL_PREFIX}/api/students/datafromtoken`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("invalid token")
            }
            return res.json()
          })
    },
    getSubject: (token) => {
        return fetch(`${URL_PREFIX}/api/subjects/student-subjects`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
            if (!res.ok) {
              console.error('Invalid token');
              throw new Error("Invalid token");
            }
            return res.text(); 
          })
          .then((text) => {
            console.log('getSubject Response Text:', text);
            const data = JSON.parse(text); 
            console.log('getSubject Data:', data);
            return data;
          })
          .catch((err) => {
            console.error('getSubject Error:', err);
            throw err;
          });
      },
    createSubject:(token,subjectObj)=>{
        return fetch(`${URL_PREFIX}/api/subjects`,{
            method:"POST",
            body:JSON.stringify(subjectObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot create")
            }
            return res.json()
          })
    },
    editSubject:(token,subjectId,subjectObj)=>{
        return fetch(`${URL_PREFIX}/api/subjects/${subjectId}`,{
            method:"PUT",
            body:JSON.stringify(subjectObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot edit")
            }
            return res.json()
          })
    },
    deleteSubject:(token,subjectId)=>{
        return fetch(`${URL_PREFIX}/api/subjects/${subjectId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot delete")
            }
            return res.json()
          })
        },
        getTopics:token=>{
            return fetch(`${URL_PREFIX}/api/topics`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then(res=>{
                if(!res.ok){
                 throw new Error("invalid token")
                }
                return res.json()
              })
        },
        createTopic:(token,topicObj)=>{
            return fetch(`${URL_PREFIX}/api/topics`,{
                method:"POST",
                body:JSON.stringify(topicObj),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }).then(res=>{
                if(!res.ok){
                 throw new Error("cannot create")
                }
                return res.json()
              })
        },
        editTopic:(token,topicId,topicObj)=>{
            return fetch(`${URL_PREFIX}/api/topics/${topicId}`,{
                method:"PUT",
                body:JSON.stringify(topicObj),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }).then(res=>{
                if(!res.ok){
                 throw new Error("cannot edit")
                }
                return res.json()
              })
        },
        deleteTopic:(token,topicId)=>{
            return fetch(`${URL_PREFIX}/api/topics/${topicId}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }).then(res=>{
                if(!res.ok){
                 throw new Error("cannot delete")
                }
                return res.json()
              })
            },
            getCards:token=>{
                return fetch(`${URL_PREFIX}/api/cards`,{
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                }).then(res=>{
                    if(!res.ok){
                     throw new Error("invalid token")
                    }
                    return res.json()
                  })
            },
            createCard:(token,cardObj)=>{
                return fetch(`${URL_PREFIX}/api/cards`,{
                    method:"POST",
                    body:JSON.stringify(cardObj),
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }).then(res=>{
                    if(!res.ok){
                     throw new Error("cannot create")
                    }
                    return res.json()
                  })
            },
            editCard:(token,cardId,cardObj)=>{
                return fetch(`${URL_PREFIX}/api/cards/${cardId}`,{
                    method:"PUT",
                    body:JSON.stringify(cardObj),
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }).then(res=>{
                    if(!res.ok){
                     throw new Error("cannot edit")
                    }
                    return res.json()
                  })
            },
            deleteCard:(token,cardId)=>{
                return fetch(`${URL_PREFIX}/api/cards/${cardId}`,{
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }).then(res=>{
                    if(!res.ok){
                     throw new Error("cannot delete")
                    }
                    return res.json()
                  })
                },
                sendCard:(token,cardObj)=>{
                    return fetch(`${URL_PREFIX}/api/cards/send/:cardId/:reciverId`,{
                        method:"POST",
                        body:JSON.stringify(cardObj),
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    }).then(res=>{
                        if(!res.ok){
                         throw new Error("cannot create")
                        }
                        return res.json()
                      })
                },
      
}


export default API