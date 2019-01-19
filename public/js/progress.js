// this page doesn't fully work yet

// creates an html block for progress
function goalDOMObject(goalJSON) {
    const card = document.createElement('div');
    card.setAttribute('id', goalJSON._id);
    card.className = 'goal-card';
  
    const contentSpan = document.createElement('p');
    contentSpan.className = 'goal-content card-text';
    contentSpan.innerHTML = 'Read ' + goalJSON.content + ' pages by the end of the year.';
    card.appendChild(contentSpan);
  
    return card;
  }

// progress is an int
function progressDOMObject(progress) {
    const card = document.createElement('div');
    
}

<div class="progress">
    <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
</div>



function renderProgress(user) {
    if (user._id !== undefined) {            
        const progressDiv = document.getElementById('my-progress');
        const progress = 0;
        // get the reading progress
        get('/api/stories', {}).then(stories => {
            for (const story of stories) {
            progress = progress + parseInt(story['content']);
            }
            
        progressDiv.appendChild();
        });            
    };
};