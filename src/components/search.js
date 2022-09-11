import { useEffect } from "react";

const Search = ({posts, searchValue, setSearchValue, setFilteredPosts}) => {
    
    useEffect(() => {
        const postMatches = (post) => {
            const text = (post.title + post.description + post.location + post.author.username).toLowerCase();
            return text.includes(searchValue.toLowerCase());
        }
        setFilteredPosts(posts.filter(post => postMatches(post)))
    }, [searchValue, posts, setFilteredPosts])

    return (
        <div className="m-3">
            <input
            type="text"
            className="search"
            placeholder="Search for a post"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            ></input>
        </div>
    )
}

export default Search;