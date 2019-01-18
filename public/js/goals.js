// fetch stories from our API and create HTML blocks to display their data

function newGoalDOMObject() {
    const newGoalDiv = document.createElement('div');
    newGoalDiv.className = 'input-group';

    const newGoalContent = document.createElement('input');
    newGoalContent.setAttribute('type', 'text');
    newGoalContent.setAttribute('placeholder', 'Type a number here');
    newGoalContent.className = 'form-control';
    newGoalContent.setAttribute('id', 'story-content-input')
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
    const newGoalInput = document.getElementById('story-content-input');
  
    const data = {
      content: parseInt(newGoalInput.value, 10),
    };
  
    // post('/api/story', data);
    newGoalInput.value = '';

    // show alert after button has been clicked
    document.getElementById('new-reading-goal').appendChild(newAlertDOMObject());
  }

function renderGoals(user) {
    if (user._id !== undefined)
        document.getElementById('new-reading-goal').appendChild(newGoalDOMObject());
    };