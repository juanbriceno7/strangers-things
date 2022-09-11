import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addPost, fetchUserInfo } from "../api";

const AddPost = ({token, setUserInfo}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('[On Request]')
    const [willDeliver, setWillDeliver] = useState(false)
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await addPost(token, title, description, price, location, willDeliver);
            if (response) {
                const refetch = await fetchUserInfo(token);
                setUserInfo(refetch.data);
                navigate('/posts');
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    if (token !== '') {
        return (
            <div className="ms-5 mb-2">
                <header>
                    <h3>Add Post</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div className="row mb-2">
                        <label htmlFor="title" className="col-form-label">Title:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="title" onChange={event => setTitle(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="description" className="col-form-label">Description:</label>
                        <div className="col-sm-5">
                            <textarea className="form-control" id="description" onChange={event => setDescription(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="price" className="col-form-label">Price:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="price" onChange={event => setPrice(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <label htmlFor="location" className="col-form-label">Location:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="location" onChange={event => setLocation(event.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="willDeliver" 
                        onChange={event => event.target.value === 'on' ? 
                        setWillDeliver(true) :
                        setWillDeliver(false)}></input>
                        <label className="form-check-label" htmlFor="willDeliver">Willing to Deliver?</label>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Add Post</button>
                </form>
            </div>
        )
    }
    else {
        return <h1>Unauthorized</h1>
    }
}

export default AddPost;