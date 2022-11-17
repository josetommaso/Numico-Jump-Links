//variables
const mainSections = document.querySelectorAll('#mainSections section');
const navbarTitle = document.querySelector('#navbar h1');

//options for the observer
const options = {
	threshold: 0.5,
};

//make a new instance of IntersectionObserver
const observer = new IntersectionObserver((entries) => {
	entries.forEach((element) => {
		//if section is in viewport
		if (element.isIntersecting) {
			//change the navigation title text with the h2 text
			navbarTitle.innerHTML = element.target.firstElementChild.innerText;
		}
	});
}, options);

mainSections.forEach((section) => {
	observer.observe(section);
});
