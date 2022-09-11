import { useState } from "react"
import { editPost } from "../api";

const EditPost = ({token, post, setIsEditMode}) => {
    const [newTitle, setNewTitle] = useState(post.title)
    const [newDescription, setNewDescription] = useState(post.description)
    const [newPrice, setNewPrice] = useState(post.price)
    const [newLocation, setNewLocation] = useState(post.location)
    const [newWillDeliver, setNewWillDeliver] = useState(post.willDeliver)

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await editPost(token, post._id, newTitle, newDescription, newPrice, newLocation, newWillDeliver);
            if (response) {
                setIsEditMode(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    if (post.isAuthor) {
        return (
            <div className="ms-5 mb-2">
                <header>
                    <h3>Edit Post</h3>
                </header>
                <form onSubmit={submitHandler}>
                    <div className="row mb-2">
                        <label htmlFor="title" className="col-form-label">Title:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="title" value={newTitle} onChange={event => setNewTitle(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="description" className="col-form-label">Description:</label>
                        <div className="col-sm-5">
                            <textarea className="form-control" id="description" value={newDescription} onChange={event => setNewDescription(event.target.value)} required></textarea>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="price" className="col-form-label">Price:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="price" value={newPrice} onChange={event => setNewPrice(event.target.value)} required></input>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <label htmlFor="location" className="col-form-label">Location:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="location" value={newLocation} onChange={event => setNewLocation(event.target.value)}></input>
                        </div>
                    </div>
                    <div className="form-check mb-3">
                        {newWillDeliver ? 
                        <input className="form-check-input" type="checkbox" id="willDeliver" value={newWillDeliver} checked={true}
                        onChange={event => event.target.value === 'false' ? 
                        setNewWillDeliver(true) :
                        setNewWillDeliver(false)}></input>
                        :
                        <input className="form-check-input" type="checkbox" id="willDeliver" value={newWillDeliver}
                        onChange={event => event.target.value === 'false' ? 
                        setNewWillDeliver(true) :
                        setNewWillDeliver(false)}></input>
                        }
                        <label className="form-check-label" htmlFor="willDeliver">Willing to Deliver?</label>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditPost;