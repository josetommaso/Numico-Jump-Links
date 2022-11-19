const mainSections = document.querySelectorAll('#mainSections section');
const navbar = document.querySelector('#navbar');
const navbarTitle = document.querySelector('#navbar h1');
const navbarTogglerButton = document.querySelector('#navbarToggler');
const links = document.querySelectorAll('#navbar #linksList li a');
const progressBar = document.querySelector('#progressBar');
const navbarMenu = document.querySelector('#navbarMenu');

const options = {
	threshold: 0.5,
};

/*
 * makes a new observer instance in each mainSection
 */
const observer = new IntersectionObserver((entries) => {
	entries.forEach((section) => {
		if (section.isIntersecting) {
			navbarTitle.innerHTML = section.target.firstElementChild.innerText; // if section in viewport changes navbar title
		}
	});
}, options);

mainSections.forEach((section) => {
	observer.observe(section); // Initialize observer in each section
});

/*
 * Shows and hide navigation menu
 * changes button text and aria-expanded attribute value
 */
const navbarToggler = () => {
	navbarMenu.classList.toggle('show');

	if (navbarMenu.classList.contains('show')) {
		navbarTogglerButton.innerText = 'Hide';
		navbarTogglerButton.ariaExpanded = 'true';
		navbarMenu.style.maxHeight = `${navbarMenu.scrollHeight}px`;
	} else {
		navbarTogglerButton.innerText = 'Show';
		navbarTogglerButton.ariaExpanded = 'false';
		navbarMenu.style.maxHeight = '0px';
	}
};

//scroll animation with gsap
const scrollToView = (link) => {
	const href = link.hash;
	gsap.to(window, {
		duration: 3,
		scrollTo: { y: href, offsetY: navbar.scrollHeight - 3 },
		ease: 'power2',
	});
};

const progressBarUpdater = () => {
	const { scrollTop } = document.documentElement; // number of pixels from top of viewport and scroll position

	const { scrollHeight, offsetTop } = mainSections[0].parentElement; // height of #mainSections element and position

	let scrollPercent = ((scrollTop - offsetTop) / scrollHeight) * 100; // Calculate scroll % of #mainSection

	scrollPercent = scrollPercent.toFixed(1); //remove decimals from calculation

	if (scrollPercent >= 0 || scrollPercent <= 100) {
		//update progress bar if % is more than 0 and less than 100
		progressBar.style.width = `${scrollPercent}%`;
	}
};

/* Event listeners */
links.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();

		navbarToggler(); // close navigation menu when link is clicked

		setTimeout(() => {
			scrollToView(link); // scroll to section after 450ms
		}, 450);
	});
});

navbarTogglerButton.addEventListener('click', navbarToggler); // close navigation menu when nav button is clicked
document.addEventListener('scroll', progressBarUpdater); //fire progressBar function on scroll
