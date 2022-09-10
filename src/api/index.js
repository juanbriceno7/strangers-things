const BASE_URL = 'https://strangers-things.herokuapp.com/api/2206-ftb-pt-web-pt'

export async function login(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        const result = await response.json();
        if (result.success) {
            return result.data.token;
        }
        else {
            alert(result.error.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function register(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        const result = await response.json();
        if (result.success) {
            return result.data.token;
        }
        else {
            alert(result.error.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchUserInfo(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.success) {
            return result;
        }
        else {
            alert(result.error.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function fetchAllPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        const result = await response.json();
        return result.data.posts;
    } catch (err) {
        throw err;
    }
}

export async function fetchAllPostsAuthenticated(token) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        if (result.success) {
            return result.data.posts;
        }
        else {
            console.log(result);
            alert(result.error.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function addMessage(postId, content, token) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content
                }
            })
        })
        const result = await response.json();
        if (result.success) {
            return true;
        }
        else {
            alert(result.error.message);
            return false;
        }
    }
    catch (err) {
        console.error(err);
    }
}

export async function addPost(token, title, description, price, location, willDeliver) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const result = await response.json();
        if (result.success) {
            return true;
        }
        else {
            alert(result.error.message);
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function editPost(token, postId, title, description, price, location, willDeliver) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        });
        const result = await response.json();
        if (result.success) {
            return true;
        }
        else {
            console.error(result.error.message);
            return false;
        }
    } 
    catch (err) {
        console.error(err)
    }
}

export async function deletePost(postId, token) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.success) {
            return true;
        }
        else {
            alert(result.error.message);
            return false;
        }
    } 
    catch (err) {
        console.error(err)
    }
}

export async function testLogin(token) {
    try {
        console.log(token);
        const response = await fetch(`${BASE_URL}/test/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (result.data) {
            console.log(result.data.message); 
        }
        else {
            console.error(result.error.message); 
        }
    } catch (err) {
        throw err;
    }
}
