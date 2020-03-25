var store = [
    {question: 'What is the capital of Alabama?', 1: 'Montgomery', 2: 'Phoenix', 3: 'St. Louis', 4: 'Little Rock', answer: 'Little Rock'},
    {question: 'what is the capital of Colorado?', 1: 'Dover', 2: 'Boise', 3: 'Denver', 4: 'Indianapolis', answer: 'Denver'},
    {question: 'what is the capital of Missouri?', 1: 'Topeka', 2: 'Pierre', 3: 'Columbus', 4: 'Jefferson City', answer: 'Jefferson City'},
    {question: 'What is the capital of Rhode Island?', 1: 'Montgomery', 2: 'Juno', 3: 'Providence', 4: 'Lincoln', answer: 'Providence'},
    {question: 'What is the capital of South Carolina?', 1: 'Columbia', 2: 'Albany', 3: 'Boston', 4: 'Indianapolis', answer: 'Columbia'}
]; 
var correctCounter = 0; 
var currentQuestionNumber =0; 


function startQuiz (){
    $('.beginQuiz').on('click', '#beginQuizButton', function (event){ 
        event.preventDefault(); 
        $('.beginQuiz').addClass('hidden'); 
        generateQuestions(); 
        $('#0').removeClass('hidden');
        $('.questionNumber').removeClass('hidden').text(`You're on question ${currentQuestionNumber+1}/5`)
        $('.statsContainer').removeClass('hidden')
    })
}

function refreshQuestionNumber(){
    $('.questionNumber').empty().text(`You're on question ${currentQuestionNumber+1}/5`)

}

function refreshScore(){
    $('.currentScore').empty().text(`Your score is ${correctCounter}/${currentQuestionNumber+1}`)
}

function generateQuestions (){
    for (let i = 0; i<store.length; i++) {
        $('main').append(
            `<div class="inQuiz"> 
                <form id="${i}" class="hidden questionForm">
                    <label class="question">${store[i].question}</label>
                    <fieldset>
                        <label><input name="capital" id="capital1" type="radio" required value="${store[i][1]}">${store[i][1]}</label>
                        <label><input name="capital" id="capital2" type="radio" required value="${store[i][2]}">${store[i][2]}</label>
                        <label><input name="capital" id="capital3" type="radio" required value="${store[i][3]}">${store[i][3]}</label>
                        <label><input name="capital" id="capital4" type="radio" required value="${store[i][4]}">${store[i][4]}</label>
                        <button type="submit" id="submitAnswer" class="submitAnswer">Check Answer</button>
                    </fieldset>
                </form>
            </div>`
        )
    }
}

function checkAnswer () {
    $('main').on('submit', '.questionForm', function(event){
        event.preventDefault(); 
        if( store[$(this).attr('id')].answer === $(this).parent().find('input:checked').val() ){
            correctCounter++; 
            $('.questionResultContainer').addClass('true').removeClass('hidden'); 
            $('.questionResult').text('True'); 
        }  else {
            $('.questionResultContainer').addClass('false').removeClass('hidden'); 
            $('.questionResult').text('False'); 
            $(`#${currentQuestionNumber}`).find(`label:contains(${store[currentQuestionNumber].answer})`).css("border", "3px solid green"); 
        }; 
        $(this).find('.submitAnswer').text('Next Question').parent().parent().addClass('nextQuestion').removeClass('questionForm'); 
        $(this).removeClass('submitAnswer');  
        $('.currentScore').removeClass('hidden'); 
        refreshScore(); 
    })
}

function nextQuestion () {
    $('main').on('submit', '.nextQuestion', function(event){
        event.preventDefault(); 
        $('.nextQuestion').removeClass('nextQuestion');
        $(this).addClass('submitAnswer') 
        if( store[$(this).attr('id')].answer === $(this).find('input:checked').val() ){
            $('.questionResultContainer').removeClass('true').addClass('hidden'); 
            $('.questionResult').empty(); 
        }  else {
            $('.questionResultContainer').removeClass('false').addClass('hidden'); 
            $('.questionResult').empty(); 
        }; 
        $(`#${currentQuestionNumber}`).addClass('hidden'); 
        currentQuestionNumber++; 
        $(`#${currentQuestionNumber}`).removeClass('hidden');
        refreshQuestionNumber(); 

        if(currentQuestionNumber===5){
            $('main').addClass('hidden');
            $('.questionNumber').addClass('hidden');
            $('.currentScore').addClass('finishedQuiz');
            $('#startNewQuiz').removeClass('hidden');
        }
    });
}

function startNewQuiz(){
    $('header').on('click','#startNewQuiz', function(event){
        $('.inQuiz').remove(); 
        $('.beginQuiz').removeClass('hidden'); 
        $('main').removeClass('hidden'); 
        currentQuestionNumber=0; 
        correctCounter=0; 
        $('#startNewQuiz').addClass('hidden'); 
        $('.currentScore').addClass('hidden').removeClass('finishedQuiz')
    });
}

function handleEvents (){
    startQuiz(); 
    checkAnswer(); 
    nextQuestion(); 
    startNewQuiz(); 
}

$(handleEvents)