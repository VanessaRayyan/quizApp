var currentQuestion = 0;
let score = 0;

function clickToStart() {
    $('#presentSurface').on('click', '#start', function (event){
        event.preventDefault();
        currentQuestion = 1;
        score = 0;
        questionRender();
    });
}

function questionScoreUpdate() {
    $('.questionCounter span').text(currentQuestion);
    $('.scoreCounter span').text(score);
}

function startScreenRender() {
    $('#presentSurface').html($(`  <fieldset>
        <legend id="welcome">Welcome to the continent quiz!</legend>
             <div id="startsubmit">
             <input id="start" type="submit" value="Click here to start">
             </div>
        </fieldset>`
    ));    
}


function questionRender() {
    let question = questions[currentQuestion-1];
    questionScoreUpdate();
    $('#presentSurface').html($(  `<p>${question.question}</p>
        <fieldset>
            
            <div  class="container">
                <input id="answer_1" name="answers" type="radio" value="${question.answers[0]}">
                <label for="answer_1">${question.answers[0]}</label>
            </div>
            
            <div  class="container">
                <input id="answer_2" name="answers" type="radio" value="${question.answers[1]}">
                <label for="answer_2">${question.answers[1]}</label>
            </div>

            <div class="container">
                <input id="answer_3" name="answers" type="radio" value="${question.answers[2]}">
                <label for="answer_3">${question.answers[2]}</label>
            </div>
            
            <div class="container">
                <input id="answer_4" name="answers" type="radio" value="${question.answers[3]}">
                <label for="answer_4">${question.answers[3]}</label>
            </div>
            
            <div>
                <button id="submit">Submit</button>
            </div>

        </fieldset>`));
}

function answerCheck() {
    $('#presentSurface').on('click', '#submit', function (event){
        event.preventDefault();
        let actionButton = $('#submit');
        if (actionButton.text() == 'Submit'){
            let answerElement = $("[name='answers']:checked");
            let chosenAnswer = answerElement.val();
            console.log(chosenAnswer);
            if (chosenAnswer == undefined) {
                alert('Please select an answer');
                return;
            }
            let question = questions[currentQuestion-1];
            if (chosenAnswer == question.answer){
                $(answerElement).parent().append('<div class="correctAnswer">That is the correct answer!</div>');
                score++;  
            } else {
                $(answerElement).parent().append('<div class="incorrectAnswer">That is incorrect.<br>The correct answer is ' + question.answer + '</div>');  
            }
            actionButton.text('Next >');
            $("[name='answers']").attr('disabled', true);
        } else {
            if (currentQuestion<questions.length){
                currentQuestion++;
                questionRender();
            } else {
                endScreenRender();
            }
            
        }
    });
}

function endScreenRender(){
    $('#presentSurface').html($(`<p>Your score is ${score}/${questions.length}<br> Great job!<br><br>
    <input id="start" type="submit" value="Restart quiz"></p>`));
    questionScoreUpdate();
}

function eventHandler() {
    startScreenRender();
    clickToStart();
    answerCheck();
}

$(eventHandler);