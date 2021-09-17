import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editStory } from '../../store/stories';

const EditStoryForm = ({ story }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(story.title);
  const [imageUrl, setImageUrl] = useState(story.imageUrl);
  const [body, setBody] = useState(story.body);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateBody = (e) => setBody(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedStory;

    updatedStory = {
      title,
      imageUrl,
      body,
    }

    if (updatedStory) {
      dispatch(editStory(updatedStory, story.id));
    }
  };

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={updateTitle}
              required
              // placeholder="Title"
            />
          </label>
        </div>
        <div>
          <label>
            Image URL
            <input
              type="text"
              value={imageUrl}
              onChange={updateImageUrl}
              required
              // placeholder="Image URL"
            />
          </label>
        </div>
        <div>
          <label>
            New story
            <textarea
              value={body}
              onChange={updateBody}
              // placeholder="Type your story here."
              rows="7"
              cols="28"
              required
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStoryForm;
