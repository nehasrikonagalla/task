let selectedSkills = [];

const skillInput = document.getElementById("skillInput");
const suggestionsDiv = document.getElementById("suggestions");

// Step 1 → Step 2
document.getElementById("nextBtn").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const study = document.getElementById("study").value.trim();
    
    if(name && study){
        document.getElementById("homePage").style.display = "none";
        document.getElementById("skillsPage").style.display = "block";
    } else {
        alert("Please enter your name and current study!");
    }
});

// Show typed skill as suggestion dynamically
skillInput.addEventListener("keyup", (e) => {
    const value = e.target.value.trim();
    suggestionsDiv.innerHTML = "";
    if(value.length === 0) return;

    const div = document.createElement("div");
    div.classList.add("suggestion");
    div.innerText = value;
    div.onclick = () => addSkill(value);
    suggestionsDiv.appendChild(div);
});

// Add skill to selected list
function addSkill(skill){
    if(!selectedSkills.includes(skill)){
        selectedSkills.push(skill);
        document.getElementById("selectedSkills").innerHTML = selectedSkills.map(s => `<li>${s}</li>`).join("");
    }
    skillInput.value = "";
    suggestionsDiv.innerHTML = "";
}

// Generate career suggestions based on selected skills
document.getElementById("getCareerBtn").addEventListener("click", () => {
    if(selectedSkills.length === 0){
        alert("Select at least one skill or interest!");
        return;
    }
    document.getElementById("skillsPage").style.display = "none";
    document.getElementById("careerPage").style.display = "block";

    const careerScores = {
        "Machine Learning Engineer": 0,
        "Data Scientist": 0,
        "NLP Researcher": 0,
        "Computer Vision Engineer": 0,
        "Robotics AI Engineer": 0
    };

    selectedSkills.forEach(skill => {
        if(skill.toLowerCase().includes("machine learning") || skill.toLowerCase().includes("deep learning")) careerScores["Machine Learning Engineer"] += 2;
        if(skill.toLowerCase().includes("data science") || skill.toLowerCase().includes("python")) careerScores["Data Scientist"] += 2;
        if(skill.toLowerCase().includes("nlp")) careerScores["NLP Researcher"] += 3;
        if(skill.toLowerCase().includes("computer vision")) careerScores["Computer Vision Engineer"] += 3;
        if(skill.toLowerCase().includes("robotics")) careerScores["Robotics AI Engineer"] += 3;
    });

    const sortedCareers = Object.entries(careerScores).sort((a,b) => b[1]-a[1]);
    const resultsDiv = document.getElementById("careerResults");
    resultsDiv.innerHTML = "";
    sortedCareers.forEach(([career, score]) => {
        if(score>0){
            const card = document.createElement("div");
            card.classList.add("careerCard");
            card.innerText = career;
            resultsDiv.appendChild(card);
        }
    });
});
