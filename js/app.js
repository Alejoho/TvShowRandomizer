(function (app) {
    'use strict';

    const Session = Object.freeze({
        STUDY: 'study',
        RELAX: 'relax'
    });

    let studyLowerBound;
    let studyUpperBound;
    let relaxLowerBound;
    let relaxUpperBound;

    const settingsButton = document.getElementById('settings');

    app.startUp = function () {
        settingsButton.addEventListener('click', setBounds);

        getBounds();

        let session = getStarterSession();

        if (session === Session.STUDY) {
            startStudy();
        } else if (session === Session.RELAX) {
            startRelax();
        }
    }

    function getStarterSession() {
        let output;
        const value = Math.floor(Math.random() * 10);

        if (value % 2 === 0) {
            output = Session.STUDY;
        } else {
            output = Session.RELAX;
        }

        return output;
    }

    function getRandomTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function startStudy() {
        const time = getRandomTime(studyLowerBound, studyUpperBound);

        document.body.classList.remove('relax-bg');
        document.body.classList.add('study-bg');

        setTimeout(startRelax, time);
    }


    function startRelax() {
        const time = getRandomTime(studyLowerBound, studyUpperBound);        

        document.body.classList.remove('study-bg');
        document.body.classList.add('relax-bg');

        setTimeout(startStudy, time);
    }

    function getBounds() {
        studyLowerBound = localStorage.getItem('studyLowerBound') ?? 30_000;
        studyUpperBound = localStorage.getItem('studyUpperBound') ?? 90_000;
        relaxLowerBound = localStorage.getItem('relaxLowerBound') ?? 120_000;
        relaxUpperBound = localStorage.getItem('relaxUpperBound') ?? 180_000;
    }

    function setBounds() {
        do {
            if (studyLowerBound > studyUpperBound) {
                alert('The study upper bound cannot be lower than the study lower bound.');
            }

            studyLowerBound = getSeconds('What is the study lower bound in seconds?');
            studyUpperBound = getSeconds('What is the study upper bound in seconds?');
        } while (studyLowerBound > studyUpperBound)

        localStorage.setItem('studyLowerBound', studyLowerBound);
        localStorage.setItem('studyUpperBound', studyUpperBound);

        do {
            if (relaxLowerBound > relaxUpperBound) {
                alert('The relax upper bound cannot be lower than the relax lower bound.');
            }

            relaxLowerBound = getSeconds('What is the relax lower bound in seconds?');
            relaxUpperBound = getSeconds('What is the relax upper bound in seconds?');
        } while (relaxLowerBound > relaxUpperBound)
            
        localStorage.setItem('relaxLowerBound', relaxLowerBound);
        localStorage.setItem('relaxUpperBound', relaxUpperBound);
    }

    function getSeconds(message) {
        let output;
        do {
            let number = prompt(message);
            output = Number(number);
        } while (Number.isNaN(output))

        output = Math.floor(output) * 1000;

        return output;
    }
})(window.app = window.app || {});