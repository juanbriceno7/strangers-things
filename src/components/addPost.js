import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addPost } from "../api";

const AddPost = (props) => {
    const token = props.token;
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
                navigate('/', { replace: true });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title </label>
            <input type="text" name="title" onChange={event => setTitle(event.target.value)} required></input>
            <label htmlFor="description">Description </label>
            <input type="text" name="description" onChange={event => setDescription(event.target.value)} required></input>
            <label htmlFor="price">Price </label>
            <input type="text" name="price" onChange={event => setPrice(event.target.value)} required></input>
            <label htmlFor="location">Location </label>
            <input type="text" name="location" onChange={event => setLocation(event.target.value)}></input>
            <input type="checkbox" name="deliver" onChange={event => event.target.value === 'on' ? 
            setWillDeliver(true) :
            setWillDeliver(false)}></input>
            <label htmlFor="deliver">Willing to Deliver?</label>
            <button type="submit">Create</button>
        </form>
    )
}

export default AddPost;