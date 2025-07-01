class TeaSlider {
    constructor() {
        this.slides = [
            {
                src: './images/img-tea-first.png',
                alt: 'Gynostemma Tea',
                text: 'Often called asSouthern Ginseng, Gynostemma Pentaphyllum is an adaptogenic herb that helps your body manage stress while boosting energy naturally. Its sweet, earthy flavor contains compounds similar to ginseng but with more balanced effects. Regular consumption may support cardiovascular health and immune function.',
                title: 'Gynostemma Tea'
            },
            {
                src: './images/img-tea-second.png',
                alt: 'Oolong Tea',
                text: 'The champagne of teas, Oolong undergoes partial oxidation that creates complex floral notes with a honey-like finish. This traditional Chinese tea is prized for its metabolism-boosting properties and ability to promote healthy skin. The natural polyphenols may help regulate blood sugar levels.',
                title: 'Oolong Tea'
            },
            {
                src: './images/img-tea-third.png',
                alt: 'Green Tea',
                text: 'Steeped in tradition for centuries, premium green tea contains L-theanine for calm focus and EGCG for cellular protection. Our shade-grown leaves yield a vibrant emerald infusion with sweet, vegetal notes. The gentle caffeine provides clean energy without jitters, making it perfect for morning rituals.',
                title: 'Green Tea'
            },
            {
                src: './images/img-tea-fourth.png',
                alt: 'Herbal Tea',
                text: 'Our caffeine-free herbal infusion blends chamomile, hibiscus, and lemongrass for a naturally sweet, floral cup. This comforting blend soothes digestion after meals and promotes relaxation in the evenings. The vibrant ruby color comes from antioxidant-rich botanicals that support overall wellbeing.',
                title: 'Herbal Tea'
            },
            {
                src: './images/img-tea-first.png',
                alt: 'Gynostemma Tea',
                text: 'For tea enthusiasts seeking something extraordinary, our Gynostemma develops richer flavor with each steeping - revealing new layers of complexity. The rare saponins in this tea may support respiratory health and natural detoxification processes in the body.',
                title: 'Gynostemma Reserve'
            },
            {
                src: './images/img-tea-second.png',
                alt: 'Oolong Tea',
                text: 'Our high-mountain Oolong comes from century-old tea bushes grown in mineral-rich soil. The careful roasting process creates a creamy texture with notes of orchids and ripe peaches. Tea masters recommend this variety for its digestive benefits and mood-enhancing properties.',
                title: 'Imperial Oolong'
            },
            {
                src: './images/img-tea-third.png',
                alt: 'Green Tea',
                text: 'Hand-picked in early spring, these young tea leaves contain the highest concentration of amino acids for an umami-rich flavor profile. The stone-ground preparation preserves maximum nutrients, offering 10x the antioxidants of standard green tea with a smooth, brothy character.',
                title: 'Ceremonial Matcha'
            },
            {
                src: './images/img-tea-fourth.png',
                alt: 'Herbal Tea',
                text: 'This Ayurvedic-inspired blend combines turmeric, ginger, and holy basil for a warming, golden-hued infusion. The natural anti-inflammatory compounds may support joint health and immunity. A touch of black pepper enhances absorption of beneficial curcuminoids.',
                title: 'Golden Chai'
            }
        ];
        this.elements = {
            slideTrack: document.querySelector('.slide__track'),
            nextBtn: document.querySelector('.slider__btn-next'),
            prevBtn: document.querySelector('.slider__btn-prev'),
            modal: document.getElementById('modal'),
            modalText: document.getElementById('modalText'),
            closeModal: document.getElementById('closeModal')
        };

        this.state = {
            currentIndex: 0,
            cardWidth: 0,
            gap: 25,
            maxOffset: 0
        };

        this.init();
    }

    createSlideElement({ src, alt, text, title }) {
        return `
            <div class="slider__card">
                <div class="slider__card-content">
                    <img src="${src}" alt="${alt}">
                    <br>
                    <button class="open-modal" data-text="${text}">Read more</button>
                </div>
                <div class="slider__text">
                    <p>${title}</p>
                    <img src="./images/icon-bag.svg" alt="Bag Icon">
                </div>
            </div>
        `;
    }

    setupSlides() {
        const markup = this.slides.map(this.createSlideElement).join('');
        this.elements.slideTrack.innerHTML = markup;

        this.elements.slideTrack.querySelectorAll('.open-modal').forEach(btn => {
            btn.addEventListener('click', e => this.openModal(e.target.dataset.text));
        });
    }

    openModal(text) {
        if (this.elements.modal && this.elements.modalText) {
            this.elements.modalText.textContent = text;
            this.elements.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.elements.modal) {
            this.elements.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    calculateDimensions() {
        const card = this.elements.slideTrack.querySelector('.slider__card');
        if (!card) return;

        this.state.cardWidth = card.offsetWidth + this.state.gap;
        const containerWidth = this.elements.slideTrack.parentElement.offsetWidth;
        const totalWidth = this.slides.length * this.state.cardWidth - this.state.gap;
        this.state.maxOffset = Math.max(0, totalWidth - containerWidth);
    }

    updateNavButtons() {
        const offset = this.state.currentIndex * this.state.cardWidth;
        const { prevBtn, nextBtn } = this.elements;

        prevBtn.disabled = offset <= 0;
        nextBtn.disabled = offset >= this.state.maxOffset;

        [prevBtn, nextBtn].forEach(btn => {
            btn.style.opacity = btn.disabled ? '0.6' : '1';
            btn.style.cursor = btn.disabled ? 'not-allowed' : 'pointer';
        });
    }

    moveToIndex(index) {
        const offset = Math.min(index * this.state.cardWidth, this.state.maxOffset);
        this.state.currentIndex = Math.round(offset / this.state.cardWidth);

        this.elements.slideTrack.style.transition = 'transform 0.4s ease-in-out';
        this.elements.slideTrack.style.transform = `translateX(-${offset}px)`;

        this.updateNavButtons();
    }

    setupEventListeners() {
        const { nextBtn, prevBtn, modal, closeModal } = this.elements;

        nextBtn?.addEventListener('click', () => this.moveToIndex(this.state.currentIndex + 1));
        prevBtn?.addEventListener('click', () => this.moveToIndex(this.state.currentIndex - 1));
        closeModal?.addEventListener('click', () => this.closeModal());

        modal?.addEventListener('click', e => {
            if (e.target === modal) this.closeModal();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal?.classList.contains('active')) {
                this.closeModal();
            }
        });

        window.addEventListener('resize', () => {
            this.calculateDimensions();
            this.moveToIndex(this.state.currentIndex);
        });
    }

    init() {
        this.setupSlides();

        setTimeout(() => {
            this.calculateDimensions();
            this.updateNavButtons();
        }, 100);

        this.setupEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => new TeaSlider());
