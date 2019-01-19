// creates an html block for progress
// progress and maximum are strings of ints
function progressDOMObject(progress, maximum) {
    // do math
    const value_now = parseInt(progress)/parseInt(maximum)*100;

    const card = document.createElement('div');
    card.className = 'progress';
    const progressBar = document.createElement('div');
    progressBar.className = "progress-bar bg-success";
    progressBar.setAttribute('role', "progressbar");
    progressBar.setAttribute('style', "width: " + value_now.toString() + '%');
    progressBar.setAttribute('aria-valuenow', value_now.toString());
    progressBar.setAttribute('aria-valuemin', "0");
    progressBar.setAttribute('aria-valuemax', maximum);
    progressBar.innerHTML = value_now.toString() + "%";
    card.appendChild(progressBar); 

    return card;  
}

function renderProgress(user) {
    if (user._id !== undefined) {            
        const progressDiv = document.getElementById('my-progress');
        let progress = 0;
        // get the reading progress
        get('/api/user-stories', {}).then(stories => {
            for (const story of stories) {
                progress = progress + parseInt(story['content']);
            }

            // get the most recent reading goal (as a JSON?)
            get('/api/one-goal-read', {}).then(goal => {
                progressDiv.appendChild(progressDOMObject(progress.toString(), goal['content']));
            });              

        });
    };
};