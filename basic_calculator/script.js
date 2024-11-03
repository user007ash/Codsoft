// Wait for the DOM to fully load
window.onload = function() {
    const goToCalculatorButton = document.getElementById('goToCalculator');
    const homeButton = document.getElementById('homeBtn');

    // Add event listener for "Go to Calculator" button
    goToCalculatorButton.addEventListener('click', function() {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'flex';
    });

    // Add event listener for "Home" button
    homeButton.addEventListener('click', function() {
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page1').style.display = 'flex';
    });

    // Initialize the sphere animation
    initSphere();

    // Animate the welcome text
    const text = new SplitText("#welcomeText", { type: "lines, words, chars" });
    gsap.from(text.chars, {
        duration: 0.5,
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });

    // Set up ScrollTrigger for the transition
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#page1", {
        scrollTrigger: {
            trigger: "#page1",
            start: "bottom top", // When the bottom of page1 hits the top of the viewport
            end: "bottom top",
            scrub: true, // Smooth scrolling
            onEnter: () => {
                gsap.to("#page1", { opacity: 0 });
                gsap.to("#page2", { opacity: 1 });
            }
        }
    });
};

// Function to clear the display (for the calculator)
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to append value to the display (for the calculator)
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to calculate the result (for the calculator)
function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

// Initialize the WebGL sphere in the background
function initSphere() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.PointsMaterial({
        color: 0x3A6D8C, // Teal color from the palette
        size: 0.1,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 10;

    const animate = function () {
        requestAnimationFrame(animate);
        points.rotation.y += 0.01; // Rotate the sphere
        renderer.render(scene, camera);
    };

    animate();
}
