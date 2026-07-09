// Event listeners för navigering
console.log("🚀 Script loading...");

const portfolio = document.querySelector(".kvitto-svg-container");
const KognitivetVideoLink = document.getElementsByClassName("KognitivetVideoLink");
const KognitivetMusicLink = document.getElementsByClassName("KognitivetMusicLink");
const Kognitivet_Video_and_Music_Link = document.getElementsByClassName("Kognitivet_Video_and_Music_Link");
const VideosKognitivetContainer = document.getElementById("VideosKognitivetContainer");
const MusicKognitivetContainer = document.getElementById("MusicKognitivetContainer");
const ImageDesignContainer = document.getElementById("ImageDesignContainer");
const WebDesignContainer = document.getElementById("WebDesignContainer");
const LaserEngravingContainer = document.getElementById("LaserEngravingContainer");
const CaseStudyContainer = document.getElementById("CaseStudyContainer");
const UXDesignContainer = document.getElementById("UXDesignContainer");
const AnimationDesignContainer = document.getElementById("AnimationDesignContainer");
const ImageDesignLink = document.getElementsByClassName("ImageDesignLink");
const BackArrows = document.querySelectorAll(".back_arrow");
const crumbleVideos = document.querySelectorAll(".crumbleVideoClass");

// Web Development projekt variabler
const projectPreviews = document.getElementById("project-previews");
const projectDetail = document.getElementById("project-detail");
const projectDetailContent = document.getElementById("project-detail-content");
let currentProjects = [];

// Laser engraving projekt variabler
const laserProjectPreviews = document.getElementById("laser-project-previews");
const laserProjectDetail = document.getElementById("laser-project-detail");
const laserProjectDetailContent = document.getElementById("laser-project-detail-content");
let currentLaserProjects = [];

// Case study variabler
const caseStudyContent = document.getElementById("case-study-content");
const caseStudyTitle = CaseStudyContainer?.querySelector(".white_title");
const CASE_STUDIES = {
    clsr: 'cases/clsr/case.json',
    Sthlm: 'cases/sthlm_foodwine/case.json'
};
const caseStudyCache = {};

const WEB_PROJECT_LINKS = {
    'Skärholmens Pall': 'https://www.skarholmenspall.se/',
    'Skarholmens Pall': 'https://skarholmenspall.com',
    'InköpsListan': 'https://inkopslistan-836ab.web.app',
    'Helfer AB': 'https://www.helfer.se/',
    'DG Development': 'https://www.dgd.solutions/',
    'ATMO STUDIOS - Cloud Based Music Platform': 'https://musiktjaenst.web.app/',
    'Make Your Own Spotify Wrapped': 'https://spotifyslapped.netlify.app/',
    'Pepsi vs Coca Cola Interactive': 'https://lovely-biscuit-5a5b09.netlify.app/',
    'Candy Store': 'https://godis-grisen-8rnk.vercel.app/',
    'Arcade Game': 'https://arcade-game-1.vercel.app/'
};

const webProjectGallery = {
    basePath: 'webdev',
    groups: [
        {
            name: 'Web Applications',
            folder: 'web_apps',
            subfolders: ['skarholmens_pall', 'inkopslistan', 'atmo_studios']
        },
        {
            name: 'Websites',
            folder: 'webpages',
            subfolders: ['dg_development', 'hasams_redovisning', 'helfer', 'skarholmens_pall']
        },
        {
            name: 'Hobby Projects',
            folder: 'work_in_progress',
            subfolders: ['3d_models_web', 'spotify_wrapped', '8bit_game']
        }
    ],
    groupOrder: ['Web Applications', 'Websites', 'Hobby Projects'],
    projectLinks: WEB_PROJECT_LINKS,
    getProjects: () => currentProjects,
    setProjects: (projects) => { currentProjects = projects; },
    elements: {
        previews: projectPreviews,
        detail: projectDetail,
        detailContent: projectDetailContent
    }
};

const laserProjectGallery = {
    basePath: 'laserengraving',
    useWebp: false,
    assignmentTypes: {
        products: { label: 'Produkt', className: 'assignment-product' },
        signage: { label: 'Skylt', className: 'assignment-signage' },
        events: { label: 'Event', className: 'assignment-event' }
    },
    groups: [
        {
            name: 'Laserprojekt',
            sources: [
                {
                    folder: 'events',
                    subfolders: ['boursin_open']
                },
                {
                    folder: 'signage',
                    subfolders: ['barskylt', 'gatupratare']
                },
                {
                    folder: 'products',
                    subfolders: ['skarbrada', 'bordsdekor', 'glasunderlagg', 'snus_hif']
                }
            ]
        }
    ],
    groupOrder: ['Laserprojekt'],
    projectLinks: {},
    getProjects: () => currentLaserProjects,
    setProjects: (projects) => { currentLaserProjects = projects; },
    elements: {
        previews: laserProjectPreviews,
        detail: laserProjectDetail,
        detailContent: laserProjectDetailContent
    }
};

// Logga container-status vid sidladdning
console.log("📊 Container status check:");
console.log("VideosKognitivetContainer:", VideosKognitivetContainer?.style.display || "not found");
console.log("MusicKognitivetContainer:", MusicKognitivetContainer?.style.display || "not found");
console.log("ImageDesignContainer:", ImageDesignContainer?.style.display || "not found");
console.log("WebDesignContainer:", WebDesignContainer?.style.display || "not found");
console.log("LaserEngravingContainer:", LaserEngravingContainer?.style.display || "not found");
console.log("CaseStudyContainer:", CaseStudyContainer?.style.display || "not found");
console.log("UXDesignContainer:", UXDesignContainer?.style.display || "not found");
console.log("AnimationDesignContainer:", AnimationDesignContainer?.style.display || "not found");

// Ta bort video-skapandet från början av filen och ersätt med:
const crumbleVideo = document.getElementById('crumbleVideo');
const crumbleVideoReverse = document.getElementById('crumbleVideoReverse');
if (!crumbleVideo || !crumbleVideoReverse) {
    console.error('Could not find crumbleVideo element');
}

function preloadCrumbleVideos() {
    [crumbleVideo, crumbleVideoReverse].filter(Boolean).forEach((video) => {
        video.preload = 'auto';
        video.load();
    });
}

function waitForCrumbleVideoReady(video) {
    if (!video || video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const finish = () => {
            video.removeEventListener('canplaythrough', finish);
            video.removeEventListener('error', finish);
            resolve();
        };
        video.addEventListener('canplaythrough', finish, { once: true });
        video.addEventListener('error', finish, { once: true });
        video.load();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCrumbleVideos);
} else {
    preloadCrumbleVideos();
}

// Global flagga för att förhindra samtidiga animationer
let isTransitionPlaying = false;

const KVITTO_TEXT_FADE_MS = 400;

function getKvittoSvgDoc() {
    const svgObject = document.querySelector('.kvitto-svg');
    if (!svgObject?.contentDocument) return null;
    return svgObject.contentDocument;
}

function getKvittoTextLayer(svgDoc = getKvittoSvgDoc()) {
    return svgDoc?.getElementById('text') ?? null;
}

function prepareKvittoTextLayer(svgDoc) {
    const textLayer = getKvittoTextLayer(svgDoc);
    if (!textLayer) return;
    textLayer.style.transition = `opacity ${KVITTO_TEXT_FADE_MS}ms ease`;
    if (!textLayer.style.opacity) textLayer.style.opacity = '1';
}

function waitForOpacityTransition(element) {
    return new Promise((resolve) => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            element.removeEventListener('transitionend', onEnd);
            resolve();
        };
        const onEnd = (event) => {
            if (event.target === element && event.propertyName === 'opacity') finish();
        };
        element.addEventListener('transitionend', onEnd);
        setTimeout(finish, KVITTO_TEXT_FADE_MS + 80);
    });
}

async function fadeKvittoTextOut() {
    const textLayer = getKvittoTextLayer();
    if (!textLayer) return;
    prepareKvittoTextLayer();
    const fade = waitForOpacityTransition(textLayer);
    textLayer.style.opacity = '0';
    await fade;
}

async function fadeKvittoTextIn() {
    const textLayer = getKvittoTextLayer();
    if (!textLayer) return;
    prepareKvittoTextLayer();
    const fade = waitForOpacityTransition(textLayer);
    textLayer.style.opacity = '1';
    await fade;
}

function waitForNextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

const PAGE_FADE_TOTAL_MS = 2000;
const PAGE_FADE_ITEM_MS = 650;

function getContainerFadeItems(container) {
    if (!container) return [];

    const selectors = [
        '.back_arrow',
        '.project-group-header',
        '.project-preview',
        '.project-detail-header',
        '.project-technologies',
        '.project-detail-description',
        '.project-image-wrap',
        '.project-image',
        '.technology-tag',
        '.video',
        '.IphoneVideo',
        'h1', 'h2', 'h3', 'p', 'a', 'button', 'li', 'img', 'video', 'table', 'tr', 'td', 'th'
    ].join(', ');

    const nodes = Array.from(new Set(container.querySelectorAll(selectors)));
    if (nodes.length === 0) return Array.from(container.children);

    return nodes.filter((el) => el.offsetParent !== null);
}

function fadeInContainerElements(container, totalMs = PAGE_FADE_TOTAL_MS) {
    const items = getContainerFadeItems(container);
    if (!items.length) return;

    const stepMs = Math.max(20, Math.floor(totalMs / Math.max(items.length, 1)));
    const cleanupAfter = totalMs + PAGE_FADE_ITEM_MS + 120;

    items.forEach((item) => {
        item.style.transition = 'none';
        item.style.transitionDelay = '0ms';
        item.style.opacity = '0';
    });

    requestAnimationFrame(() => {
        items.forEach((item, index) => {
            item.style.transition = `opacity ${PAGE_FADE_ITEM_MS}ms ease`;
            item.style.transitionDelay = `${Math.min(index * stepMs, totalMs)}ms`;
            item.style.opacity = '1';
        });
    });

    setTimeout(() => {
        items.forEach((item) => {
            item.style.transition = '';
            item.style.transitionDelay = '';
        });
    }, cleanupAfter);
}

function hideKvittoTextInstant() {
    const textLayer = getKvittoTextLayer();
    if (!textLayer) return;
    textLayer.style.transition = 'none';
    textLayer.style.opacity = '0';
}

// Hjälpfunktion för att spela animationen och hantera övergångar
async function playTransitionAnimation(callback) {
    if (!crumbleVideo) {
        callback();
        return;
    }

    // Om en animation redan spelar, ignorera denna förfrågan
    if (isTransitionPlaying) {
        console.log('Animation already playing, skipping...');
        return;
    }

    isTransitionPlaying = true;

    // Om video redan spelar, vänta tills den är klar eller avbryt den
    if (!crumbleVideo.paused) {
        try {
            crumbleVideo.pause();
        } catch (e) {
            // Ignorera fel vid paus
        }
    }

    try {
        if (portfolio) {
            portfolio.style.transition = '';
            portfolio.style.display = 'flex';
            portfolio.style.opacity = '1';
        }

        // Text fadear ut innan Pre-comp.mp4 startar
        await fadeKvittoTextOut();

        await waitForCrumbleVideoReady(crumbleVideo);
        crumbleVideo.currentTime = 0;
        crumbleVideo.style.display = 'block';
        await crumbleVideo.play();

        await new Promise(resolve => {
            crumbleVideo.onended = resolve;
        });

        // Dölj kvitto innan videon tas bort – annars blinkar papperslagret
        // en frame när videon försvinner och SVG:n syns igen under den.
        if (portfolio) {
            portfolio.style.transition = 'none';
            portfolio.style.opacity = '0';
            portfolio.style.display = 'none';
        }

        crumbleVideo.style.display = 'none';
        crumbleVideo.currentTime = 0;

        callback();
    } catch (error) {
        console.error('Video playback failed:', error);
        const textLayer = getKvittoTextLayer();
        if (textLayer) textLayer.style.opacity = '1';
        callback();
    } finally {
        isTransitionPlaying = false;
    }
}


// Hjälpfunktion för att spela animationen och hantera övergångar
async function playTransitionAnimationReverse(callback) {
    if (!crumbleVideoReverse) {
        callback();
        return;
    }

    // Om en animation redan spelar, ignorera denna förfrågan
    if (isTransitionPlaying) {
        console.log('Animation already playing, skipping reverse...');
        return;
    }

    isTransitionPlaying = true;

    // Om video redan spelar, vänta tills den är klar eller avbryt den
    if (!crumbleVideoReverse.paused) {
        try {
            crumbleVideoReverse.pause();
        } catch (e) {
            // Ignorera fel vid paus
        }
    }

    hideKvittoTextInstant();
    if (portfolio) portfolio.style.display = 'none';

    try {
        await waitForCrumbleVideoReady(crumbleVideoReverse);
        crumbleVideoReverse.currentTime = 0;
        crumbleVideoReverse.style.display = 'block';
        await crumbleVideoReverse.play();
        await new Promise(resolve => {
            crumbleVideoReverse.onended = resolve;
        });

        // Visa SVG-lagret först och ta bort videon först nästa frame
        // för att undvika ett svart glapp mellan lagerbytet.
        callback();
        await waitForNextFrame();

        crumbleVideoReverse.style.display = 'none';
        crumbleVideoReverse.currentTime = 0;

        // Text fadear in först när Pre-comp-reverse.mp4 är klar
        await fadeKvittoTextIn();
    } catch (error) {
        console.error('Reverse video playback failed:', error);
        callback();
        await waitForNextFrame();
        await fadeKvittoTextIn();
    } finally {
        isTransitionPlaying = false;
    }
}

// Funktion för att uppdatera video höjden
function updateVideoHeight() {
    const portfolioHeight = portfolio.offsetHeight;
    crumbleVideos.forEach(video => {
        video.style.height = `${portfolioHeight + 20}px`;
    });
}

// Uppdatera höjden när sidan laddas
updateVideoHeight();

// Uppdatera höjden om fönstret ändrar storlek
window.addEventListener('resize', updateVideoHeight);

// Uppdatera back arrow event listener
BackArrows.forEach((BackArrow) => {
  BackArrow.addEventListener('click', async (event) => {
    console.log("BackArrow clicked");
    
    // Kolla om vi är i WebDesignContainer och i projekt-detaljvy
    if (WebDesignContainer && WebDesignContainer.style.display === "flex") {
        if (projectDetail && projectDetail.style.display === "block") {
            console.log("🔙 Går tillbaka från web-projekt-detalj till projekt-lista");
            showProjectPreviews();
            return;
        }
    }

    // Kolla om vi är i LaserEngravingContainer och i projekt-detaljvy
    if (LaserEngravingContainer && LaserEngravingContainer.style.display === "flex") {
        if (laserProjectDetail && laserProjectDetail.style.display === "block") {
            console.log("🔙 Går tillbaka från laser-projekt-detalj till projekt-lista");
            showLaserProjectPreviews();
            return;
        }
    }
    
    // Göm först alla containers
    const containers = [
        VideosKognitivetContainer,
        MusicKognitivetContainer,
        ImageDesignContainer,
        WebDesignContainer,
        LaserEngravingContainer,
        CaseStudyContainer,
        UXDesignContainer,
        AnimationDesignContainer
    ];
    
    containers.forEach(container => {
        if (container) {
            console.log("🔙 Hiding container:", container.id);
            container.style.display = "none";
            
            if (container.id === "WebDesignContainer") {
                showProjectPreviews();
            }
            if (container.id === "LaserEngravingContainer") {
                showLaserProjectPreviews();
            }
            if (container.id === "CaseStudyContainer" && caseStudyContent) {
                caseStudyContent.innerHTML = "";
            }
        }
    });
    
    // Städa upp physics om det behövs
    if (window.currentPhysics) {
        cleanupPhysics(
            window.currentPhysics.engine,
            window.currentPhysics.render,
            window.currentPhysics.runner
        );
        window.currentPhysics = null;
    }

    // Spela reverse animationen och visa portfolio efter
    await playTransitionAnimationReverse(() => {
        portfolio.style.transition = "";
        portfolio.style.display = "flex";
        portfolio.style.position = "fixed";
        portfolio.style.top = "50%";
        portfolio.style.left = "50%";
        portfolio.style.transform = "translate(-50%, -50%)";
        portfolio.style.width = "100vw";
        portfolio.style.height = "100vh";
        portfolio.style.alignItems = "center";
        portfolio.style.justifyContent = "center";
        portfolio.style.zIndex = "1";
        portfolio.style.opacity = "1";
    });
  });
});

// Navigation event listeners för olika sektioner
for (let i = 0; i < KognitivetVideoLink.length; i++) {
  KognitivetVideoLink[i].addEventListener('click', (event) => {
    console.log("KognitivetVideoLink clicked");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        VideosKognitivetContainer.style.display = "flex";
        fadeInContainerElements(VideosKognitivetContainer);
    });
  });
}

for (let i = 0; i < KognitivetMusicLink.length; i++) {
  KognitivetMusicLink[i].addEventListener('click', (event) => {
    console.log("KognitivetMusicLink clicked");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        MusicKognitivetContainer.style.display = "flex";
        fadeInContainerElements(MusicKognitivetContainer);
    });
  });
}

for (let i = 0; i < Kognitivet_Video_and_Music_Link.length; i++) {
  Kognitivet_Video_and_Music_Link[i].addEventListener('click', (event) => {
    console.log("Kognitivet_Video_and_Music_Link clicked");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        MusicKognitivetContainer.style.display = "flex";
        VideosKognitivetContainer.style.display = "flex";
        fadeInContainerElements(MusicKognitivetContainer);
        fadeInContainerElements(VideosKognitivetContainer);
    });
  });
}

for (let i = 0; i < ImageDesignLink.length; i++) {
    ImageDesignLink[i].addEventListener('click', (event) => {
        console.log("ImageDesignLink clicked");
        playTransitionAnimation(async () => {
            // Visa efter animationen är klar
            ImageDesignContainer.style.display = "flex";
            fadeInContainerElements(ImageDesignContainer);
            setTimeout(async () => {
                await initPhysics();
            }, 200);
        });
    });
}

// Kopiera till urklipp funktion
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const messageElement = document.getElementById('copied-message');
        messageElement.style.display = 'block';
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

// Video hover info box hantering
document.addEventListener('DOMContentLoaded', function() {
    const infoBox = document.getElementById('video-info-box');
    const videos = document.querySelectorAll('#VideosKognitivet .video, .IphoneVideo');
    const container = document.getElementById('VideosKognitivet');

    videos.forEach(video => {
        // Mousemove event för info box
        video.addEventListener('mousemove', (e) => {
            // Samla contribution data
            const tasks = [];
            if (video.dataset.music === "true") tasks.push("Music");
            if (video.dataset.filming === "true") tasks.push("Filming");
            if (video.dataset.editing === "true") tasks.push("Editing");
            if (video.dataset.directing === "true") tasks.push("Directing");

            // Uppdatera info box innehåll
            infoBox.querySelector('.info-content').innerHTML = `
                <h3 class="Contribution">Contribution</h3>
                <ul>
                    ${tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            `;

            // Positionera info box
            infoBox.style.display = 'block';
            infoBox.style.left = (e.clientX + 15) + 'px';
            infoBox.style.top = (e.clientY + 15) + 'px';
        });

        video.addEventListener('mouseleave', () => {
            infoBox.style.display = 'none';
        });
    });
});

// Lazy load Matter.js
async function loadMatterJS() {
    if (!window.Matter) {
        console.log("🔄 Loading Matter.js dynamically...");
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
        console.log("✅ Matter.js loaded successfully");
    }
}

// Physics engine initialisering och setup
async function initPhysics() {
    // Ladda Matter.js först om det inte redan är laddat
    await loadMatterJS();
    
    // Matter.js moduler
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // Skapa physics engine och setup
    const engine = Engine.create();
    const container = document.getElementById('ImageDesign');

    // Renderer setup
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    // Mouse interaction setup
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.01,
            render: { visible: false },
            angularStiffness: 0.01,
            length: 0.1,
            damping: 1
        },
        collisionFilter: {
            mask: 0x0001
        },
        stiffness: 0.1,
        maxForce: 0.1
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Skapa väggar för physics world
    const walls = [
        // Botten vägg
        Bodies.rectangle(window.innerWidth/2, window.innerHeight + 30, window.innerWidth, 60, { 
            isStatic: true,
            render: { visible: false },
            friction: 0.5,
            restitution: 0.1,
            slop: 0.1,        // Minska genomträngning
            density: 1,       // Öka densitet för bättre kollision
            chamfer: { radius: 0 }
        }),
        // Vänster vägg
        Bodies.rectangle(-50, window.innerHeight/2, 100, window.innerHeight, { 
            isStatic: true,
            render: { visible: false },
            friction: 0.5,
            restitution: 0.1
        }),
        // Höger vägg
        Bodies.rectangle(window.innerWidth + 50, window.innerHeight/2, 100, window.innerHeight, { 
            isStatic: true,
            render: { visible: false },
            friction: 0.5,
            restitution: 0.1
        })
    ];

    Composite.add(engine.world, walls);

    // Deklarera arrays och hämta bilder
    const bodies = [];
    const images = document.querySelectorAll('.design-image');
    const originalSizes = new Map();

    // Lägg till i början av initPhysics
    let isAnyCentered = false;

    // Skapa en temporär canvas för att analysera bildens alpha-kanal
    function createPhysicsBody(img) {
        // Validera att bilden har giltiga dimensioner
        if (!img.naturalWidth || !img.naturalHeight || img.naturalWidth === 0 || img.naturalHeight === 0) {
            console.warn('Bild har ogiltiga dimensioner:', img.src, 'naturalWidth:', img.naturalWidth, 'naturalHeight:', img.naturalHeight);
            return;
        }
        
        // Beräkna maximal storlek baserat på både bredd och höjd
        const maxWidth = window.innerWidth / 3;
        const maxHeight = window.innerHeight / 3;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        // Beräkna dimensioner som passar inom båda begränsningarna
        let width = Math.min(img.naturalWidth, maxWidth);
        let height = width / aspectRatio;
        
        // Om höjden är för stor, justera baserat på höjd istället
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }
        
        // Spara original storlek
        originalSizes.set(img.src, { width, height });
        
        const startY = 100;

        // Skapa en temporär canvas för att analysera bildens alpha-kanal
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Validera canvas-storlek innan getImageData
        if (canvas.width === 0 || canvas.height === 0) {
            console.warn('Canvas har ogiltiga dimensioner:', canvas.width, 'x', canvas.height);
            return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Samla punkter från bildens kanter
        const points = [];
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Sampla punkter med ett intervall för bättre prestanda
        const sampleInterval = 5;
        for (let y = 0; y < canvas.height; y += sampleInterval) {
            for (let x = 0; x < canvas.width; x += sampleInterval) {
                const alpha = data[((y * canvas.width + x) * 4) + 3];
                if (alpha > 127) { // Om pixeln inte är transparent
                    points.push({ x: x, y: y });
                }
            }
        }

        // Använd Matter.Bodies.fromVertices direkt med punkterna
        const body = Bodies.fromVertices(
            Math.random() * (window.innerWidth - width - 200) + width/2 + 100,
            startY,
            [points.map(p => ({
                x: p.x * (width / img.naturalWidth),
                y: p.y * (height / img.naturalHeight)
            }))],
            {
                render: {
                    sprite: {
                        texture: img.src,
                        xScale: width / img.naturalWidth,
                        yScale: height / img.naturalHeight
                    }
                },
                restitution: 0.2,
                friction: 0.1,
                density: 0.001,
                frictionAir: 0.01,
                slop: 0.05,
                collisionFilter: {
                    category: 0x0001,
                    mask: 0xFFFFFFFF
                }
            }
        );

        // Lägg till dubbelklick detektion
        let mouseDownTime = 0;
        let isDragging = false;

        Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
            const mousePosition = event.mouse.position;
            
            if (Matter.Bounds.contains(body.bounds, mousePosition)) {
                mouseDownTime = Date.now();
                isDragging = false;
            }
        });

        Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
            if (mouseDownTime > 0) {
                isDragging = true;
            }
        });

        Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
            const mouseUpTime = Date.now();
            const clickDuration = mouseUpTime - mouseDownTime;
            
            if (!isDragging && clickDuration < 150 && !isAnyCentered) { // Lägg till kontroll för isAnyCentered
                const originalSize = originalSizes.get(body.render.sprite.texture);
                const scaleFactor = 1.2;
                
                isAnyCentered = true; // Sätt flaggan när en bild centreras
                
                // Spara ursprungliga värden
                const startAngle = body.angle;
                const startPos = { x: body.position.x, y: body.position.y };
                const targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
                
                const animationDuration = 500;
                const startTime = Date.now();
                
                // Stoppa all rörelse
                Matter.Body.setVelocity(body, { x: 0, y: 0 });
                Matter.Body.setAngularVelocity(body, 0);
                body.isStatic = true;
                
                // Animera allt tillsammans
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / animationDuration, 1);
                    
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    // Animera rotation
                    const currentAngle = startAngle + (0 - startAngle) * easeProgress;
                    Matter.Body.setAngle(body, currentAngle);
                    
                    // Animera position
                    const currentX = startPos.x + (targetPos.x - startPos.x) * easeProgress;
                    const currentY = startPos.y + (targetPos.y - startPos.y) * easeProgress;
                    Matter.Body.setPosition(body, { x: currentX, y: currentY });
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setTimeout(() => {
                            Matter.Body.setPosition(body, {
                                x: window.innerWidth / 2,
                                y: window.innerHeight / 2
                            });
                            Matter.Body.scale(body, 1, 1);
                            body.isStatic = false;
                            isAnyCentered = false; // Återställ flaggan när animeringen är klar
                        }, 1000);
                    }
                };
                
                animate();
            }
            
            mouseDownTime = 0;
            isDragging = false;
        });

        bodies.push(body);
        Composite.add(engine.world, body);
    }

    // Skapa physics bodies för alla bilder
    images.forEach(img => {
        if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            createPhysicsBody(img);
        } else {
            img.addEventListener('load', () => {
                // Dubbelkolla att bilden verkligen är laddad med giltiga dimensioner
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                    createPhysicsBody(img);
                } else {
                    console.warn('Bild laddades men har ogiltiga dimensioner:', img.src);
                }
            });
        }
        img.style.display = 'none';
    });

    // Hover effekt för bilderen 
    Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
        const mousePosition = event.mouse.position;
        bodies.forEach(body => {
            const distance = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mousePosition));
            if (distance < 100) {
                Matter.Body.applyForce(body, body.position, {
                    x: 0,
                    y: -0.003
                });
            }
        });
    });

    // Rotationshantering för bilder
    Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        const mousePosition = event.mouse.position;
        bodies.forEach(body => {
            const vertices = body.vertices;
            const center = body.position;
            
            const distanceToCenter = Matter.Vector.magnitude(
                Matter.Vector.sub(mousePosition, center)
            );
            
            if (distanceToCenter > Math.min(body.bounds.max.x - body.bounds.min.x, 
                                          body.bounds.max.y - body.bounds.min.y) * 0.4) {
                body.inertia = body.mass * 1000;
            }
        });
    });

    // Återställ rotation vid släpp
    Matter.Events.on(mouseConstraint, 'mouseup', function() {
        bodies.forEach(body => {
            body.inertia = Infinity;
        });
    });

    // Gravitation setup
    engine.world.gravity.y = 1;
    engine.world.gravity.scale = 0.001;  // Dubbla gravitationen tillbaka till original

    // Spara runner referensen
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Spara referenser globalt
    window.currentPhysics = {
        engine: engine,
        render: render,
        runner: runner
    };

    // Window resize hantering
    window.addEventListener('resize', function() {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Render.setPixelRatio(render, window.devicePixelRatio);
    });
}

// Lägg till en cleanup funktion
function cleanupPhysics(engine, render, runner) {
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
    Matter.Render.stop(render);
    Matter.Runner.stop(runner);
    render.canvas.remove();
}

function createPhysicsVideo(videoElement) {
    // Validera att videon har giltiga dimensioner
    if (!videoElement.videoWidth || !videoElement.videoHeight || videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        console.warn('Video har ogiltiga dimensioner:', videoElement.src, 'videoWidth:', videoElement.videoWidth, 'videoHeight:', videoElement.videoHeight);
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    // Validera canvas-storlek innan getImageData
    if (canvas.width === 0 || canvas.height === 0) {
        console.warn('Video canvas har ogiltiga dimensioner:', canvas.width, 'x', canvas.height);
        return;
    }

    // Rita videon på canvas
    ctx.drawImage(videoElement, 0, 0);

    // Samla punkter från canvas (liknande som med bilder)
    const points = [];
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sampla punkter
    for (let y = 0; y < canvas.height; y += 5) {
        for (let x = 0; x < canvas.width; x += 5) {
            const alpha = data[((y * canvas.width + x) * 4) + 3];
            if (alpha > 127) {
                points.push({ x: x, y: y });
            }
        }
    }

    // Skapa fysikobjekt
    const body = Bodies.fromVertices(
        Math.random() * (window.innerWidth - 200) + 100,
        100,
        [points.map(p => ({ x: p.x, y: p.y }))],
        {
            render: {
                sprite: {
                    texture: videoElement.src,
                    xScale: 1,
                    yScale: 1
                }
            }
        }
    );

    Composite.add(engine.world, body);
}

function caseImageUrl(caseFolder, fileName) {
    const folderPath = caseFolder.split('/').map(encodeURIComponent).join('/');
    return `${folderPath}/${encodeURIComponent(fileName)}`;
}

function renderCaseImageItems(images = [], caseFolder = '') {
    return images.map((image) => `
        <div class="case-gallery-item">
            <img src="${caseImageUrl(caseFolder, image.src)}" alt="${image.caption || 'Case image'}" loading="lazy">
            ${image.caption ? `<p class="case-caption">${image.caption}</p>` : ''}
        </div>
    `).join('');
}

function renderCaseComparisons(comparisons = [], caseFolder = '') {
    return comparisons.map((pair) => `
        <article class="case-comparison-pair">
            ${pair.title ? `<h4 class="case-comparison-title">${pair.title}</h4>` : ''}
            <div class="case-comparison-grid">
                <div class="case-comparison-item case-comparison-live">
                    <span class="case-comparison-label">Live</span>
                    <img src="${caseImageUrl(caseFolder, pair.live.src)}" alt="${pair.live.caption || 'Live result'}" loading="lazy">
                    ${pair.live.caption ? `<p class="case-caption">${pair.live.caption}</p>` : ''}
                </div>
                <div class="case-comparison-item case-comparison-concept">
                    <span class="case-comparison-label">Concept</span>
                    <img src="${caseImageUrl(caseFolder, pair.concept.src)}" alt="${pair.concept.caption || 'Concept'}" loading="lazy">
                    ${pair.concept.caption ? `<p class="case-caption">${pair.concept.caption}</p>` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

function renderCaseStudy(data, caseFolder) {
    if (!caseStudyContent) return;

    const metaItems = [
        { label: 'Client', value: data.client },
        { label: 'Year', value: data.year },
        { label: 'Role', value: data.role },
        { label: 'Duration', value: data.duration },
        { label: 'Location', value: data.location }
    ].filter(item => item.value && item.value !== 'TODO');

    const deliverables = (data.deliverables || []).map(item => `<li>${item}</li>`).join('');
    const tools = (data.tools || []).map(item => `<li>${item}</li>`).join('');
    const team = (data.team || []).map(item => `<li>${item}</li>`).join('');
    const processSteps = (data.process || []).map((step) => `
        <article class="case-process-step">
            <h4>${step.title}</h4>
            <p>${step.body}</p>
            ${step.images?.length ? `<div class="case-gallery">${renderCaseImageItems(step.images, caseFolder)}</div>` : ''}
        </article>
    `).join('');

    caseStudyContent.innerHTML = `
        <article class="case-study">
            <section class="case-hero">
                <img src="${caseImageUrl(caseFolder, data.hero)}" alt="${data.title}" loading="lazy">
                <h1 class="case-title">${data.title}</h1>
                <p class="case-subtitle">${data.subtitle || ''}</p>
                <p>${data.summary || ''}</p>
            </section>

            ${metaItems.length ? `
                <section class="case-meta-grid">
                    ${metaItems.map((item) => `
                        <div class="case-meta-item">
                            <p class="case-meta-label">${item.label}</p>
                            <p class="case-meta-value">${item.value}</p>
                        </div>
                    `).join('')}
                </section>
            ` : ''}

            <section class="case-section">
                <h3>Brief</h3>
                <p>${data.brief || ''}</p>
            </section>

            ${data.comparisons?.length ? `
                <section class="case-section case-comparisons">
                    <h3>${data.comparisonsTitle || 'Concept to live'}</h3>
                    ${data.comparisonsIntro ? `<p>${data.comparisonsIntro}</p>` : ''}
                    ${renderCaseComparisons(data.comparisons, caseFolder)}
                </section>
            ` : ''}

            ${deliverables ? `
                <section class="case-section">
                    <h3>Deliverables</h3>
                    <ul class="case-list">${deliverables}</ul>
                </section>
            ` : ''}

            ${tools ? `
                <section class="case-section">
                    <h3>Tools</h3>
                    <ul class="case-list">${tools}</ul>
                </section>
            ` : ''}

            ${team ? `
                <section class="case-section">
                    <h3>Team & Collaboration</h3>
                    <ul class="case-list">${team}</ul>
                </section>
            ` : ''}

            ${processSteps ? `
                <section class="case-section">
                    <h3>Process</h3>
                    ${processSteps}
                </section>
            ` : ''}

            ${data.gallery?.length ? `
                <section class="case-section">
                    <h3>Final Gallery</h3>
                    <div class="case-gallery">${renderCaseImageItems(data.gallery, caseFolder)}</div>
                </section>
            ` : ''}

            ${data.result ? `
                <section class="case-section">
                    <h3>Result</h3>
                    <p>${data.result}</p>
                </section>
            ` : ''}

            ${data.testimonial ? `
                <section class="case-section">
                    <h3>Client Feedback</h3>
                    <p>${data.testimonial}</p>
                </section>
            ` : ''}

            ${data.learnings ? `
                <section class="case-section">
                    <h3>Learnings</h3>
                    <p>${data.learnings}</p>
                </section>
            ` : ''}
        </article>
    `;
}

async function loadCaseStudy(kvittoId) {
    if (!CASE_STUDIES[kvittoId]) return null;
    if (caseStudyCache[kvittoId]) return caseStudyCache[kvittoId];

    const url = CASE_STUDIES[kvittoId];
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not load case study: ${url}`);
    }

    const data = await response.json();
    const caseFolder = url.split('/').slice(0, -1).join('/');
    const result = { data, caseFolder };
    caseStudyCache[kvittoId] = result;
    return result;
}

function showCaseStudy(kvittoId) {
    console.log(`📚 showCaseStudy() called for ${kvittoId}`);
    playTransitionAnimation(async () => {
        try {
            const payload = await loadCaseStudy(kvittoId);
            if (!payload) return;
            if (caseStudyTitle) caseStudyTitle.textContent = payload.data.title || 'Case study';
            renderCaseStudy(payload.data, payload.caseFolder);
            CaseStudyContainer.style.display = "flex";
            fadeInContainerElements(CaseStudyContainer);
        } catch (error) {
            console.error(`Kunde inte visa case study för ${kvittoId}:`, error);
        }
    });
}

function openWebProjectByTitle(projectTitle) {
    console.log(`🌐 Opening web project from kvitto: ${projectTitle}`);
    playTransitionAnimation(async () => {
        WebDesignContainer.style.display = "flex";
        await loadProjects();
        const projectIndex = currentProjects.findIndex(project => project.title === projectTitle);
        if (projectIndex >= 0) {
            showProjectDetail(projectIndex);
        } else {
            console.warn(`Projekt hittades inte: ${projectTitle}`);
            showProjectPreviews();
        }
        fadeInContainerElements(WebDesignContainer);
    });
}

// SVG Interactivity — klick styrs via lager-id i kvitto.svg (paths, inte <text>)
const KVITTO_ROW_ACTIONS = {
    web_x5F_dev: () => showWebDesignContainer(),
    visual_x5F_design: () => showImageDesignContainer(),
    video: () => showVideosKognitivetContainer(),
    laser: () => showLaserEngravingContainer(),
    music: () => showMusicKognitivetContainer(),
    skarholmens: () => openWebProjectByTitle('Skarholmens Pall'),
    DG_x5F_dev: () => openWebProjectByTitle('DG Development'),
    clsr: () => showCaseStudy('clsr'),
    Sthlm: () => showCaseStudy('Sthlm'),
};

const KVITTO_EMAIL_ID = 'email';

document.addEventListener('DOMContentLoaded', function() {
    const svgObject = document.querySelector('.kvitto-svg');
    if (!svgObject) return;

    const setup = () => {
        const svgDoc = svgObject.contentDocument;
        if (svgDoc) {
            prepareKvittoTextLayer(svgDoc);
            addSVGInteractivity(svgDoc);
        }
    };

    svgObject.addEventListener('load', setup);
    if (svgObject.contentDocument) setup();
});

function bindKvittoRow(svgDoc, groupId, onClick) {
    const group = svgDoc.getElementById(groupId);
    if (!group) return;

    const hitTarget = group.querySelector('rect.st5') || group;
    const visualPaths = group.querySelectorAll('path');

    hitTarget.style.cursor = 'pointer';
    hitTarget.style.pointerEvents = 'all';

    visualPaths.forEach((path) => {
        path.style.transition = 'opacity 0.3s ease';
        path.style.pointerEvents = 'all';
    });

    const dim = () => visualPaths.forEach((path) => { path.style.opacity = '0.45'; });
    const reset = () => visualPaths.forEach((path) => { path.style.opacity = '1'; });

    hitTarget.addEventListener('mouseenter', dim);
    hitTarget.addEventListener('mouseleave', reset);
    hitTarget.addEventListener('click', onClick);
}

function addSVGInteractivity(svgDoc) {
    Object.entries(KVITTO_ROW_ACTIONS).forEach(([groupId, action]) => {
        bindKvittoRow(svgDoc, groupId, action);
    });

    bindKvittoRow(svgDoc, KVITTO_EMAIL_ID, () => {
        window.location.href = 'mailto:victordegeer96@gmail.com';
    });

    // Bakåtkompatibilitet om äldre kvitto med text + st2 finns kvar
    svgDoc.querySelectorAll('rect.st2').forEach((rect) => {
        const parentGroup = rect.closest('g');
        if (!parentGroup) return;
        rect.style.cursor = 'pointer';
        rect.addEventListener('mouseenter', () => {
            parentGroup.querySelectorAll('text, tspan').forEach((el) => { el.style.opacity = '0.3'; });
        });
        rect.addEventListener('mouseleave', () => {
            parentGroup.querySelectorAll('text, tspan').forEach((el) => { el.style.opacity = '1'; });
        });
    });
}

function projectImageUrl(basePath, folder, fileName) {
    const folderPath = folder.split('/').map(encodeURIComponent).join('/');
    return `${basePath}/${folderPath}/${encodeURIComponent(fileName)}`;
}

function projectImageHtml(basePath, folder, fileName, {
    alt = '',
    className = '',
    useWebp = true,
    assignmentLabel = '',
    assignmentClass = ''
} = {}) {
    const src = projectImageUrl(basePath, folder, fileName);
    const classAttr = className ? ` class="${className}"` : '';
    let imageMarkup;
    if (!useWebp) {
        imageMarkup = `<img src="${src}" alt="${alt}"${classAttr} loading="lazy">`;
    } else {
        const webpFileName = fileName.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp');
        const webpSrc = projectImageUrl(basePath, folder, webpFileName);
        imageMarkup = `
            <picture>
                <source srcset="${webpSrc}" type="image/webp">
                <img src="${src}" alt="${alt}"${classAttr} loading="lazy">
            </picture>
        `;
    }

    if (!assignmentLabel) return imageMarkup;

    return `
        <div class="project-image-wrap">
            <span class="project-assignment-badge ${assignmentClass}">${assignmentLabel}</span>
            ${imageMarkup}
        </div>
    `;
}

function projectImageOptionsFromProject(project, gallery) {
    if (!project.assignmentLabel) return {};
    return {
        assignmentLabel: project.assignmentLabel,
        assignmentClass: project.assignmentClass
    };
}

function getGalleryGroupSources(group) {
    if (group.sources) return group.sources;
    return [{ folder: group.folder, subfolders: group.subfolders }];
}

function formatObjectCount(count) {
    return count === 1 ? '1 objekt' : `${count} objekt`;
}

// Projektgalleri (delat av Web Development och Laser engraving)
async function loadProjectGallery(gallery) {
    const { basePath, groups, elements } = gallery;
    if (!elements.previews) return;

    try {
        const projects = [];

        for (const group of groups) {
            for (const source of getGalleryGroupSources(group)) {
                for (const subfolder of source.subfolders) {
                    try {
                        const response = await fetch(`${basePath}/${source.folder}/${subfolder}/project.json`);
                        if (response.ok) {
                            const projectData = await response.json();
                            projectData.folder = `${source.folder}/${subfolder}`;
                            projectData.group = group.name;
                            const assignment = gallery.assignmentTypes?.[source.folder];
                            if (assignment) {
                                projectData.assignmentLabel = assignment.label;
                                projectData.assignmentClass = assignment.className;
                            }
                            if (!projectData.preview || !/\.(png|jpe?g|gif|webp)$/i.test(projectData.preview)) {
                                projectData.preview = projectData.images?.[0];
                            }
                            projects.push(projectData);
                        }
                    } catch (error) {
                        console.warn(`Kunde inte ladda projekt från ${basePath}/${source.folder}/${subfolder}:`, error);
                    }
                }
            }
        }

        gallery.setProjects(projects);
        console.log(`Laddade projekt (${basePath}):`, projects);
        renderProjectGalleryPreviews(gallery);
    } catch (error) {
        console.error(`Fel vid laddning av projekt (${basePath}):`, error);
    }
}

function renderProjectGalleryPreviews(gallery) {
    const { groupOrder, basePath, elements } = gallery;
    const useWebp = gallery.useWebp !== false;
    const projects = gallery.getProjects();
    if (!elements.previews) return;

    elements.previews.innerHTML = '';

    const groupedProjects = {};
    projects.forEach((project, index) => {
        const group = project.group || 'Other';
        if (!groupedProjects[group]) groupedProjects[group] = [];
        groupedProjects[group].push({ project, index });
    });

    groupOrder.forEach(groupName => {
        if (!groupedProjects[groupName]) return;

        const groupHeader = document.createElement('div');
        groupHeader.className = 'project-group-header';
        groupHeader.innerHTML = `<h2>${groupName}</h2>`;
        elements.previews.appendChild(groupHeader);

        const groupContainer = document.createElement('div');
        groupContainer.className = 'project-group';
        groupContainer.dataset.group = groupName;

        groupedProjects[groupName].forEach(({ project, index }) => {
            const previewElement = document.createElement('div');
            previewElement.className = 'project-preview';
            previewElement.dataset.projectIndex = index;

            const imageCount = project.images?.length || 0;
            const imageOptions = { alt: project.title, useWebp, ...projectImageOptionsFromProject(project, gallery) };
            previewElement.innerHTML = `
                ${projectImageHtml(basePath, project.folder, project.preview, imageOptions)}
                <h3>${project.title} ${project.status === 'work_in_progress' ? '<span class="wip-badge">WorkInProgress</span>' : ''}</h3>
                <p>${project.description}</p>
            `;

            previewElement.addEventListener('click', () => showProjectGalleryDetail(gallery, index));
            groupContainer.appendChild(previewElement);
        });

        elements.previews.appendChild(groupContainer);
    });

    fadeInContainerElements(elements.previews);
}

function showProjectGalleryDetail(gallery, projectIndex) {
    const project = gallery.getProjects()[projectIndex];
    const { basePath, projectLinks, elements } = gallery;
    const useWebp = gallery.useWebp !== false;
    if (!project || !elements.detail || !elements.detailContent) return;

    elements.previews.style.display = 'none';
    elements.detail.style.display = 'block';

    const assignmentOptions = projectImageOptionsFromProject(project, gallery);
    const projectImagesHTML = project.images.map(image =>
        projectImageHtml(basePath, project.folder, image, {
            alt: project.title,
            className: 'project-image',
            useWebp,
            ...assignmentOptions
        })
    ).join('');

    const technologiesHTML = project.technologies.map(tech =>
        `<span class="technology-tag">${tech}</span>`
    ).join('');

    const projectLink = projectLinks[project.title];
    const linkHTML = projectLink ? `
        <div class="project-link-container">
            <a href="${projectLink}" target="_blank" rel="noopener noreferrer" class="project-link">
                <i data-feather="external-link"></i>
                Besök webbplatsen
            </a>
        </div>
    ` : '';

    elements.detailContent.innerHTML = `
        <div class="project-detail-header">
            <h2 class="project-detail-title">${project.title}</h2>${linkHTML}
        </div>
        <div class="project-technologies">${technologiesHTML}</div>
        <p class="project-detail-description">${project.description}</p>
        <div class="project-images">${projectImagesHTML}</div>
    `;

    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    fadeInContainerElements(elements.detailContent);
}

function showProjectGalleryPreviews(gallery) {
    const { elements } = gallery;
    if (!elements.detail || !elements.previews) return;
    elements.detail.style.display = 'none';
    elements.previews.style.display = 'block';
    fadeInContainerElements(elements.previews);
}

async function loadProjects() {
    await loadProjectGallery(webProjectGallery);
}

function renderProjectPreviews() {
    renderProjectGalleryPreviews(webProjectGallery);
}

function showProjectDetail(projectIndex) {
    showProjectGalleryDetail(webProjectGallery, projectIndex);
}

function showProjectPreviews() {
    showProjectGalleryPreviews(webProjectGallery);
}

async function loadLaserProjects() {
    await loadProjectGallery(laserProjectGallery);
}

function renderLaserProjectPreviews() {
    renderProjectGalleryPreviews(laserProjectGallery);
}

function showLaserProjectDetail(projectIndex) {
    showProjectGalleryDetail(laserProjectGallery, projectIndex);
}

function showLaserProjectPreviews() {
    showProjectGalleryPreviews(laserProjectGallery);
}

// Hjälpfunktioner för att visa olika containers
function showImageDesignContainer() {
    console.log("🖼️ showImageDesignContainer() called");
    playTransitionAnimation(async () => {
        // Visa efter animationen är klar
        console.log("🖼️ Setting ImageDesignContainer to flex");
        ImageDesignContainer.style.display = "flex";
        fadeInContainerElements(ImageDesignContainer);
        setTimeout(async () => {
            await initPhysics();
        }, 200);
    });
}

function showVideosKognitivetContainer() {
    console.log("🎥 showVideosKognitivetContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎥 Setting VideosKognitivetContainer to flex");
        VideosKognitivetContainer.style.display = "flex";
        fadeInContainerElements(VideosKognitivetContainer);
    });
}

function showWebDesignContainer() {
    console.log("🌐 showWebDesignContainer() called");
    playTransitionAnimation(async () => {
        console.log("🌐 Setting WebDesignContainer to flex");
        WebDesignContainer.style.display = "flex";
        await loadProjects();
        fadeInContainerElements(WebDesignContainer);
    });
}

function showLaserEngravingContainer() {
    console.log("🔥 showLaserEngravingContainer() called");
    playTransitionAnimation(async () => {
        console.log("🔥 Setting LaserEngravingContainer to flex");
        LaserEngravingContainer.style.display = "flex";
        await loadLaserProjects();
        fadeInContainerElements(LaserEngravingContainer);
    });
}

function showUXDesignContainer() {
    console.log("🎨 showUXDesignContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎨 Setting UXDesignContainer to flex");
        UXDesignContainer.style.display = "flex";
        fadeInContainerElements(UXDesignContainer);
    });
}

function showAnimationDesignContainer() {
    console.log("🎬 showAnimationDesignContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎬 Setting AnimationDesignContainer to flex");
        AnimationDesignContainer.style.display = "flex";
        fadeInContainerElements(AnimationDesignContainer);
    });
}

function showMusicKognitivetContainer() {
    console.log("🎵 showMusicKognitivetContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎵 Setting MusicKognitivetContainer to flex");
        MusicKognitivetContainer.style.display = "flex";
        fadeInContainerElements(MusicKognitivetContainer);
    });
}

