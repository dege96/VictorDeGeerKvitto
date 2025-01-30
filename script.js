// Event listeners för navigering
const portfolio = document.querySelector(".portfolio");
const KognitivetVideoLink = document.getElementsByClassName("KognitivetVideoLink");
const KognitivetMusicLink = document.getElementsByClassName("KognitivetMusicLink");
const Kognitivet_Video_and_Music_Link = document.getElementsByClassName("Kognitivet_Video_and_Music_Link");
const VideosKognitivetContainer = document.getElementById("VideosKognitivetContainer");
const MusicKognitivetContainer = document.getElementById("MusicKognitivetContainer");
const ImageDesignContainer = document.getElementById("ImageDesignContainer");
const ImageDesignLink = document.getElementsByClassName("ImageDesignLink");
const BackArrows = document.querySelectorAll(".back_arrow");
const crumbleVideos = document.querySelectorAll(".crumbleVideoClass");

// Ta bort video-skapandet från början av filen och ersätt med:
const crumbleVideo = document.getElementById('crumbleVideo');
const crumbleVideoReverse = document.getElementById('crumbleVideoReverse');
if (!crumbleVideo || !crumbleVideoReverse) {
    console.error('Could not find crumbleVideo element');
}

// Hjälpfunktion för att spela animationen och hantera övergångar
async function playTransitionAnimation(callback) {
    if (!crumbleVideo) {
        callback();
        return;
    }
    portfolio.style.filter = 'blur(100px)';
    // Använd första source (crumble.webm)
    crumbleVideo.load();
    crumbleVideo.style.display = 'block';

    
    crumbleVideo.addEventListener('loadeddata', () => {
        portfolio.style.display = 'none';
    });
    
    try {
        await crumbleVideo.play();
        crumbleVideo.style.filter = 'blur(0px)';
        await new Promise(resolve => {
            crumbleVideo.onended = resolve;
        });
        
        crumbleVideo.style.display = 'none';
        callback();
        crumbleVideo.currentTime = 0;
    } catch (error) {
        console.error('Video playback failed:', error);
        callback();
    }
}

// Hjälpfunktion för att spela animationen och hantera övergångar
async function playTransitionAnimationReverse(callback) {
    if (!crumbleVideoReverse) {
        callback();
        return;
    }
    crumbleVideo.style.filter = 'blur(0px)';
    crumbleVideoReverse.style.filter = 'blur(0px)';
    portfolio.style.filter = 'blur(100px)';

    
    // Använd första source (crumble.webm)
    crumbleVideoReverse.load();
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
    
    // Göm först alla containers
    const containers = [
        VideosKognitivetContainer,
        MusicKognitivetContainer,
        ImageDesignContainer
    ];
    
    containers.forEach(container => {
        if (container) {
            container.style.display = "none";
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
        portfolio.style.display = "block";
    });
  });
});

// Navigation event listeners för olika sektioner
for (let i = 0; i < KognitivetVideoLink.length; i++) {
  KognitivetVideoLink[i].addEventListener('click', (event) => {
    console.log("KognitivetVideoLink clicked");
    playTransitionAnimation(() => {
        VideosKognitivetContainer.style.display = "flex";
    });
  });
}

for (let i = 0; i < KognitivetMusicLink.length; i++) {
  KognitivetMusicLink[i].addEventListener('click', (event) => {
    console.log("KognitivetMusicLink clicked");
    playTransitionAnimation(() => {
        MusicKognitivetContainer.style.display = "flex";
    });
  });
}

for (let i = 0; i < Kognitivet_Video_and_Music_Link.length; i++) {
  Kognitivet_Video_and_Music_Link[i].addEventListener('click', (event) => {
    console.log("Kognitivet_Video_and_Music_Link clicked");
    playTransitionAnimation(() => {
        MusicKognitivetContainer.style.display = "flex";
        VideosKognitivetContainer.style.display = "flex";
    });
  });
}

for (let i = 0; i < ImageDesignLink.length; i++) {
    ImageDesignLink[i].addEventListener('click', (event) => {
        console.log("ImageDesignLink clicked");
        playTransitionAnimation(() => {
            ImageDesignContainer.style.display = "flex";
            setTimeout(initPhysics, 200);
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

// Physics engine initialisering och setup
function initPhysics() {
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
        if (img.complete) {
            createPhysicsBody(img);
        } else {
            img.addEventListener('load', () => createPhysicsBody(img));
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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

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



