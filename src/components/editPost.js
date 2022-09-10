import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { editPost } from "../api";

const EditPost = ({token, post, setIsEditMode}) => {
    const [newTitle, setNewTitle] = useState(post.title)
    const [newDescription, setNewDescription] = useState(post.description)
    const [newPrice, setNewPrice] = useState(post.price)
    const [newLocation, setNewLocation] = useState(post.location)
    const [newWillDeliver, setNewWillDeliver] = useState(post.willDeliver)
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await editPost(token, post._id, newTitle, newDescription, newPrice, newLocation, newWillDeliver);
            if (response) {
                setIsEditMode(false);
                //navigate(`/posts/${post._id}`, { replace: true });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    if (post.isAuthor) {
    return (
        
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title </label>
            <input type="text" name="title" value={newTitle} onChange={event => setNewTitle(event.target.value)} required></input>
            <label htmlFor="description">Description </label>
            <input type="text" name="description" value={newDescription} onChange={event => setNewDescription(event.target.value)} required></input>
            <label htmlFor="price">Price </label>
            <input type="text" name="price" value={newPrice} onChange={event => setNewPrice(event.target.value)} required></input>
            <label htmlFor="location">Location </label>
            <input type="text" name="location" value={newLocation} onChange={event => setNewLocation(event.target.value)}></input>
            <input type="checkbox" name="deliver" value={newWillDeliver} onChange={event => setNewWillDeliver(event.target.value)}></input>
            <label htmlFor="deliver">Willing to Deliver?</label>
            <button type="submit">DONE</button>
        </form>
    )
    }
}

export default EditPost;