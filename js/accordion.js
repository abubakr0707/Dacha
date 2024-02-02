const faqContainer = document.querySelector('.faq-container');

faqContainer.addEventListener('click', handleClick);
function handleClick(event) {
    const answers = faqContainer.querySelectorAll('.faq-item p');
    let currentQuestionAnswer = event.target.closest('.faq-item').querySelector('p');
    // Убедимся что все ответы на вопросы скрыты прежде чем покажем одну из них
    for (const answer of answers) {
        if (answer !== currentQuestionAnswer) {
            answer.classList.add('hide');
        }
    }
    if (event.target.classList.contains('faq-question-bar')) {
        const question = event.target.querySelector('.faq-question');
        question.classList.toggle('text-primary');
        const answer = event.target.nextElementSibling;
        answer.classList.toggle('hide');
    } else if (event.target.classList.contains('faq-btn')) {
        const question = event.target.previousElementSibling;
        question.classList.toggle('text-primary');
        const parent = event.target.closest('.faq-question-bar');
        const answer = parent.nextElementSibling;
        answer.classList.toggle('hide');
    } else if (event.target.classList.contains('faq-question')) {
        const question = event.target;
        question.classList.toggle('text-primary');
        const parent = event.target.closest('.faq-question-bar');
        const answer = parent.nextElementSibling;
        answer.classList.toggle('hide');
    }
}
