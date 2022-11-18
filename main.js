//variables
const mainSections = document.querySelectorAll('#mainSections section');
const navbar = document.querySelector('#navbar');
const navbarTitle = document.querySelector('#navbar h1');
const navbarTogglerButton = document.querySelector('#navbarToggler');
const links = document.querySelectorAll('#navbar #linksList li a');
const progressBar = document.querySelector('#progressBar');

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
	const group = document.querySelector('#navbar .group');

	// toggle class to show/hide menu
	group.classList.toggle('show');

	//if element has class show, change text of button to "Hide" and change aria expanded attr to true
	if (group.classList.contains('show')) {
		navbarTogglerButton.innerText = 'Hide';
		navbarTogglerButton.ariaExpanded = 'true';
	} else {
		//change back button to show if element has not class show and change aria expanded to false
		navbarTogglerButton.innerText = 'Show';
		navbarTogglerButton.ariaExpanded = 'false';
	}
};

//add click event to every link in the navbar menu so it close once its clicked
links.forEach((link) => {
	link.addEventListener('click', navbarToggler);
});

//add click event to the navbar button to open/close navbar menu
navbarTogglerButton.addEventListener('click', navbarToggler);

// function to update progress bar
const progressBarUpdater = () => {
	//gets number of pixels from the top of viewport and the scroll position
	const { scrollTop } = document.documentElement;

	//get the height of the mainSections element
	const { clientHeight } = mainSections[0].parentElement;

	const scrollPercent = `${
		(scrollTop / (clientHeight + window.innerHeight)) * 100
	}%`;

	progressBar.style.width = scrollPercent;
};

//add scroll event to update the progress bar
document.addEventListener('scroll', progressBarUpdater);
