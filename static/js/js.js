document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    showSlide(currentSlide);

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
});
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    slides[currentSlide].style.opacity = 1;

    setInterval(() => {
        slides[currentSlide].style.opacity = 0;
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = 1;
    }, 3000);

    const ctx = document.getElementById('myBarChart').getContext('2d');

    let myBarChart;
    const initChart = () => {
        myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Central', 'Eastern', 'North Eastern', 'Northern', 'Southern', 'Western'],
                datasets: [{
                    label: 'Number of Places',
                    data: [39, 45, 14, 89, 98, 40],
                    backgroundColor: [
                        'rgba(0, 0, 139, 0.7)', // Dark Blue
                        'rgba(255, 165, 0, 0.7)', // Orange
                        'rgba(255, 0, 0, 0.7)', // Red
                        'rgba(255, 255, 0, 0.7)', // Yellow
                        'rgba(0, 128, 0, 0.7)', // Green
                        'rgba(128, 0, 128, 0.7)' // Purple
                    ],
                    borderColor: [
                        'rgba(0, 0, 139, 1)', // Dark Blue
                        'rgba(255, 165, 0, 1)', // Orange
                        'rgba(255, 0, 0, 1)', // Red
                        'rgba(255, 255, 0, 1)', // Yellow
                        'rgba(0, 128, 0, 1)', // Green
                        'rgba(128, 0, 128, 1)' // Purple
                    ],
                    borderWidth: 1,
                    barThickness: 30 // Adjust the bar width
                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: 'black',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value, context) {
                            return value;
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 0
                }
            },
            plugins: [ChartDataLabels]
        });

        const animateCounts = () => {
            myBarChart.data.datasets[0].data.forEach((value, index) => {
                let count = 0;
                const target = value;
                const increment = Math.ceil(target / 30); // Increment step for animation
                const interval = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(interval);
                    }
                    myBarChart.data.datasets[0].data[index] = count;
                    myBarChart.update('none');
                }, 50); // Update interval
            });
        };

        setTimeout(animateCounts, 500); // Delay to start the count animation
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initChart();
                observer.disconnect(); // Stop observing after the chart is initialized
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(document.querySelector('.analysis-section'));
});
