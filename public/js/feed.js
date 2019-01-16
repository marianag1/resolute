// fetch stories from our API and create HTML blocks to display their data

// example of a story object
// storyJSON = {'_id': '12345', 'creator_name': Mariana, 'content': 'I don't have class}

// creates an html block for a story
function storyDOMObject(storyJSON, user) {
    const card = document.createElement('div');
    card.setAttribute('id', storyJSON._id);
    card.className = 'story-card';
  
    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'story-creator card-title';
    creatorSpan.innerHTML = storyJSON.creator_name;
    creatorSpan.setAttribute('href', '/u/profile?' + storyJSON.creator_id);
    card.appendChild(creatorSpan);
  
    const contentSpan = document.createElement('p');
    contentSpan.className = 'story-content card-text';
    contentSpan.innerHTML = storyJSON.content;
    card.appendChild(contentSpan);
  
    return card;
  }

  function newStoryDOMObject() {
    const newStoryDiv = document.createElement('div');
    newStoryDiv.className = 'input-group';

    const newStoryContent = document.createElement('input');
    newStoryContent.setAttribute('type', 'text');
    newStoryContent.setAttribute('placeholder', 'What did you achieve today?');
    newStoryContent.className = 'form-control';
    newStoryContent.setAttribute('id', 'story-content-input')
    newStoryDiv.appendChild(newStoryContent);
  
    const newStoryButtonDiv = document.createElement('div');
    newStoryButtonDiv.className = 'input-group-append';
    newStoryDiv.appendChild(newStoryButtonDiv);
  
    const newStorySubmit = document.createElement('button');
    newStorySubmit.innerHTML = 'post';
    newStorySubmit.className = 'btn btn-danger';
    newStorySubmit.addEventListener('click', submitStoryHandler);
    newStoryButtonDiv.appendChild(newStorySubmit);
  
    return newStoryDiv;
  }
  
  function submitStoryHandler() {
    const newStoryInput = document.getElementById('story-content-input');
  
    const data = {
      content: newStoryInput.value,
    };
  
    post('/api/story', data);
    newStoryInput.value = '';
  }
  
  // // makes API requests and calls helper functions
  // function renderStories(user) {
  //   if (user._id !== undefined)
  //     document.getElementById('new-story').appendChild(newStoryDOMObject());
  
  //   const storiesDiv = document.getElementById('stories');
  //   get('/api/stories', {}, function(storiesArr) {
  //     for (let i = 0; i < storiesArr.length; i++) {
  //       const currentStory = storiesArr[i];
  //       storiesDiv.prepend(storyDOMObject(currentStory, user));
  //     }
  //   });
  // }

  function renderStories(user) {
    // allows to post new stories!
    document.getElementById('new-story').appendChild(newStoryDOMObject());
  
    const storiesDiv = document.getElementById('stories');
    get('/api/stories', {}, function(storiesArr) {
      for (let i = 0; i < storiesArr.length; i++) {
        const currentStory = storiesArr[i];
        storiesDiv.prepend(storyDOMObject(currentStory, user));
  
        get('/api/comment', { 'parent': currentStory._id }, function(commentsArr) {
          for (let j = 0; j < commentsArr.length; j++) {
            const currentComment = commentsArr[j];
            const commentDiv = document.getElementById(currentComment.parent + '-comments');
            commentDiv.appendChild(commentDOMObject(currentComment));
          }
        });
      }
    });
  }