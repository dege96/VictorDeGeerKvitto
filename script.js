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

// Logga container-status vid sidladdning
console.log("📊 Container status check:");
console.log("VideosKognitivetContainer:", VideosKognitivetContainer?.style.display || "not found");
console.log("MusicKognitivetContainer:", MusicKognitivetContainer?.style.display || "not found");
console.log("ImageDesignContainer:", ImageDesignContainer?.style.display || "not found");
console.log("WebDesignContainer:", WebDesignContainer?.style.display || "not found");
console.log("UXDesignContainer:", UXDesignContainer?.style.display || "not found");
console.log("AnimationDesignContainer:", AnimationDesignContainer?.style.display || "not found");

// Ta bort video-skapandet från början av filen och ersätt med:
const crumbleVideo = document.getElementById('crumbleVideo');
const crumbleVideoReverse = document.getElementById('crumbleVideoReverse');
if (!crumbleVideo || !crumbleVideoReverse) {
    console.error('Could not find crumbleVideo element');
}

// Global flagga för att förhindra samtidiga animationer
let isTransitionPlaying = false;

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

    // Reset video state
    crumbleVideo.currentTime = 0;
    crumbleVideo.style.display = 'block';
    
    try {
        await crumbleVideo.play();
        
        // Fadea ut portfolio över 0,3s när videon börjar spela
        portfolio.style.opacity = '0';
        
        // Göm portfolio helt efter fade-animationen är klar
        setTimeout(() => {
            portfolio.style.display = 'none';
        }, 300);
        
        await new Promise(resolve => {
            crumbleVideo.onended = resolve;
        });
        
        crumbleVideo.style.display = 'none';
        callback();
        crumbleVideo.currentTime = 0;
    } catch (error) {
        console.error('Video playback failed:', error);
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

    // Reset video state
    crumbleVideoReverse.currentTime = 0;
    crumbleVideoReverse.style.display = 'block';
    portfolio.style.display = 'none';
    
    try {
        await crumbleVideoReverse.play();
        await new Promise(resolve => {
            crumbleVideoReverse.onended = resolve;
        });
        
        crumbleVideoReverse.style.display = 'none';
        callback();
        crumbleVideoReverse.currentTime = 0;
    } catch (error) {
        console.error('Reverse video playback failed:', error);
        callback();
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
        // Kolla om projekt-detaljvyn är synlig
        if (projectDetail && projectDetail.style.display === "block") {
            console.log("🔙 Går tillbaka från projekt-detalj till projekt-lista");
            showProjectPreviews();
            return; // Avsluta här, gå inte tillbaka till huvudmenyn
        }
    }
    
    // Göm först alla containers
    const containers = [
        VideosKognitivetContainer,
        MusicKognitivetContainer,
        ImageDesignContainer,
        WebDesignContainer,
        UXDesignContainer,
        AnimationDesignContainer
    ];
    
    containers.forEach(container => {
        if (container) {
            console.log("🔙 Hiding container:", container.id);
            container.style.display = "none";
            
            // Återställ WebDesignContainer till preview-läge
            if (container.id === "WebDesignContainer") {
                showProjectPreviews();
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
    });
  });
}

for (let i = 0; i < KognitivetMusicLink.length; i++) {
  KognitivetMusicLink[i].addEventListener('click', (event) => {
    console.log("KognitivetMusicLink clicked");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        MusicKognitivetContainer.style.display = "flex";
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
    });
  });
}

for (let i = 0; i < ImageDesignLink.length; i++) {
    ImageDesignLink[i].addEventListener('click', (event) => {
        console.log("ImageDesignLink clicked");
        playTransitionAnimation(async () => {
            // Visa efter animationen är klar
            ImageDesignContainer.style.display = "flex";
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

// SVG Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const svgObject = document.querySelector('.kvitto-svg');
    
    if (svgObject) {
        svgObject.addEventListener('load', function() {
            const svgDoc = svgObject.contentDocument;
            if (svgDoc) {
                // Lägg till klick-händelser på SVG-elementen
                addSVGInteractivity(svgDoc);
            }
        });
    }
});

function addSVGInteractivity(svgDoc) {
    // Hitta alla rektanglar som ska fungera som hover-områden
    const hoverRects = svgDoc.querySelectorAll('rect.st2');
    
    hoverRects.forEach(rect => {
        // Lägg till hover-effekt på rektangeln
        rect.style.cursor = 'pointer';
        rect.style.transition = 'opacity 0.3s ease';
        
        rect.addEventListener('mouseenter', function() {
            // Hitta den överordnade gruppen
            const parentGroup = this.closest('g');
            if (parentGroup) {
                // Hitta alla text-element i denna grupp
                const textElements = parentGroup.querySelectorAll('text, tspan');
                textElements.forEach(text => {
                    text.style.opacity = '0.3';
                });
            }
        });
        
        rect.addEventListener('mouseleave', function() {
            // Hitta den överordnade gruppen
            const parentGroup = this.closest('g');
            if (parentGroup) {
                // Återställ alla text-element i denna grupp
                const textElements = parentGroup.querySelectorAll('text, tspan');
                textElements.forEach(text => {
                    text.style.opacity = '1';
                });
            }
        });
        
    });
    
    // Hitta klickbara element i SVG:en baserat på textinnehåll eller ID:n
    const clickableElements = svgDoc.querySelectorAll('text, tspan, g[id*="UX"], g[id*="Web"], g[id*="Image"], g[id*="Video"], g[id*="Music"], g[id*="Animation"]');
    
    clickableElements.forEach(element => {
        const text = element.textContent || element.innerHTML;
        
        // Lägg till hover-effekt
        element.style.cursor = 'pointer';
        element.style.transition = 'opacity 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.6';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
        
        // Lägg till klick-händelser baserat på textinnehåll
        element.addEventListener('click', function() {
            if (text.includes('UX/UI Design') || text.includes('UX')) {
                showImageDesignContainer();
            } else if (text.includes('Web programming') || text.includes('Web')) {
                showWebDesignContainer(); // Du kan ändra detta till en web-specifik container
            } else if (text.includes('Image design')) {
                showImageDesignContainer();
            } else if (text.includes('Vector graphics')) {
                showImageDesignContainer();
            } else if (text.includes('Video production') || text.includes('Video')) {
                showVideosKognitivetContainer();
            } else if (text.includes('Music production') || text.includes('Music')) {
                showMusicKognitivetContainer();
            } else if (text.includes('Animation')) {
                showAnimationDesignContainer(); // Du kan ändra detta till en animation-specifik container
            } else if (text.includes('Skärholmens Pall')) {
                showWebDesignContainer(); // Du kan ändra detta till en animation-specifik container
            }
        });
    });
    
    // Lägg till klick på projekt-länkar
    const projectElements = svgDoc.querySelectorAll('text, tspan');
    projectElements.forEach(element => {
        const text = element.textContent || element.innerHTML;
        
        if (text.includes('Skarholmens Pall') || text.includes('HaSams') || text.includes('DG Development') || text.includes('Terran') || text.includes('Kognitivet')) {
            element.style.cursor = 'pointer';
            element.style.transition = 'opacity 0.3s ease';
            
            element.addEventListener('mouseenter', function() {
                this.style.opacity = '0.7';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
            
            element.addEventListener('click', function() {
                if (text.includes('Skarholmens Pall')) {
                    window.open('https://www.skarholmenspall.se/', '_blank');
                } else if (text.includes('HaSams')) {
                    window.open('https://hasamsredovisning.se/', '_blank');
                } else if (text.includes('DG Development')) {
                    window.open('https://dgd.solutions/', '_blank');
                } else if (text.includes('Terran')) {
                    window.open('https://info.terran.ai/', '_blank');
                }
            });
        }
    });
    
    // Lägg till klick på email
    const emailElements = svgDoc.querySelectorAll('text, tspan');
    emailElements.forEach(element => {
        const text = element.textContent || element.innerHTML;
        
        if (text.includes('@') || text.includes('victordegeer96@gmail.com')) {
            element.style.cursor = 'pointer';
            element.style.transition = 'opacity 0.3s ease';
            
            element.addEventListener('mouseenter', function() {
                this.style.opacity = '0.7';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
            
            element.addEventListener('click', function() {
                window.location.href = 'mailto:victordegeer96@gmail.com';
            });
        }
    });
}

// Web Development projekt funktioner
async function loadProjects() {
    try {
        // Projektgrupper i önskad ordning
        const projectGroups = [
            {
                name: 'Web Applications',
                folder: 'web_apps',
                subfolders: ['skarholmens_pall', 'inkopslistan', 'atmo_studios']
            },
            {
                name: 'Web Pages',
                folder: 'webpages',
                subfolders: ['dg_development', 'hasams_redovisning']
            },
            {
                name: 'Work In Progress',
                folder: 'work_in_progress',
                subfolders: ['3d_models_web', 'spotify_wrapped', '8bit_game']
            }
        ];
        
        currentProjects = [];
        
        for (const group of projectGroups) {
            for (const subfolder of group.subfolders) {
                try {
                    const response = await fetch(`webdev/${group.folder}/${subfolder}/project.json`);
                    if (response.ok) {
                        const projectData = await response.json();
                        projectData.folder = `${group.folder}/${subfolder}`;
                        projectData.group = group.name;
                        currentProjects.push(projectData);
                    }
                } catch (error) {
                    console.warn(`Kunde inte ladda projekt från ${group.folder}/${subfolder}:`, error);
                }
            }
        }
        
        console.log('Laddade projekt:', currentProjects);
        renderProjectPreviews();
    } catch (error) {
        console.error('Fel vid laddning av projekt:', error);
    }
}

function renderProjectPreviews() {
    if (!projectPreviews) return;
    
    projectPreviews.innerHTML = '';
    
    // Gruppera projekt efter grupp
    const groupedProjects = {};
    currentProjects.forEach((project, index) => {
        const group = project.group || 'Other';
        if (!groupedProjects[group]) {
            groupedProjects[group] = [];
        }
        groupedProjects[group].push({ project, index });
    });
    
    // Definiera ordning för grupperna
    const groupOrder = ['Web Applications', 'Web Pages', 'Work In Progress'];
    
    // Rendera varje grupp
    groupOrder.forEach(groupName => {
        if (groupedProjects[groupName]) {
            // Skapa grupphuvud
            const groupHeader = document.createElement('div');
            groupHeader.className = 'project-group-header';
            groupHeader.innerHTML = `<h2>${groupName}</h2>`;
            projectPreviews.appendChild(groupHeader);
            
            // Skapa gruppcontainer
            const groupContainer = document.createElement('div');
            groupContainer.className = 'project-group';
            groupContainer.dataset.group = groupName;
            
            // Rendera projekt i gruppen
            groupedProjects[groupName].forEach(({ project, index }) => {
                const previewElement = document.createElement('div');
                previewElement.className = 'project-preview';
                previewElement.dataset.projectIndex = index;
                
                const previewImage = project.preview.endsWith('.webp') ? 
                    project.preview : 
                    project.preview.replace(/\.(png|jpg|jpeg|gif)$/, '.webp');
                
                previewElement.innerHTML = `
                    <picture>
                        <source srcset="webdev/${project.folder}/${previewImage}" type="image/webp">
                        <img src="webdev/${project.folder}/${project.preview}" alt="${project.title}" loading="lazy">
                    </picture>
                    <h3>${project.title} ${project.status === 'work_in_progress' ? '<span class="wip-badge">WorkInProgress</span>' : ''}</h3>
                    <p>${project.description}</p>
                `;
                
                previewElement.addEventListener('click', () => showProjectDetail(index));
                groupContainer.appendChild(previewElement);
            });
            
            projectPreviews.appendChild(groupContainer);
        }
    });
}

function showProjectDetail(projectIndex) {
    const project = currentProjects[projectIndex];
    if (!project) return;
    
    // Dölj previews och visa detaljer
    projectPreviews.style.display = 'none';
    projectDetail.style.display = 'block';
    
    // Projektlänkar baserat på projects.md och JSON-filer
    const projectLinks = {
        'Skärholmens Pall': 'https://skarholmenspall.com',
        'InköpsListan': 'https://inkopslistan-836ab.web.app/lists/0tOpS4Nplc0g4B9J4aaS',
        'HELFER': 'https://helfer.vercel.app/',
        'DG Development': 'https://www.dgd.solutions/',
        'ATMO STUDIOS - Cloud Based Music Platform': 'https://musiktjaenst.web.app/',
        'Make Your Own Spotify Wrapped': 'https://spotifyslapped.netlify.app/',
        '3D Models in the Web': 'https://degeer-3d-spline.netlify.app/',
        'Pepsi vs Coca Cola Interactive': 'https://lovely-biscuit-5a5b09.netlify.app/',
        'Candy Store': 'https://godis-grisen-8rnk.vercel.app/'
    };
    
    // Generera projektbilder HTML
    const projectImagesHTML = project.images.map(image => {
        const webpImage = image.replace(/\.(png|jpg|jpeg|gif)$/, '.webp');
        return `
            <picture>
                <source srcset="webdev/${project.folder}/${webpImage}" type="image/webp">
                <img src="webdev/${project.folder}/${image}" alt="${project.title}" class="project-image" loading="lazy">
            </picture>
        `;
    }).join('');
    
    // Generera teknologier HTML
    const technologiesHTML = project.technologies.map(tech => 
        `<span class="technology-tag">${tech}</span>`
    ).join('');
    
    // Generera länk HTML om projektet har en länk
    const projectLink = projectLinks[project.title];
    const linkHTML = projectLink ? `
        <div class="project-link-container">
            <a href="${projectLink}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span class="link-icon">🔗</span>
                Besök webbplatsen
            </a>
        </div>
    ` : '';
    
    // Sätt innehåll
    projectDetailContent.innerHTML = `
        <div class="project-detail-header">
            <h2 class="project-detail-title">${project.title}</h2>
        </div>
        <div class="project-technologies">${technologiesHTML}</div>
        <p class="project-detail-description">${project.description}</p>
        ${linkHTML}
        <div class="project-images">${projectImagesHTML}</div>
    `;
}

function showProjectPreviews() {
    projectDetail.style.display = 'none';
    projectPreviews.style.display = 'block';
}

// Hjälpfunktioner för att visa olika containers
function showImageDesignContainer() {
    console.log("🖼️ showImageDesignContainer() called");
    playTransitionAnimation(async () => {
        // Visa efter animationen är klar
        console.log("🖼️ Setting ImageDesignContainer to flex");
        ImageDesignContainer.style.display = "flex";
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
    });
}

function showWebDesignContainer() {
    console.log("🌐 showWebDesignContainer() called");
    playTransitionAnimation(async () => {
        // Visa efter animationen är klar
        console.log("🌐 Setting WebDesignContainer to flex");
        WebDesignContainer.style.display = "flex";
        // Ladda projekt när containern visas
        await loadProjects();
    });
}

function showUXDesignContainer() {
    console.log("🎨 showUXDesignContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎨 Setting UXDesignContainer to flex");
        UXDesignContainer.style.display = "flex";
    });
}

function showAnimationDesignContainer() {
    console.log("🎬 showAnimationDesignContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎬 Setting AnimationDesignContainer to flex");
        AnimationDesignContainer.style.display = "flex";
    });
}

function showMusicKognitivetContainer() {
    console.log("🎵 showMusicKognitivetContainer() called");
    playTransitionAnimation(() => {
        // Visa efter animationen är klar
        console.log("🎵 Setting MusicKognitivetContainer to flex");
        MusicKognitivetContainer.style.display = "flex";
    });
}

