document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const popup = document.getElementById('welcome-popup');
    const mainContent = document.getElementById('main-content');
    const magazine = document.getElementById('magazine');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const pageIndicator = document.getElementById('page-indicator');
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const orderButton = document.getElementById('order-button');

    let pageFlip = null;

    // --- POPUP LOGIC ---
    startBtn.addEventListener('click', () => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.classList.add('hidden');
            mainContent.classList.remove('hidden');
            initMagazine();
            initGallery();
        }, 500);
    });

    // --- MAGAZINE LOGIC ---
    const catalogImages = [
        'precios-arte_page-0006.webp',
        'precios-arte_page-0002.webp',
        'precios-arte_page-0003.webp',
        'precios-arte_page-0004.webp',
        'precios-arte_page-0005.webp',
        'precios-arte_page-0006.webp'
    ];

    function initMagazine() {
        magazine.innerHTML = '';
        
        catalogImages.forEach((img, index) => {
            const page = document.createElement('div');
            page.className = 'page';
            if (index === 0) page.dataset.density = 'hard';
            
            // Build WhatsApp message for specific catalog page
            const message = encodeURIComponent(`Hola, me interesa encargar el cuadro que aparece en la página ${index + 1} de tu catálogo`);
            const waLink = `https://wa.me/584144504581?text=${message}`;

            page.innerHTML = `
                <div class="page-content">
                    <img src="${img}" alt="Página ${index + 1}" loading="eager">
                    <div class="page-order-overlay">
                        <a href="${waLink}" target="_blank" class="page-order-link">
                            Pedir info <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            `;
            magazine.appendChild(page);
        });

        const isMobile = window.innerWidth <= 1024;
        const width = isMobile ? window.innerWidth * 0.95 : 500;
        const height = isMobile ? window.innerHeight * 0.7 : 700;

        const PageFlipClass = window.St ? window.St.PageFlip : (window.PageFlip ? window.PageFlip : null);
        
        if (!PageFlipClass) return;

        pageFlip = new PageFlipClass(magazine, {
            width: width,
            height: height,
            size: "fixed",
            minWidth: 320,
            maxWidth: 1000,
            minHeight: 450,
            maxHeight: 1400,
            showCover: !isMobile,
            mobileScrollSupport: true,
            usePortrait: isMobile,
            startPage: 0,
            flippingTime: 1000,
            useMouseEvents: true,
            clickEventForward: false
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        pageFlip.on('flip', (e) => {
            const pageNum = e.data + 1;
            pageIndicator.innerText = `Página ${pageNum} de ${catalogImages.length}`;
        });

        prevBtn.addEventListener('click', () => pageFlip.flipPrev());
        nextBtn.addEventListener('click', () => pageFlip.flipNext());
        
        fullscreenBtn.addEventListener('click', () => {
            if (magazine.requestFullscreen) {
                magazine.requestFullscreen();
            }
        });

        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 1024;
            const newWidth = newIsMobile ? window.innerWidth * 0.95 : 500;
            const newHeight = newIsMobile ? window.innerHeight * 0.7 : 700;
            
            pageFlip.update({
                width: newWidth,
                height: newHeight,
                usePortrait: newIsMobile,
                showCover: !newIsMobile
            });
        });
    }

    // --- GALLERY LOGIC ---
    const galleryItems = [
        'bonsai.jpeg', 'caballo.jpeg', 'charcoal.jpeg', 'crossover.jpeg', 
        'crossover2.jpeg', 'ghibli.jpeg', 'gojo.jpeg', 'gojo2.jpeg', 
        'goku.jpeg', 'hope}.jpeg', 'ichigo.jpeg', 'ironman.jpeg', 
        'itachi.jpeg', 'jinx.jpeg', 'levi.jpeg', 'luffy.jpeg', 
        'luffycerezo.jpeg', 'morganfreeman.jpeg', 'retrato.jpeg', 
        'sailormoon.jpeg', 'spiderman.jpeg', 'starrynight.jpeg', 
        'vino.jpeg', 'zenitsu.jpeg'
    ];

    function initGallery() {
        galleryGrid.innerHTML = '';
        galleryItems.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const title = img.split('.')[0].replace(/[_\-}]/g, ' ');
            
            item.innerHTML = `
                <img src="${img}" alt="${title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${title.charAt(0).toUpperCase() + title.slice(1)}</h3>
                    <p>Colección Premium</p>
                </div>
            `;
            
            item.addEventListener('click', () => {
                lightboxImg.src = img;
                
                // Update Order Button with specific item name
                const itemName = title.charAt(0).toUpperCase() + title.slice(1);
                const message = encodeURIComponent(`Hola, quiero encargar un cuadro de: ${itemName}`);
                orderButton.href = `https://wa.me/584144504581?text=${message}`;
                
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
            
            galleryGrid.appendChild(item);
        });
    }

    // --- LIGHTBOX CLOSE ---
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});
