//variables
const mainSections = document.querySelectorAll('#mainSections section');
const navbar = document.querySelector('#navbar');
const navbarTitle = document.querySelector('#navbar h1');
const navbarTogglerButton = document.querySelector('#navbarToggler');
const links = document.querySelectorAll('#navbar #linksList li a');

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

// initialize observer in each main section
mainSections.forEach((section) => {
	observer.observe(section);
});

//navbar functionality

const navbarToggler = () => {
	const group = navbar.lastElementChild;
	group.classList.toggle('show');

	if (group.classList.contains('show')) {
		navbarTogglerButton.innerText = 'Hide';
		navbarTogglerButton.ariaExpanded = 'true';
	} else {
		navbarTogglerButton.innerText = 'Show';
		navbarTogglerButton.ariaExpanded = 'false';
	}
};

links.forEach((link) => {
	link.addEventListener('click', navbarToggler);
});
navbarTogglerButton.addEventListener('click', navbarToggler);
