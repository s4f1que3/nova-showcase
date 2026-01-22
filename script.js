// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this.querySelector('img'));
        });
    });

    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

function openLightbox(img) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img src="${img.src}" alt="${img.alt}">
            <p class="image-caption">${img.alt}</p>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add lightbox styles if not already present
    if (!document.getElementById('lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            .lightbox {
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }

            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: zoomIn 0.3s ease-out;
            }

            .lightbox-content img {
                max-width: 100%;
                max-height: 85vh;
                object-fit: contain;
                border-radius: 8px;
                margin-bottom: 15px;
            }

            .image-caption {
                color: white;
                font-size: 1.1rem;
                text-align: center;
                max-width: 90vw;
            }

            .close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 2.5rem;
                font-weight: bold;
                color: white;
                cursor: pointer;
                transition: color 0.2s ease;
                z-index: 1001;
            }

            .close:hover {
                color: #ffd700;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Close button functionality
    lightbox.querySelector('.close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    }
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
