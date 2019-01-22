// creates an html block for a goal
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

function noGoalDOMObject() {
    const contentSpan = document.createElement('p');
    contentSpan.className = 'goal-content card-text';
    contentSpan.innerHTML = 'No reading goal has been set.';
  
    return contentSpan;
} 

function newGoalDOMObject() {
    const newGoalDiv = document.createElement('div');
    newGoalDiv.className = 'input-group';

    const newGoalContent = document.createElement('input');
    newGoalContent.setAttribute('type', 'text');
    newGoalContent.setAttribute('placeholder', 'Type a number here');
    newGoalContent.className = 'form-control';
    newGoalContent.setAttribute('id', 'read-goal-input')
    newGoalDiv.appendChild(newGoalContent);
  
    const newGoalButtonDiv = document.createElement('div');
    newGoalButtonDiv.className = 'input-group-append';
    newGoalDiv.appendChild(newGoalButtonDiv);
  
    const newGoalSubmit = document.createElement('button');
    newGoalSubmit.innerHTML = 'ADD GOAL';
    newGoalSubmit.className = 'btn btn-danger';
    newGoalSubmit.addEventListener('click', submitGoalHandler);
    newGoalButtonDiv.appendChild(newGoalSubmit);
  
    return newGoalDiv;
  }

function newAlertDOMObject() {
    const newAlertDiv = document.createElement('div');
    newAlertDiv.className = 'alert alert-success';
    newAlertDiv.innerText = 'Your goal has been added ';

    const newAlertContent = document.createElement('a');
    newAlertContent.setAttribute('href', '#');
    newAlertContent.setAttribute('data-dismiss', 'alert');
    newAlertContent.setAttribute('aria-label', 'close');
    newAlertContent.className = 'close';
    newAlertContent.innerHTML = '&times;';
    newAlertDiv.appendChild(newAlertContent);

    const check = document.createElement('i');
    check.className = "fa fa-check";
    newAlertDiv.appendChild(check);

    return newAlertDiv;
} 
  
// every time button is clicked, add goal
function submitGoalHandler() {
    const newGoalInput = document.getElementById('read-goal-input');
  
    const data = {
      content: parseInt(newGoalInput.value, 10).toString(10),
      goal_type: 'read'
    };
  
    post('/api/goal-read', data);
    newGoalInput.value = '';

    // show alert after button has been clicked
    document.getElementById('new-reading-goal').appendChild(newAlertDOMObject());
  }

function renderGoals(user, isProfile) {
    if (user._id !== undefined) {
        if (isProfile) {
            const goalsDiv = document.getElementById('my-goals');
            // get the most recent reading goal
            get('/api/one-goal-read', {'creator_id': user._id}).then(goal => {
                goalsDiv.prepend(goalDOMObject(goal));
            });       
                       
                
        } else {
            document.getElementById('new-reading-goal').appendChild(newGoalDOMObject());
        }
    };
};